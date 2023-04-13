import { useCallback, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';
import previewImage from './assets/preview.svg';
import couldUploadImage from './assets/cloud-uploading.png';
const FormData = require('form-data');

const api = axios.create({
  baseURL: "http://localhost:3001"
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fafafb;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-width: 400px;
  min-height: 500px;
  border: none;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 0px;
`;

const ImageDropperActive = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 300px;
  height: 200px;
  border: 2px solid rgb(96 159 247);
  border-radius 12px;
  background-color: #f6f8fb;
`;

const ImageDropperInactive = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 300px;
  height: 200px;
  border: 2px dashed #a4c6f5;
  border-radius 12px;
  background-color: #f6f8fb;
`;

const FileLabel = styled.label`
  width: 130px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: #ffffff;
  background-color: #2f80ed;
  cursor: pointer;

  &:hover {
    background-color: #1f6fd8;
  }

  &:active {
    background-color: #1765cc;
  }
`;

const FileChooser = styled.input`
  position: absolute;
  visibility: hidden;
`;

const UploadedImage = styled.img`
  max-width: 400px;
  border-radius: 12px;
  margin: 0 60px;
`;

function App() {

  const [fileUploaded, setFileUploaded] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const selectImageHandler = (event) => {
    if (event.target.files) {
      upload(event.target.files[0]);
    }
  };

  const upload = async (file) => {

    const form = new FormData();
    form.append('title', file.name);
    form.append('file', file);

    console.log('uploading...')
    axios.post('http://localhost:3001/images', form, {
      responseType: 'blob'
    })
    .then((res) => {
      const href = URL.createObjectURL(res.data);

      setFileUploaded(true);
      setImgUrl(href);
    })
    .catch((err) => console.log(err));
  }

  const dragHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.tagName === 'DIV') {
      setDragActive(true);
    }
  }

  const dropHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    upload(event.dataTransfer.files[0]);
  }

  const wrapperDragHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  }

  const wrapperDropHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
  }

  return (
    <div style={{position: 'absolute', width: '100%', height: '100%'}}>
      {!fileUploaded &&
        <Wrapper onDragEnter={wrapperDragHandler} onDragOver={wrapperDragHandler} onDrop={wrapperDropHandler}>
          <Card>
            <h2 style={{color: '#4f4f4f'}}>Upload your image</h2>
            <label style={{color: '#828282'}}>File should be Jpeg, Png...</label>
            {dragActive &&
              <ImageDropperActive onDragEnter={dragHandler} onDragOver={dragHandler} onDrop={dropHandler}>
                <img src={couldUploadImage}/>
                <label style={{color: '#d2d3d4'}}>Drop your image here to upload it</label>
              </ImageDropperActive>
            }
            {!dragActive &&
              <ImageDropperInactive onDragEnter={dragHandler} onDragOver={dragHandler} onDragLeave={dragHandler}>
                <img src={previewImage}/>
                <label style={{color: '#d2d3d4'}}>Drag and Drop your image here</label>
              </ImageDropperInactive>
            }            
            
            <label style={{color: '#828282'}}>Or</label>
            <FileLabel htmlFor='upload-button'>Choose a file</FileLabel>
            <FileChooser id="upload-button" type='file' onChange={selectImageHandler}/>
          </Card>
        </Wrapper>
      }
      {fileUploaded &&
        <Wrapper>
          <Card>
            <h2 style={{color: '#4f4f4f'}}>Upload Successfully!</h2>
            <UploadedImage src={imgUrl}/>
            <div>link</div>
          </Card>
        </Wrapper>
      }
    </div>
  );
}

export default App;
