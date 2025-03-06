/**
 * Componente ExplanationSection.
 * 
 * Questo componente visualizza una sezione di spiegazione con un video, un testo descrittivo e un link ai termini e servizi.
 * 
 * @component
 * @returns {JSX.Element} Il componente ExplanationSection.
 * 
 * @example
 * return (
 *   <ExplanationSection />
 * )
 * 
 * @typedef {Object} PopUpTerminiServiziProps
 * @property {boolean} open - Stato di apertura del popup.
 * @property {string} title - Titolo del popup.
 * @property {string} description - Descrizione del popup.
 * @property {function} onClose - Funzione per chiudere il popup.
 * 
 * @typedef {Object} TypographyProps
 * @property {string} variant - Variante del componente Typography.
 * @property {string} color - Colore del testo.
 * @property {string} className - Classe CSS del componente.
 */
import { useState } from "react";
import { Typography } from "@mui/material";
import PopUpTerminiServizi from "../../PopUp/PopUpTerminiServizi";
import "./ExplanationSection.css";

const ExplanationSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <PopUpTerminiServizi
  open={isModalOpen}
  title="Termini e Servizi"
  description={`Termini di Utilizzo: PCP Website
Ultimo aggiornamento: 05/03/25
Benvenuto su PCP. L&aposaccesso e l&aposutilizzo del nostro Servizio sono regolati dai seguenti Termini di Utilizzo. Utilizzando il Sito, accetti integralmente questi Termini. Se non sei d'accordo con una qualsiasi parte, ti invitiamo a non utilizzare il Servizio.
1. Accesso e Utilizzo del Servizio
1.1 Il Servizio è offerto gratuitamente agli utenti individuali per uso personale. 
1.2 L&aposuso da parte di aziende, enti pubblici, scuole e altre organizzazioni (di seguito "Utenti Enterprise") richiede l'acquisto di una licenza specifica. 
1.3 Il Servizio non può essere utilizzato per scopi illeciti o non autorizzati. 
1.4 Ci riserviamo il diritto di sospendere o terminare l&aposaccesso al Servizio a chiunque violi questi Termini.
2. Licenza per Utenti Enterprise
2.1 Gli Utenti Enterprise devono acquistare una licenza prima di utilizzare il Servizio per scopi professionali, didattici o istituzionali. 
2.2 Le condizioni della licenza, inclusi costi e durata, sono specificate separatamente nel contratto di licenza. 
2.3 Qualsiasi utilizzo non autorizzato da parte di un Utente Enterprise può comportare la sospensione o il blocco dell&aposaccount e eventuali azioni legali.
3. Proprietà Intellettuale
3.1 Tutti i contenuti, i marchi e i materiali presenti sul Sito sono di proprietà di PCP o dei rispettivi titolari. 
3.2 Non è consentito copiare, modificare, distribuire o utilizzare i contenuti senza autorizzazione scritta.
4. Cessione dei Diritti sui Contenuti
4.1 Utilizzando il Servizio, l'utente accetta di cedere irrevocabilmente e integralmente a PCP tutti i diritti, titoli e interessi relativi a qualsiasi contenuto, materiale, idea o produzione creati, caricati o generati attraverso l&aposuso del Sito. 
4.2 L'utente rinuncia a qualsiasi diritto morale, economico o di altra natura sui contenuti prodotti, consentendo a PCP di utilizzarli, modificarli, distribuirli e sfruttarli senza alcuna limitazione o compensazione.
5. Limitazione di Responsabilità
5.1 Il Servizio è fornito "così com'è" senza garanzie di alcun tipo. 
5.2 Non siamo responsabili per eventuali danni derivanti dall&aposuso o dall&aposimpossibilità di utilizzare il Servizio. 
5.3 Ci riserviamo il diritto di modificare, sospendere o interrompere il Servizio in qualsiasi momento senza preavviso.
6. Modifiche ai Termini
6.1 Possiamo aggiornare questi Termini in qualsiasi momento. Gli utenti saranno informati delle modifiche attraverso il Sito. 
6.2 L'uso continuato del Servizio dopo eventuali modifiche implica l&aposaccettazione delle nuove condizioni.`}
  onClose={closeModal}
/>

      <div className="homeSeparator"></div>
      <div className="explanationContainer">
        <div className="explanationVideo">
          <div className="videoCard">
            <div className="videoWrapper">
              <iframe
                src="https://www.youtube.com/embed/Dmin_DHbTRo"
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
            className="terminiServiziTitle"
            onClick={openModal}
          >
            Termini e Servizi
          </Typography>
        </div>
      </div>
    </>
  );
};

export default ExplanationSection;
