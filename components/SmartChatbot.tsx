"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

export default function SmartChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: '¡Hola! Soy el asistente de la Iglesia. ¿En qué te puedo ayudar hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para mejor UX
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
      }
    } catch (error) {
      console.error("Error conectando con el bot");
      setMessages(prev => [...prev, { role: 'bot', content: 'Lo siento, estoy teniendo problemas para conectarme en este momento. Intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* 
      Cambio UX: Movido a la derecha (right-6) y elevado (bottom-24) 
      para dar espacio al botón de WhatsApp en bottom-6 
    */
    <div className="fixed bottom-24 right-6 z-[9999] font-sans flex flex-col items-end">
      
      {isOpen && (
        <div className="bg-neutral-900/95 backdrop-blur-xl w-[340px] sm:w-[380px] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden flex flex-col mb-4 h-[520px] transform origin-bottom-right animate-in zoom-in-95 fade-in duration-200">
          
          {/* Header Minimalista pero elegante */}
          <div className="bg-white/5 border-b border-white/10 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-white to-gray-300 flex items-center justify-center shadow-inner">
                <MessageCircle size={18} className="text-black" />
              </div>
              <div>
                <h3 className="font-medium text-white text-sm tracking-wide">Asistente ICC</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <p className="text-white/60 text-xs font-light">En línea</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/50 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cuerpo del Chat */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`text-[13px] md:text-sm p-3.5 max-w-[85%] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-white text-black rounded-2xl rounded-tr-sm font-medium' 
                      : 'bg-neutral-800/80 text-gray-100 border border-white/5 rounded-2xl rounded-tl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            
            {/* Indicador de "Escribiendo..." */}
            {isLoading && (
              <div className="flex justify-start animate-in fade-in duration-200">
                <div className="bg-neutral-800/80 border border-white/5 rounded-2xl rounded-tl-sm p-4 flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input de Mensaje */}
          <form onSubmit={sendMessage} className="p-3 border-t border-white/10 bg-black/20 flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              disabled={isLoading}
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="bg-white text-black rounded-full w-10 h-10 flex shrink-0 items-center justify-center hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin text-black" />
              ) : (
                <Send size={16} className="ml-0.5 text-black" />
              )}
            </button>
          </form>
        </div>
      )}

      {/* Botón Flotante Cerrado */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 border border-transparent group"
          aria-label="Abrir chat"
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-300" />
          
          {/* Indicador de notificación */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-white"></span>
          </span>
        </button>
      )}
    </div>
  );
}