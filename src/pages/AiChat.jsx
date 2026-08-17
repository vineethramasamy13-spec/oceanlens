import React, { useState, useEffect, useRef } from 'react';
import { generateGeneralChatResponse } from '../utils/groqOceanAI';
import { Send, Sparkles, MessageSquare, Trash2, Cpu, Waves, HelpCircle, Code, ShieldCheck } from 'lucide-react';

export default function AiChat() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am **OceanLens AI**, your general-purpose assistant. 

While my core expertise is rooted in physical oceanography, marine biology, and analyzing global ARGO float datasets, I can answer **any question** on any topic—whether it's ocean science, general science, coding, mathematics, or creative writing.

Choose one of the quick suggestions below, or type your own question in the input box!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    { text: "Explain the SOFAR channel and deep sea sound speed.", category: "Ocean Acoustics", icon: Waves },
    { text: "How do ARGO robotic floats work & transmit data?", category: "ARGO Program", icon: HelpCircle },
    { text: "Why is salinity lower in the Bay of Bengal than the Arabian Sea?", category: "Ocean Physics", icon: Waves },
    { text: "Write a JavaScript function to compute seawater density (Sigma-t).", category: "Coding", icon: Code },
    { text: "What is Mixed Layer Depth (MLD) and why is it critical?", category: "Climate Science", icon: Sparkles }
  ];

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    if (!textToSend) {
      setInputValue('');
    }

    const userMessageId = `msg-${Date.now()}`;
    const userMsg = {
      id: userMessageId,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Build message history for the AI API context
    const history = messages
      .filter(m => m.id !== 'welcome')
      .map(m => ({ role: m.role, content: m.content }));
    history.push({ role: 'user', content: query });

    try {
      const response = await generateGeneralChatResponse(history);
      
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: response.content,
          model: response.model,
          tokensUsed: response.tokensUsed,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: `⚠️ Failed to get a response: ${err.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: `Chat history cleared. How can I help you today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  // Basic HTML formatter for simple Markdown syntax
  const formatMessageContent = (text) => {
    if (!text) return '';
    
    // Check for code blocks
    if (text.includes('```')) {
      const parts = text.split('```');
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          // Inside a code block
          const lines = part.split('\n');
          const language = lines[0].trim() || 'code';
          const code = lines.slice(1).join('\n').trim();
          return (
            <div key={index} className="my-3 rounded-lg overflow-hidden border border-cyan-500/10 bg-slate-950 font-mono text-xs">
              <div className="bg-slate-900 px-4 py-2 border-b border-cyan-500/10 flex items-center justify-between text-[11px] text-cyan-400">
                <span className="font-semibold">{language}</span>
                <span className="uppercase text-[9px] font-bold tracking-wider text-slate-500">code block</span>
              </div>
              <pre className="p-4 overflow-x-auto text-cyan-300/90 whitespace-pre-wrap break-all md:whitespace-pre md:break-normal">
                <code>{code}</code>
              </pre>
            </div>
          );
        } else {
          return renderTextWithFormatting(part, index);
        }
      });
    }
    return renderTextWithFormatting(text, 0);
  };

  const renderTextWithFormatting = (text, keyPrefix) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      let isBullet = false;
      let cleanLine = line;
      
      if (line.trim().startsWith('●') || line.trim().startsWith('•') || line.trim().startsWith('-')) {
        isBullet = true;
        cleanLine = line.trim().substring(1).trim();
      }

      // Format bold text (**bold**)
      const boldParts = cleanLine.split('**');
      const renderedLine = boldParts.map((part, partIdx) => {
        if (partIdx % 2 === 1) {
          return <strong key={partIdx} className="font-bold text-cyan-200">{part}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <ul key={`${keyPrefix}-${lineIdx}`} className="list-disc pl-5 my-1.5 text-slate-700 dark:text-slate-300">
            <li className="leading-relaxed text-sm">{renderedLine}</li>
          </ul>
        );
      }

      return (
        <p key={`${keyPrefix}-${lineIdx}`} className="my-2 min-h-[1rem] text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 bg-transparent">
      
      {/* 1. Chat Header */}
      <div className="flex items-center justify-between p-4 bg-white/90 dark:bg-ocean-950/85 backdrop-blur-md border-b border-slate-200 dark:border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center shadow-glow-cyan">
            <MessageSquare className="w-5 h-5 text-ocean-950" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              OceanLens AI Chatbot
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20">Active</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Ask any questions - ocean physics, data calculations, or general topics.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Cpu className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>LLaMA-3 70B</span>
          </div>
          <button 
            onClick={clearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-rose-200 dark:border-rose-500/20 hover:border-rose-300 dark:hover:border-rose-500/40 bg-rose-50 dark:bg-rose-500/5 text-rose-600 dark:text-rose-300 transition-all duration-200"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>
      </div>

      {/* 2. Messages Box */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#f0f5f9]/20 dark:bg-ocean-950/40 space-y-6 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {messages.map((message) => {
          const isAi = message.role === 'assistant';
          return (
            <div 
              key={message.id} 
              className={`flex gap-3 max-w-3xl ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              {/* Avatar Icon */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                isAi 
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400 shadow-sm dark:shadow-glow-cyan' 
                  : 'bg-teal-500/10 border-teal-500/30 text-teal-600 dark:text-teal-400'
              }`}>
                {isAi ? <Sparkles className="w-4 h-4" /> : <span className="text-xs font-bold font-mono">U</span>}
              </div>

              {/* Message Bubble */}
              <div className="space-y-1">
                <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                  isAi 
                    ? 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 rounded-tl-none shadow-sm' 
                    : 'bg-cyan-50/70 dark:bg-gradient-to-br dark:from-cyan-950/70 dark:to-ocean-900/70 border-cyan-200 dark:border-cyan-500/20 rounded-tr-none shadow-sm dark:shadow-glow-cyan-sm'
                }`}>
                  <div className="text-sm select-text selection:bg-cyan-500 selection:text-ocean-950 text-slate-800 dark:text-slate-200">
                    {formatMessageContent(message.content)}
                  </div>
                </div>
                
                {/* Meta details (timestamp & token info) */}
                <div className={`flex items-center gap-2 text-[10px] text-slate-500 ${isAi ? 'justify-start' : 'justify-end'}`}>
                  <span>{message.timestamp}</span>
                  {isAi && message.tokensUsed && (
                    <>
                      <span>•</span>
                      <span className="font-mono text-[9px] text-slate-500">
                        {message.tokensUsed} tokens ({message.model})
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-3xl mr-auto">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 animate-pulse shadow-glow-cyan">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="p-4 rounded-2xl border bg-slate-900/60 border-slate-800 rounded-tl-none flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <div className="text-[10px] text-slate-500 animate-pulse">Running grounded AI reasoning...</div>
            </div>
          </div>
        )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 3. Input & Suggestion Chips Box */}
      <div className="border-t border-slate-200 dark:border-cyan-500/20 bg-white/90 dark:bg-ocean-950/85 backdrop-blur-md">
        <div className="max-w-5xl mx-auto p-4 space-y-4">
        
        {/* Quick Suggestion Chips (only display when there are no user queries yet) */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mr-1">Suggestions:</span>
            {quickPrompts.map((prompt, idx) => {
              const Icon = prompt.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt.text)}
                  disabled={isLoading}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] border border-slate-200 dark:border-slate-800 hover:border-cyan-500/30 bg-slate-100 dark:bg-slate-900/40 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Icon className="w-2.5 h-2.5 text-cyan-600 dark:text-cyan-400/70" />
                  <span className="font-semibold text-[10px] text-slate-700 dark:text-slate-200">{prompt.category}:</span>
                  <span className="text-slate-500 dark:text-slate-400 truncate max-w-[130px] md:max-w-xs ml-1">{prompt.text}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Input box form */}
        <div className="flex items-stretch gap-2">
          <div className="relative flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              placeholder="Ask me anything... (e.g. Write a python script for MLD or explain ocean acoustics)"
              rows="1"
              className="w-full pl-4 pr-12 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/10 dark:focus:ring-cyan-500/20 resize-none max-h-32 transition-all"
            />
            <div className="absolute right-3.5 bottom-3.5 text-[10px] text-slate-500 font-mono hidden md:block">
              Enter to send
            </div>
          </div>

          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isLoading}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-ocean-950 font-bold hover:from-cyan-400 hover:to-teal-400 transition-all duration-200 flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 shadow-glow-cyan"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Footer / Info */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-teal-400" />
            <span>Secure TLS Encryption • Direct LLaMA Pipeline</span>
          </div>
          <span>Powered by Groq API Service</span>
        </div>

        </div>
      </div>

    </div>
  );
}
