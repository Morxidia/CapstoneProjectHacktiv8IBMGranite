function BulkActions({ tasks, setTasks, selectedTasks, setSelectedTasks }) {
  const allSelected = selectedTasks.length > 0 && selectedTasks.length === tasks.length;
  const someSelected = selectedTasks.length > 0 && selectedTasks.length < tasks.length;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedTasks.length === 0) return;
    
    if (confirm(`Delete ${selectedTasks.length} task(s)? This action cannot be undone.`)) {
      setTasks(prevTasks => prevTasks.filter(task => !selectedTasks.includes(task.id)));
      setSelectedTasks([]);
    }
  };

  const handleDeleteAll = () => {
    if (tasks.length === 0) return;
    
    if (confirm(`Delete ALL ${tasks.length} tasks? This action cannot be undone.`)) {
      setTasks([]);
      setSelectedTasks([]);
    }
  };

  if (tasks.length === 0) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-slate-100 rounded-lg mb-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={allSelected}
          ref={input => {
            if (input) {
              input.indeterminate = someSelected;
            }
          }}
          onChange={handleSelectAll}
          className="h-4 w-4 accent-blue-600"
        />
        <span className="text-sm text-slate-700">
          {allSelected ? 'Deselect all' : 'Select all'}
        </span>
      </div>

      {selectedTasks.length > 0 && (
        <>
          <span className="text-sm text-slate-500">
            {selectedTasks.length} selected
          </span>
          <button
            onClick={handleDeleteSelected}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
          >
            Delete Selected
          </button>
        </>
      )}

      <div className="ml-auto">
        <button
          onClick={handleDeleteAll}
          className="px-3 py-1 bg-red-800 text-white text-sm rounded-md hover:bg-red-900 transition-colors"
        >
          Delete All Tasks
        </button>
      </div>
    </div>
  );
}

export default BulkActions;