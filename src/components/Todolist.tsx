import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
}

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState<string>('');

  // Función para cargar las tareas desde localStorage al montar el componente
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // Si existen tareas guardadas, las cargamos
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  // Función para agregar una nueva tarea
  const addTask = () => {
    if (taskText.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: taskText,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setTaskText(''); // Limpiar el campo de texto
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Guardar las tareas en localStorage
  };

  // Función para eliminar una tarea
  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Actualizar las tareas en localStorage
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>To Do List</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Escribe una tarea"
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={addTask} style={{ padding: '8px 12px' }}>Add</button>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid #ddd',
            }}
          >
            <span>{task.text}</span>
            <button onClick={() => removeTask(task.id)} style={{ marginLeft: '10px' }}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;

