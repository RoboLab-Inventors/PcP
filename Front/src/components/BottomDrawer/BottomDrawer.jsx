/**
 * Componente ResponsiveBottomDrawer.
 * 
 * Questo componente rappresenta un cassetto (drawer) che può essere aperto e chiuso
 * dall'utente. Include funzionalità per importare ed esportare configurazioni.
 * 
 * @component
 * 
 * @returns {JSX.Element} Il componente ResponsiveBottomDrawer.
 * 
 * @example
 * <ResponsiveBottomDrawer />
 * 
 * @function
 * @name ResponsiveBottomDrawer
 * 
 * @description
 * - Utilizza lo stato locale per gestire l'apertura del cassetto e del modal.
 * - Permette di importare configurazioni da un file .txt.
 * - Permette di esportare configurazioni tramite una richiesta POST a un endpoint specifico.
 * 
 * @state {boolean} isFullOpen - Stato che indica se il cassetto è completamente aperto.
 * @state {boolean} isModalOpen - Stato che indica se il modal è aperto.
 * @state {string} title - Titolo della configurazione da esportare.
 * @state {string} description - Descrizione della configurazione da esportare.
 * @state {string} stato - Stato della configurazione da esportare.
 * 
 * @context {object} ConfStringContext - Contesto che fornisce la stringa di configurazione.
 * 
 * @function openModal - Apre il modal.
 * @function closeModal - Chiude il modal.
 * @function toggleDrawer - Alterna lo stato di apertura del cassetto.
 * @function importConfiguration - Gestisce l'importazione di una configurazione da un file .txt.
 * @function handleExport - Apre il modal per confermare l'esportazione.
 * @function confirmExport - Conferma l'esportazione della configurazione e invia una richiesta POST.
 */
import { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import CustomButton from "../CustomButton/CustomButton";
import { BASE_URL } from "../../constants";
import { ConfStringContext } from "../ToolGrid/EditComponent/ConfStringContext";
import PopUp from "../PopUp/PopUpEsporta";

const ResponsiveBottomDrawer = () => {
  const [isFullOpen, setIsFullOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { confString } = useContext(ConfStringContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stato, setStato] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDrawer = () => {
    setIsFullOpen(!isFullOpen);
  };

  /**
   * Funzione per importare una configurazione da un file di testo.
   * Crea un elemento input di tipo file, permette la selezione di un file .txt,
   * legge il contenuto del file e lo salva nel localStorage con la chiave "str".
   * 
   * @function importConfiguration
   * @returns {void}
   */
  const importConfiguration = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt";

    input.addEventListener("change", (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const fileContent = e.target.result;
          localStorage.setItem("str", fileContent);
        };

        reader.onerror = (error) => {
          console.error("Errore durante la lettura del file:", error);
        };

        reader.readAsText(file);
      }
    });

    input.click();
  };

  const handleExport = () => {
    if(confString.length !== 0) 
    {
      openModal(); // Apre il modal quando l'utente preme "Esporta"
    }
    else
      alert("Devi salvare la configurazione prima di esportarla");

  };
  
  /**
   * Funzione che conferma l'esportazione di una configurazione.
   * Chiude il modal e invia una richiesta POST al server per esportare la configurazione.
   * Se la richiesta ha successo, scarica il file di configurazione.
   * 
   * @async
   * @function confirmExport
   * @returns {Promise<void>} Nessun valore di ritorno.
   * @throws {Error} Se si verifica un errore durante l'export.
   */
  const confirmExport = async () => {
    closeModal();
  
    setTimeout(async () => {
      console.log(JSON.stringify(confString))
      try {
        const response = await fetch(`${BASE_URL}/exportConfiguration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            nome: title,
            descrizione: description,
            stato: stato,
            configurazione: confString,
            username: localStorage.getItem("username"),
          }),
        });
  
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${localStorage.getItem("username")}_config.txt`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          console.error("Errore durante il download della configurazione");
        }
      } catch (error) {
        console.error("Errore durante l'export:", error);
      }
    }, 300); // Permette al modal di chiudersi visibilmente prima della richiesta
  };
  

  return (
    <>
      {isFullOpen && (
        <Backdrop
          open={isFullOpen}
          sx={{
            backgroundColor: "theme.palette.background.primary",
            zIndex: (theme) => theme.zIndex.drawer - 1,
            transition: "background-color 0.3s ease-in-out",
          }}
          onClick={toggleDrawer}
        />
      )}
      {isModalOpen && (
        <PopUp
          title={title}
          onClose={closeModal}
          onConfirm={confirmExport}
          confirmLabel="Esporta"
          setTitle={setTitle}
          setDescription={setDescription}
          setStato={setStato}
        />
      )}
      <Drawer
        anchor="bottom"
        open={true}
        variant="persistent"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            position: "fixed",
            backgroundColor: "var(--background-secondary)",
            borderTopRightRadius: "20px",
            borderTopLeftRadius: "20px",
            height: isFullOpen ? "20%" : "7%",
            width: "100%",
            transition: "height 0.3s ease-in-out",
            overflowY: "hidden",
          },
          "& .MuiDrawer-root": {
            position: "absolute",
            bottom: 0,
            left: 0,
          },
        }}
      >
        <Box
          onClick={toggleDrawer}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            borderTopRightRadius: "20px",
            borderTopLeftRadius: "20px",
            py: 1,
          }}
        >
          <Tooltip title={isFullOpen ? "Chiudi" : "Apri"}>
            <Box
              sx={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="drawer-handle"
            >
              {[1, 2, 3].map((line) => (
                <Box
                  key={line}
                  sx={{
                    width: "60%",
                    height: "3px",
                    backgroundColor: "fontColor.main",
                    my: 0.5,
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </Box>
          </Tooltip>
        </Box>
        <Box
          sx={{
            height: "calc(100% - 50px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "20vw",
              opacity: isFullOpen ? 1 : 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <CustomButton
              label="Esporta"
              onClick={isFullOpen ? handleExport : undefined}
            />
            <CustomButton
              label="Importa"
              onClick={isFullOpen ? importConfiguration : undefined}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ResponsiveBottomDrawer;
