import { useState } from 'react';

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Finalize Q3 Report', category: 'Finance', completed: false, isPriority: true },
    { id: 2, title: 'Review Design System Tokens', category: 'Design', completed: true, isPriority: false },
    { id: 3, title: 'Schedule Client Sync', category: 'Account Management', completed: false, isPriority: false }
  ]);

  return (
    <div className="p-8 lg:p-12 max-w-4xl w-full mx-auto space-y-8 h-full z-10 relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-on-surface">Tasks</h2>
          <p className="text-sm text-on-surface-variant mt-1">You have 2 pending tasks today.</p>
        </div>
        <button className="w-10 h-10 primary-gradient text-white flex items-center justify-center rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>

      <div className="bg-surface-container-low/50 backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-sm">
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${task.completed ? 'opacity-40 bg-transparent' : 'glass-card border border-white/50 shadow-sm'}`}>
              <button 
                onClick={() => setTasks(t => t.map(x => x.id === task.id ? {...x, completed: !x.completed} : x))}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-primary border-primary text-white' : 'border-outline-variant text-transparent hover:border-primary'}`}
              >
                <span className="material-symbols-outlined text-[14px]">check</span>
              </button>
              <div className="flex-1">
                <p className={`text-sm font-bold ${task.completed ? 'line-through' : ''}`}>{task.title}</p>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">{task.category}</p>
              </div>
              {task.isPriority && !task.completed && (
                <span className="px-3 py-1 bg-error-container/20 text-error rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Urgent
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
