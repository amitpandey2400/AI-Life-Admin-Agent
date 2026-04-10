import { useLocation } from 'react-router-dom';

export default function TopNavBar() {
  const location = useLocation();
  const isChat = location.pathname === '/chat';

  return (
    <header className="flex flex-shrink-0 items-center justify-between px-8 w-full h-16 sticky top-0 z-40 bg-[#f7f9fb]/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(44,52,55,0.06)] font-manrope tracking-normal text-on-surface">
      <div className="flex items-center gap-6 flex-1">
        {isChat && (
          <div className="hidden md:block font-black text-[#2c3437] dark:text-slate-100 text-xl">
            Curator AI
          </div>
        )}
        <div className={`relative w-full max-w-md ${isChat ? 'ml-4' : ''}`}>
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
          <input
            className="w-full bg-surface-container border-none rounded-full py-2 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/60"
            placeholder={isChat ? "Search conversations..." : "Ask Curator anything..."}
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-[#2c3437] dark:text-slate-400 hover:opacity-80 transition-opacity scale-98 active:scale-95">
          <span className="material-symbols-outlined">history</span>
        </button>
        <button className="p-2 text-[#2c3437] dark:text-slate-400 hover:opacity-80 transition-opacity scale-98 active:scale-95 relative">
          <span className="material-symbols-outlined">notifications</span>
          {isChat && <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>}
        </button>

        <div className="h-8 w-[1px] bg-outline-variant/20 mx-2"></div>

        <img
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuINTrPM8NgnL_bbECy3d_3AZoKJd86PvuZpKpgLPzALJnniPZJ7_mSvXVzA_NpyJlfxfSldIL_Pxg9yzaaMkt-WNFkr9AXsi0kMhvuo-hmaWryQ2ZDoUjIXfRn3pY8a-FezVCe6R6v3wAumjAQiZ1SJLkGv4JCqGFs4fy-MjtNtrm5CPqoxLKV5ws_mOL2S7QUU_YAysWnk8wGJRs0YoQSt15uzuhZMxBSRtwT1uRNuxnXoK4dlwM3uAbpJ_nWOUIXOeiy4N7WU5V"
        />
      </div>
    </header>
  );
}
