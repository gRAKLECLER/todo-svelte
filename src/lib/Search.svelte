<script>
    export let items = []; // on reçoit les items de la todo sélectionnée
    let inputValue = "";
    let editingIndex = null;
  
    function AddTodo() {
      if (inputValue.trim() !== "") {
        items = [...items, inputValue];
        inputValue = "";
      }
    }
  
    function RemoveTodo(index) {
      items.splice(index, 1);
      items = [...items];
    }
  
    function startEdit(index) {
      editingIndex = index;
    }
  
    function CancelEdit(index, e) {
      items[index] = e.target.value;
      items = [...items];
      editingIndex = null;
    }
  </script>
  
  <div>
    <input 
      placeholder="Nouvel item"
      bind:value={inputValue} 
      on:keydown={(e) => e.key === 'Enter' && AddTodo()}
    />
    <button on:click={AddTodo}>add todo</button>
  </div>
  
  <ul>
    {#each items as item, index}
      <li>
        {#if editingIndex === index}
          <input 
            bind:value={items[index]} 
            on:blur={(e) => CancelEdit(index, e)} 
            on:keydown={(e) => e.key === 'Enter' && CancelEdit(index, e)}
            autofocus
          />
        {:else}
          <a class="todo" on:click={() => startEdit(index)}>{item}</a>
        {/if}
        <button on:click={() => RemoveTodo(index)}>remove</button>
      </li>
    {/each}
  </ul>
  
  <style>
    .todo {
      cursor: pointer;
    }
  </style>
  