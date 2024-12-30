import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Section.css";

const Section = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div className="grid-container">
        <div className="left-div">
          {/* Contenuto del div di sinistra */}
          <h1>Contenuto Principale</h1>
          <p>Questo è il contenuto principale a sinistra.</p>
        </div>
        <div className="right-div"></div>
      </div>
      <div className="accordion-container">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Cos'è PCP ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            PCP (Prototype Controller Profiler) è uno strumento potente e versatile che permette agli utenti di mappare in modo personalizzato i tasti di vari controller (da gioco, cloche di aviazione, joystick e altro) per adattarli a qualunque tipo di output. Grazie alla sua interfaccia web intuitiva, è possibile configurare ogni singolo tasto, adattando l'input a scenari di utilizzo completamente diversi, dal controllo di dispositivi elettronici alla creazione di esperimentazioni interattive.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Cos'è il RoboLab ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Siamo un team di appassionati di robotica che si impegna a formare e guidare gli studenti nel loro percorso di apprendimento nel campo della robotica. Offriamo supporto pratico e teorico attraverso attività e progetti hands-on, stimolando la creatività e il potenziale degli studenti. Il nostro obiettivo è fornire loro le competenze necessarie per affrontare sfide innovative e favorire la loro partecipazione a eventi come gare e hackathon. Il nostro laboratorio è uno spazio di crescita e sperimentazione, dove ogni studente può sviluppare le proprie idee e progetti sotto la supervisione di esperti.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Chi Siamo ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Il progetto del sito web PcP, spinoff del RoboLab dell'Università degli studi di Bari “Aldo Moro” ha come obiettivo fornire l’accesso ad un software universale di interfaccia tra dispositivi di input fisici (come joystick, cloche d’aviazione, controller di gioco, ecc.) ed il controllo di microprocessori programmabili, robot compatibili. Il sistema consente la configurazione e mappatura dei comandi da diversi controller, rendendoli interpretabili da piattaforme robotiche compatibili. Questo approccio permette di standardizzare la gestione dei comandi, rendendo possibile il controllo di un ampio ventaglio di microprocessori programmabili mediante dispositivi di input differenti.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default Section;
