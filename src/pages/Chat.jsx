import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  return (
    <div className="flex h-full w-full">
      {/* Historical Sidebar */}
      <div className="w-72 bg-surface-container-low/50 backdrop-blur-sm border-r border-outline-variant/10 flex flex-col overflow-y-auto hidden lg:flex">
        <div className="p-6">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4 px-2">Recent Chats</h3>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2.5 rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-3 group transition-all">
              <span className="material-symbols-outlined text-primary text-sm">chat_bubble</span>
              <span className="text-sm font-medium truncate">Quarterly Report Analysis</span>
            </button>
            <button className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-surface-container-high flex items-center gap-3 group transition-all">
              <span className="material-symbols-outlined text-on-surface-variant text-sm group-hover:text-primary">chat_bubble</span>
              <span className="text-sm text-on-surface-variant group-hover:text-on-surface truncate">API Integration Guide</span>
            </button>
            <button className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-surface-container-high flex items-center gap-3 group transition-all">
              <span className="material-symbols-outlined text-on-surface-variant text-sm group-hover:text-primary">chat_bubble</span>
              <span className="text-sm text-on-surface-variant group-hover:text-on-surface truncate">Marketing Strategy Brai...</span>
            </button>
          </div>
          
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-10 mb-4 px-2">Folders</h3>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-container-high flex items-center gap-3 group transition-all">
              <span className="material-symbols-outlined text-on-surface-variant text-sm">folder</span>
              <span className="text-sm text-on-surface-variant">Projects</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative w-full h-full bg-surface/30">
        <div className="flex-1 overflow-y-auto px-6 py-10 space-y-8 max-w-4xl mx-auto w-full pb-32">
          
          {/* AI Message */}
          <div className="flex gap-4 group">
            <div className="w-8 h-8 rounded-lg primary-gradient flex-shrink-0 flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-xs">auto_awesome</span>
            </div>
            <div className="flex-1 space-y-2">
              <div className="glass-card border border-white/50 p-6 rounded-xl rounded-tl-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-on-surface leading-relaxed backdrop-blur-xl">
                Good morning, Alex. I've finished analyzing the data sets you uploaded yesterday. The key takeaway is a 14% increase in conversion rates following the UI update. Would you like me to generate a summary visualization or dive deeper into the specific demographics?
              </div>
              <div className="flex items-center gap-4 px-1">
                <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant/50">AI Curator • 09:41 AM</span>
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-4 flex-row-reverse group">
            <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex-shrink-0 flex items-center justify-center overflow-hidden border border-outline-variant/20 shadow-sm">
              <img alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuINTrPM8NgnL_bbECy3d_3AZoKJd86PvuZpKpgLPzALJnniPZJ7_mSvXVzA_NpyJlfxfSldIL_Pxg9yzaaMkt-WNFkr9AXsi0kMhvuo-hmaWryQ2ZDoUjIXfRn3pY8a-FezVCe6R6v3wAumjAQiZ1SJLkGv4JCqGFs4fy-MjtNtrm5CPqoxLKV5ws_mOL2S7QUU_YAysWnk8wGJRs0YoQSt15uzuhZMxBSRtwT1uRNuxnXoK4dlwM3uAbpJ_nWOUIXOeiy4N7WU5V" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-2 text-right">
              <div className="bg-surface-container-highest inline-block px-6 py-4 rounded-xl rounded-tr-none text-on-surface leading-relaxed max-w-[80%] text-left shadow-sm">
                That's great news. Let's see the visualization for the demographics. Specifically, I'm interested in the 25-34 age bracket in the North American region.
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant/50">Alex • 09:43 AM</span>
              </div>
            </div>
          </div>
          
          {/* AI Message with Data Card */}
          <div className="flex gap-4 group hover-trigger">
            <div className="w-8 h-8 rounded-lg primary-gradient flex-shrink-0 flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-xs">auto_awesome</span>
            </div>
            <div className="flex-1 space-y-4">
              <div className="glass-card border border-white/50 p-6 rounded-xl rounded-tl-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-on-surface leading-relaxed backdrop-blur-xl">
                Certainly. I've prepared a breakdown of the 25-34 demographic performance. The peak activity occurs between 6:00 PM and 9:00 PM EST. Here's the distribution map:
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl glass-card border border-white/40 flex flex-col gap-3 shadow-sm hover:-translate-y-1 transition-transform">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Regional Growth</span>
                  <div className="text-3xl font-manrope font-extrabold text-primary">+22.4%</div>
                  <div className="h-12 w-full flex items-end gap-1 px-1">
                    <div className="w-full bg-primary/20 h-1/2 rounded-t-sm"></div>
                    <div className="w-full bg-primary/20 h-2/3 rounded-t-sm"></div>
                    <div className="w-full bg-primary/20 h-1/3 rounded-t-sm"></div>
                    <div className="w-full bg-primary/40 h-3/4 rounded-t-sm"></div>
                    <div className="w-full bg-primary h-full rounded-t-sm shadow-sm relative overflow-hidden">
                       <div className="absolute inset-0 bg-white/20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="absolute bottom-0 left-0 w-full px-6 py-6 bg-gradient-to-t from-surface via-surface/90 to-transparent">
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
