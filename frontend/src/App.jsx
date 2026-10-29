
import { useEffect, useState } from 'react'
import { getTasks, createTask } from './services/taskServices'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError('No se pudo conectar con el backend'))
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    try {
      const task = await createTask({
        title,
        description: '',
        status: 'PENDING',
        dueDate: null,
      })

      setTasks([...tasks, task])
      setTitle('')
      setError('')
    } catch {
      setError('No se pudo crear la tarea')
    }
  }

  return (
    <main>
      <h1>TaskFlow</h1>
      <p>Mis tareas</p>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button type="submit">Agregar</button>
      </form>

      {error && <p>{error}</p>}

      {tasks.length === 0 && !error && <p>No hay tareas todavía.</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} — {task.status}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
