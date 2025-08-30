import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Layout from './components/Layout';
import Header from './components/Header';
import TaskList from './components/TaskList';
import PomodoroTimer from './components/PomodoroTimer';
import AddTaskModal from './components/AddTaskModal';

function App() {
  const [tasks, setTasks] = useLocalStorage('Cracnkly-tasks', []);
  const [activeView, setActiveView] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter tasks based on active view
  const filteredTasks = tasks.filter(task => {
    switch (activeView) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      case 'today':
        return true;
      case 'upcoming':
        return true;
      default:
        return true;
    }
  });

  const handleAddTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <>
      <Layout 
        tasks={tasks} 
        setTasks={setTasks} 
        activeView={activeView} 
        setActiveView={setActiveView}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      >
        <Header />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Task Management Section */}
          <div className="xl:col-span-2 space-y-6">
            {/* Add Task Button instead of input form */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-xl">+</span>
                Add New Task
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">
                  {activeView === 'all' && 'All Tasks'}
                  {activeView === 'pending' && 'Pending Tasks'}
                  {activeView === 'completed' && 'Completed Tasks'}
                  {activeView === 'today' && "Today's Tasks"}
                  {activeView === 'upcoming' && 'Upcoming Tasks'}
                </h2>
                <span className="text-sm text-slate-500">
                  {filteredTasks.length} items
                </span>
              </div>
              <TaskList tasks={filteredTasks} setTasks={setTasks} />
            </div>
          </div>

          {/* Pomodoro Timer Section */}
          <div className="xl:col-span-1">
            <PomodoroTimer />
          </div>
        </div>
      </Layout>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </>
  );
}

export default App;