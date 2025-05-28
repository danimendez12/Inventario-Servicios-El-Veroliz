import React, { useState, useRef, useEffect } from 'react';
import Header from './SubComponentes/Header';
import './estilos/ayuda.css';

export default function Ayuda() {
  const [mensajes, setMensajes] = useState([
    { autor: 'bot', texto: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?' },
    { autor: 'user', texto: 'Hola, necesito ayuda para manejar el inventario' },
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes]);

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMensajes([...mensajes, { autor: 'user', texto: input }]);
    setInput('');
  };

  return (
    <div className="ayuda-bg">
      <Header titulo="Ayuda" />
      <div className="ayuda-main">
        <div className="ayuda-chat-layout">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
            <h2 className="ayuda-titulo">Asistente Virtual</h2>
            <div className="ayuda-bot-avatar">
                <svg width="102" height="102" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M96 0C149.019 0 192 42.9807 192 96C192 149.019 149.019 192 96 192C42.9807 192 0 149.019 0 96C0 42.9807 42.9807 0 96 0Z" fill="#E5E5E5"/>
                <path d="M96 0C149.019 0 192 42.9807 192 96C192 149.019 149.019 192 96 192C42.9807 192 0 149.019 0 96C0 42.9807 42.9807 0 96 0Z" stroke="#E5E7EB"/>
                <path d="M133.5 126H58.5V66H133.5V126Z" stroke="#E5E7EB"/>
                <g clip-path="url(#clip0_108_586)">
                <path d="M96 66C98.0742 66 99.75 67.6758 99.75 69.75V77.25H113.812C118.477 77.25 122.25 81.0234 122.25 85.6875V117.562C122.25 122.227 118.477 126 113.812 126H78.1875C73.5234 126 69.75 122.227 69.75 117.562V85.6875C69.75 81.0234 73.5234 77.25 78.1875 77.25H92.25V69.75C92.25 67.6758 93.9258 66 96 66ZM82.875 111C81.8438 111 81 111.844 81 112.875C81 113.906 81.8438 114.75 82.875 114.75H86.625C87.6562 114.75 88.5 113.906 88.5 112.875C88.5 111.844 87.6562 111 86.625 111H82.875ZM94.125 111C93.0938 111 92.25 111.844 92.25 112.875C92.25 113.906 93.0938 114.75 94.125 114.75H97.875C98.9062 114.75 99.75 113.906 99.75 112.875C99.75 111.844 98.9062 111 97.875 111H94.125ZM105.375 111C104.344 111 103.5 111.844 103.5 112.875C103.5 113.906 104.344 114.75 105.375 114.75H109.125C110.156 114.75 111 113.906 111 112.875C111 111.844 110.156 111 109.125 111H105.375ZM89.4375 96C89.4375 94.7568 88.9436 93.5645 88.0646 92.6854C87.1855 91.8064 85.9932 91.3125 84.75 91.3125C83.5068 91.3125 82.3145 91.8064 81.4354 92.6854C80.5564 93.5645 80.0625 94.7568 80.0625 96C80.0625 97.2432 80.5564 98.4355 81.4354 99.3146C82.3145 100.194 83.5068 100.688 84.75 100.688C85.9932 100.688 87.1855 100.194 88.0646 99.3146C88.9436 98.4355 89.4375 97.2432 89.4375 96ZM107.25 100.688C108.493 100.688 109.685 100.194 110.565 99.3146C111.444 98.4355 111.938 97.2432 111.938 96C111.938 94.7568 111.444 93.5645 110.565 92.6854C109.685 91.8064 108.493 91.3125 107.25 91.3125C106.007 91.3125 104.815 91.8064 103.935 92.6854C103.056 93.5645 102.562 94.7568 102.562 96C102.562 97.2432 103.056 98.4355 103.935 99.3146C104.815 100.194 106.007 100.688 107.25 100.688ZM64.125 92.25H66V114.75H64.125C61.0195 114.75 58.5 112.23 58.5 109.125V97.875C58.5 94.7695 61.0195 92.25 64.125 92.25ZM127.875 92.25C130.98 92.25 133.5 94.7695 133.5 97.875V109.125C133.5 112.23 130.98 114.75 127.875 114.75H126V92.25H127.875Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_108_586">
                <path d="M58.5 66H133.5V126H58.5V66Z" fill="white"/>
                </clipPath>
                </defs>
                </svg>

            </div>
          </div>
          <div className="ayuda-chat-card">
            <div className="ayuda-chat-mensajes" ref={chatRef}>
              {mensajes.map((msg, idx) => (
                <div key={idx} className={`ayuda-msg ayuda-msg-${msg.autor}`}>
                  {msg.autor === 'bot' && <span className="ayuda-msg-avatar-bot">🤖</span>}
                  <span className="ayuda-msg-texto">{msg.texto}</span>
                  {msg.autor === 'user' && <span className="ayuda-msg-avatar-user">👤</span>}
                </div>
              ))}
            </div>
            <form className="ayuda-chat-form" onSubmit={handleEnviar}>
              <input
                className="ayuda-chat-input"
                type="text"
                placeholder="Escribe tu mensaje aquí..."
                value={input}
                onChange={e => setInput(e.target.value)}
                autoFocus
              />
              <button className="ayuda-chat-enviar" type="submit">
                <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg> Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
