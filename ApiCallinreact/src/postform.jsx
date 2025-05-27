import { useState,useEffect } from 'react';
import axios from 'axios';

function PostForm() {
  const [postData, setPostData] = useState({
    title: '',
    body: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/posts', postData)
      .then(response => {
        console.log('Post created: ', response.data);
       
      })
      .catch(error => {
        console.error('Error creating post: ', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value
    });
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={postData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Body:
          <textarea
            name="body"
            value={postData.body}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostForm;