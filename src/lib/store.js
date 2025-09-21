import { writable } from "svelte/store";

const saved = localStorage.getItem("todos");
export const todos = writable(saved ? JSON.parse(saved) : []);

todos.subscribe((value) => {
  localStorage.setItem("todos", JSON.stringify(value));
});