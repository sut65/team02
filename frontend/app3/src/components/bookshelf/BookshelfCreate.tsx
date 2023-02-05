import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Container } from "@mui/system";
import { useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import { ReaderInterface } from "../../interfaces/IReader";
import { Added_BookInterface } from "../../interfaces/bookshelf/IAdded_Book";
import { Bookshelf_NumberInterface } from "../../interfaces/bookshelf/IBookshelf_Number";
import { FictionInterface } from '../../interfaces/fiction/IFiction';
import { GetFictions } from '../../services/HttpClientService';

function Bookshelf() {
    const [reader, setReader] = React.useState<ReaderInterface[]>([]);
    const [added_book, setAdded_Book] = React.useState<Added_BookInterface[]>([]);
    const [bookshelf_number, setBookshelf_Number] = React.useState<Bookshelf_NumberInterface[]>([]);
    let { id } = useParams();
    const [fictions, setFictions] = useState<FictionInterface[]>([]);

    const getReader = async () => {
        const apiUrl = "http://localhost:9999/genres";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };

        await fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setReader(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    const getAdded_Book = async () => {
        const apiUrl = "http://localhost:9999/added_books";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
    
        await fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setAdded_Book(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    const getBookshelf_Number = async () => {
        const apiUrl = "http://localhost:9999/bookshelf_numbers";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };
        
        await fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setBookshelf_Number(res.data);
                }
                else { console.log("NO DATA") }
            });
    };


    useEffect(() => {
        getReader();
        getBookshelf_Number();
        getAdded_Book();
        getFictions();
    }, []);

    const getFictions = async () => {
      let res = await GetFictions();
      if (res) {
      setFictions(res);
      } 
  };
  const handleClick = () => {
      id = String(fictions.map((fiction:FictionInterface ,ID) => (ID)))
  }


    return (
    <div>
        <Container maxWidth="md">
          <Paper> 
            <center>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    m: 10,
                    width: 1050,
                    height: 60,
                  },
                }}
              >
                <Typography
                  component="h2"
                  variant="h5"
                  //color="primary"
                  gutterBottom
                >
                  ชั้นหนังสือของฉัน
                </Typography>
              </Box>
            </center>
          </Paper>
            </Container>


    </div>
    );
    
}

export default Bookshelf;