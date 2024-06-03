<script>
  import { onMount } from "svelte";

  let messages = [];
  let eventSource;

  onMount(() => {
    eventSource = new EventSource("http://localhost:7777/api/json-sse");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      messages = [...messages, `${data.user}: ${data.message}`];
    };

    eventSource.onerror = (event) => {
      console.log(event);
    };

    return () => {
      if (eventSource.readyState === 1) {
        eventSource.close();
      }
    };
  });

  const closeEventStream = () => {
    eventSource.close();
  };
</script>

<h2>Server-sent events ({messages.length})</h2>

<button on:click={closeEventStream}>Close connection</button>

<ul>
  {#each messages as message}
    <li>{message}</li>
  {/each}
</ul>