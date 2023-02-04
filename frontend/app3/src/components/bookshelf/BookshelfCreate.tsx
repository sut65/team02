import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Container } from "@mui/system";
import { useParams } from 'react-router-dom';

import { ReaderInterface } from "../../interfaces/IReader";
import { Added_BookInterface } from "../../interfaces/bookshelf/IAdded_Book";
import { Bookshelf_NumberInterface } from "../../interfaces/bookshelf/IBookshelf_Number";

function Bookshelf() {
    const [reader, setReader] = React.useState<ReaderInterface[]>([]);
    const [added_book, setAdded_Book] = React.useState<Added_BookInterface[]>([]);
    const [bookshelf_number, setBookshelf_Number] = React.useState<Bookshelf_NumberInterface[]>([]);

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
        const apiUrl = "http://localhost:9999/prefixes";
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
        const apiUrl = "http://localhost:9999/genders";
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
    }, []);

    return (
    <div>
        <Container maxWidth="md">
          <Paper> 
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 720,
                  height: 720,
                },
              }}
            >
              {/* <Box
                sx={{
                  width: 120,
                  height: 120,
                  backgroundColor: 'primary.dark',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.8, 0.8, 0.8],
                  },
                }}
              /> */}
              <Typography
                component="h2"
                variant="h6"
                //color="primary"
                gutterBottom
              >
                ชั้นหนังสือของฉัน
              </Typography>
            </Box>


          </Paper> 
        </Container>

    </div>
    );
    
}

export default Bookshelf;