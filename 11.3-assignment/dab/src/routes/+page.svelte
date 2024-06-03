<script>
  import { onMount } from "svelte";

  let messages = [];
  let ws;

  onMount(() => {
    const host = window.location.hostname;
    ws = new WebSocket("ws://" + host + ":7777/api/json-ws");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      messages = [...messages, `${data.user}: ${data.message}`];
    };

    return () => {
      if (ws.readyState === 1) {
        ws.close();
      }
    };
  });


  const closeConnection = () => {
    ws.close();
  };
</script>

<h2>WebSocket events ({messages.length})</h2>

<button on:click={closeConnection}>Close connection</button>

<ul>
  {#each messages as message}
    <li>{message}</li>
  {/each}
</ul>