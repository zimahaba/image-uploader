import styled from 'styled-components';
import Wrapper from "./Wrapper"
import tickImage from '../assets/tick.png';

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

const UploadedImage = styled.img`
  max-width: 400px;
  border-radius: 12px;
  margin: 0 60px;
`;

const Link = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  width: 400px;
  background-color: #f6f8fb;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
`;

const Button = styled.button`
  width: 100px;
  height: 38px;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  background-color: #2f80ed;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #1f6fd8;
  }

  &:active {
    background-color: #1765cc;
  }
`;

const FileUploaded = props => {

  const link = 'http://localhost:3000/image/' + props.fileId;

  const newUploadHandler = () => {
    props.pageStateHandler({uploadStatus: 'STOPPED', fileId: '', imageUrl: ''});
  }

  return (
    <Wrapper>
      <Card>
        <img style={{width: '48px'}} src={tickImage}/>
        <h2 style={{color: '#4f4f4f'}}>Upload Successfully!</h2>
        <UploadedImage src={props.imageUrl}/>
        <Link>
          <label style={{display: 'flex', width: '100%', marginLeft: '5px'}}>{link}</label>
          <Button onClick={() => {navigator.clipboard.writeText(link)}}>Copy link</Button>
        </Link>
        <div>
          <Button onClick={newUploadHandler}>New Upload</Button>
        </div>
      </Card>
    </Wrapper>
  )
}

export default FileUploaded;