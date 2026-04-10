import { useState, useEffect } from 'react';
import { tasksAPI } from '../services/apiClient';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getAllTasks();
      setTasks(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const newTask = await tasksAPI.createTask({
        title: newTaskTitle,
        priority: newTaskPriority,
        completed: false,
      });

      setTasks([...tasks, newTask.data]);
      setNewTaskTitle('');
      setNewTaskPriority('medium');
    } catch (err) {
      console.error('Error creating task:', err);
      alert('Failed to create task');
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    try {
      const updatedTask = await tasksAPI.updateTask(taskId, { completed: !completed });
      setTasks(tasks.map(t => t._id === taskId ? updatedTask.data : t));
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await tasksAPI.deleteTask(taskId);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading tasks...</div>;

  return (
    <div className="p-8 lg:p-12 max-w-4xl w-full mx-auto space-y-8 h-full z-10 relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-on-surface">Tasks</h2>
          <p className="text-sm text-on-surface-variant mt-1">You have {tasks?.length || 0} tasks.</p>
        </div>
      </div>

      {error && (
        <div className="bg-error-container/30 border border-error/50 rounded-lg p-4 text-error">
          ⚠️ {error}
        </div>
      )}

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="bg-surface-container-low/50 backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-sm">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 bg-surface-container-lowest rounded-lg px-4 py-3 border border-outline-variant/30 focus:outline-none focus:border-primary"
          />
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            className="bg-surface-container-lowest rounded-lg px-4 py-3 border border-outline-variant/30 focus:outline-none focus:border-primary"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            type="submit"
            className="w-10 h-10 primary-gradient text-white flex items-center justify-center rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </form>

      {/* Tasks List */}
      <div className="bg-surface-container-low/50 backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-sm">
        <div className="space-y-4">
          {tasks && tasks.length > 0 ? (
            tasks.map(task => (
              <div
                key={task._id}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${task.completed ? 'opacity-40 bg-transparent' : 'glass-card border border-white/50 shadow-sm'}`}
              >
                <button
                  onClick={() => handleToggleTask(task._id, task.completed)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed ? 'bg-primary border-primary text-white' : 'border-outline-variant text-transparent hover:border-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </button>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${task.completed ? 'line-through' : ''}`}>{task.title}</p>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5">{task.category || 'Uncategorized'}</p>
                </div>
                {task.priority === 'high' && !task.completed && (
                  <span className="px-3 py-1 bg-error-container/20 text-error rounded-full text-[10px] font-bold uppercase tracking-widest">
                    Urgent
                  </span>
                )}
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-on-surface-variant hover:text-error transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-on-surface-variant py-8">No tasks yet. Create one to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
}
