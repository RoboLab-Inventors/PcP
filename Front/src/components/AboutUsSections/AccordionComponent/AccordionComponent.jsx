/**
 * Componente AccordionComponent
 *
 * Questo componente visualizza una serie di sezioni a fisarmonica (accordion) che possono essere espanse o compresse.
 *
 * @component
 * @param {Object} props - Le proprietà passate al componente.
 * @param {number} props.accordionIndex - L'indice della sezione dell'accordion che dovrebbe essere espansa inizialmente.
 *
 * @returns {JSX.Element} Il componente AccordionComponent.
 *
 * @example
 * <AccordionComponent accordionIndex={0} />
 *
 * @description
 * Il componente utilizza lo stato `expanded` per gestire quale sezione dell'accordion è attualmente espansa.
 * Quando una sezione viene cliccata, la funzione `handleAccordionClick` viene chiamata per gestire lo scroll
 * verso la sezione specifica. Se l'indice della sezione è 2, viene eseguito uno scroll aggiuntivo verso un
 * elemento con la classe `carousel-div`.
 */
import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "./AccordionComponent.css";
import PropTypes from "prop-types";

const accordionStyle = {
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "1px dotted var(--fontColor)",
  color: "var(--fontColor)",
};

const AccordionComponent = ({ accordionIndex }) => {
  const [expanded, setExpanded] = useState(false);

  /**
   * Gestisce il click sull'accordion.
   * Scorre la vista fino alla card selezionata e, se l'indice è 2, scorre anche fino alla div del carosello.
   *
   * @param {number} index - L'indice della card selezionata.
   */
  const handleAccordionClick = (index) => {
    const card = document.querySelector(`.card:nth-child(${index + 1})`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth" });
    }
    if (index === 2) {
      const carouselDiv = document.querySelector(".carousel-div");
      if (carouselDiv) {
        carouselDiv.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Espande l'accordion quando l'indice cambia
  useEffect(() => {
    setExpanded(accordionIndex !== null);
  }, [accordionIndex]);

  return (
    <div className="accordion-container">
      <Accordion
        expanded={expanded && accordionIndex === 0}
        onChange={(event, isExpanded) => setExpanded(isExpanded)}
        sx={accordionStyle}
      >
        <AccordionSummary onClick={() => handleAccordionClick(0)}>
          <Typography variant="h3">Cos&apos;è PCP?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            PCP (Prototype Controller Profiler) è uno strumento potente e
            versatile che permette agli utenti di mappare in modo personalizzato
            i tasti di vari controller (da gioco, cloche di aviazione, joystick
            e altro) per adattarli a qualunque tipo di output. Grazie alla sua
            interfaccia web intuitiva, è possibile configurare ogni singolo
            tasto, adattando l&apos;input a scenari di utilizzo completamente
            diversi, dal controllo di dispositivi elettronici alla creazione di
            esperimentazioni interattive.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded && accordionIndex === 1}
        onChange={(event, isExpanded) => setExpanded(isExpanded)}
        sx={accordionStyle}
      >
        <AccordionSummary onClick={() => handleAccordionClick(1)}>
          <Typography variant="h3">Cos&apos;è il RoboLab?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Siamo un team di appassionati di robotica che si impegna a formare e
            guidare gli studenti nel loro percorso di apprendimento nel campo
            della robotica. Offriamo supporto pratico e teorico attraverso
            attività e progetti hands-on, stimolando la creatività e il
            potenziale degli studenti. Il nostro obiettivo è fornire loro le
            competenze necessarie per affrontare sfide innovative e favorire la
            loro partecipazione a eventi come gare e hackathon. Il nostro
            laboratorio è uno spazio di crescita e sperimentazione, dove ogni
            studente può sviluppare le proprie idee e progetti sotto la
            supervisione di esperti.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded && accordionIndex === 2}
        onChange={(event, isExpanded) => setExpanded(isExpanded)}
        sx={accordionStyle}
      >
        <AccordionSummary onClick={() => handleAccordionClick(2)}>
          <Typography variant="h3">Chi Siamo?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Il progetto del sito web PcP, spinoff del RoboLab
            dell&apos;Università degli studi di Bari “Aldo Moro” ha come
            obiettivo fornire l&apos;accesso ad un software universale di
            interfaccia tra dispositivi di input fisici (come joystick, cloche
            d&apos;aviazione, controller di gioco, ecc.) ed il controllo di
            microprocessori programmabili, robot compatibili. Il sistema
            consente la configurazione e mappatura dei comandi da diversi
            controller, rendendoli interpretabili da piattaforme robotiche
            compatibili. Questo approccio permette di standardizzare la gestione
            dei comandi, rendendo possibile il controllo di un ampio ventaglio
            di microprocessori programmabili mediante dispositivi di input
            differenti.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
AccordionComponent.propTypes = {
  accordionIndex: PropTypes.number.isRequired,
};

export default AccordionComponent;
