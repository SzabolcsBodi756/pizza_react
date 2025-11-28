import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Reszletes = () => {
  const { id } = useParams(); // URL-ből vesszük az ID-t
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const res = await fetch(`https://pizza.sulla.hu/pizza/${id}`);
        if (!res.ok) {
          throw new Error("Hiba a pizza lekérésekor");
        }
        const data = await res.json();
        setPizza(data);
      } catch (err) {
        setError(err.message ?? "Ismeretlen hiba");
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id]);

  if (loading)
    return <div className="text-center mt-4 fs-4">Betöltés...</div>;
  if (error)
    return <div className="text-center text-danger mt-4">{error}</div>;
  if (!pizza) return null;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-link mb-3">
        &laquo; Vissza a pizzalistához
      </Link>

      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <img
              src={pizza.image_url}
              className="card-img-top"
              alt={pizza.name}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{pizza.name}</h5>
              <p className="card-text">ID: {pizza.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
