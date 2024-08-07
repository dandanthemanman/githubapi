import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('')

  useEffect(() => {
    fetch('https://api.github.com/users/dandanthemanman')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSearch = () => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>GitHub User Data</h1>
      {data && (
        <div>
          <h1>GitHub User Search</h1>
      <input
        type="text"
        value={username}
        onChange={handleChange}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSearch}>Search</button>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <p>Username: {data.login}</p>
          <p>ID: {data.id}</p>
          <img src={data.avatar_url} alt="avatar" width="100" />
        </div>
      )}
    </div>
  );
}

export default App;
