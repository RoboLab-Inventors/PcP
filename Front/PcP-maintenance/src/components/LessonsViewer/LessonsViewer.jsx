import { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Grid2
} from "@mui/material";
import { BASE_URL } from "../../constants";

function LessonViewer() {
  const [lessons, setLessons] = useState([]); // Holds the fetched lessons
  const [selectedLesson, setSelectedLesson] = useState(null); // Tracks the selected lesson

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(`${BASE_URL}/lesson`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
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
        position: "fixed", // Fix the position
        bottom: 0, // Align to the bottom of the viewport
        left: 0, // Align to the left of the viewport
        width: "100%", // Full width
        height: "calc(100vh - 134px)", // Adjust height as needed
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