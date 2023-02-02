import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Container } from "@mui/system";
import { useParams } from 'react-router-dom';

import { ReaderInterface } from "../../interfaces/IReader";
import { PrefixInterface } from "../../interfaces/IPrefix";
import { GenderInterface } from "../../interfaces/IGender";

function ReaderProfile() {
    const [reader, setReader] = React.useState<ReaderInterface[]>([]);
    const [prefix, setprefix] = React.useState<PrefixInterface[]>([]);
    const [gender, setGender] = React.useState<GenderInterface[]>([]);

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

    const getPrefix = async () => {
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
                    setprefix(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    const getGender = async () => {
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
                    setGender(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    useEffect(() => {
        getReader();
        getPrefix();
        getGender();
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
                โปรไฟล์จ้า
              </Typography>
            </Box>


          </Paper> 
        </Container>

    </div>
    );
    
}

export default ReaderProfile;