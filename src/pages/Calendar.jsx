export default function Calendar() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <div className="p-8 lg:p-12 max-w-5xl w-full mx-auto space-y-8 h-full z-10 relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-on-surface">Calendar</h2>
          <p className="text-sm text-on-surface-variant mt-1">October 2024</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-surface-container-low rounded-full hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button className="p-2 bg-surface-container-low rounded-full hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="glass-card bg-surface-container-lowest/70 backdrop-blur-md rounded-3xl p-6 border border-white/40 shadow-sm">
        {/* Calendar Grid Header */}
        <div className="grid grid-cols-7 mb-4">
          {days.map(day => (
            <div key={day} className="text-center text-[10px] uppercase tracking-widest font-bold text-on-surface-variant pb-4 border-b border-outline-variant/10">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid Body */}
        <div className="grid grid-cols-7 gap-y-6">
          {/* Dummy placeholders for empty days */}
          <div className="h-24"></div>
          <div className="h-24"></div>
          
          {Array.from({ length: 31 }).map((_, i) => {
            const date = i + 1;
            const isToday = date === 24;
            const hasEvent = date === 24 || date === 25;
            
            return (
              <div key={date} className={`h-24 group border-b border-transparent ${isToday ? '' : 'hover:border-outline-variant/20'} flex flex-col p-2 cursor-pointer transition-all`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto transition-colors ${isToday ? 'primary-gradient text-white shadow-md' : 'text-on-surface group-hover:bg-surface-container-high'}`}>
                  {date}
                </div>
                {hasEvent && (
                  <div className="mt-2 flex flex-col gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary block"></span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
