import logo from './logo.svg';
import './App.css';
import { FormControl, Form } from "react-bootstrap"
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Gallery from 'react-photo-gallery'
import { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Search from "@material-ui/icons/Search";
import Box from '@material-ui/core/Box';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';




function App() {

  const [images, setImages] = useState([])
  const [search, setSearch] = useState("")


  // When user successfully selects files
  function handleUpload(e) {
    const files = Array.from(e.target.files)
    const singleFile = e.target.files[0];
    console.log("files:", files)
    const data = new FormData();
    data.append('file', files);

    axios.post('/upload', data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function (response) {
        console.log(response);
      });
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  // Fetch images from server
  function fetchImages() {
    fetch('/get_images')
      .then((response) => response.json())
      .then((data) => {
        console.log("Images are", data)
        setImages(data);
      });
  }
  // Perform operations when user loads page
  useEffect(() => {
    fetchImages();

  }, [])


  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "100%",
      height: "100%",
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));
  const classes = useStyles();



  return (
    <div className="App" style={{ margin: "1%" }}>


      <div className={classes.margin} style={{ borderRadius: "1px", borderStyle: "solid", borderColor: "black", border: "1px" }}>

        <Grid container spacing={1}>
          <Box borderLeft={0} borderRadius={0} style={{ padding: "5px" }}>

            {/* <Grid item >
              <Search />
            </Grid> */}
            <Grid item >
              <TextField 
                id="input-with-icon-grid"
                label="Search"
                onChange={handleSearch} />
            </Grid>
          </Box>

        </Grid>

        <Grid>

          <form method="post" enctype="multipart/form-data" action="/upload">

            <label htmlFor="upl">
              <Button variant="contained" color="secondary" component="span" >
                Upload Images
</Button>
            </label>


            <p>
              <input type="file" name="upl"
                accept="image/*"
                style={{ display: 'none' }}
                id="upl"
                name="upl"

                // multiple
                type="file"
                accept="image/*"

              />
            </p>
            <p>
              <input type="submit" />
            </p>
          </form>


        </Grid>

      </div>


      {/* {images !== null? <Gallery photos = {images} /> : "hello"} */}
      <GridList cellHeight={500} className={classes.gridList} cols={4}>
        <GridListTile key="Subheader" cols={4} style={{ height: '100%' }}>
          {/* <ListSubheader component="div">Photos</ListSubheader> */}
        </GridListTile>
        {images.filter(function(img) {
          // Apply search here
          // Check if partial string
          return search ===  "" || img.prediction.indexOf(search) !== -1
        })
          // Now display the valid images
          .map((image) => (
          <GridListTile key={image.url}>
            <img src={image.url} />
            <GridListTileBar
              title={image.prediction}
              subtitle={<span>({Math.round(image.probability * 100)}% confidence)</span>}
            />
          </GridListTile>
        ))}
      </GridList>




    </div>
  );
}

export default App;
