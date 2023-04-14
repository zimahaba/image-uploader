import styled from 'styled-components';
import Wrapper from "./Wrapper"

const ProgressCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 260px;
  height: 80px;
  padding: 10px 30px;
  border: none;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 0px;
`;

const UploadingFile = () => {
  return (
    <Wrapper>
      <ProgressCard>
        <label>Uploading...</label>
        <progress style={{width: '100%'}}></progress>
      </ProgressCard>
    </Wrapper>
  )
}

export default UploadingFile;