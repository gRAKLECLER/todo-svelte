<script>
    let inputValue = "";
    let todos = [];
    let editingIndex = null;

    function AddTodo() {
        if (inputValue.trim() !== "") {
            todos = [...todos, inputValue];
            inputValue = ""; // reset après ajout
        }
    }

    function RemoveTodo(index) {
        todos.splice(index, 1)
        todos = [...todos]
    }

    function startEdit(index) {
        editingIndex = index;
    }

    function CancelEdit(index, e) {
        todos[index] = e.target.value; // on modifie directement la valeur
        todos = [...todos];            // réassigner pour réactivité
        editingIndex = null;
    }
</script>
  
<div>
    <input name="search" bind:value={inputValue} on:keydown={(e) => e.key === 'Enter' && AddTodo()}/>
    <button on:click={AddTodo}>add todo</button>
</div>

<ul>
    {#each todos as todo, index}
        <li>
            {#if editingIndex === index}
                <input 
                    bind:value={todos[index]} 
                    on:blur={(e) => CancelEdit(index, e)} 
                    on:keydown={(e) => e.key === 'Enter' && CancelEdit(index, e)}
                    autofocus
                />
            {:else}
                <a class="todo" on:click={() => startEdit(index)}>{todo}</a>
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