export default function Dashboard() {
  return (
    <div className="p-8 lg:p-12 max-w-7xl w-full mx-auto space-y-12 h-full z-10 relative">
      {/* Welcome Hero */}
      <section className="relative overflow-hidden rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 primary-gradient text-white shadow-xl">
        <div className="z-10 space-y-4">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold tracking-widest uppercase">Overview</span>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">Good morning,<br/>Alex.</h2>
          <p className="text-white/80 max-w-sm text-lg">I've organized your day. You have 3 urgent tasks and a meeting at 2:00 PM.</p>
        </div>
        <div className="relative w-full md:w-64 h-64 z-10">
          <div className="absolute inset-0 glass-card rounded-[2rem] border border-white/20 p-6 flex flex-col justify-center items-center text-on-surface">
            <span className="text-5xl font-black text-primary mb-2">84%</span>
            <p className="text-xs font-bold uppercase tracking-tighter opacity-60">Focus Score</p>
            <div className="w-full bg-surface-container h-2 rounded-full mt-6 overflow-hidden relative">
              <div className="bg-primary h-full w-[84%] absolute top-0 left-0"></div>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-tertiary/30 rounded-full blur-[80px]"></div>
      </section>

      {/* Bento Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Quick Actions */}
        <div className="md:col-span-8 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">bolt</span>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {['Upload Doc', 'New Task', 'Schedule', 'Draft Email'].map((action, i) => {
              const icons = ['upload_file', 'add_task', 'event', 'mail'];
              const bgs = ['bg-tertiary-container text-tertiary', 'bg-secondary-container text-secondary', 'bg-primary-container text-primary', 'bg-surface-container-highest text-on-surface-variant'];
              return (
                <button key={action} className="group flex flex-col items-center justify-center p-6 bg-surface-container-lowest/80 backdrop-blur-md border border-white/40 rounded-3xl hover:bg-primary hover:text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-2xl ${bgs[i]} flex items-center justify-center mb-3 group-hover:bg-white/20 group-hover:text-white transition-colors`}>
                    <span className="material-symbols-outlined">{icons[i]}</span>
                  </div>
                  <span className="text-sm font-bold">{action}</span>
                </button>
              )
            })}
          </div>

          <div className="pt-6">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">history</span>
              Recent Activity
            </h3>
            <div className="bg-surface-container-low/50 backdrop-blur-sm rounded-[2rem] p-4 space-y-2 border border-white/40 shadow-sm">
              {[
                { title: 'Project_Brief_V2.pdf', sub: 'Analyzed by AI Assistant • 2m ago', icon: 'description', color: 'bg-tertiary-container text-tertiary', badge: 'Processing' },
                { title: 'Research Summary', sub: 'New conversation started • 1h ago', icon: 'chat_bubble', color: 'bg-secondary-container text-secondary' },
                { title: 'Tax filing deadline', sub: 'Task marked as complete • 3h ago', icon: 'check_circle', color: 'bg-primary-container text-primary' }
              ].map(act => (
                <div key={act.title} className="flex items-center gap-4 p-4 bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl transition-all hover:shadow-md hover:-translate-y-0.5 border border-white/20 cursor-pointer">
                  <div className={`w-10 h-10 rounded-full ${act.color} flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-sm">{act.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{act.title}</p>
                    <p className="text-xs text-on-surface-variant">{act.sub}</p>
                  </div>
                  {act.badge && <span className="text-xs font-medium text-tertiary">{act.badge}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="md:col-span-4 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">notification_important</span>
            Deadlines
          </h3>
          <div className="bg-surface-container-low/50 backdrop-blur-sm shadow-sm border border-white/40 rounded-[2rem] p-6 h-[calc(100%-24px)] flex flex-col gap-6">
            <div className="space-y-4 flex-1">
              {[
                { time: 'Today, 5:00 PM', title: 'Submit Q3 Report', sub: 'Finance Department', border: 'border-error', color: 'text-error' },
                { time: 'Tomorrow, 10:00 AM', title: 'Client Presentation', sub: 'Marketing Team', border: 'border-primary', color: 'text-primary' },
                { time: 'Oct 24', title: 'Design System Sync', sub: 'Product Team', border: 'border-tertiary', color: 'text-tertiary' }
              ].map(dl => (
                <div key={dl.title} className={`relative pl-6 border-l-2 ${dl.border} hover:bg-surface-container-lowest/40 p-2 rounded-r-xl transition-colors cursor-pointer`}>
                  <p className={`text-[10px] font-bold ${dl.color} uppercase tracking-widest`}>{dl.time}</p>
                  <p className="text-sm font-bold mt-1">{dl.title}</p>
                  <p className="text-xs text-on-surface-variant">{dl.sub}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-auto p-5 bg-gradient-to-br from-tertiary-container/80 to-surface-container-lowest/80 backdrop-blur-xl rounded-[1.5rem] shadow-sm border border-tertiary/20 transform hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-tertiary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                <span className="text-xs font-bold text-on-tertiary-container">AI Insight</span>
              </div>
              <p className="text-xs leading-relaxed text-on-tertiary-container font-medium">
                Based on your current pace, you should start the Q3 report within the next hour to meet your deadline comfortably.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
