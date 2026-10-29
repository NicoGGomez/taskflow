
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function getTasks() {
    const response = await fetch(`${API_URL}/api/tasks`);

    if (!response.ok) {
        throw new Error("No se pudieron obtener las tareas");
    }

    return response.json();
}

export async function createTask(task) {
    const response = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error("No se pudo crear la tarea");
    }

    return response.json();
}

export async function updateTask(id, task) {
    const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error("No se pudo actualizar la tarea");
    }

    return response.json();
}

export async function deleteTask(id) {
    const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("No se pudo eliminar la tarea");
    }
}
