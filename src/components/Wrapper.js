import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fafafb;
`;

const Wrapper = props => {
  return (
    <StyledDiv onDragEnter={props.onDragEnter} onDragOver={props.onDragOver} onDrop={props.onDrop}>{props.children}</StyledDiv>
  )
}

export default Wrapper;