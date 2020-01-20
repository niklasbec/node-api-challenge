import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [data, setData] = useState([])
  const [formValues, setFormValues] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    axios.get("http://localhost:4000/api/projects")
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const newPost = (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:4000/api/projects", formValues)
      .then( res => {
        setData([...data, res.data.projectInfo])
        alert('Success, scroll down to see project')
      })
      .catch(error => {
        console.log(error);
      })
  }

  const deletePost = (e) => {
    e.preventDefault()
    let id = e.target.value
    let dataToKeep = data.filter(curr => {
      return curr.id !== id
    })
    setData(dataToKeep)
    axios.delete(`http://localhost:4000/api/projects/${id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleChange = event => {
    setFormValues({...formValues,
        [event.target.name]: event.target.value
    })
  }

  return (
    <div className="App">
        <div>
          <h2>Add or remove Projects</h2>
          <form onSubmit={newPost}>
            <input type='text' name='name' onChange={handleChange} value={formValues.name} placeholder='project name' />
            <input type='text' name='description' onChange={handleChange} value={formValues.description} placeholder='project description' />

            <input type='submit' />

          </form>
        </div>
      {data.map(curr => {
        return(
          <div className='project'>
            <p>Id: {curr.id}</p>
            <p>Project Name: {curr.name}</p>
            <p>Project Description: {curr.description}</p>
            <button onClick={deletePost} value={curr.id}>Delete</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
