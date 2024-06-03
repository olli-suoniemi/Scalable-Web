<script>
  import { onMount } from "svelte";
  let input = "";

  let messages = [];
  let ws;

  onMount(() => {
    const host = window.location.hostname;
    ws = new WebSocket("ws://" + host + ":7777/api/ws");

    ws.onmessage = (event) => {
      messages = [...messages, event.data];
    };

    return () => {
      if (ws.readyState === 1) {
        ws.close();
      }
    };
  });

  const sendMessage = () => {
    if (input.trim() == "") {
      return;
    }

    ws.send(input.trim());
    input = "";
  };
</script>

<h2>Messages</h2>

<input bind:value={input} />
<button on:click={sendMessage}>Send message</button>

<ul>
  {#each messages as message}
    <li>{message}</li>
  {/each}
</ul>