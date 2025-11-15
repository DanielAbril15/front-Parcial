// src/components/CaballeroCard.jsx
import "./CaballeroCard.css";

function CaballeroCard({ caballero }) {
  return (
    <article className="card">
      <img
        src={caballero.imagen}
        alt={caballero.nombre}
        className="card__image"
      />
      <div className="card__content">
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
      </div>
    </article>
  );
}

export default CaballeroCard;
