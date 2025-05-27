import { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from './postform';

function App() {
  const [data, setData] = useState([]);
  const [editTitles, setEditTitles] = useState({}); // store temporary titles

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setData(data.filter(post => post.id !== id));
        } else {
          console.warn("Delete did not succeed");
        }
      })
      .catch(err => console.error(err));
  };

  const handleUpdate = (id) => {
    const dataToUpdate = data.find(post => post.id === id);
    if (!dataToUpdate) return;

    const updatedPost = {
      ...dataToUpdate,
      title: editTitles[id] || dataToUpdate.title,
    };

    axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedPost)
      .then((response) => {
        if (response.status === 200) {
          setData(data.map(post => post.id === id ? response.data : post));
          setEditTitles(prev => ({ ...prev, [id]: '' })); 
        } else {
          console.warn("Update did not succeed");
        }
      })
      .catch(err => console.error(err));
  };

  const handleTitleChange = (id, newTitle) => {
    setEditTitles(prev => ({ ...prev, [id]: newTitle }));
  };

  return (
    <div>
      <PostForm />
      <h1>Posts</h1>
      <ul>
        {data.map(post => (
          <div key={post.id} style={{ marginBottom: '1rem' }}>
            <li>{post.title}</li>
            <input
              type="text"
              value={editTitles[post.id] }
              onChange={(e) => handleTitleChange(post.id, e.target.value)}
              placeholder="Enter new title"
              style={{ marginRight: '0.5rem' }}
            />
            <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(post.id)}>
              Update
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(post.id)} style={{ marginLeft: '0.5rem' }}>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
