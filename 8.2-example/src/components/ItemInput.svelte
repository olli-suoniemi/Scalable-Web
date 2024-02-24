<script>
  import { items } from "./itemStore.js";
  let value = "";
  const add = () => {
    $items = [...$items, value];
    value = "";
  };
</script>

<h2>Add an item</h2>

<input type="text" bind:value={value}/><button on:click={add}>Add!</button>