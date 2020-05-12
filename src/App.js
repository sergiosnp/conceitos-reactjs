import React, { useState, useEffect } from "react"
import api from './services/api'

import "./styles.css"

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    
    const response = await api.post("/repositories", {
      title: `Sergio Ramos ${Date.now()}`,
      url: "https://github.com/sergiosnp/conceitos-reactjs",
      techs: ["NodeJS, ReactJs"],
    })

    const repository = response.data
    
    setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {

    await api.delete(`/repositories/${id}`).then(() => {
      const idIndex = repositories.findIndex(
        (repository) => (repository.id = id)
      )
      repositories.splice(idIndex, 1)
      setRepositories([...repositories], repositories)
    })

  }

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  )
}

export default App
