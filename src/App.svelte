<script>
  import { todos } from "./lib/store.js";
  import CreateTodo from "./lib/CreateTodo.svelte";
</script>

<main>
  <CreateTodo />

  <ul>
    {#each $todos as todo, index}
      <li><a href="{todo}">{todo}</a></li>
    {/each}
</ul>
</main>