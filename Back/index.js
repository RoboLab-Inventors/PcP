const express = require("express"); // Libreria necessaria per la creazione del server
const mysql = require("mysql"); // Libreria necessaria per la connessione al database
const cors = require("cors"); // Libreria necessaria per la gestione dei CORS
const fs = require("fs"); // Libreria necessaria per la gestione dei file
const app = express(); // Libreria necessaria per la creazione del server
const port = 3000; // Porta su cui il server è in ascolto
const jwt = require("jsonwebtoken"); // Libreria necessaria per la gestione dei token JWT
app.use(cors()); // Middleware per la gestione dei CORS
app.use(express.json()); // Middleware per la gestione dei body delle richieste in formato JSON

/*
* Funzione per la verifica del token
req: richiesta del client
res: risposta del server
next: funzione per il passaggio al prossimo middleware
*/
const authenticateToken = (req, res, next) => {
  // Estrai il token dall'header della richiesta
  const token = req.headers["authorization"]?.split(" ")[1];
  // Se il token non è presente, restituisci un errore
  if (!token) {
    return res.status(401).send({ message: "Accesso negato, token mancante" });
  }
  // Verifica il token
  jwt.verify(token, secretKey, (err, user) => {
    /*
     *err: errore di verifica del token
     *user: utente estratto dal token
     *secretKey: chiave segreta per la verifica del token
     *token: token estratto dall'header della richiesta
     * Se il token non è valido, restituisci un errore
     * altrimenti, aggiungi l'utente alla richiesta e passa al prossimo middleware
     *
     */
    if (err) {
      return res.status(403).send({ message: "Token non valido" });
    }
    // Aggiungi l'utente alla richiesta
    req.user = user;
    // Passa al prossimo middleware
    next();
  });
};
/*
 *Richiesta post per l'inserimento di un messaggio nel database
 *req:richiesta del client
 *res:risposta del server
 */
app.post("/insertChatResult", (req, res) => {
  // Estrai il messaggio e l'email dal body della richiesta
  const { message, email } = req.body;
  // Query per l'inserimento del messaggio nel database
  const query = "INSERT INTO databasechat (message, email) VALUES (?,?);"; // ? = placeholder per i valori
  // Formatta la query con i valori da inserire e la stampa
  const formattedQuery = mysql.format(query, [message, email]);
  console.log(formattedQuery);
  // Esegui la query
  db.query(query, [message, email], (err, res) => {
    /*
     *[message,email]: valori da inserire nel database
     *err: errore di inserimento
     *res: risultato dell'inserimento
     */
    //In caso di errore viene stampato server-side l'errore, altrimenti viene stampato un messaggio di successo
    if (!err) {
      console.log("Log del chatbot inserito ");
    } else {
      console.log(err);
    }
  });
  //Al cliente non viene restituito nulla in quanto la raccolta dei dati avviene automaticamente
});

//endpoint per il download di una configurazione nel profilo di un utente
/*
 * /downloadConfiguration endpoint a cui fare la richiesta
 * get metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 */
app.get("/downloadConfiguration", authenticateToken, (req, res) => {
  // Estrai l'email dell'autore della configurazione e il nome dal body della richiesta
  const { email, name } = req.body;
  // Query per l'estrazione della configurazione dal database
  const query = "SELECT * FROM configurazioni WHERE email=? AND nome=?"; //? = placeholder per i valori
  // Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query, [email, name]);
  console.log(formattedQuery);
  // Esegui la query
  db.query(query, [email, name], (err, result) => {
    /*
     *query: query da eseguire
     *[email,name]: valori da inserire nella query
     *err: errore di esecuzione della query
     *result: risultato della query
     */
    //In caso di errore viene stampato server-side l'errore, altrimenti viene restituito il contenuto del file al client
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).send({ message: "Errore di database" });
    }
    if (result.length > 0) {
      return res.send({ data: result[0] });
    } else {
      return res.status(404).send({ message: "Configurazione non trovata" });
    }
  });
});
/*
 *endpoint per l'esportazione di una configurazione
 * /exportConfiguration endpoint a cui fare la richiesta
 * post metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 */
app.post("/exportConfiguration", authenticateToken, (req, res) => {
    // Estrai i dati della configurazione dal body della richiesta
    const { email, nome, descrizione, stato, configurazione, username } =req.body;
    // Prepara il percorso del nome del file da mandare al client
    const filePath = `./${username}_config.txt`;
    // Crea il file con i dati della configurazione
    const fileContent = JSON.stringify(configurazione, null, 2);
    /*
    *(method) JSON.stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string (+1 overload)
    *Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

    *@param value — A JavaScript value, usually an object or array, to be converted.

    *@param replacer — An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.

    *@param space — Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
    */
    // Scrivi il file
  fs.writeFile(filePath, fileContent, (err) => {
    /*
    *function writeFile(path: fs.PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, callback: fs.NoParamCallback): void (+1 overload)
    namespace writeFile 
    *Asynchronously writes data to a file, replacing the file if it already exists.
    *@param path A path to a file. If a URL is provided, it must use the file: protocol. If a file descriptor is provided, the underlying file will not be closed automatically.
    *@param data — The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
    *fileContent: contenuto del file
    *filePath: percorso del file
    *err: errore di scrittura del file
    */
   //In caso di errore viene stampato server-side e restituito anche al client, altrimenti viene inserita la configurazione nel database
    if (err) {
      console.error("Errore durante la scrittura del file:", err);
      return res
        .status(500)
        .json({ message: "Errore durante la scrittura del file" });
    }
    //query per l'inserimento della configurazione nel database
    const query ="INSERT INTO configurazioni (email, nome, descrizione, dataPubblicazione, stato, configurazione, dataCreazione) VALUES(?,?,?,?,?,?,?)"; //? = placeholder per i valori
    // Formatta la query con i valori da inserire e la stampa server-side
    //query:query da eseguire
    //[email,nome,descrizione,new Date(),stato,fileContent,new Date()]:valori da inserire nella query
    const formattedQuery = mysql.format(query, [    
      email,
      nome,
      descrizione,
      new Date(),
      stato,
      configurazione,
      new Date(),
    ]);
    console.log(formattedQuery);
    //Oggetto creato per maggiore leggibilità del codice e per non richiamare tutti i valori mentre viene eseguita la query
    const values = [
      email,
      nome,
      descrizione,
      new Date(),
      stato,
      fileContent,
      new Date(),
    ];
    // Esegui la query
    db.query(query, values, (err, result) => {
        /*
        *query: query da eseguire
        *values: valori da inserire nella query
        *err: errore di esecuzione della query
        *result: risultato della query
        */
      //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
      if (err) {
        console.error("Errore di database:", err);
        return res.status(500).json({ message: "Errore di database" });
      }
    });
    //In caso di successo, viene restituito un file al client con i dati della configurazione chiamato "username_config.txt"
    res.download(filePath, `${username}_config.txt`, (err) => {
        //In caso di errore durante l'invio del file, esso viene stampato server-side e restituito al client
      if (err) {
        console.error("Errore durante l'invio del file:", err);
        return res
          .status(500)
          .json({ message: "Errore durante l'invio del file" });
      }
      //Elimina il file dopo averlo inviato
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Errore durante l'eliminazione del file:", err);
        }
      });
    });
  });
});
//endpoint per prendere le informazioni di un utente e stamparle nel profilo
/*
 * /getUserData endpoint a cui fare la richiesta
 * post metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 */
app.post("/getUserData", authenticateToken, (req, res) => {
  // Estrai l'email dal body della richiesta
  const { username, email } = req.body;
  // Query per l'estrazione delle informazioni dell'utente dal database
  const query = `SELECT * FROM users WHERE username = ? AND email = ?`;
  // Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query, [username, email]);
  console.log(formattedQuery);
  /*
    *query: query da eseguire
    *[username,email]: valori da inserire nella query
    *err: errore di esecuzione della query
    *result: risultato della query
  */
  db.query(query, [username, email], (err, result) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).send({ message: "Errore di database" });
    }
    //Se l'utente è presente nel database, restituisci le sue informazioni
    if (result.length > 0) {
    //In caso di successo, restituisci le informazioni del primo e unico utente trovato
      return res.send({ data: result[0] });
    } else {
     //Se l'utente non è presente nel database, restituisci un errore conforme agli standard HTTP definiti nella RFC 9110.
      return res.status(404).send({ message: "Utente non trovato" });
    }
  });
});
/**
 * /getCommunityConfiguration endpoint a cui fare la richiesta
 * get metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 */
app.get("/getCommunityConfiguration", authenticateToken, (req, res) => {
    // Query per l'estrazione delle configurazioni pubbliche dal database
  const query =
    "SELECT configurazioni.idConfigurazione,configurazioni.nome,configurazioni.descrizione,users.username FROM configurazioni,users WHERE stato='Pubblico' and (configurazioni.email= users.email)";
    // Esegui la query
    //Non è stato messa formattedQuery perchè non ci sono valori da inserire
    /**
     * query: query da eseguire
     * err: errore di esecuzione della query
     * result: risultato della query
     */
  db.query(query, (err, result) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).json({ message: "Errore di database" });
    }
    //Se ci sono configurazioni pubbliche, restituiscile al client altrimenti viene restituito un messaggio di errore
    if (result.length > 0) {
      return res.send({ data: result });
    } else {
      return res.status(404).send({ message: "Configurazioni non trovate" });
    }
  });
});
/*
* /modifyConfiguration endpoint a cui fare la richiesta
* post metodo della richiesta che si aspetta il server
* authenticateToken middleware per la verifica del token
* req: richiesta del client
* res: risposta del server 
*/
app.post("/modifyConfiguration", authenticateToken, (req, res) => {
  // Estrai i dati della configurazione dal body della richiesta
  const { nome, email } = req.body;
  // Query per l'estrazione della configurazione dal database
  const query =
    "SELECT configurazione FROM configurazioni WHERE nome=? AND email=?";
    // Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query, [nome, email]);
  console.log(formattedQuery);
  /**
   * query: query da eseguire
   * [nome,email]: valori da inserire nella query
   * err: errore di esecuzione della query
   * result: risultato della query
   */
  db.query(query, [nome, email], (err, result) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).json({ message: "Errore di database" });
    }
    //Se la configurazione è presente nel database, restituiscila al client altrimenti viene restituito un messaggio di errore
    if (result.length > 0) {
        //Viene salvata la prima configurazione trovata in una variabile
      const configurazione = result[0].configurazione;
      // Controllo per verificare che configurazione non sia null o undefined
      if (configurazione) {
        res.json({ configurazione });
      } else {
        res.status(404).json({ message: "Configurazione vuota o non trovata" });
      }
    } else {
      res.status(404).json({ message: "Configurazione non trovata" });
    }
  });
});
/**
 * /deleteConfiguration endpoint a cui fare la richiesta
 * post metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 * è stato usato il metodo post perchè delete non permette alla richiesta di avere un corpo
 */
app.post("/deleteConfiguration", (req, res) => {
  // Estrai i dati della configurazione dal body della richiesta
  const {email,nome} = req.body;
// Query per l'eliminazione della configurazione dal database
  const query = "DELETE FROM configurazioni WHERE email = ? AND nome = ?";
  // Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query, [email, nome]);
  console.log(formattedQuery);
/*
* query: query da eseguire
* [email,nome]: valori da inserire nella query
* err: errore di esecuzione della query
* result: risultato della query
*/
  db.query(query, [email, nome], (err, result) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).json({ message: "Errore di database" });
    }
    //Se la configurazione è stata eliminata con successo, restituisci un messaggio di successo al client altrimenti viene restituito un messaggio di errore
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Configurazione non trovata" });
    }

    res.status(200).json({ message: "Configurazione eliminata con successo" });
  });
});
/**
 * /shareConfiguration endpoint a cui fare la richiesta
 * put metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 */
app.put("/shareConfiguration", authenticateToken, (req, res) => {
    // Estrai i dati della configurazione dal body della richiesta
  const { email, nome } = req.body;
  // Query per cambiare lo stato della configurazione
  const query =
    "UPDATE configurazioni SET stato='Pubblico' WHERE email=? and nome=?";
    // Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query, [email, nome]);
  console.log(formattedQuery);
  /*
    * query: query da eseguire
    * [email,nome]: valori da inserire nella query
    * err: errore di esecuzione della query
    * result: risultato della query
  */
  db.query(query, [email, nome], (err, result) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).send({ message: "Errore di database" });
    }
    //Se la configurazione è stata condivisa con successo, restituisci un messaggio di successo al client altrimenti viene restituito un messaggio di errore
    if (result.affectedRows > 0) {
      return res.send({ message: "Configurazione pubblicata con successo!" });
    } else {
      return res.status(404).send({ message: "Configurazione non trovata" });
    }
  });
});
/*
* /privateConfiguration endpoint a cui fare la richiesta
* put metodo della richiesta che si aspetta il server
* authenticateToken middleware per la verifica del token
* req: richiesta del client
* res: risposta del server
*/
app.put("/privateConfiguration", authenticateToken, (req, res) => {
  // Estrai i dati della configurazione dal body della richiesta
    const { email, name } = req.body;
    // Query per cambiare lo stato della configurazione
  const query =
    "UPDATE configurazioni SET stato='Privato' WHERE email=? and nome=?";
    // Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query, [email, name]);
  console.log(formattedQuery);
  /**
   * query: query da eseguire
   * [email,name]: valori da inserire nella query
   * err: errore di esecuzione della query
   * result: risultato della query
   */
  db.query(query, [email, name], (err, result) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).send({ message: "Errore di database" });
    }
    //Se la configurazione è stata resa privata con successo, restituisci un messaggio di successo al client altrimenti viene restituito un messaggio di errore
    if (result.affectedRows > 0) {
      return res.send({ message: "Configurazione pubblicata con successo!" });
    } else {
      return res.status(404).send({ message: "Configurazione non trovata" });
    }
  });
});
/**
 * /getConfiguration endpoint a cui fare la richiesta
 * post metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 */
app.post("/getConfigurations", authenticateToken, (req, res) => {
    // Estrai l'email dal body della richiesta
  const email = req.body.email;
    // Query per l'estrazione delle configurazioni dell'utente dal database
  const query = "SELECT * FROM `configurazioni` WHERE email=?";
  // Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query, [email]);
  console.log(formattedQuery);
    /*
    *query: query da eseguire
    *[email]: valori da inserire nella query
    *err: errore di esecuzione della query
    *result: risultato della query
    */
  db.query(query, [email], (err, result) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).send({ message: "Errore di database" });
    }
    //Se ci sono configurazioni dell'utente, restituiscile al client altrimenti viene restituito un messaggio di errore
    if (result.length > 0) {
      return res.send({ data: result });
    } else {
      return res.status(404).send({ message: "Configurazioni non trovate" });
    }
  });
});
/**
 * /downloadConfiguration endpoint a cui fare la richiesta
 * post metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 */
app.post("/downloadConfiguration", authenticateToken, (req, res) => {
    // Estrai l'id della configurazione e il nome dal body della richiesta
  const { idConfigurazione, name } = req.body;
    // Query per l'estrazione della configurazione dal database
  const query =
    "SELECT configurazione,username FROM configurazioni,users WHERE idConfigurazione = '? and name=?' and (configurazione.email=users.email)";
    // Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query, [idConfigurazione]);
  console.log(formattedQuery);
    /*
    *query: query da eseguire
    *[idConfigurazione,name]: valori da inserire nella query
    *err: errore di esecuzione della query
    *result: risultato della query
    */
  db.query(query, [idConfigurazione, name], (err, result) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).json({ message: "Errore di database" });
    }
    //Se la configurazione è presente nel database, restituiscila al client altrimenti viene restituito un messaggio di errore
    if (result.length === 0) {
      return res.status(404).json({ message: "Configurazione non trovata" });
    }
    //Viene salvata la prima configurazione trovata in una variabile
    const configuration = result[0].configurazione;
    // Prepara il percorso del nome del file da mandare al client
    const filePath = `./${name}_config.json`;
    // Scrivi il file
    fs.writeFile(filePath, configuration, (err) => {
      if (err) {
        console.error("Errore durante la scrittura del file:", err);
        return res
          .status(500)
          .json({ message: "Errore durante la scrittura del file" });
      }
      //Invia il file al client
      res.download(filePath, `${name}_config.json`, (err) => {
        if (err) {
          console.error("Errore durante l'invio del file:", err);
          return res
            .status(500)
            .json({ message: "Errore durante l'invio del file" });
        }
        //Elimina il file dopo averlo inviato
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Errore durante l'eliminazione del file:", err);
          }
        });
      });
    });
  });
});
/**
 * /downloadConfigurationProfile endpoint a cui fare la richiesta
 * post metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 */
app.post("/downloadConfigurationProfile", authenticateToken, (req, res) => {
    // Estrai l'email e il nome dal body della richiesta
  const { email, name } = req.body;
    // Query per l'estrazione della configurazione dal database
  const query =
    "SELECT configurazione FROM configurazioni WHERE nome = ? and email=?";
    // Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query, [name, email]);
  console.log(formattedQuery);
  /**
   * query: query da eseguire
   * [name,email]: valori da inserire nella query
   * err: errore di esecuzione della query
   * result: risultato della query
   */
  db.query(query, [name, email], (err, result) => {
    /**
     * query: query da eseguire
     * [name,email]: valori da inserire nella query
     * err: errore di esecuzione della query
     * result: risultato della query
     */
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).json({ message: "Errore di database" });
    }
    //Se la configurazione è presente nel database, restituiscila al client altrimenti viene restituito un messaggio di errore
    if (result.length === 0) {
      return res.status(404).json({ message: "Configurazione non trovata" });
    }
    //Viene salvata la prima configurazione trovata in una variabile
    const configuration = result[0].configurazione;
    // Prepara il percorso del nome del file da mandare al client
    const filePath = `./${name}_config.json`;
    // Scrivi il file
    fs.writeFile(filePath, configuration, (err) => {
        //In caso di errore viene stampato server-side e restituito anche al client, altrimenti viene inviato il file al client
      if (err) {
        console.error("Errore durante la scrittura del file:", err);
        return res
          .status(500)
          .json({ message: "Errore durante la scrittura del file" });
      }
      //Invia il file al client
      res.download(filePath, `${name}_config.json`, (err) => {
        if (err) {
          console.error("Errore durante l'invio del file:", err);
          return res
            .status(500)
            .json({ message: "Errore durante l'invio del file" });
        }
        //Elimina il file dopo averlo inviato
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Errore durante l'eliminazione del file:", err);
          }
        });
      });
    });
  });
});
//Avvia il server sulla porta specificata e stampa un messaggio di avvenuta connessione
app.listen(port, () => {
  console.log(`Server in esecuzione su http://localhost:${port}`);
});
// Connessione al database
const db = mysql.createConnection({
  host: "localhost", // Indirizzo del server MySQL
  user: "root", // Username per l'accesso al database
  password: "", // Password per l'accesso al database
  database: "pcp", // Nome del database
});
/**
 * /registerUser endpoint a cui fare la richiesta
 * post metodo della richiesta che si aspetta il server
 * req: richiesta del client
 * res: risposta del server
 * registerUser sarà implementato quando verrà implementata la registrazione per gli utenti
 */
app.post("/registerAdmin", (req, res) => {
    // Estrai email, password e username dal body della richiesta
  const {email,password,username} = req.body;
    // Query per l'inserimento dell'utente nel database
  const query = "INSERT INTO admins(email,username,password) VALUES(?,?,?)";// ? = placeholder per i valori
  /**
   * query: query da eseguire
   * [email,username,password]: valori da inserire nella query
   * err: errore di esecuzione della query
   * result: risultato della query
   */
  db.query(query, [email, username, password], (err, result) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore di database:", err);
      return result.status(500).send({ message: "Errore di database" });
    } else {
        //Se la registrazione è avvenuta con successo, restituisci un messaggio di successo al client
      res.send({ message: "Registrazione completata con successo!" });
    }
  });
});
/*
* /loginAdmin endpoint a cui fare la richiesta
* post metodo della richiesta che si aspetta il server
* req: richiesta del client
* res: risposta del server
* loginAdmin sarà implementato quando verrà implementato il login per gli admin 
*/
app.post("/loginAdmin", (req, res) => {
  // Estrai email e password dal body della richiesta
  const {email,password} = req.body;
    // Query per l'estrazione dell'admin dal database
  const query = `SELECT * FROM admins WHERE "email" = ? AND password = ?`;
  // Formatta la query con i valori da inserire e la stampa server-side
const formattedQuery = mysql.format(query, [email, password]);
console.log(formattedQuery);
/**
 * query: query da eseguire
 * [email,password]: valori da inserire nella query
 * err: errore di esecuzione della query
 * results: risultato della query
 */
  db.query(query, [email, password], (err, results) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).send({ message: "Errore di database" });
    }
    //Se l'admin è presente nel database, restituisci le sue informazioni al client altrimenti viene restituito un messaggio di errore
    if (results.length > 0) {
      return res.send({
        message: "Login effettuato con successo!",
        user: results[0],
      });
    } else {
      return res.status(401).send({ message: "Credenziali errate" });
    }
  });
});
/**
 * /deleteAdmin endpoint a cui fare la richiesta
 * delete metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 */
app.delete("/deleteAdmin", authenticateToken, (req, res) => {
    // Estrai l'email dal body della richiesta
  const username = req.body.username;
    // Query per l'eliminazione dell'utente dal database
  const query = `DELETE FROM admins WHERE username = ?`;
  // Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query, [username]);
    console.log(formattedQuery);
    /**
     * query: query da eseguire
     * [username]: valori da inserire nella query
     * err: errore di esecuzione della query
     * result: risultato della query
     */
  db.query(query, username, (err, result) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).send({ message: "Errore di database" });
    }
    //Se l'utente è stato eliminato con successo, restituisci un messaggio di successo al client altrimenti viene restituito un messaggio di errore
    if (result.affectedRows > 0) {
      console.log("Admin eliminato con successo:", result);
      return res.send({ message: "Admin eliminato con successo!" });
    } else {
      console.log("Admin non trovato");
      return res.status(404).send({ message: "Admin non trovato" });
    }
  });
});
/**
 * /modifyAdmin endpoint a cui fare la richiesta
 * put metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 */
app.put("/modifyAdmin", authenticateToken, (ris, req) => {
    // Estrai i dati dell'utente dal body della richiesta
  const { emailAttuale, email, password } = req.body;
  if(email)
//In base al campo della richiesta, viene eseguita la query corrispondente
  if (email) {
    // Query per la modifica dell'email dell'utente
    const query = "UPDATE admins SET email=? WHERE email=?";
    /**
     * query: query da eseguire
     * [email,emailAttuale]: valori da inserire nella query
     * err: errore di esecuzione della query
     * result: risultato della query
    */
    db.query(query, [email, emailAttuale], (err, result) => {
      if (err) {
        console.error("Errore di database:", err);
        //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
        return res.status(500).send({ message: "Errore di database" });
      } else {
        //Se la modifica è avvenuta con successo, restituisci un messaggio di successo al client
        res.send({ message: "Modifica completata con successo!" });
      }
    });
  } else if (password) {
    // Query per la modifica della password dell'utente
    const query = "UPDATE admins SET password=? WHERE email=?";
    /**
     * query: query da eseguire
     * [password,emailAttuale]: valori da inserire nella query
     * err: errore di esecuzione della query
     * result: risultato della query
     */
    db.query(query, [password, emailAttuale], (err, result) => {
      if (err) {
        console.error("Errore di database:", err);
        //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
        return res.status(500).send({ message: "Errore di database" });
      } else {
        //Se la modifica è avvenuta con successo, restituisci un messaggio di successo al client
        res.send({ message: "Modifica completata con successo!" });
      }
    });
  }
});
/**
 * /deleteUser endpoint a cui fare la richiesta
 * post metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 * è stato usato il metodo post perchè delete non permette alla richiesta di avere un corpo
 * funzione che sarà usabile quando verrà implementato il cancella profilo 
 */
app.post("/deleteUser", authenticateToken, (req, res) => {
    // Estrai l'email dal body della richiesta
  const username = req.body.username;
    // Query per l'eliminazione dell'utente dal database
  const query = `DELETE FROM users WHERE username = ?`;
  // Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query, [username]);
    console.log(formattedQuery);
    /**
     * query: query da eseguire
     * [username]: valori da inserire nella query
     * err: errore di esecuzione della query
     * result: risultato della query
     */
  db.query(query, username, (err, result) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).send({ message: "Errore di database" });
    }
    //Se l'utente è stato eliminato con successo, restituisci un messaggio di successo al client altrimenti viene restituito un messaggio di errore
    if (result.affectedRows > 0) {
      console.log("Admin eliminato con successo:", result);
      return res.send({ message: "Admin eliminato con successo!" });
    } else {
      console.log("Admin non trovato");
      return res.status(404).send({ message: "Admin non trovato" });
    }
  });
});
/**
 * /loginUser endpoint a cui fare la richiesta
 * post metodo della richiesta che si aspetta il server
 * req: richiesta del client
 * res: risposta del server
 */
app.post("/loginUser", (req, res) => {
    // Estrai i dati dell'utente dal body della richiesta
  const {email,password} = req.body;
// Query per l'estrazione dell'utente dal database
  const query = `SELECT * FROM users WHERE email= ? AND password = ?`;//? = placeholder per i valori
    // Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query, [email, password]);
  console.log(formattedQuery);
  /**
   * query: query da eseguire
   * [email,password]: valori da inserire nella query
   * err: errore di esecuzione della query
   * results: risultato della query
   */
  db.query(query, [email, password], (err, results) => {
    /**
     * query: query da eseguire
     * [email,password]: valori da inserire nella query
     * err: errore di esecuzione della query
     * results: risultato della query
     */
    if (err) {
        //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
      console.error("Errore di database:", err);
      return res.status(500).send({ message: "Errore di database" });
    }
    //Se l'utente è presente nel database, restituisci un messaggio di successo al client, insieme ad un token JWT  altrimenti viene restituito un messaggio di errore
    if (results.length > 0) {
      const user = results[0];
      //Generazione del token JWT con i dati dell'utente valido per 1 ora
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        secretKey,
        { expiresIn: "1h" } // Token valido per 1 ora
      );
      return res.send({
        message: "Login effettuato con successo!",
        username: user.username,
        email: user.email,
        token,
      });
    } else {
      return res.status(401).send({ message: "Credenziali errate" });
    }
  });
});
app.put("/modifyUser", authenticateToken, (req, res) => {
    // Estrai i dati dell'utente dal body della richiesta
  const { email, username, birthDate, gender, nome, cognome, emailAttuale } =req.body;
    // Query per l'aggiornamento dell'utente nel database
  const sql = `UPDATE users SET email=? ,username = ?,  dataNascita = ?, sesso = ? , nome = ?, cognome = ? WHERE email = ?;`;
  const values = [
    email,
    username,
    birthDate,
    gender,
    nome,
    cognome,
    emailAttuale,
  ];
  // Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(sql, values);
  console.log(formattedQuery);
    /**
     * query: query da eseguire
     * [email, username, birthDate,gender,nome,cognome,emailAttuale]: valori da inserire nella query
     * err: errore di esecuzione della query
     * result: risultato della query
     * values: valori da inserire nella query     
     */ 
  db.query(sql, values, (err, result) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore nell'aggiornamento:", err);
      res.status(500).send("Errore del server");
    } else {
        //Se l'aggiornamento è andato a buon fine, restituisci un messaggio di successo al client
      res.send("Aggiornamento riuscito");
    }
  });
});
/**
 * /registerUser endpoint a cui fare la richiesta
 * post metodo della richiesta che si aspetta il server
 * req: richiesta del client
 * res: risposta del server
 */
app.post("/registerUser", (req, res) => {
    // Estrai i dati dell'utente dal body della richiesta
  const { email, username, password, birthDate,gender,firstName,lastName }=req.body;
    // Query per l'inserimento dell'utente nel database
  const query =
    "INSERT INTO users(email, username, password, dataNascita, sesso, nome,cognome) VALUES(?,?,?,?,?,?,?)"; //? = placeholder per i valori
// Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query, [
    email,
    username,
    password,
    birthDate,
    gender,
    firstName,
    lastName,
  ]);

  console.log(`Query formattata: ${formattedQuery}`);
  /**
   * query: query da eseguire
   * [email, username, password, birthDate,gender,firstName,lastName]: valori da inserire nella query
   * err: errore di esecuzione della query
   * results: risultato della query
   */
  db.query(
    query,
    [email, username, password, birthDate, gender, firstName, lastName],
    (err, results) => {
        //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
      if (err) {
        console.error("Errore di database:", err);
        return res.status(500).send({ message: "Errore di database" });
      }
      //Se l'utente è stato registrato con successo, restituisci un messaggio di successo al client altrimenti viene restituito un messaggio di errore
      if (results.affectedRows > 0) {
        return res.send({ message: "Registrazione completata con successo!" });
      } else {
        return res.status(400).send({ message: "Errore di registrazione" });
      }
    }
  );
});
/**
 * /lesson endpoint a cui fare la richiesta
 * get metodo della richiesta che si aspetta il server
 * req: richiesta del client
 * res: risposta del server
 */
app.get("/lesson", (req, res) => {
    // Query per l'estrazione delle lezioni dal database
  const query = "SELECT * FROM lezioni";
    // Esegui la query
  console.log(query);
  /**
   * query: query da eseguire
   * err: errore di esecuzione della query
   * result: risultato della query
   */
  db.query(query, (err, result) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore durante la query:", err);
      return res.status(500).json(err);
    }
    //Se ci sono lezioni vengono restituite al client in formato json
    return res.json(result);
  });
});
/**
 * /modifyLesson endpoint a cui fare la richiesta
 * put metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 */
app.put("/modifyLesson", authenticateToken, (req, res) => {
    // Estrai i dati della lezione dal body della richiesta
  const {nomeLezione,testoLezione,lezioneSelezionata} = req.body;
  //Inizio della query composta
  let query = `UPDATE lezioni SET `;
  if (nomeLezione) {
    //Se esiste il nome lezione viene concatenata questa stringa alla query
    query += `nomeLezione='${nomeLezione}'`;
  }
  if (testoLezione) {
    //Se esiste il testo lezione viene concatenata questa stringa alla query
    query += `,testoLezione='${testoLezione}' WHERE nomeLezione='${lezioneSelezionata}'`;
  } else {
    //Altrimenti viene aggiunto il where per capire quale lezione modificare
    query += `WHERE nomeLezione='${lezioneSelezionata}'`;
  }
  // Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query);
    console.log(formattedQuery);
    /**
     * query: query da eseguire
     * err: errore di esecuzione della query
     * result: risultato della query
     */
  db.query(query, (err, result) => {
    //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).send({ message: "Errore di database" });
    } else {
        //Se la lezione è stata modificata con successo, restituisci un messaggio di successo
      res.send({ message: "Lezione modificata con successo!" });
    }
  });
});
/**
 * /addLesson endpoint a cui fare la richiesta
 * post metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 * endpoint disponibile solo all'admin per la gestione delle lezioni, non è stato implementato perchè admin è in sviluppi futuri
 */
app.post("/addLesson", authenticateToken, (req, res) => {
    // Estrai i dati della lezione dal body della richiesta
  const {nomeLezione,testoLezione} = req.body;
  // Query per l'inserimento della lezione nel database
  const query = "INSERT INTO lezioni(testoLezione,nomeLezione) VALUES(?,?)";
  //Formatta la query con i valori da inserire e la stampa server-side
  const formattedQuery = mysql.format(query, [testoLezione, nomeLezione]);
    console.log(formattedQuery);
  db.query(query, [testoLezione, nomeLezione], (err, result) => {
    if (err) {
      console.error("Errore di database:", err);
      return res.status(500).send({ message: "Errore di database" });
    } else {
      res.send({ message: "Lezione aggiunta con successo!" });
    }
  });
});
/**
 * /deleteLesson endpoint a cui fare la richiesta
 * post metodo della richiesta che si aspetta il server
 * authenticateToken middleware per la verifica del token
 * req: richiesta del client
 * res: risposta del server
 * è stato usato il metodo post perchè delete non permette alla richiesta di avere un corpo
 * endpoint disponibile solo all'admin per la gestione delle lezioni, non è stato implementato perchè admin è in sviluppi futuri
 */
app.post("/deleteLesson", authenticateToken, (req, res) => {
    // Estrai il nome della lezione dal body della richiesta
    const nomeLezione = req.body.nomeLezione;
    // Query per l'eliminazione della lezione dal database
    const query = `DELETE FROM lezioni WHERE nomeLezione = ?`;
    // Formatta la query con i valori da inserire e la stampa server-side
    const formattedQuery = mysql.format(query, [nomeLezione]);
    console.log(formattedQuery);
    /**
     * query: query da eseguire
     * [nomeLezione]: valori da inserire nella query
     * err: errore di esecuzione della query
     * result: risultato della query
     */
    db.query(query, nomeLezione, (err, result) => {
        //In caso di errore viene stampato server-side l'errore e restituito al client con uno stato personalizazto e conforme agli standard  HTTP definiti nella RFC 9110.
        if (err) {
        console.error("Errore di database:", err);
        return res.status(500).send({ message: "Errore di database" });
        }
        //Se la lezione è stata eliminata con successo, restituisci un messaggio di successo al client altrimenti viene restituito un messaggio di errore
        if (result.affectedRows > 0) {
        console.log("Lezione eliminata con successo:", result);
        return res.send({ message: "Lezione eliminata con successo!" });
        } else {
        console.log("Lezione non trovata");
        return res.status(404).send({ message: "Lezione non trovata" });
        }
    });
});

// Gestione della connessione al database
db.connect((err) => {
    //In caso di errore viene stampato server-side l'errore
  if (err) {
    console.error("Errore di connessione al DB:", err);
  }
});