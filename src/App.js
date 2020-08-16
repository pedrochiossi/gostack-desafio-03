import React, { useState, useEffect } from "react";
import api from './services/api';


import "./styles.css";

function App() {

  async function handleAddRepository() {
    const repository = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }
    const response = await api.post('/repositories', repository);
    if (response.status === 200) {
      setRepositories([...repositories, response.data])
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response.status === 204) {
      const newState = repositories.filter(rep => rep.id !== id);
      setRepositories(newState);
    }
  }

  async function updateRepositories() {
    const response = await api.get('/repositories');
    if (response.status === 200) {
      setRepositories(response.data);
    }
  }

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    updateRepositories()
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
       {
         repositories.map(repository => (
          <li key={repository.id}>
             {repository.title}   
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
         ))
       }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
