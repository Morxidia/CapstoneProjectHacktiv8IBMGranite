import Sidebar from './Sidebar';

function Layout({ children, tasks, setTasks, activeView, setActiveView, onOpenAddModal }) {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar 
        tasks={tasks} 
        setTasks={setTasks} 
        activeView={activeView} 
        setActiveView={setActiveView}
        onOpenAddModal={onOpenAddModal}
      />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto lg:ml-0">
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;