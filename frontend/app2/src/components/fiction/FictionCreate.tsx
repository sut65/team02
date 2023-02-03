import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { WriterInterface } from "../../interfaces/writer/IWriter";
import { GenderInterface } from "../../interfaces/writer/IGender";
import { RatingFictionInterface } from "../../interfaces/fiction/IRatingFiction";
import { FictionInterface } from "../../interfaces/fiction/IFiction";

import {
    GetWriterByWID,
    GetFictions,
    Fictions,
    GetGenres,
    GetRatingSystems,
} from "../../services/HttpClientService";

const apiUrl = "http://localhost:9999";

// async function GetGenres() {
//     const requestOptions = {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       };
    
//       let res = await fetch(`${apiUrl}/genres`, requestOptions)
//         .then((response) => response.json())
//         .then((res) => {
//           if (res.data) {
//             return res.data;
//           } else {
//             return false;
//           }
//         });
    
//       return res;
// }

// async function GetRatingSystems() {
//     const requestOptions = {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//     };
    
//     let res = await fetch(`${apiUrl}/rating_systems`, requestOptions)
//         .then((response) => response.json())
//         .then((res) => {
//           if (res.data) {
//             return res.data;
//           } else {
//             return false;
//           }
//         });
    
//     return res;
// }

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
)   {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FictionCreate(){
    const [genres, setGenres] = useState<GenderInterface[]>([]);
    const [rating_systems, setRating_systems] = useState<RatingFictionInterface[]>([]);
    const [writers, setWriters] = useState<WriterInterface>();
    const [fictions, setFictions] = useState<FictionInterface>({});

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof FictionCreate;
        const { value } = event.target;
        setFictions({ ...fictions, [id]: value });
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
      ) => {
        if (reason === "clickaway") {
          return;
        }
        setSuccess(false);
        setError(false);
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof fictions;
        setFictions({
          ...fictions,
          [name]: event.target.value,
        });
    };
    
    const getGenres = async () => {
        let res = await GetGenres();
        if (res) {
          setGenres(res);
        }
    };
    
    const getRatingSystems = async () => {
        let res = await GetRatingSystems();
        if (res) {
          setRating_systems(res);
        }
    };
    
    // const GetWriters = async () => {
    //     let res = await GetWriterByWID();
    //     fictions.WriterByWID = res.ID;
    //     if (res) {
    //       setWriters(res);
    //     }
    // };

    let { id } = useParams();

    useEffect(() => {
        getFictions();
    }, []);

    const getFictions = async () => {
        let res = await GetFictions();
        if (res) {
        setFictions(res);
        } 
    };
    // const handleClick = () => {
    //     id = String(fictions.map((fiction:FictionInterface ,ID) => (ID)))
    // }
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
                    สร้างงานเขียน
                  </Typography>
                </Box>
                
                
    
              </Paper> 
            </Container>
    
        </div>
        );

    
        


}export default FictionCreate