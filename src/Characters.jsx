import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export default function Characters({ searchTerm }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        'https://gateway.marvel.com:443/v1/public/characters?limit=50&offset=0&apikey=b520fed71b07aefb45e672ddf17becf2'
      );
      setCharacters(response.data.data.results);
    } catch (err) {
      setError('Failed to fetch characters.');
    } finally {
      setLoading(false);
    }
  };

  const filteredCharacters = searchTerm
    ? characters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : characters;

  const openModal = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="content">
      <h1>Marvel Characters</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid-container">
        {filteredCharacters.map((character) => (
          <div key={character.id} className="card" onClick={() => openModal(character)}>
            <h3>{character.name}</h3>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <p>{character.description || 'No description available.'}</p>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>✖</button>
            <h2>{selectedCharacter.name}</h2>
            <img
              src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`}
              alt={selectedCharacter.name}
            />
            <p>{selectedCharacter.description || 'No description available.'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
