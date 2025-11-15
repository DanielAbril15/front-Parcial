// src/components/CaballeroCard.jsx
import { useState } from "react";
import "./CaballeroCard.css";

function CaballeroCard({ caballero }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...caballero });
  const [loading, setLoading] = useState(false);

  const API_BASE_EDIT = "https://micro-post-7hkw.onrender.com";
  const API_BASE_DEL = "https://del-micro.onrender.com";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_EDIT}/agregarCaballero`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        alert("Error actualizando caballero");
        return;
      }

      setEditMode(false);
      alert("Caballero actualizado");
    } catch (err) {
      alert("Error al guardar");
      console.log(err);
    }
    setLoading(false);
  };

  const eliminarCaballero = async () => {
    const id = caballero._id;

    if (!id) return alert("No se puede eliminar: falta el ID");

    const confirmacion = window.confirm(
      `¿Seguro que quieres eliminar a ${caballero.nombre}?`
    );
    if (!confirmacion) return;

    try {
      const res = await fetch(`${API_BASE_DEL}/caballero/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("No se pudo eliminar");
        return;
      }

      alert("Caballero eliminado. Recarga la página.");
    } catch (err) {
      alert("Error eliminando");
      console.log(err);
    }
  };

  return (
    <article className="card">
      <img src={form.imagen} alt={form.nombre} className="card__image" />

      <div className="card__content">
        {editMode ? (
          <>
            <input
              className="input"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />

            <input
              className="input"
              name="constelacion"
              value={form.constelacion}
              onChange={handleChange}
            />

            <input
              className="input"
              name="edad"
              value={form.edad}
              onChange={handleChange}
              type="number"
            />

            <input
              className="input"
              name="altura"
              value={form.altura}
              onChange={handleChange}
              type="number"
            />

            <input
              className="input"
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
            />

            <div className="card__actions">
              <button
                className="btn btn--edit"
                onClick={guardarCambios}
                disabled={loading}
              >
                Guardar
              </button>

              <button
                className="btn btn--delete"
                onClick={() => {
                  setForm({ ...caballero }); // restaura
                  setEditMode(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="card__title">{caballero.nombre}</h2>
            <p className="card__constelacion">{caballero.constelacion}</p>

            <ul className="card__stats">
              <li>
                <span className="label">Edad:</span> {caballero.edad} años
              </li>
              <li>
                <span className="label">Altura:</span> {caballero.altura} cm
              </li>
            </ul>

            <div className="card__actions">
              <button
                className="btn btn--edit"
                onClick={() => setEditMode(true)}
              >
                Editar
              </button>

              <button className="btn btn--delete" onClick={eliminarCaballero}>
                Eliminar
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export default CaballeroCard;
