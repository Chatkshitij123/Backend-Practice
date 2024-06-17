
// import { useEffect, useState } from 'react'
// import './App.css'
// import axios from 'axios'
// function App() {
//   const [jokes, setJokes] = useState([]);
//   useEffect(() => {
//     axios.get(`/jokes`).then((response) => {
//       setJokes(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//   }, []);
//   return (
//     <>
//       <h1>Jokes</h1>
//       <p>Number of jokes lies in it: {jokes.length}</p>
//       {jokes.map((joke) => (
//         <div key={joke.id}>
//           <h3>{jokes.title}</h3>
//           <p>{jokes.content}</p>
//         </div>
//       ))}
//     </>
//   )
// }

// export default App
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/jokes`)
      .then((response) => {
        console.log('API response:', response.data);
        if (Array.isArray(response.data)) {
          setJokes(response.data);
        } else {
          setError('API did not return an array');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch jokes');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading jokes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Jokes</h1>
      <p>Number of jokes: {jokes.length}</p>
      {jokes.map((joke) => (
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))}
    </>
  );
}

export default App;
