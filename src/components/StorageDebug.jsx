function StorageDebug({ tasks }) {
  const clearStorage = () => {
    if (confirm('Clear all tasks from localStorage?')) {
      localStorage.removeItem('focus-forge-tasks');
      window.location.reload();
    }
  };

  return (
    <div className="mt-8 p-4 bg-slate-100 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">Storage Debug</h3>
        <button 
          onClick={clearStorage}
          className="text-xs bg-red-500 text-white px-2 py-1 rounded"
        >
          Clear Storage
        </button>
      </div>
      <p className="text-xs text-slate-600">
        Tasks in storage: {tasks.length} | 
        Total size: {JSON.stringify(tasks).length} bytes
      </p>
    </div>
  );
}

export default StorageDebug;