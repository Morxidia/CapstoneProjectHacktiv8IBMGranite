import { useState } from 'react';
import SubtaskList from './SubtaskList';
import { PRIORITY_CONFIG, CATEGORY_CONFIG } from '../config/taskConfig';

function TaskItem({ task, onToggle, onDelete, onUpdate, isSelected, onSelect }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editCategory, setEditCategory] = useState(task.category);

  const priorityConfig = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
  const categoryConfig = CATEGORY_CONFIG[task.category] || CATEGORY_CONFIG.personal;

  const handleSaveEdit = () => {
    onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
      category: editCategory
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority);
    setEditCategory(task.category);
    setIsEditing(false);
  };

  const completionPercentage = task.subtasks.length > 0
    ? Math.round((task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100)
    : 0;

  return (
    <div className={`border rounded-lg hover:shadow-md transition-shadow bg-white ${priorityConfig.borderColor}`}>
      {/* Main Task Header */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(task.id)}
              className="h-4 w-4 accent-blue-600 cursor-pointer"
            />
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="h-5 w-5 accent-blue-600 cursor-pointer"
            />
            
            {isEditing ? (
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Add description..."
                  rows="2"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-3">
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="shopping">Shopping</option>
                    <option value="health">Health</option>
                    <option value="learning">Learning</option>
                  </select>
                </div>
              </div>
            ) : (
              <div 
                className="flex-1 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`
                    text-lg font-medium
                    ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}
                  `}>
                    {task.title}
                  </span>
                  
                  {/* Priority Badge */}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.bgColor} ${priorityConfig.textColor} flex items-center gap-1`}>
                    <span>{priorityConfig.icon}</span>
                    <span>{task.priority}</span>
                  </span>

                  {/* Category Badge */}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryConfig.bgColor} ${categoryConfig.textColor} flex items-center gap-1`}>
                    <span>{categoryConfig.icon}</span>
                    <span>{task.category}</span>
                  </span>
                </div>

                {task.description && (
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                    {task.description}
                  </p>
                )}

                {/* Progress bar for subtasks */}
                {task.subtasks.length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>Subtasks: {completionPercentage}% complete</span>
                      <span>{task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Save"
                >
                  ✅
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                  title="Cancel"
                >
                  ❌
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Expanded View with Subtasks */}
      {isExpanded && !isEditing && (
        <div className="border-t border-slate-200 p-4">
          <SubtaskList task={task} onUpdate={onUpdate} />
        </div>
      )}
    </div>
  );
}

export default TaskItem;