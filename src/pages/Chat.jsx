import { useState, useEffect, useRef } from 'react';
import { chatAPI } from '../services/apiClient';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Send to backend API
      const response = await chatAPI.sendMessage(input);
      
      const aiMessage = {
        id: Date.now() + 1,
        role: 'ai',
        content: response.data?.reply || response.data || 'Sorry, I could not process that.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        role: 'ai',
        content: '❌ Sorry, there was an error. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full">
      {/* Historical Sidebar */}
      <div className="w-72 bg-surface-container-low/50 backdrop-blur-sm border-r border-outline-variant/10 flex flex-col overflow-y-auto hidden lg:flex">
        <div className="p-6">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4 px-2">Recent Chats</h3>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2.5 rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-3 group transition-all">
              <span className="material-symbols-outlined text-primary text-sm">chat_bubble</span>
              <span className="text-sm font-medium truncate">New Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative w-full h-full bg-surface/30">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-10 space-y-8 max-w-4xl mx-auto w-full pb-32">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-primary/30 block mb-4">auto_awesome</span>
              <h2 className="text-2xl font-bold text-on-surface">Start a conversation</h2>
              <p className="text-on-surface-variant mt-2">Ask me anything about managing your tasks, reminders, and documents!</p>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} group`}>
              <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-white shadow-md ${
                msg.role === 'ai' ? 'primary-gradient' : 'bg-surface-container-highest border border-outline-variant/20'
              }`}>
                <span className="material-symbols-outlined text-xs">
                  {msg.role === 'ai' ? 'auto_awesome' : (
                    <img alt="User" src="https://lh3.googleusercontent.com/a-/AFdZucozF" className="w-full h-full object-cover rounded-lg" />
                  )}
                </span>
              </div>
              <div className={`flex-1 space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block px-6 py-4 rounded-xl ${
                  msg.role === 'ai'
                    ? 'glass-card border border-white/50 rounded-tl-none shadow-sm'
                    : 'bg-surface-container-highest rounded-tr-none shadow-sm'
                } text-on-surface leading-relaxed ${msg.role === 'user' ? 'max-w-[80%] ml-auto' : ''}`}>
                  {msg.content}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant/50">
                    {msg.role === 'ai' ? 'AI Assistant' : 'You'} • {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-4 group">
              <div className="w-8 h-8 rounded-lg primary-gradient flex-shrink-0 flex items-center justify-center text-white shadow-md">
                <span className="material-symbols-outlined text-xs animate-spin">auto_awesome</span>
              </div>
              <div className="flex-1 space-y-2">
                <div className="glass-card border border-white/50 p-6 rounded-xl rounded-tl-none shadow-sm">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="absolute bottom-0 left-0 w-full px-6 py-6 bg-gradient-to-t from-surface via-surface/90 to-transparent">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-3">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 bg-surface-container-lowest rounded-full px-6 py-3 border border-outline-variant/30 focus:outline-none focus:border-primary disabled:opacity-50 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-12 h-12 primary-gradient text-white flex items-center justify-center rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel border border-white/50 rounded-3xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex items-end gap-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40 transition-all">
              <div className="flex items-center pb-2 pl-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant">
                  <span className="material-symbols-outlined">attach_file</span>
                </button>
              </div>
              <textarea 
                className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 min-h-[48px] outline-none" 
                placeholder="Type a message or drop a file..." 
                rows="1"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <div className="flex items-center pb-2 pr-2">
                <button className="w-10 h-10 primary-gradient text-white flex items-center justify-center rounded-full shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>send</span>
                </button>
              </div>
            </div>
            <p className="text-[10px] text-center text-on-surface-variant/50 mt-2 font-medium">Curator AI may display inaccurate info, so double-check its responses.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
