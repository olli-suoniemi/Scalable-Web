<script>
  import { userUuid } from "../stores/stores.js";
  import { onMount, onDestroy } from 'svelte';
  
  let question = "";

  // WebSocket connection
  let ws;

  const setupWebSocket = () => {
    const wsUrl = `ws://localhost:7788/ws/llm-answers`;
    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connection opened for single user");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received message from WebSocket:", data);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  };

  // Cleanup WebSocket connection on component destroy
  onDestroy(() => {
    if (ws) {
      ws.close();
    }
  });

  onMount(() => {
    setupWebSocket(); // Set up WebSocket when component mounts
  });

  const askSomething = async () => {
    const data = {
      user: $userUuid,
      question: question,
    };
    
    const response = await fetch("/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    console.log(jsonData);
    alert(JSON.stringify(jsonData));
  };
</script>

<div class="m-4">
  <textarea
    id="questionInput"
    bind:value={question} 
    class="w-full p-2 border border-gray-300 rounded"
    rows="4"
    placeholder="Type your question here..."
  ></textarea>
  
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded mt-2"
    on:click={askSomething}
  >
    Ask Question
  </button>
</div>

