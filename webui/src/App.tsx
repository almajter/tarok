import { useEffect, useState } from "react";
import { getPlayers } from "./api";
import './App.css';

interface Player {
  player_id: number;
  name: string;
  email: string;
}

export default function App() {
  const [rows, setRows] = useState<Player[]>([]);

  // Load initial data
  useEffect(() => {
    getPlayers()
      .then(setRows)
      .catch((err) => console.error("Error loading players:", err));
  }, []);

  function addRow() {
    const nextId =
      (rows.length ? Math.max(...rows.map((r) => r.player_id)) : 0) + 1;
    setRows((r) => [...r, { player_id: nextId, name: "", email: "" }]);
  }

  function removeLastRow() {
    setRows((r) => r.slice(0, -1));
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Tarok Players</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button onClick={addRow}>+ Add row</button>
        <button onClick={removeLastRow} disabled={rows.length === 0}>
          Remove last row
        </button>
      </div>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((player) => {
            const invalidEmail =
              player.email && !player.email.includes("@");
            return (
              <tr key={player.player_id}>
                <td>{player.player_id}</td>
                <td>{player.name}</td>
                <td
                  style={{
                    outline: invalidEmail
                      ? "2px solid rgba(255, 80, 80, 0.9)"
                      : "none",
                  }}
                >
                  {player.email}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
