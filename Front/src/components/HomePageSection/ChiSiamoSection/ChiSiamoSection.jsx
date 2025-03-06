/**
 * Componente ChiSiamoSection.
 * 
 * Questo componente rappresenta una sezione della homepage che descrive il progetto PcP,
 * uno spinoff del RoboLab dell'Università degli studi di Bari “Aldo Moro”.
 * 
 * @component
 * @returns {JSX.Element} La sezione ChiSiamo con un'immagine e una descrizione del progetto.
 * 
 * @example
 * return (
 *   <ChiSiamoSection />
 * )
 */
import { Typography } from "@mui/material";
import "./ChiSiamoSection.css";
import RoboLabLogo from "../../../assets/images/RoboLabLogo.png";
import RoboLabWall from "../../../assets/images/RoboLabWall1.jpg";
import CardComponent from "../../AboutUsViewer/DesktopViewer/CardComponent/CardComponent";

const ChiSiamoSection = () => {
  return (
    <div className="chiSiamoContainer">
      <div className="ChiSiamoImage">
        <CardComponent coverImage={RoboLabWall} characterImage={RoboLabLogo} />
      </div>
      <div className="chiSiamoText">
        <Typography variant="h2" color="white" className="chiSiamoTitle">
          PCP è uno spinoff RoboLab
        </Typography>
        <Typography variant="p" className="chiSiamoDescription">
          Il progetto del sito web PcP, spinoff del RoboLab dell&apos;Università
          degli studi di Bari “Aldo Moro” ha come obiettivo fornire
          l&apos;accesso ad un software universale di interfaccia tra
          dispositivi di input fisici (come joystick, cloche d’aviazione,
          controller di gioco, ecc.) ed il controllo di microprocessori
          programmabili, robot compatibili. Il sistema consente la
          configurazione e mappatura dei comandi da diversi controller,
          rendendoli interpretabili da piattaforme robotiche compatibili. Questo
          approccio permette di standardizzare la gestione dei comandi, rendendo
          possibile il controllo di un ampio ventaglio di microprocessori
          programmabili mediante dispositivi di input differenti.
        </Typography>
      </div>
    </div>
  );
};

export default ChiSiamoSection;
