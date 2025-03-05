import { useEffect, useState, useRef } from "react";
import './MobileSectionComponent.css';
import CardComponent from '../../DesktopViewer/CardComponent/CardComponent';
import Carousel from '../../DesktopViewer/Carousel/Carousel';
import Typography from "@mui/material/Typography";
import RoboLabLogo from "../../../../assets/images/RoboLabLogo.png";
import RoboLabWall from "../../../../assets/images/RoboLabWall1.jpg";
import Controller from "../../../../assets/images/Controller1.png";
import ControllerWall from "../../../../assets/images/ControllerWall4.jpg";

const MobileSectionComponent = () => {
    const [visibleSections, setVisibleSections] = useState({});
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                let newVisibleSections = { ...visibleSections };
    
                entries.forEach((entry) => {
                    const index = entry.target.getAttribute("data-index");
    
                    if (entry.isIntersecting) {
                        newVisibleSections[index] = true;
                    }
                });
    
                setVisibleSections(newVisibleSections);
            },
            { threshold: 0.5 }
        );
    
        sectionRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });
    
        return () => observer.disconnect();
    }, [visibleSections]);
    
    // Reset solo se si esce dal viewport dall'alto
    useEffect(() => {
        const handleScroll = () => {
            if (sectionRefs.current.length > 0) {
                const firstSection = sectionRefs.current[0];
                const rect = firstSection.getBoundingClientRect();
    
                if (rect.top > window.innerHeight) {
                    setVisibleSections({});
                }
            }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="sections-container">
            <div className = "container-section-image">
                <div className="section-image">
                    <CardComponent coverImage={ControllerWall} characterImage={Controller} />
                </div>
            </div>
            <div
                className={`section-description ${visibleSections[0] ? "visible" : ""}`}
                data-index="0"
                ref={(el) => (sectionRefs.current[0] = el)}
            >
                <div className = "section-description-content">
                    <Typography variant="h1">Cos&apos;è PCP?</Typography>
                    <Typography variant="h6" className="section-content">
                        PCP (Prototype Controller Profiler) è uno strumento potente e
                        versatile che permette agli utenti di mappare in modo personalizzato
                        i tasti di vari controller (da gioco, cloche di aviazione, joystick
                        e altro) per adattarli a qualunque tipo di output. Grazie alla sua
                        interfaccia web intuitiva, è possibile configurare ogni singolo
                        tasto, adattando l'input a scenari di utilizzo completamente
                        diversi, dal controllo di dispositivi elettronici alla creazione di
                        esperimentazioni interattive.
                    </Typography>
                </div>
            </div>
            <div className = "container-section-image">
                <div className="section-image">
                    <CardComponent coverImage={RoboLabWall} characterImage={RoboLabLogo} />
                </div>
            </div>
            <div
                className={`section-description ${visibleSections[1] ? "visible" : ""}`}
                data-index="1"
                ref={(el) => (sectionRefs.current[1] = el)}
            >
                <div className = "section-description-content">
                    <Typography variant="h1">Cos&apos;è il RoboLab?</Typography>
                    <Typography className="section-content">
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
                </div>
            </div>
            <div className="container-section-carousel">
                <div className="section-carousel">
                    <Carousel />
                </div>
            </div>
            <div
                className={`section-description ${visibleSections[2] ? "visible" : ""}`}
                data-index="2"
                ref={(el) => (sectionRefs.current[2] = el)}
            >
                <div className = "section-description-content">
                    <Typography variant="h1">Chi siamo?</Typography>
                    <Typography className="section-content">
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
                </div>
            </div>
        </div>
    );
};

export default MobileSectionComponent;