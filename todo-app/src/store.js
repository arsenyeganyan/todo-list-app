import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { produce } from "immer";

const store = (set) => ({
    tasks: [],
    addTask: (title, id, state) =>
        set(produce((store) => {
            store.tasks.push({ title, id, state })}
        ),
        false,
        "addTask"
    ),
    deleteTask: (id) => 
        set((store) =>
            ({ tasks: store.tasks.filter(task => task.id !== id) }),
            false,
            "deleteTask"
        ),
    moveTask: (title, id, state) => 
        set((store) => ({ 
            tasks: store.tasks.map(task => 
                task.id === id ? { title, id, state } : task
            )
        }), false, "moveTask")
})

export const useStore = create(
    persist(devtools(store), { name: "store" }));