import './MobileSectionComponent.css';
import CardComponent from '../../DesktopViewer/CardComponent/CardComponent';
import {Typography, Divider} from "@mui/material";
import RoboLabLogo from "../../../../assets/images/RoboLabLogo.png";
import RoboLabWall from "../../../../assets/images/RoboLabWall1.jpg";
import Controller from "../../../../assets/images/Controller1.png";
import ControllerWall from "../../../../assets/images/ControllerWall4.jpg";

const MobileSectionComponent = () => {
    return (
        <div className="section-container">
            <div className="section-image">
                <CardComponent coverImage={RoboLabWall} characterImage={RoboLabLogo} />
            </div>
            <div className = "section-description">
                <div className = "section-description-content">
                    <Typography variant="h1">Cos'è PCP?</Typography>
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
            <Divider variant="middle" color="var(--primary-color-main)" width="10px"/>
            <div className="section-image">
                <CardComponent coverImage={ControllerWall} characterImage={Controller} />
            </div>
            <div className = "section-description">
                <Typography variant="h1">Cos'è PCP?</Typography>
                <Typography className="section-content">
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
    );
};

export default MobileSectionComponent;