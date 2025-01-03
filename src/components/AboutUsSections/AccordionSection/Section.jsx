import React, { useEffect, useRef, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "./Section.css";
import RoboLabLogo from "../../../assets/images/RoboLabLogo.png";
import RoboLabWall from "../../../assets/images/RoboLabWall1.jpg";
import Controller from "../../../assets/images/Controller1.png";
import ControllerWall from "../../../assets/images/ControllerWall4.jpg";


const smoothScrollTo = (target, duration = 1500) => {
  if (!target) return;
  const start = window.scrollY;
  const end = target.offsetTop;
  const distance = end - start;
  let startTime = null;

  const step = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easeInOutQuad =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;
    window.scrollTo(0, start + distance * easeInOutQuad);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const Section = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel, cardIndex) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded) {
      const targetCard = cardsRef.current[cardIndex];
      smoothScrollTo(targetCard);
    }
  };

  const cardsRef = useRef([]);

  const accordionStyle = {
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '1px dotted var(--fontColor)',
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardsRef.current.indexOf(entry.target);
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            setExpanded(`panel${index + 1}`);
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.6 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="grid-container">
      <div className="left-div">
        {[RoboLabWall, ControllerWall].map((image, index) => (
          <div
            className="card"
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="wrapper">
              <img src={image} className="cover-image" />
            </div>
            <img
              src={index === 0 ? RoboLabLogo : Controller}
              className="character"
            />
          </div>
        ))}
      </div>
        <div className="right-div">
          <div className="accordion-container">
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1", 0)}
              sx={accordionStyle}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h3" color="fontColor.main">Cos'è PCP?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="fontColor.main">
                  PCP (Prototype Controller Profiler) è uno strumento potente e
                  versatile che permette agli utenti di mappare in modo
                  personalizzato i tasti di vari controller (da gioco, cloche di
                  aviazione, joystick e altro) per adattarli a qualunque tipo di
                  output. Grazie alla sua interfaccia web intuitiva, è possibile
                  configurare ogni singolo tasto, adattando l'input a scenari di
                  utilizzo completamente diversi, dal controllo di dispositivi
                  elettronici alla creazione di esperimentazioni interattive.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2", 1)}
              sx={accordionStyle}
            >
              <AccordionSummary
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography variant="h3" color="fontColor.main">Cos'è il RoboLab?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="fontColor.main">
                  Siamo un team di appassionati di robotica che si impegna a
                  formare e guidare gli studenti nel loro percorso di
                  apprendimento nel campo della robotica. Offriamo supporto
                  pratico e teorico attraverso attività e progetti hands-on,
                  stimolando la creatività e il potenziale degli studenti. Il
                  nostro obiettivo è fornire loro le competenze necessarie per
                  affrontare sfide innovative e favorire la loro partecipazione
                  a eventi come gare e hackathon. Il nostro laboratorio è uno
                  spazio di crescita e sperimentazione, dove ogni studente può
                  sviluppare le proprie idee e progetti sotto la supervisione di
                  esperti.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              sx={accordionStyle}
            >
              <AccordionSummary
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography variant="h3" color="fontColor.main">Chi Siamo?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="fontColor.main">
                  Il progetto del sito web PcP, spinoff del RoboLab
                  dell'Università degli studi di Bari “Aldo Moro” ha come
                  obiettivo fornire l'accesso ad un software universale di
                  interfaccia tra dispositivi di input fisici (come joystick,
                  cloche d'aviazione, controller di gioco, ecc.) ed il controllo
                  di microprocessori programmabili, robot compatibili. Il
                  sistema consente la configurazione e mappatura dei comandi da
                  diversi controller, rendendoli interpretabili da piattaforme
                  robotiche compatibili. Questo approccio permette di
                  standardizzare la gestione dei comandi, rendendo possibile il
                  controllo di un ampio ventaglio di microprocessori
                  programmabili mediante dispositivi di input differenti.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section;
