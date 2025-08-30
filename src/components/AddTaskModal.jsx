import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faHourglass, faCheckCircle, faFire, faBriefcase, faHome, faArrowLeft, faArrowRight, faInbox, faFeatherPointed } from '@fortawesome/free-solid-svg-icons'


function AddTaskModal({ isOpen, onClose, onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');
 
  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('personal');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      subtasks: [],
      dueDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      priority,
      category
    };

    onAddTask(newTask);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">Add New Task</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details about this task..."
              rows="4"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Priority Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <a>Priority</a>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'high', icon: <FontAwesomeIcon icon={faFire} className="w-4 h-4 text-orange-400" />, label: 'High' },
                { value: 'medium', icon: <FontAwesomeIcon icon={faInbox} className='w-4 h-4'/>, label: 'Medium' },
                { value: 'low', icon: <FontAwesomeIcon icon={faFeatherPointed} className='w-4 h-4'/>, label: 'Low' }
              ].map(({ value, icon, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPriority(value)}
                  className={`
                    px-3 py-2 rounded-lg border transition-all duration-200 flex items-center justify-center gap-1
                    ${priority === value 
                      ? value === 'high' 
                        ? 'bg-red-100 border-red-300 text-red-700' 
                        : value === 'medium' 
                        ? 'bg-yellow-100 border-yellow-300 text-yellow-700' 
                        : 'bg-green-100 border-green-300 text-green-700'
                      : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                    }
                  `}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
                <option value="learning">Learning</option>
              </select>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;