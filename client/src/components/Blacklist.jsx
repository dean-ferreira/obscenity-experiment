import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blacklist = () => {
  const [blacklist, setBlacklist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPhrase, setNewPhrase] = useState('');

  useEffect(() => {
    const fetchBlacklist = async () => {
      try {
        const response = await axios.get('/blacklist');
        setBlacklist(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlacklist();
  }, []);

  const deletePhrase = async (phrase) => {
    try {
      await axios.delete(`/blacklist/${phrase}`);
      setBlacklist(blacklist.filter(item => item !== phrase));
    } catch (err) {
      setError(err.message);
    }
  };

  const addPhrase = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/blacklist/${newPhrase}`);
      setBlacklist([...blacklist, newPhrase]);
      setNewPhrase('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Blacklisted Phrases</h1>
      <form onSubmit={addPhrase}>
        <label>
          Add New Phrase:
          <input
            type="text"
            value={newPhrase}
            onChange={(e) => setNewPhrase(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add</button>
      </form>
      <ul>
        {blacklist.map((phrase, index) => (
          <li key={index}>
            {phrase}
            <button onClick={() => deletePhrase(phrase)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blacklist;
