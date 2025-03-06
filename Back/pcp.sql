-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mar 05, 2025 alle 21:21
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pcp`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `admins`
--

CREATE TABLE `admins` (
  `idAdmin` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `admins`
--

INSERT INTO `admins` (`idAdmin`, `email`, `username`, `password`) VALUES
(1, 'Flyne@gmail.com', 'Flyne', 'Flyne'),
(2, 'admin2@email.com', 'adminPro', 'strongPass');

-- --------------------------------------------------------

--
-- Struttura della tabella `configurazioni`
--

CREATE TABLE `configurazioni` (
  `idConfigurazione` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `descrizione` varchar(100) DEFAULT NULL,
  `dataPubblicazione` date DEFAULT NULL,
  `stato` varchar(50) DEFAULT NULL,
  `configurazione` varchar(2000) DEFAULT NULL,
  `dataCreazione` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `configurazioni`
--

INSERT INTO `configurazioni` (`idConfigurazione`, `email`, `nome`, `descrizione`, `dataPubblicazione`, `stato`, `configurazione`, `dataCreazione`) VALUES
(1, 'mauro.wahu@gmail.com', 'Controller Palle', 'Questo controller testa le palle di una persona', '2025-02-11', 'Pubblico', '{\n  \"buttonCross\": \"cross\",\n  \"buttonCircle\": \"cir', '2025-02-11'),
(3, 'mauro.wahu@gmail.com', 'Controller Test', 'Regola la precisione del motore', '2025-02-21', 'Pubblico', '{\"buttonCross\": \"cross\", \"buttonCircle\": \"circle\"}', '2025-02-21'),
(4, 'anna.verdi@email.com', 'Speed Controller', 'Modula la velocità di un motore DC', '2025-02-20', 'Privato', '{\"speedMax\": \"100%\", \"speedMin\": \"10%\"}', '2025-02-20'),
(5, 'integrale@gmail.com', 'Power Manager', 'Gestisce il consumo energetico del dispositivo', '2025-02-19', 'Pubblico', '{\"powerMode\": \"eco\", \"voltage\": \"12V\"}', '2025-02-19'),
(6, 'integralessss@gmail.com', 'Sensor Hub', 'Collega e gestisce più sensori', '2025-02-18', 'Privato', '{\"sensorCount\": 4, \"activeSensors\": [\"temp\", \"humidity\"]}', '2025-02-18'),
(7, 'mauro.wahu@gmail.com', 'Adaptive Controller', 'Adatta le prestazioni in base all\'uso', '2025-02-17', 'Pubblico', '{\"adaptMode\": \"dynamic\", \"learningRate\": \"0.05\"}', '2025-02-17'),
(8, 'anna.verdi@email.com', 'Security Manager', 'Gestisce la sicurezza del sistema', '2025-02-16', 'Privato', '{\"encryption\": \"AES-256\", \"auth\": \"2FA\"}', '2025-02-16'),
(9, 'integrale@gmail.com', 'Battery Optimizer', 'Ottimizza il consumo della batteria', '2025-02-15', 'Pubblico', '{\"batterySave\": \"on\", \"chargeLimit\": \"80%\"}', '2025-02-15'),
(10, 'integralessss@gmail.com', 'Wireless Controller', 'Gestisce le connessioni wireless', '2025-02-14', 'Privato', '{\"wifi\": \"enabled\", \"bluetooth\": \"off\"}', '2025-02-14'),
(11, 'mauro.wahu@gmail.com', 'Load Balancer', 'Distribuisce il carico tra dispositivi', '2025-02-13', 'Pubblico', '{\"loadMode\": \"balanced\", \"maxLoad\": \"80%\"}', '2025-02-13'),
(12, 'anna.verdi@email.com', 'Access Controller', 'Regola gli accessi al sistema', '2025-02-12', 'Privato', '{\"accessLevel\": \"admin\", \"authMethod\": \"biometric\"}', '2025-02-12'),
(13, 'integrale@gmail.com', 'Energy Saver', 'Riduce il consumo energetico', '2025-02-11', 'Pubblico', '{\"saveMode\": \"auto\", \"sleepTime\": \"5min\"}', '2025-02-11'),
(14, 'integralessss@gmail.com', 'Remote Manager', 'Controlla il sistema da remoto', '2025-02-10', 'Privato', '{\"remoteAccess\": \"enabled\", \"vpn\": \"required\"}', '2025-02-10'),
(15, 'mauro.wahu@gmail.com', 'Data Logger', 'Registra i dati di sistema', '2025-02-09', 'Pubblico', '{\"logInterval\": \"10s\", \"maxSize\": \"5MB\"}', '2025-02-09'),
(16, 'anna.verdi@email.com', 'Event Notifier', 'Invia notifiche sugli eventi', '2025-02-08', 'Privato', '{\"notifyMethod\": \"email\", \"threshold\": \"5\"}', '2025-02-08'),
(17, 'integrale@gmail.com', 'System Monitor', 'Monitora le performance del sistema', '2025-02-07', 'Pubblico', '{\"monitorInterval\": \"30s\", \"alert\": \"true\"}', '2025-02-07'),
(18, 'integralessss@gmail.com', 'Firmware Updater', 'Aggiorna il firmware dei dispositivi', '2025-02-06', 'Privato', '{\"autoUpdate\": \"false\", \"version\": \"v1.0.3\"}', '2025-02-06'),
(19, 'mauro.wahu@gmail.com', 'Network Analyzer', 'Analizza il traffico di rete', '2025-02-05', 'Pubblico', '{\"protocol\": \"TCP/IP\", \"sampleRate\": \"1s\"}', '2025-02-05'),
(20, 'anna.verdi@email.com', 'Latency Checker', 'Verifica i tempi di risposta', '2025-02-04', 'Privato', '{\"maxLatency\": \"200ms\", \"minLatency\": \"50ms\"}', '2025-02-04'),
(21, 'integrale@gmail.com', 'Temperature Sensor', 'Monitora la temperatura ambiente', '2025-02-03', 'Pubblico', '{\"sensorType\": \"thermistor\", \"range\": \"0-100C\"}', '2025-02-03'),
(22, 'integralessss@gmail.com', 'Humidity Sensor', 'Monitora l\'umidità ambiente', '2025-02-02', 'Privato', '{\"sensorType\": \"capacitive\", \"range\": \"0-100%\"}', '2025-02-02'),
(23, 'mauro.wahu@gmail.com', 'Pressure Monitor', 'Monitora la pressione del sistema', '2025-02-01', 'Pubblico', '{\"pressureUnit\": \"bar\", \"maxPressure\": \"5\"}', '2025-02-01'),
(24, 'anna.verdi@email.com', 'Voltage Regulator', 'Stabilizza la tensione in ingresso', '2025-01-31', 'Privato', '{\"regulation\": \"automatic\", \"targetVoltage\": \"5V\"}', '2025-01-31'),
(25, 'integrale@gmail.com', 'Current Monitor', 'Controlla il flusso di corrente', '2025-01-30', 'Pubblico', '{\"currentThreshold\": \"3A\", \"alert\": \"true\"}', '2025-01-30'),
(26, 'integralessss@gmail.com', 'Signal Processor', 'Elabora i segnali in ingresso', '2025-01-29', 'Privato', '{\"filterType\": \"low-pass\", \"cutoffFrequency\": \"50Hz\"}', '2025-01-29'),
(27, 'mauro.wahu@gmail.com', 'Data Encryptor', 'Cripta i dati sensibili', '2025-01-28', 'Pubblico', '{\"encryption\": \"RSA\", \"keyLength\": \"2048\"}', '2025-01-28'),
(28, 'anna.verdi@email.com', 'Backup Manager', 'Gestisce i backup del sistema', '2025-01-27', 'Privato', '{\"backupFrequency\": \"daily\", \"storage\": \"cloud\"}', '2025-01-27'),
(29, 'integrale@gmail.com', 'Log Analyzer', 'Analizza i log di sistema', '2025-01-26', 'Pubblico', '{\"logLevel\": \"verbose\", \"retention\": \"30d\"}', '2025-01-26'),
(30, 'integralessss@gmail.com', 'Update Scheduler', 'Pianifica gli aggiornamenti di sistema', '2025-01-25', 'Privato', '{\"schedule\": \"weekly\", \"time\": \"03:00\"}', '2025-01-25'),
(31, 'mauro.wahu@gmail.com', 'Resource Allocator', 'Ottimizza l\'uso delle risorse', '2025-01-24', 'Pubblico', '{\"allocation\": \"dynamic\", \"maxResources\": \"80%\"}', '2025-01-24'),
(32, 'anna.verdi@email.com', 'Performance Tracker', 'Monitora le performance in tempo reale', '2025-01-23', 'Privato', '{\"trackingInterval\": \"1min\", \"report\": \"enabled\"}', '2025-01-23');

-- --------------------------------------------------------

--
-- Struttura della tabella `databasechat`
--

CREATE TABLE `databasechat` (
  `id` int(11) NOT NULL,
  `message` varchar(500) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `lezioni`
--

CREATE TABLE `lezioni` (
  `id` int(11) NOT NULL,
  `testoLezione` varchar(5000) DEFAULT NULL,
  `nomeLezione` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `lezioni`
--

INSERT INTO `lezioni` (`id`, `testoLezione`, `nomeLezione`) VALUES
(1, 'L’ESP32 è uno dei microcontrollori più potenti e flessibili disponibili sul mercato, ampiamente utilizzato in ambiti come l’Internet delle cose (IoT), l’automazione e la robotica. Prima di iniziare a lavorare con ESP32, è importante familiarizzare con le sue caratteristiche tecniche e le sue potenzialità. Questo dispositivo è dotato di un microprocessore dual-core, Wi-Fi e Bluetooth integrati, e numerosi pin di input/output che lo rendono ideale per progetti complessi e interattivi.\n\nPer cominciare, è necessario installare un ambiente di sviluppo adeguato, come l’Arduino IDE o PlatformIO, entrambi supportati da ESP32. PcP facilita questo processo fornendo una guida dettagliata per la configurazione iniziale, includendo i driver necessari e i file di configurazione del firmware. Dopo aver completato l’installazione, gli utenti possono utilizzare PcP per caricare rapidamente sketch o script sul microcontrollore senza dover affrontare la complessità della scrittura manuale del codice.\n\nUn’altra caratteristica chiave è la capacità di utilizzare librerie predefinite per ESP32 direttamente tramite PcP, semplificando l\'integrazione di funzionalità avanzate come la connessione Wi-Fi o la gestione di sensori. Gli utenti potranno esplorare tutorial dettagliati e progetti dimostrativi per apprendere come creare reti locali, interfacce web o sistemi di controllo remoto. PcP rende l’apprendimento delle basi dell’ESP32 un processo progressivo e accessibile, garantendo che anche i principianti possano ottenere risultati in poco tempo.\n', 'Imparare le basi per ESP32\n'),
(2, 'Il collegamento di un controller all’ESP32 è un processo fondamentale per creare sistemi interattivi che consentano un controllo preciso e personalizzato dei dispositivi robotici o elettronici. PcP semplifica enormemente questo processo, eliminando la necessità di scrivere codice complesso per gestire la comunicazione tra il controller e l’ESP32.\n\nUna volta collegato l’ESP32 al computer tramite PcP, il software identifica automaticamente i controller disponibili, come joystick, gamepad, tastiere o altri dispositivi di input. La piattaforma offre una mappatura visiva intuitiva, che consente di associare ogni pulsante, levetta o comando del controller a specifiche funzioni. Per esempio, è possibile assegnare un pulsante per avviare un motore, una levetta per controllare la direzione di un robot o un’azione per regolare la luminosità di un LED.\n\nOltre alla configurazione base, PcP offre opzioni avanzate per calibrare la sensibilità dei comandi, impostare soglie di risposta e testare i segnali in tempo reale. Gli utenti possono visualizzare grafici interattivi che mostrano come il controller invia i segnali all’ESP32 e apportare modifiche immediate per ottimizzare le prestazioni. Un ulteriore vantaggio è la possibilità di salvare queste configurazioni come profili riutilizzabili, rendendo PcP uno strumento ideale per chi lavora su più progetti o dispositivi.\n', 'Connessione del controller ad ESP32\n'),
(3, 'OpenROS è una delle piattaforme più avanzate per lo sviluppo di applicazioni robotiche, ma il suo apprendimento può sembrare complesso a chi si avvicina per la prima volta a questa tecnologia. PcP riduce drasticamente questa curva di apprendimento, fornendo strumenti e risorse integrate per comprendere i concetti fondamentali di OpenROS in modo graduale.\n\nLa piattaforma OpenROS si basa su un’architettura distribuita che utilizza nodi per eseguire operazioni specifiche, topic per la comunicazione tra i nodi e messaggi per il trasferimento dei dati. PcP ti guida nella configurazione di questa struttura, mostrando passo dopo passo come creare nodi, pubblicare e sottoscrivere topic, e scambiare messaggi tra i vari componenti del sistema.\n\nPcP include simulatori che ti permettono di testare le funzionalità di OpenROS senza la necessità di un robot fisico. Ad esempio, potrai simulare movimenti, leggere dati da sensori virtuali e analizzare il comportamento del tuo progetto in un ambiente sicuro e controllato. Le guide integrate spiegano come configurare l’interazione tra PcP e OpenROS, rendendo semplice la creazione di applicazioni robotiche scalabili e robuste.\n', 'Imparare le basi di OpenROS\r\n'),
(4, 'Collegare un robot alla piattaforma OpenROS è un passo essenziale per chi vuole creare sistemi autonomi e intelligenti in grado di interagire con l’ambiente circostante. PcP rende questo processo più accessibile grazie alla sua interfaccia user-friendly e alle sue funzionalità avanzate.\n\nDopo aver configurato OpenROS, PcP consente di connettere il robot tramite protocolli standardizzati, garantendo una comunicazione stabile e affidabile. Una volta stabilita la connessione, PcP offre strumenti per mappare i comandi del robot su topic specifici, come quelli dedicati al controllo del movimento, alla gestione dei sensori e alla pianificazione delle azioni. Gli utenti possono testare in tempo reale le funzionalità del robot, regolando parametri critici come la velocità, la precisione e l’agilità.\n\nGrazie alla possibilità di visualizzare i dati provenienti dal robot in tempo reale, PcP aiuta a diagnosticare eventuali problemi di comunicazione o configurazione. Inoltre, il software permette di salvare configurazioni personalizzate, che possono essere rapidamente applicate ad altri robot o progetti simili, migliorando l’efficienza e la produttività.\n\nPcP non solo semplifica la connessione a OpenROS, ma offre anche strumenti di debugging e monitoraggio avanzati che riducono i tempi di sviluppo e garantiscono risultati affidabili. Con PcP, l’integrazione di robot OpenROS nei tuoi progetti diventa un processo fluido e intuitivo, adatto sia ai principianti che ai professionisti.', 'Connessione a robot OpenROS\r\n'),
(5, 'Benvenuti alla Prima Lezione sull’Utilizzo del Sito PCP\n\nSiamo lieti di darvi il benvenuto alla prima lezione dedicata all’utilizzo del sito PCP, uno strumento innovativo e potente progettato e sviluppato dal RoboLab dell’Università di Bari. PCP (Personalized Controller Platform) è stato ideato per rendere il controllo dei robot più accessibile, versatile e intuitivo, offrendo a professionisti, appassionati e studenti uno strumento efficace per la gestione dei dispositivi robotici. Con PCP, non sarà più necessario scrivere codice complesso: la piattaforma vi guiderà passo dopo passo nel processo di configurazione, semplificando ogni aspetto del controllo robotico.\n\nL’obiettivo di PCP è quello di consentire agli utenti di personalizzare i comandi dei robot attraverso dispositivi di input fisici, come joystick, cloche d’aviazione, gamepad o altri controller, in modo che possiate gestire facilmente e con precisione il comportamento dei vostri robot. Non importa se siete principianti nel campo della robotica o esperti tecnici: PCP è progettato per essere estremamente intuitivo, ma al tempo stesso potente, permettendovi di esplorare e configurare ogni dettaglio del controllo del robot.\n\nIn questa lezione, esploreremo i concetti fondamentali di PCP, illustrandovi le funzionalità principali della piattaforma e fornendo una guida pratica su come utilizzarla al meglio. Alla fine di questa lezione, avrete acquisito le competenze necessarie per configurare dispositivi di input, generare file di configurazione e trasferirli al robot, permettendovi di prendere il controllo dei vostri dispositivi in pochi passaggi semplici.\n\nObiettivi della Lezione\nDurante questa lezione, ci concentreremo su come utilizzare al meglio PCP per semplificare la gestione dei robot. Al termine della lezione, avrete acquisito le seguenti competenze:\n\nComprendere la struttura e le funzionalità principali del sito: Avrete una visione chiara delle varie sezioni del sito, delle impostazioni disponibili e delle opzioni di configurazione, che vi permetteranno di navigare facilmente nella piattaforma.\nConfigurare un dispositivo di input: Imparerete come connettere e mappare un joystick, un gamepad o qualsiasi altro controller al sito PCP, personalizzando ogni comando per il vostro robot in modo rapido e semplice.\nGenerare e trasferire un file di configurazione: Scoprirete come generare un file di configurazione standard che può essere utilizzato dal robot e come trasferirlo al dispositivo per avviare il controllo remoto in tempo reale.\nOgni passaggio verrà approfondito con esempi pratici che vi guideranno durante il processo di configurazione e utilizzo del sito PCP.\n\nPanoramica del Funzionamento\nIl sito PCP è stato progettato per rendere l’esperienza utente il più semplice possibile, riducendo al minimo la curva di apprendimento. Questo approccio si riflette in un sistema che è simile a un plug-and-play, il che significa che anche se non avete esperienza con la programmazione o la robotica, la piattaforma vi guiderà senza difficoltà. A continuazione, trovate una panoramica delle fasi principali del funzionamento di PCP:\n', 'Introduzione a PCP'),
(6, 'Il primo passo per utilizzare PCP è collegare il vostro dispositivo di input, come un joystick, un gamepad, una cloche d’aviazione o qualsiasi altro controller compatibile, al computer. Grazie al sistema di rilevamento automatico integrato nella piattaforma, non dovrete preoccuparvi di installare driver o software aggiuntivi.\n\nUna volta collegato il controller, il sito PCP lo riconoscerà automaticamente e una notifica visiva apparirà sulla schermata principale, confermando che il dispositivo è pronto per la configurazione. Questo passaggio permette di risparmiare tempo e di concentrarsi immediatamente sulla mappatura dei comandi, senza dover affrontare complicazioni tecniche.\n\n\n', 'Connessione e Rilevamento del Dispositivo'),
(7, 'Una volta che il dispositivo di input è stato rilevato, il sito vi permetterà di configurare i tasti, le leve e i comandi del controller. Utilizzando un’interfaccia grafica semplice e intuitiva, potrete mappare ciascun tasto o movimento a un’azione specifica del robot. Per esempio, potrete associare il pulsante \"A\" del controller per attivare il motore, la levetta sinistra per controllare la velocità, o la levetta destra per modificare la direzione del robot.\n\nPCP vi offre anche opzioni avanzate per calibrare la sensibilità dei comandi, regolare le soglie di risposta e testare i comandi in tempo reale. Questo vi permetterà di ottimizzare la configurazione in modo che il robot risponda con la massima precisione e personalizzazione. Durante la configurazione, avrete anche la possibilità di visualizzare in tempo reale come i comandi vengano trasmessi al robot, aiutandovi a garantire che tutto funzioni perfettamente.', 'Configurazione dei Comandi');

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `cognome` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `dataNascita` date DEFAULT NULL,
  `sesso` enum('M','F','A') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`idUser`, `email`, `nome`, `cognome`, `username`, `password`, `dataNascita`, `sesso`) VALUES
(1, 'mauro.wahu@gmail.com', 'Mauro', 'Wahu', 'MauroWahu', 'n5jPThOeMuiKXEkHmrC2UA==', '2000-10-28', 'M'),
(2, 'anna.verdi@email.com', 'Anna', 'Verdi', 'annaV', 'securePass', '1995-08-22', 'A'),
(7, 'integrale@gmail.com', 'kdv', 'bjbjk', 'iodvio', '$2b$10$fumOk48Txzs10OXd0RHPZ.UeNuP47wr2uI8rI365X3c', '2001-11-11', 'F'),
(8, 'integralessss@gmail.com', 'kdv', 'bjbjk', 'iodvioporco', '$2b$10$rXiUvlwvYi2q3wTwch2zyeRcXIM0uiVXcOYF6DyiHsy', '2001-11-11', 'F'),
(9, 'o@gmail.com', 'Nik', 'kola', 'Nik', '$2b$10$GdPzKnzu8cSrNUmwFb1NQuIXyJWPnaC7kxHVubAKtRQ', '2000-11-11', 'M'),
(10, 'palle@gmail.com', 'Pa', 'Lle', '1', '$2b$10$UE1qrmo.hCBwAXz6M6/fr.Nkx03cy4i6skNGqTWBZZG', '2000-11-11', 'M'),
(11, 'pa@gmail.com', 'Pa', 'Lle', 'GabryGay', '$2b$10$yKxh397wn9TLo6x4rJkoGes8jWQzP1jZr3/W8h4tohy', '2000-11-11', 'M'),
(13, 'pal@gmail.com', 'Pa', 'Lle', 'GabryèGay', '$2b$10$c4kaQMWaVflBdeK1.MJl5epz.ePUMigI2CmagzbOrXt', '2000-11-11', 'M'),
(14, '87@gmail.com', 'Pa', 'Lle', 'GabyèGay', '$2b$10$2D8kDSO0efvLUxIyAFoljenKegcmGhIjyLfuHXcfENG', '2000-11-11', 'M'),
(15, 'b@gmail.com', 'Nicol', 'Asso', 'Nicolasso', 'zz1/cXGWAmOVYYa0foUing==', '2000-11-11', 'M');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`idAdmin`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indici per le tabelle `configurazioni`
--
ALTER TABLE `configurazioni`
  ADD PRIMARY KEY (`idConfigurazione`),
  ADD KEY `email` (`email`);

--
-- Indici per le tabelle `databasechat`
--
ALTER TABLE `databasechat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indici per le tabelle `lezioni`
--
ALTER TABLE `lezioni`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `admins`
--
ALTER TABLE `admins`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `configurazioni`
--
ALTER TABLE `configurazioni`
  MODIFY `idConfigurazione` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT per la tabella `databasechat`
--
ALTER TABLE `databasechat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `lezioni`
--
ALTER TABLE `lezioni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `configurazioni`
--
ALTER TABLE `configurazioni`
  ADD CONSTRAINT `fk_email` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON UPDATE CASCADE;

--
-- Limiti per la tabella `databasechat`
--
ALTER TABLE `databasechat`
  ADD CONSTRAINT `databasechat_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `fk_email_chat` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
