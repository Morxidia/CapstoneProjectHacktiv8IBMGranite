import { useState } from 'react';
import BulkActions from './BulkActions';
import TaskItem from './TaskItem';
import { PRIORITY_CONFIG, CATEGORY_CONFIG } from '../config/taskConfig';

function TaskList({ tasks, setTasks }) {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [groupBy, setGroupBy] = useState('priority'); // 'priority' or 'category'

  const toggleTask = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              completed: !task.completed,
              updatedAt: new Date().toISOString()
            }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      setSelectedTasks(prev => prev.filter(id => id !== taskId));
    }
  };

  const updateTask = (taskId, updatedData) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, ...updatedData, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const handleTaskSelect = (taskId) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  // Group tasks by priority or category
  const groupedTasks = tasks.reduce((groups, task) => {
    const groupKey = groupBy === 'priority' ? task.priority : task.category;
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(task);
    return groups;
  }, {});

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <BulkActions
        tasks={tasks}
        setTasks={setTasks}
        selectedTasks={selectedTasks}
        setSelectedTasks={setSelectedTasks}
      />

      {/* Grouping Selector */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
        <span className="text-sm font-medium text-slate-700">Group by:</span>
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="priority">Priority</option>
          <option value="category">Category</option>
          <option value="none">None</option>
        </select>
      </div>

      <div className="space-y-6">
        {tasks.length === 0 ? (
          <p className="text-center text-slate-500 py-4">No tasks yet. Add one to get started!</p>
        ) : groupBy === 'none' ? (
          // Flat list (no grouping)
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
                isSelected={selectedTasks.includes(task.id)}
                onSelect={handleTaskSelect}
              />
            ))}
          </div>
        ) : (
          Object.entries(groupedTasks).map(([group, groupTasks]) => (
            <div key={group} className="mb-6">
              <h3 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <span>{PRIORITY_CONFIG[group]?.icon || CATEGORY_CONFIG[group]?.icon}</span>
                {group.charAt(0).toUpperCase() + group.slice(1)} Tasks
                <span className="text-sm text-slate-500 ml-2">({groupTasks.length})</span>
              </h3>
              <div className="space-y-3">
                {groupTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onUpdate={updateTask}
                    isSelected={selectedTasks.includes(task.id)}
                    onSelect={handleTaskSelect}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;