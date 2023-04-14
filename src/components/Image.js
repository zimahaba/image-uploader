import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Image = props => {

  const [imageUrl, setImageUrl] = useState('');
  const {id} = useParams();
    
  useEffect(() => {
    axios.get('http://localhost:3001/images/' + id, {
      responseType: 'blob'
    }).then((fileRes) => {
      const href = URL.createObjectURL(fileRes.data);
      setImageUrl(href);
    })
  });

  return (
    <img src={imageUrl}/>
  )
}

export default Image;