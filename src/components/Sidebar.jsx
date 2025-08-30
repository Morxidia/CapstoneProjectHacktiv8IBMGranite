import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faHourglass, faCheckCircle, faFire, faBriefcase, faHome, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Sidebar({ tasks, setTasks, activeView, setActiveView, onOpenAddModal }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Count tasks by status
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const menuItems = [
  { 
    id: 'all', 
    label: 'All Tasks', 
    icon: <FontAwesomeIcon icon={faClipboard} className="w-4 h-4 " />, 
    count: totalTasks 
  },
  { 
    id: 'pending', 
    label: 'Pending', 
    icon: <FontAwesomeIcon icon={faHourglass} className="w-4 h-4 " />, 
    count: pendingTasks 
  },
  { 
    id: 'completed', 
    label: 'Completed', 
    icon: <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 " />, 
    count: completedTasks 
  },
]
  return (
    <div className={`
      bg-slate-800 text-white transition-all duration-300 h-screen fixed lg:relative
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-xl font-bold">Crankly</h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          {isCollapsed ? <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 " /> : <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 " />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`
              w-full flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-slate-700
              ${activeView === item.id ? 'bg-slate-600' : ''}
            `}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && (
              <>
                <span className="ml-3 flex-1 text-left">{item.label}</span>
                {item.count > 0 && (
                  <span className="bg-slate-600 text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>

      {/* Quick Add Section */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700">
          <h3 className="text-sm font-semibold text-slate-400 mb-2">Quick Add</h3>
          <button 
            onClick={onOpenAddModal}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>+</span>
            New Task
          </button>
        </div>
      )}

      {/* User Info Section */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700 mt-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-slate-400">{totalTasks} tasks</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;