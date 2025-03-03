/**
 * Componente principale per visualizzare le lezioni.
 * Utilizza gli hook `useState` e `useEffect` per gestire lo stato e recuperare i dati dal server.
 *
 * @component
 * @returns {JSX.Element} Il componente LessonViewer.
 */
import { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Grid2,
} from "@mui/material";
import { BASE_URL } from "../../constants";

function LessonViewer() {
  const [lessons, setLessons] = useState([]); // Holds the fetched lessons
  const [selectedLesson, setSelectedLesson] = useState(null); // Tracks the selected lesson

  useEffect(() => {
    const fetchLessons = async () => {
      /**
     * Funzione asincrona per recuperare le lezioni dal server.
     * Effettua una richiesta GET all'endpoint `${BASE_URL}/lesson` e aggiorna lo stato con i dati ricevuti.
     * Seleziona la prima lezione per impostazione predefinita.
     * 
     * @async
     * @function fetchLessons
     * @throws {Error} Se si verifica un errore durante il recupero delle lezioni.
     */
      try {
        const response = await fetch(`${BASE_URL}/lesson`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setLessons(data);
        setSelectedLesson(data[0]); // Select the first lesson by default
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "calc(100vh - 134px)", 
      }}
    >
      {/* Sidebar */}
      <Grid2 xs={4} sx={{ borderRight: "1px solid #ccc" }}>
        <List>
          {lessons.map((lesson, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => setSelectedLesson(lesson)}>
                <ListItemText primary={lesson.nomeLezione} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid2>

      {/* Content Area */}
      <Grid2
        xs={8}
        sx={{ padding: 2, overflow: "auto", maxHeight: "calc(100vh - 134px)" }}
      >
        {selectedLesson ? (
          <>
            <Typography variant="h4" gutterBottom>
              {selectedLesson.nomeLezione}
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              {selectedLesson.testoLezione}
            </Typography>
          </>
        ) : (
          <Typography variant="h6">Select a lesson to view details.</Typography>
        )}
      </Grid2>
    </Box>
  );
}

export default LessonViewer;
