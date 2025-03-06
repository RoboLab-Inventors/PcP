import React, { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import CustomButton from "../CustomButton/CustomButton";
import { BASE_URL } from "../../constants";
import { ConfStringContext } from "../ToolGrid/EditComponent/ConfStringContext";
import PopUp from "../PopUp/PopUp";

const ResponsiveBottomDrawer = () => {
  const [isFullOpen, setIsFullOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { confString } = useContext(ConfStringContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
    console.log("Modal aperto");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDrawer = () => {
    setIsFullOpen(!isFullOpen);
  };

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

  const exportConfiguration = async () => {
    openModal();
    // const response = await fetch(`${BASE_URL}/exportConfiguration`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    //   body: JSON.stringify({
    //     email: localStorage.getItem("email"),
    //     nome: title,
    //     descrizione: description,
    //     stato: "Pubblico",
    //     configurazione: confString,
    //     username: localStorage.getItem("username"),
    //   }),
    // });

    // if (response.ok) {
    //   const blob = await response.blob();
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = `${localStorage.getItem("username")}_config.txt`;
    //   document.body.appendChild(a);
    //   a.click();
    //   a.remove();
    // } else {
    //   console.error("Errore durante il download della configurazione");
    // }
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
          onConfirm={exportConfiguration}
          confirmLabel="Esporta"
          setTitle={setTitle}
          setDescription={setDescription}
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
              onClick={isFullOpen ? exportConfiguration : undefined}
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