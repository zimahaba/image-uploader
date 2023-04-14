import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Image = props => {

  const [imageUrl, setImageUrl] = useState('');
  const {id} = useParams();
  
  useEffect(() => {
    axios.get('http://localhost:3001/images/' + id, {
      responseType: 'blob'
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      setImageUrl(href);
    });
  }, [id]);

  return (
    <img src={imageUrl}/>
  )
}

export default Image;