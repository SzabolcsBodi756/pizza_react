import { useEffect, useState } from "react";
import "./App.css";

export const App = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await fetch("https://pizza.sulla.hu/pizza");
        if (!res.ok) {
          throw new Error("Hiba a pizzák lekérésekor");
        }
        const data = await res.json();
        setPizzas(data);
      } catch (err) {
        setError(err.message ?? "Ismeretlen hiba");
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) return <div className="text-center mt-4 fs-4">Betöltés...</div>;
  if (error) return <div className="text-center text-danger mt-4">{error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Pizzák</h1>

      <div className="row g-4">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
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
        ))}
      </div>
    </div>
  );
};

export default App;
