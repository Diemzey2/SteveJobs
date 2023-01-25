import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [preguntaInput, setpreguntaInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pregunta: preguntaInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setpreguntaInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Steve Jobs Chatbot</title>
        <link rel="icon" href="/steve.png" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
      </Head>

      <main className={styles.main}>
        <img src="/steve.png" className={styles.icon} />
        <h3>Steve Jobs</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="pregunta"
            placeholder="Ingrese una duda o pregunta"
            value={preguntaInput}
            onChange={(e) => setpreguntaInput(e.target.value)}
          />
          <input type="submit" value="Procesar" />
        </form>
        <div className={styles.result}>{result}</div>
        <h6>Proyecto desarrollado por César González con la ayuda de Vadim Savin y OpenAI</h6>
      </main>
    </div>
  );
}
