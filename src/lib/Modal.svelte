<script>
    export let show = false;       // contrôle affichage
    export let onClose = () => {}; // callback fermeture
  </script>
  
  {#if show}
    <div class="modal-backdrop" on:click={onClose}>
      <div class="modal" on:click|stopPropagation>
        <slot /> <!-- contenu personnalisé -->
      </div>
    </div>
  {/if}
  
  <style>
    .modal-backdrop {
      position: fixed;
      inset: 0; /* top, right, bottom, left: 0 */
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 50;
    }
  
    .modal {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      min-width: 300px;
      max-width: 500px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    }
  </style>
  