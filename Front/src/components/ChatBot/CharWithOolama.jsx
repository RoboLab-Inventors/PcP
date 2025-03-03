/**
 * Invia un messaggio al bot e restituisce la risposta.
 *
 * @param {string} userInput - Il messaggio dell'utente da inviare al bot.
 * @returns {Promise<string>} - La risposta del bot.
 * @throws {Error} - Se c'è un errore durante la richiesta.
 */
import React, { useState } from "react";
import axios from "axios";
import { BOT_URL } from "../../constants";

const sendMessageToBot = async (userInput) => {
  try {
    const response = await axios.post(`${BOT_URL}/ask`, {
      query: userInput,
    });
    return response.data.response;
  } catch (error) {
    console.error("Error fetching response:", error);
    throw new Error("Sorry, there was an error. Please try again.");
  }
};

export default sendMessageToBot;