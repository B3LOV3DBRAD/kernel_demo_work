// src/app/page.jsx
"use client";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("AI");
  const [data, setData] = useState(null);

  async function handleSearch() {
    const res = await fetch(`/api/hackernews?topic=${topic}`);
    const json = await res.json();
    setData(json);
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Kernel Hacker News Browser Demo</h1>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2">
        Search
      </button>
      <pre className="mt-6 bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
