<script>
  import { items } from "./itemStore.js";
</script>

<h2>Items</h2>

<ul>
  {#each $items as num}
    <li>{num}</li>
  {/each}
</ul>
