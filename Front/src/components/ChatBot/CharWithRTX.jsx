import axios from 'axios';

/* Api for Chat With RTX */
/** 
 Description: This class is used to send a message to the RTX chat server and get the response.

 Usage:
    const port = 5000;
    const queueManager = new chatApi(port);
    queueManager
        .sendMessage(message)
        .then((response) => {
            console.log("Respuesta del servidor:", response);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
*/

class chatApi {
  constructor(port) {
    this.port = port;
    this.baseUrl = `http://127.0.0.1:${this.port}`;
  }

  generateSessionHash() {
    const array = new Uint32Array(5);
    window.crypto.getRandomValues(array);
    return Array.from(array)
      .map((val) => val.toString(16))
      .join('');
  }

  async joinQueue(sessionHash, fnIndex, pythonObject) {
    const url = `${this.baseUrl}/queue/join?__theme=dark`;

    try {
      await axios.post(url, pythonObject);
    } catch (error) {
      throw error;
    }
  }

  async listenForUpdates(sessionHash) {
    const url = `${this.baseUrl}/queue/data?session_hash=${sessionHash}`;
    try {
      const response = await axios.get(url);
      const lines = response.data.split('\n');
      for (const line of lines) {
        if (line) {
          try {
            const data = JSON.parse(line.slice(5));
            if (data.msg === 'process_completed') {
              return data.output.data[0][0][1];
            }
          } catch (e) {
            // Ignore parsing errors
          }
        }
      }
      return '';
    } catch (error) {
      throw error;
    }
  }

  async sendMessage(message) {
    const sessionHash = this.generateSessionHash();
    const pythonObject = {
      data: [message],
      event_data: null,
      fn_index: 0,
      trigger_id: 0,
      session_hash: sessionHash,
    };

    await this.joinQueue(sessionHash, 30, pythonObject);
    return this.listenForUpdates(sessionHash);
  }
}

export default chatApi;