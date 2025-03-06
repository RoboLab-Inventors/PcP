// Questo modulo implementa un semplice sistema di eventi (Event Emitter) utilizzando l'API EventTarget del browser

// Crea una nuova istanza di EventTarget per gestire gli eventi
const eventTarget = new EventTarget();

// Map per tenere traccia dei listener associati ai callback
const listeners = new Map();

// Oggetto eventEmitter che espone i metodi principali
const eventEmitter = {
    // Metodo 'on': registra un nuovo listener per un evento
    // - event: nome dell'evento da ascoltare
    // - callback: funzione da eseguire quando l'evento viene emesso
    on: (event, callback) => {
        const listener = (e) => callback(e.detail);
        listeners.set(callback, listener);
        eventTarget.addEventListener(event, listener);
    },

    // Metodo 'off': rimuove un listener precedentemente registrato
    // - event: nome dell'evento 
    // - callback: funzione callback da rimuovere
    off: (event, callback) => {
        const listener = listeners.get(callback);
        if (listener) {
            eventTarget.removeEventListener(event, listener);
            listeners.delete(callback);
        }
    },

    // Metodo 'emit': emette un evento con dati opzionali
    // - event: nome dell'evento da emettere
    // - data: dati da passare ai listener
    emit: (event, data) => {
        eventTarget.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
};

// Esporta l'eventEmitter per l'uso in altri moduli
export default eventEmitter;