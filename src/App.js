import { useState } from 'react';
import './App.css';
import axios from 'axios';
const FormData = require('form-data');

const api = axios.create({
  baseURL: "http://localhost:3001"
});

function App() {

  const [file, setFile] = useState();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  const selectImageHandler = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const upload = async () => {

    const form = new FormData();
    form.append('title', file.name);
    form.append('file', file);

    axios.post('http://localhost:3001/upload', form, {
      responseType: 'blob'
    })
    .then((res) => {
      const href = URL.createObjectURL(res.data);

      setFileUploaded(true);
      setImgUrl(href);
    })
    .catch((err) => console.log(err));
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <input type='file' onChange={selectImageHandler}/>
      <button onClick={upload}>Upload</button>
      {fileUploaded && 
        <div>
          <img style={{width: '200px'}} src={imgUrl}/>
        </div>
      }
    </div>
  );
}

export default App;
