import React from 'react';

const ToolCard = ({ tool, onFav, showFavBtn = true, onRemove, loadingFavId }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{tool.name}</h5>
          <p className="card-subtitle mb-2 text-muted text-white">{tool.category}</p>
          <p className="card-text">{tool.excerpt}</p>
          <a href={tool.url} className="btn btn-sm btn-primary" target="_blank" rel="noreferrer">Visit</a>

          {showFavBtn ? (
            <button
              className="btn btn-sm btn-outline-danger ms-2"
              onClick={() => onFav(tool.id)}
              disabled={loadingFavId === tool.id}
            >
              {loadingFavId === tool.id ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                '❤ Favorite'
              )}
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-secondary ms-2"
              onClick={() => onRemove(tool.id)}
            >
              ❌ Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
