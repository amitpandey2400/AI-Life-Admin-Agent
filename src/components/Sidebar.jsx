import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'dashboard' },
    { name: 'Assistant', path: '/chat', icon: 'chat_spark' },
    { name: 'Documents', path: '/documents', icon: 'folder_open' },
    { name: 'Tasks', path: '/tasks', icon: 'checklist' },
    { name: 'Calendar', path: '/calendar', icon: 'calendar_today' },
  ];

  return (
    <aside className="h-screen w-64 flex flex-col sticky top-0 bg-[#f0f4f7] dark:bg-slate-900 font-manrope text-sm font-medium tracking-tight py-6 z-50 flex-shrink-0">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center text-white shadow-md">
          <span className="material-symbols-outlined">auto_awesome</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-[#2c3437] dark:text-slate-100 leading-none">The Curator</h1>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">AI Assistant</p>
        </div>
      </div>

      <div className="px-4 mb-6">
        <button className="w-full primary-gradient text-white rounded-full py-3 px-4 flex items-center justify-center gap-2 shadow-sm scale-98 active:scale-95 transition-transform duration-200">
          <span className="material-symbols-outlined text-sm">add</span>
          <span>New Chat</span>
        </button>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 mx-2 px-4 py-3 rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-primary-container text-white shadow-sm'
                  : 'text-[#2c3437] dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:translate-x-1'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-outline-variant/10">
        <button className="w-full text-left flex items-center gap-3 text-[#2c3437] dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-all mx-2 px-4 py-3">
          <span className="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </button>
        <button className="w-full text-left flex items-center gap-3 text-[#2c3437] dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-all mx-2 px-4 py-3">
          <span className="material-symbols-outlined">help_outline</span>
          <span>Support</span>
        </button>

        <div className="mx-4 mt-4 p-3 bg-surface-container-highest/40 rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-surface-container-highest/60 transition-colors">
          <img
            alt="User profile photo"
            className="w-10 h-10 rounded-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBezOyDeAB00OeGnC6SFNRpsSL3uhHd9CTzN2HBzKJW1cd-MkizYn_da0sTeV8vGY0DzW-ndW1sWTAjUHgHrDHhq2UFpKd-tbvNl7kV8BL8TG-D-42VrdWE7LgclTG21R-2HJu1KEEA9MgSlqDzzTA2rtwaKMisVW06iKtnLwScJLnL0soQoTCSaurzvmqS8aLgjAOFdHyOBdDoLmHOvZ62pRdxnzKCquVvXEu0n1qHGOBo80p_XqTeX3JUQNjv79XQXSbBAikn3Pn0"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate">Alex Morgan</p>
            <p className="text-[10px] text-on-surface-variant truncate">Premium Curator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
