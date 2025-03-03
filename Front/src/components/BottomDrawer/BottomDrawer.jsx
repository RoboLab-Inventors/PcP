import { useState, useContext, useRef, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CustomButton from "../CustomButton/CustomButton";
import { BASE_URL } from "../../constants";
import { ConfStringContext } from "../ToolGrid/EditComponent/ConfStringContext";

const ResponsiveBottomDrawer = () => {
  const [isFullOpen, setIsFullOpen] = useState(false);
  const { confString } = useContext(ConfStringContext);
  const fileInputRef = useRef(null);

  const toggleDrawer = () => {
    setIsFullOpen(!isFullOpen);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
  };

  //Soluzione con file dinamico (scelto perchè è compatibile con tutti i browser, l'alernativa è usare API File System Access ma non è compatibile con tutti i browser)
  let str = ""; // Stringa iniziale
  const importConfiguration = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt";
  
    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          // Il contenuto del file è disponibile in e.target.result
          const fileContent = e.target.result;  
          // Salva il contenuto del file in localStorage
          localStorage.setItem("str", fileContent);
  
          // Imposta il confString nel contesto
        };
  
        reader.onerror = (error) => {
          console.error("Errore durante la lettura del file:", error);
        };
  
        // Leggi il file come testo
        reader.readAsText(file);
      }
    });
  
    input.click();
  };
  
  
  const exportConfiguration = async () => {
    const response = await fetch(`${BASE_URL}/exportConfiguration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        nome: "",
        descrizione: "",
        stato: "Pubblico", // TODO: Vedi come risolvere stato, descrizione, nome
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
  };

  return (
    <>
      {/* Backdrop */}
      {isFullOpen && (
        <Backdrop
          open={isFullOpen}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: (theme) => theme.zIndex.drawer - 1,
            transition: "background-color 0.3s ease-in-out",
          }}
          onClick={toggleDrawer} // Clicking the backdrop closes the drawer
        />
      )}

      {/* Drawer */}
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
            backgroundColor: "rgba(15, 6, 6, 0.121)",
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
        {/* Drawer Handle */}
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
        </Box>

        {/* Drawer Content */}
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
              width: "100%",
              opacity: isFullOpen ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <CustomButton label="Export" onClick={exportConfiguration}/>
            <CustomButton label="Import" onClick={importConfiguration}/>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
export default ResponsiveBottomDrawer;