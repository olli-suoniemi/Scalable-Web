<script>
  import { userUuid } from "../stores/stores.js";
  
  const doSimpleGradingDemo = async () => {
    const data = {
      user: $userUuid,
      code: `def hello():
  return "helo world!"
`,
    };
    
    const response = await fetch("/api/grade", {
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

