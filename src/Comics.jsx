import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export default function Comics({ searchTerm }) {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedComic, setSelectedComic] = useState(null);

  useEffect(() => {
    fetchComics();
  }, []);

  const fetchComics = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://gateway.marvel.com:443/v1/public/comics?limit=50&offset=0&apikey=b520fed71b07aefb45e672ddf17becf2'
      );
      setComics(response.data.data.results);
    } catch (err) {
      setError('Failed to fetch comics.');
    } finally {
      setLoading(false);
    }
  };

  const filteredComics = searchTerm
    ? comics.filter((comic) =>
        comic.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : comics;

  const openModal = (comic) => setSelectedComic(comic);
  const closeModal = () => setSelectedComic(null);

  return (
    <div className="content">
      <h1>Marvel Comics</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid-container">
        {filteredComics.map((comic) => (
          <div key={comic.id} className="card" onClick={() => openModal(comic)}>
            <h3>{comic.title}</h3>
            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
            <p>{comic.description || 'No description available.'}</p>
          </div>
        ))}
      </div>

      {selectedComic && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>✖</button>
            <h2>{selectedComic.title}</h2>
            <img src={`${selectedComic.thumbnail.path}.${selectedComic.thumbnail.extension}`} alt={selectedComic.title} />
            <p>{selectedComic.description || 'No description available.'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
