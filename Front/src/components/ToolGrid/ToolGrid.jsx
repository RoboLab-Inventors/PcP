import { Panel, PanelGroup } from "react-resizable-panels";
import ComponentDetails from "./ComponentDetails/ComponentDetails";
import ListController from "./ListController/ListController";
import { useState, useEffect, useRef, useMemo } from 'react';
import ResizeHandle from "./ResizeHandle";
import styles from "./styles.module.css";
import { requestDevice, handleBluetoothInputReport01, handleBluetoothInputReport31 } from "../../ControllerLogic/readController";
import disconnectedController from "../../assets/icons/disconnectedController.svg"; // Adjust the path as needed
import { Typography } from "@mui/material";
import eventEmitter from "../../ControllerLogic/eventEmitter";
import Overview from "./Overview/Overview";
import EditComponent from "./EditComponent/EditComponent";
import { throttle } from "lodash"; 

export default function ToolGrid() {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [reportData, setReportData] = useState({
    axes: [0, 0, 0, 0, 0, 0],
    buttons: { square: 0, cross: 0, circle: 0, triangle: 0, l1: 0, r1: 0, create: 0, options: 0, l3: 0, r3: 0, ps: 0, touchpad: 0 },
    directional: { dpad: 0, up: 0, down: 0, left: 0, right: 0 },
    trigger: { l2: 0, r2: 0 },
  });

  const lastReportData = useRef(reportData);
  
  useEffect(() => {
    const handleData = throttle((data) => {
      if (JSON.stringify(data) !== JSON.stringify(lastReportData.current)) {
        lastReportData.current = data; 
        setReportData(data);
      }
    }, 100);
  
    eventEmitter.on("bluetoothData", handleData);
  
    let intervalId;
    if (isConnected) {
      intervalId = setInterval(() => {
        eventEmitter.emit("bluetoothData", lastReportData.current);
      }, 250);
    }
  
    return () => {
      eventEmitter.off("bluetoothData", handleData);
      handleData.cancel();
      if (intervalId) clearInterval(intervalId);
    };
  }, [isConnected]);  

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
        label: 'BTN ' + key,
      })),
      ...Object.entries(reportData?.directional ?? {}).map(([key, value]) => ({
        minValue: 0,
        maxValue: 1,
        minY: -0.1,
        maxY: 1.1,
        value: -value,
        label: 'DIR ' + key,
      })),
      ...Object.entries(reportData?.trigger ?? {}).map(([key, value]) => ({
        minValue: 0,
        maxValue: 1,
        minY: -0.1,
        maxY: 1.1,
        value: -value,
        label: 'T ' + key,
      })),
    ];
  }, [lastReportData.current]);

  return (
    <div className={styles.Container}>
      {
        !isConnected ? (
          <div className={styles.CenteredDiv} onClick={() => {
            console.log("Requesting device connection");
            requestDevice(setIsConnected);
          }}>
            <img src={disconnectedController} alt="Disconnected Controller" className={styles.Controller} />
            <Typography variant="h5">Clicca per collegare</Typography>
          </div>
        ) : (
          <div className={styles.BottomRow}>
            <PanelGroup direction="vertical">
              <Panel>
                <PanelGroup direction="horizontal">
                  <Panel className={styles.Panel} minSize={20} order={1}>
                    <div className={styles.PanelContent}>
                      <ListController items={items} onItemClick={(item) => setSelectedChart(item)} />
                    </div>
                  </Panel>
                  <ResizeHandle className="hover-target" />
                  <Panel className={styles.Panel} minSize={20} order={2}>
                    <div className={styles.PanelContent}>
                    {selectedChart && <ComponentDetails items={items} chartData={selectedChart}  />}
                    </div>
                  </Panel>
                  <ResizeHandle className="hover-target" />
                  <Panel className={styles.Panel} collapsible={true} order={3}>
                    <div className={styles.PanelContent}>
                      {selectedChart && <EditComponent items={items} chartData={selectedChart}/>}
                    </div>
                  </Panel>
                </PanelGroup>
              </Panel>
              <ResizeHandle className="hover-target" />
              <Panel className={styles.Panel} minSize={20} defaultSize={40} order={4}>
                <div className={styles.PanelContent}>
                  <Overview items={items} />
                </div>
              </Panel>
            </PanelGroup>
          </div>
        )
      }
    </div>
  );
}