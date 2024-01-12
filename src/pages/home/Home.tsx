import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';


const socket = io("http://localhost:5000");

function Home() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {

      socket.on('message', (msg) => {
          setReceivedMessage(msg);
      });

      // Limpieza del efecto
      return () => {
          socket.disconnect();
      };
  }, []);

  const sendMessage = () => {
      socket.emit('message', message);
      setMessage('');
  };

  return (
    <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Enviar</button>
            <p>Mensaje recibido: {receivedMessage}</p>
        </div>
  );
}

export { Home };
