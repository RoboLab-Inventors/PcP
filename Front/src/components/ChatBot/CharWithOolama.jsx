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