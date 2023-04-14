import './App.css';
import {useState} from 'react';
import UploadingFile from './components/UploadingFile';
import FileUploaded from './components/FileUploaded';
import FileDropper from './components/FileDropper';
import { Route, Routes } from 'react-router-dom';
import Image from './components/Image';

function App() {

  const [pageState, setPageState] = useState({uploadStatus: 'STOPPED', fileId: '', imageUrl: ''});

  const pageStateHandler = (pageState) => {
    console.log(pageState);
    setPageState(pageState);
  }

  return (
    <div style={{position: 'absolute', width: '100%', height: '100%'}}>
      <Routes>
          <Route path="/" element={
            <>
              {pageState.uploadStatus === 'STOPPED' &&
                <FileDropper pageStateHandler={pageStateHandler}/>
              }
              {pageState.uploadStatus === 'STARTED' &&
                <UploadingFile/>
              }
              {pageState.uploadStatus === 'COMPLETED' &&
                <FileUploaded pageStateHandler={pageStateHandler} imageUrl={pageState.imageUrl} fileId={pageState.fileId}/>
              } 
            </>   
          }/>
          <Route path="/image/:id" element={<Image/>}/>
        </Routes>
        
    </div>
  );
}

export default App;
