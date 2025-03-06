/**
 * Invia un messaggio al bot e restituisce la risposta.
 *
 * @param {string} userInput - Il messaggio dell'utente da inviare al bot.
 * @returns {Promise<string>} - La risposta del bot.
 * @throws {Error} - Se c'è un errore durante la richiesta.
 */
import { BASE_URL, BOT_URL } from "../../constants"; // Importa URL di base e URL del bot dai costanti

// Funzione asincrona per inviare il messaggio al bot
const sendMessageToBot = async (userInput) => {
  try {
    // Invia una richiesta POST al bot con il messaggio dell'utente
    const response = await fetch(`${BOT_URL}/ask`, {
      method: "POST", // Metodo HTTP POST
      headers: {
        "Content-Type": "application/json", // Tipo di contenuto JSON
      },
      body: JSON.stringify({
        query: userInput, // Messaggio dell'utente
      }),
    });
    
    // Converte la risposta in formato JSON e restituisce la risposta del bot
    const data = await response.json();
    return " "+data.response; // Aggiunge uno spazio prima della risposta del bot
  } catch (error) {
    console.error("Errore durante la richiesta al bot:", error); // Stampa l'errore nella console
  }
}
export default sendMessageToBot; // Esporta la funzione per poterla usare in altri file
