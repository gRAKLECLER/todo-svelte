<script>
    import Modal from "./Modal.svelte";
    import { todos } from "./store.js";
  
    let showModal = false;
    let title = "";
  
    function openModal() {
      showModal = true;
    }
    function closeModal() {
      showModal = false;
      title = "";
    }
  
    function createTodo() {
      if (title.trim() !== "") {
        todos.update(list => [...list, title]); // ✅ ajoute dynamiquement
        title = "";
      }
      closeModal();
    }
  </script>
  
  <button on:click={openModal}>create todo</button>
  
  <Modal show={showModal} onClose={closeModal}>
    <h2>New todo</h2>
    <input placeholder="Titre de la todo" bind:value={title} />
    <div>
      <button on:click={closeModal}>Annuler</button>
      <button on:click={createTodo}>Créer</button>
    </div>
  </Modal>  