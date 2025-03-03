/**
 * Componente ToolGrid che gestisce la connessione a un controller Bluetooth e visualizza vari pannelli con dati.
 *
 * @component
 * @returns {JSX.Element} Il componente ToolGrid renderizzato.
 *
 * @example
 * return <ToolGrid />;
 *
 * @description
 * Questo componente gestisce la connessione a un controller Bluetooth e visualizza vari pannelli con dati.
 * Utilizza diversi hook per gestire stato, effetti e memoizzazione.
 *
 * @hook {boolean} useState - Gestisce lo stato della connessione e lo stato del grafico selezionato.
 * @hook {object} useState - Gestisce i dati del report dal controller.
 * @hook {object} useRef - Mantiene un riferimento agli ultimi dati del report.
 * @hook {object} useContext - Recupera il contesto ConfStringContext per EditComponent e BottomDrawer.
 * @hook {function} useEffect - Gestisce la gestione dei dati Bluetooth e lo stato della connessione.
 * @hook {function} useMemo - Memoizza gli elementi da visualizzare.
 *
 * @listens eventEmitter#bluetoothData - Ascolta gli eventi dei dati Bluetooth.
 * @fires eventEmitter#bluetoothData - Emette eventi di dati Bluetooth.
 *
 * @param {boolean} isConnected - Stato per verificare la connessione con il controller.
 * @param {function} setIsConnected - Funzione per impostare lo stato della connessione.
 * @param {object} reportData - Stato per salvare i dati del controller.
 * @param {function} setReportData - Funzione per impostare i dati del controller.
 * @param {object} lastReportData - Riferimento per mantenere l'ultimo stato dei dati del report.
 * @param {object} confString - Valore del contesto per la stringa di configurazione.
 * @param {function} setConfString - Funzione per impostare la stringa di configurazione.
 * @param {function} handleData - Funzione con throttling per gestire i dati Bluetooth.
 * @param {number} intervalId - ID dell'intervallo per l'invio dei dati via Bluetooth.
 * @param {Array} items - Array memoizzato di elementi da visualizzare.
 * @param {function} requestDevice - Funzione per richiedere la connessione del dispositivo.
 * @param {function} handleBluetoothInputReport31 - Funzione per gestire il report di input Bluetooth.
 * @param {string} disconnectedController - Percorso dell'icona del controller disconnesso.
 * @param {object} styles - Stili del modulo CSS.
 */
import { useState, useEffect, useRef, useMemo, useContext } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import ResizeHandle from "./ResizeHandle";

import ComponentDetails from "./ComponentDetails/ComponentDetails";
import ListController from "./ListController/ListController";
import Overview from "./Overview/Overview";
import EditComponent from "./EditComponent/EditComponent";

import {
  requestDevice,
  handleBluetoothInputReport31,
} from "../../ControllerLogic/readController";
import disconnectedController from "../../assets/icons/disconnectedController.svg";

import { Typography } from "@mui/material";

import eventEmitter from "../../ControllerLogic/eventEmitter";
import { throttle } from "lodash";
import { ConfStringContext } from "./EditComponent/ConfStringContext";

import styles from "./styles.module.css";

export default function ToolGrid() {
  const [isConnected, setIsConnected] = useState(false); //stato per verificare la conessione col controller
  const [selectedChart, setSelectedChart] = useState(null); //stato per selezionare il grafico
  //stato per salvare i dati del controller
  const [reportData, setReportData] = useState({
    axes: [0, 0, 0, 0, 0, 0],
    buttons: {
      square: 0,
      cross: 0,
      circle: 0,
      triangle: 0,
      l1: 0,
      r1: 0,
      create: 0,
      options: 0,
      l3: 0,
      r3: 0,
      ps: 0,
      touchpad: 0,
    },
    directional: { dpad: 0, up: 0, down: 0, left: 0, right: 0 },
    trigger: { l2: 0, r2: 0 },
  });

  // Riferimento per mantenere l'ultimo stato dei dati del report
  const lastReportData = useRef(reportData);

  // Recupera il contesto ConfStringContext per EditComponent e BottomDrawer
  const { confString, setConfString } = useContext(ConfStringContext);
  /**
   * Hook useEffect per gestire la gestione dei dati Bluetooth e lo stato della connessione.
   *
   * Questo effetto imposta un listener per gli eventi "bluetoothData" e processa
   * i dati ricevuti utilizzando un gestore con throttling. Gestisce anche l'intervallo per
   * l'invio dei dati via Bluetooth quando la connessione è attiva.
   *
   * Dipendenze:
   * - isConnected: Determina se la connessione Bluetooth è attiva.
   *
   * Pulizia:
   * - Rimuove il listener per gli eventi "bluetoothData".
   * - Cancella il gestore con throttling.
   * - Cancella l'intervallo per l'invio dei dati se è stato impostato.
   */
  useEffect(() => {
    // Funzione per gestire i dati con throttling ogni 100ms
    const handleData = throttle((data) => {
      //Controlla se i dati sono cambiati
      if (JSON.stringify(data) !== JSON.stringify(lastReportData.current)) {
        lastReportData.current = data;
        setReportData(data);
      }
    }, 100);

    // Ascolta l'evento "bluetoothData" e gestisce i dati ricevuti
    eventEmitter.on("bluetoothData", handleData);

    let intervalId;
    // Invia i dati via Bluetooth ogni 250ms se connesso
    if (isConnected) {
      intervalId = setInterval(() => {
        eventEmitter.emit("bluetoothData", lastReportData.current);
      }, 250);
    }

    // Cleanup: rimuove l'ascoltatore e cancella l'intervallo
    return () => {
      eventEmitter.off("bluetoothData", handleData);
      handleData.cancel();
      if (intervalId) clearInterval(intervalId);
    };
  }, [isConnected]);

  // Memoizzazione degli elementi da visualizzare
  const items = useMemo(() => {
    return [
      ...Object.entries(reportData?.axes ?? {}).map(([index, value]) => ({
        minValue: -1,
        maxValue: 1,
        minY: -1.1,
        maxY: 1.1,
        value: -value,
        label: `AX ${Number(index) + 1}`,
      })),
      ...Object.entries(reportData?.buttons ?? {}).map(([key, value]) => ({
        minValue: 0,
        maxValue: 1,
        minY: -0.1,
        maxY: 1.1,
        value: -value,
        label: "BTN " + key,
      })),
      ...Object.entries(reportData?.directional ?? {}).map(([key, value]) => ({
        minValue: 0,
        maxValue: 1,
        minY: -0.1,
        maxY: 1.1,
        value: -value,
        label: "DIR " + key,
      })),
      ...Object.entries(reportData?.trigger ?? {}).map(([key, value]) => ({
        minValue: 0,
        maxValue: 1,
        minY: -0.1,
        maxY: 1.1,
        value: -value,
        label: "T " + key,
      })),
    ];
  }, [reportData]);

  return (
    <div className={styles.Container}>
      {!isConnected ? (
        <div
          className={styles.CenteredDiv}
          onClick={() => {
            requestDevice(setIsConnected);
          }}
        >
          <img
            src={disconnectedController}
            alt="Disconnected Controller"
            className={styles.Controller}
          />
          <Typography variant="h5">Clicca per collegare</Typography>
        </div>
      ) : (
        <div className={styles.BottomRow}>
          <PanelGroup direction="vertical">
            <Panel>
              <PanelGroup direction="horizontal">
                <Panel className={styles.Panel} minSize={20} order={1}>
                  <div className={styles.PanelContent}>
                    <ListController
                      items={items}
                      onItemClick={(item) => setSelectedChart(item)}
                    />
                  </div>
                </Panel>
                <ResizeHandle className="hover-target" />
                <Panel className={styles.Panel} minSize={20} order={2}>
                  <div className={styles.PanelContent}>
                    {selectedChart && (
                      <ComponentDetails
                        items={items}
                        chartData={selectedChart}
                      />
                    )}
                  </div>
                </Panel>
                <ResizeHandle className="hover-target" />
                <Panel className={styles.Panel} collapsible={true} order={3}>
                  <div className={styles.PanelContent}>
                    {selectedChart && (
                      <EditComponent items={items} chartData={selectedChart} />
                    )}
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>
            <ResizeHandle className="hover-target" />
            <Panel
              className={styles.Panel}
              minSize={20}
              defaultSize={40}
              order={4}
            >
              <div className={styles.PanelContent}>
                <Overview items={items} />
              </div>
            </Panel>
          </PanelGroup>
        </div>
      )}
    </div>
  );
}
