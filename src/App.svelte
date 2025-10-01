<script>
  import { onMount } from "svelte";
  import CreateTodo from "./lib/CreateTodo.svelte";
  import Modal from "./lib/Modal.svelte";
  import Search from "./lib/Search.svelte";

  let todos = [];
  let selectedTodo = null;

  // Charger depuis localStorage
  onMount(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      let parsed = JSON.parse(saved);

      // migration si jamais c'est un tableau de string
      if (Array.isArray(parsed) && typeof parsed[0] === "string") {
        parsed = parsed.map(t => ({ title: t, items: [] }));
      }

      todos = parsed;
    }
  });

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // callback quand on crée une todo depuis CreateTodo
  function handleCreate(title) {
    todos = [...todos, { title, items: [] }];
    saveTodos();
  }

  function openTodo(todo) {
    selectedTodo = todo;
  }

  function closeModal() {
    selectedTodo = null;
    saveTodos();
  }

  // ✅ supprimer une todo entière
  function deleteTodo(index) {
    todos.splice(index, 1);
    todos = [...todos]; // réactivité
    saveTodos();

    // si la todo supprimée est ouverte → fermer la modal
    if (selectedTodo && !todos.includes(selectedTodo)) {
      closeModal();
    }
  }
</script>

<main>
  <h1>Mes Todos</h1>
  <CreateTodo on:create={(e) => handleCreate(e.detail)} />

  <ul>
    {#each todos as todo, index}
      <li>
        <a class="todo" on:click={() => openTodo(todo)}>
          {todo.title}
        </a>
        <button on:click={() => deleteTodo(index)}>🗑️</button>
      </li>
    {/each}
  </ul>
</main>

{#if selectedTodo}
  <Modal show={true} onClose={closeModal}>
    <h2>{selectedTodo.title}</h2>
    <!-- Search reçoit les items de la todo sélectionnée -->
    <Search bind:items={selectedTodo.items} />
    <button on:click={closeModal}>Fermer</button>
  </Modal>
{/if}

<style>
  .todo {
    cursor: pointer;
    color: blue;
    margin-right: 0.5rem;
  }

  button {
    margin-left: 0.5rem;
  }
</style>
