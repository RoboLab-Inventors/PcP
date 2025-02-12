import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

function LessonViewer() {
  const [lessons, setLessons] = useState([]); // Holds the fetched lessons
  const [selectedLesson, setSelectedLesson] = useState(null); // Tracks the selected lesson

  // Fetch lessons on component mount
  useEffect(() => {
    fetch("/lessons.json") // Assuming lessons.json is in the public folder
      .then((response) => response.json())
      .then((data) => {
        setLessons(data);
        setSelectedLesson(data[0]); // Select the first lesson by default
      })
      .catch((error) => console.error("Error fetching lessons:", error));
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
      <Grid item xs={4} sx={{ borderRight: "1px solid #ccc" }}>
        <List>
          {lessons.map((lesson, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => setSelectedLesson(lesson)}>
                <ListItemText primary={lesson.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>

      {/* Content Area */}
      <Grid
        item
        xs={8}
        sx={{ padding: 2, overflow: "auto", maxHeight: "calc(100vh - 134px)" }}
      >
        {selectedLesson ? (
          <>
            <Typography variant="h4" gutterBottom>
              {selectedLesson.title}
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              {selectedLesson.lesson}
            </Typography>
          </>
        ) : (
          <Typography variant="h6">Select a lesson to view details.</Typography>
        )}
      </Grid>
    </Box>
  );
}

export default LessonViewer;
