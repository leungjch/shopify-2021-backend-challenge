import logo from './logo.svg';
import './App.css';
import { FormControl, Form } from "react-bootstrap"
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState } from 'react'



function App() {

  const [images, setImages] = useState([])


  // When user successfully selects files
  function handleUpload(e) {
    const files = Array.from(e.target.files)
    const singleFile = e.target.files[0];
    console.log("files:", files)
    const data = new FormData();
    data.append('file', files);

    axios.post('/upload', data,
    {
      headers : {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function (response) {
      console.log(response);
    });
  }

  // Fetch images from server
  function fetchImages() {
    fetch('/get_images')
    .then((response) => response.json())
    .then((data) => {
        console.log("Images are", data);
    });


  }

  return (
    <div className="App">
      {/* <input
        accept="image/*"
        style={{ display: 'none' }}
        id="upl"
        name="upl"
        onChange = {handleUpload}
        multiple
        type="file"
      />

      <label htmlFor="upl">
        <Button variant="contained" color="secondary" component="span" >
          Upload Images
      </Button>
      </label> */}
<form method="post" enctype="multipart/form-data" action="/upload">

<label htmlFor="upl">
        <Button variant="contained" color="secondary" component="span" >
          Upload Images
      </Button>
      </label>

  
    <p>
        <input type="text" name="title" placeholder="Access code"/>
    </p>

    <p>
        <input type="file" name="upl"
        accept="image/*"
        style={{ display: 'none' }}
        id="upl"
        name="upl"

        multiple
        type="file"
        accept="image/*"

        />
    </p>
    <p>
        <input type="submit"/>
    </p>
</form>




    </div>
  );
}

export default App;
