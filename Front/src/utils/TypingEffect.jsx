/**
 * Componente TypingEffect
 * 
 * Questo componente visualizza un testo con un effetto di digitazione, 
 * aggiungendo un carattere alla volta a intervalli regolari.
 * 
 * @param {Object} props - Le proprietà passate al componente.
 * @param {string} props.text - Il testo da visualizzare con l'effetto di digitazione.
 * @param {number} [props.speed=15] - La velocità dell'effetto di digitazione in millisecondi.
 * 
 * @returns {JSX.Element} Un elemento span contenente il testo visualizzato con l'effetto di digitazione.
 */
import { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed = 15 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText(''); // Reset testo
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index)); // charAt evita undefined
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default TypingEffect;
