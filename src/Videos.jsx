import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    setError('');
    try {
      // Replace this with your actual API or external video source
      const response = await axios.get('https://gateway.marvel.com:443/v1/public/comics?limit=10&offset=0&apikey=b520fed71b07aefb45e672ddf17becf2');
      setVideos(response.data.data.results);
    } catch (err) {
      setError('Failed to fetch videos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <h1>Marvel Videos</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid-container">
        {videos.map((video) => (
          <div key={video.id} className="card">
            <h3>{video.title}</h3>
            {/* Dummy video player for demo purposes */}
            <video controls width="100%">
              <source src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>{video.description || 'No description available.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
