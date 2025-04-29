import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export default function Tvshows({ searchTerm }) {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTvShow, setSelectedTvShow] = useState(null);

  useEffect(() => {
    fetchTvShows();
  }, []);

  const fetchTvShows = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://gateway.marvel.com:443/v1/public/events?limit=50&offset=0&apikey=b520fed71b07aefb45e672ddf17becf2'
      );
      setTvShows(response.data.data.results);
    } catch (err) {
      setError('Failed to fetch TV shows.');
    } finally {
      setLoading(false);
    }
  };

  const filteredTvShows = searchTerm
    ? tvShows.filter((show) =>
        show.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tvShows;

  const openModal = (show) => setSelectedTvShow(show);
  const closeModal = () => setSelectedTvShow(null);

  return (
    <div className="content">
      <h1>Marvel TV Shows</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid-container">
        {filteredTvShows.map((show) => (
          <div key={show.id} className="card" onClick={() => openModal(show)}>
            <h3>{show.title}</h3>
            <img src={`${show.thumbnail.path}.${show.thumbnail.extension}`} alt={show.title} />
            <p>{show.description || 'No description available.'}</p>
          </div>
        ))}
      </div>

      {selectedTvShow && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>✖</button>
            <h2>{selectedTvShow.title}</h2>
            <img src={`${selectedTvShow.thumbnail.path}.${selectedTvShow.thumbnail.extension}`} alt={selectedTvShow.title} />
            <p>{selectedTvShow.description || 'No description available.'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
