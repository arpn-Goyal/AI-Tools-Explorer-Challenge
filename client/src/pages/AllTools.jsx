import React, { useEffect, useState } from "react";
import ToolCard from "../components/ToolCard";
import Spinner from "../components/Spinner";
import confetti from 'canvas-confetti';
import axios from "axios";

const AllTools = () => {
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [loadingFavId, setLoadingFavId] = useState(null);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/tools${filter ? `?category=${filter}` : ""}`
      );
      setTools(res.data);
    } catch (err) {
      setError("Failed to fetch tools");
    } finally {
      setLoading(false);
    }
  };

  const addToFav = async (id) => {
    setLoadingFavId(id);
    try {
      await axios.post("http://localhost:5000/api/favorites", { toolId: id });
      confetti();
      alert("Tool added to favorites!");
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to add");
    } finally {
      setLoadingFavId(null);
    }
  };

  const applyNameFilter = () => {
    const lower = nameFilter.toLowerCase();
    const filtered = tools.filter((tool) =>
      tool.name.toLowerCase().includes(lower)
    );
    setFilteredTools(filtered);
  };

  useEffect(() => {
    applyNameFilter();
  }, [tools, nameFilter]);

  useEffect(() => {
    fetchTools();
  }, [filter]);


  return (
    <div>
      <h2 className="mb-3">All AI Tools</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Filter by category..."
            className="form-control"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-2">
          <input
            type="text"
            placeholder="Search by name..."
            className="form-control"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : tools.length === 0 ? (
        <div className="alert alert-warning">No tools found</div>
      ) : (
        <div className="row">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onFav={addToFav} loadingFavId={loadingFavId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTools;
