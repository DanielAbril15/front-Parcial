import { useEffect, useState } from "react";
import CaballeroCard from "./CaballeroCard";
import "./Caballeros.css";

const API_BASE_URL = "http://localhost:3010";

function Caballeros() {
  const [caballeros, setCaballeros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCaballeros = async () => {
      try {
        const res = await fetch(`https://micro-get.onrender.com/caballeros`);
        if (!res.ok) {
          throw new Error("Error cargando caballeros");
        }
        const data = await res.json();
        setCaballeros(data);
      } catch (err) {
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchCaballeros();
  }, []);

  const handleUpdated = (caballeroActualizado) => {
    setCaballeros((prev) =>
      prev.map((c) =>
        c._id === caballeroActualizado._id ? caballeroActualizado : c
      )
    );
  };

  const handleDeleted = (idEliminado) => {
    setCaballeros((prev) => prev.filter((c) => c._id !== idEliminado));
  };

  if (loading) {
    return <p className="status-msg">Cargando caballeros… ✨</p>;
  }

  if (error) {
    return <p className="status-msg status-msg--error">Error: {error}</p>;
  }

  if (!caballeros.length) {
    return <p className="status-msg">No hay caballeros registrados.</p>;
  }

  return (
    <section className="grid-wrapper">
      {caballeros.map((c) => (
        <CaballeroCard
          key={c._id}
          caballero={c}
          onUpdated={handleUpdated}
          onDeleted={handleDeleted}
        />
      ))}
    </section>
  );
}

export default Caballeros;
