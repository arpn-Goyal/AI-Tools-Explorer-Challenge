import React, { useEffect, useState } from "react";
import ToolCard from "../components/ToolCard";
import Spinner from "../components/Spinner";
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/favorites");
      setFavorites(res.data);
    } catch {
      setError("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const removeFav = async (id) => {
    setRemovingId(id);
    try {
      await axios.delete("http://localhost:5000/api/favorites", {
        data: { toolId: id },
      });
      fetchFavorites();
    } catch {
      alert("Failed to remove favorite");
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <h2 className="mb-3">My Favorites</h2>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : favorites.length === 0 ? (
        <div className="alert alert-info">No favorites yet</div>
      ) : (
        <div className="row">
          {favorites.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onRemove={removeFav}
              showFavBtn={false}
              loadingFavId={removingId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
