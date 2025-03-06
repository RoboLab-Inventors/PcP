import { Typography } from "@mui/material";
import "./ExplanationSection.css";

const ExplanationSection = () => {
  return (
    <>
      <div className="homeSeparator"></div>
      <div className="explanationContainer">
        <div className="explanationVideo">
          <div className="videoCard">
            <div className="videoWrapper">
              <iframe
                src="https://www.youtube.com/embed/Sagg08DrO5U?si=RJtQZOYknxbU5zGF"
                title="PCP Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ cursor: "none" }}
              ></iframe>
            </div>
          </div>
        </div>
        <div className="explanationText">
          <Typography variant="h2" color="white" className="explanationTitle">
            Cosa offre PCP?
          </Typography>
          <Typography variant="p" className="explanationDescription">
            Il software è pensato per garantire un&apos;esperienza di
            configurazione “plug-and-play” e generare un file di configurazione
            standard. Questo file verrà poi utilizzato dal sistema per
            interpretare i comandi di controllo in tempo reale, a patto che il
            dispositivo sia compatibile. La connessione online permette di
            esportare ed importare i file di configurazione e di ricercare nello
            spazio community configurazioni fatte da altri utenti.
          </Typography>
        </div>
        <div className="terminiServiziContainer">
          <Typography
            variant="p"
            className="terminiServiziTitle" /*onClick={}*/
          >
            Termini e Servizi
          </Typography>
        </div>
      </div>
    </>
  );
};

export default ExplanationSection;
