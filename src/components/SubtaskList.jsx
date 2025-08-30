import { useState } from 'react';

function SubtaskList({ task, onUpdate }) {
  const [newSubtask, setNewSubtask] = useState('');

  const addSubtask = () => {
    if (!newSubtask.trim()) return;

    const updatedTask = {
      ...task,
      subtasks: [
        ...task.subtasks,
        {
          id: Date.now(),
          title: newSubtask.trim(),
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    };

    onUpdate(task.id, updatedTask);
    setNewSubtask('');
  };

  const toggleSubtask = (subtaskId) => {
    const updatedTask = {
      ...task,
      subtasks: task.subtasks.map(subtask =>
        subtask.id === subtaskId
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      )
    };

    onUpdate(task.id, updatedTask);
  };

  const deleteSubtask = (subtaskId) => {
    const updatedTask = {
      ...task,
      subtasks: task.subtasks.filter(subtask => subtask.id !== subtaskId)
    };

    onUpdate(task.id, updatedTask);
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-slate-700">Subtasks</h4>
      
      {/* Add Subtask Form */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addSubtask()}
          placeholder="Add a subtask..."
          className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={addSubtask}
          className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Subtasks List */}
      {task.subtasks.length > 0 && (
        <div className="space-y-2">
          {task.subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => toggleSubtask(subtask.id)}
                className="h-4 w-4 accent-blue-600"
              />
              <span className={`text-sm flex-1 ${subtask.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                {subtask.title}
              </span>
              <button
                onClick={() => deleteSubtask(subtask.id)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubtaskList;