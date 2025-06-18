import React, { useEffect, useState } from 'react';
import ToolCard from '../components/ToolCard';
import Spinner from '../components/Spinner';
import axios from 'axios';

const AllTools = () => {
  const [tools, setTools] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTools = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/tools${filter ? `?category=${filter}` : ''}`);
      setTools(res.data);
    } catch (err) {
      setError('Failed to fetch tools');
    } finally {
      setLoading(false);
    }
  };

  const addToFav = async (id) => {
    try {
      await axios.post('http://localhost:5000/api/favorites', { toolId: id });
      alert('Tool added to favorites!');
    } catch (err) {
      alert(err?.response?.data?.error || 'Failed to add');
    }
  };

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
      </div>

      {loading ? <Spinner /> :
        error ? <div className="alert alert-danger">{error}</div> :
          tools.length === 0 ? <div className="alert alert-warning">No tools found</div> :
            <div className="row">
              {tools.map(tool => (
                <ToolCard key={tool.id} tool={tool} onFav={addToFav} />
              ))}
            </div>
      }
    </div>
  );
};

export default AllTools;
