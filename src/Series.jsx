import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export default function Series({ searchTerm }) {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedSeries, setSelectedSeries] = useState(null);

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://gateway.marvel.com:443/v1/public/series?limit=50&offset=0&apikey=b520fed71b07aefb45e672ddf17becf2'
      );
      setSeries(response.data.data.results);
    } catch (err) {
      setError('Failed to fetch series.');
    } finally {
      setLoading(false);
    }
  };

  const filteredSeries = searchTerm
    ? series.filter((s) =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : series;

  const openModal = (s) => setSelectedSeries(s);
  const closeModal = () => setSelectedSeries(null);

  return (
    <div className="content">
      <h1>Marvel Series</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid-container">
        {filteredSeries.map((s) => (
          <div key={s.id} className="card" onClick={() => openModal(s)}>
            <h3>{s.title}</h3>
            <img src={`${s.thumbnail.path}.${s.thumbnail.extension}`} alt={s.title} />
            <p>{s.description || 'No description available.'}</p>
          </div>
        ))}
      </div>

      {selectedSeries && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>✖</button>
            <h2>{selectedSeries.title}</h2>
            <img src={`${selectedSeries.thumbnail.path}.${selectedSeries.thumbnail.extension}`} alt={selectedSeries.title} />
            <p>{selectedSeries.description || 'No description available.'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
