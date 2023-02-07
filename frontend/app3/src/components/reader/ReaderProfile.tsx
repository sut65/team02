import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Divider, Typography } from '@mui/material';
import { Container } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import { useNavigate, useParams } from "react-router-dom";

import { ReaderInterface } from "../../interfaces/IReader";

function ReaderProfile() {
  
    const params = useParams();
    const navigate = useNavigate();

    const [readers, setReaders] = useState<ReaderInterface>();

    // const bull = (
    //   <Box
    //     component="span"
    //     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    //   >
    //     •
    //   </Box>
    // );

    

    const apiUrl = "http://localhost:9999";
    const getReader = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
        };
        fetch(`${apiUrl}/readers`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
            if (res.data) {
              setReaders(res.data);
            }
        });
    };

    // useEffect(() => {
    //     getReader();
    // }, []);
    // const card = (
    //   <React.Fragment>
    //     <CardContent>
    //       <center>
    //       <Typography variant="h5" component="div">
    //         be{bull}nev{bull}o{bull}lent
    //       </Typography>
    //       </center>
    //     </CardContent>
        
    //     <CardActions>
    //       <Button size="small">Learn More</Button>
    //     </CardActions>
    //   </React.Fragment>
    // );
    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
  };
    return (
    // <div>
    //   <Card variant="outlined">{card}</Card>
    // </div>
      <div>
        <React.Fragment>
          <Container maxWidth="sm" sx={{ p: 2 }}>
            <Paper>
              <Box
                display="flex"
                sx={{
                marginTop: 2,
                }}>
                <Box sx={{ paddingX: 2, paddingY: 1 }}>
                       
                  <Typography
                    component="h2"
                    variant="h4"
                    // color="primary"
                    gutterBottom
                  >
                    โปรไฟล์
                  </Typography> 
                </Box>
              </Box>
              <Divider />
              <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item xs={12}>
                  ToT
                </Grid>
              </Grid>
              <Grid item xs={12} spacing={5} sx={{ padding: 2 }}>
                <Button 
                component={RouterLink} to="/"
                variant="contained"
                color="primary"
                >
                  อัปเดตว้อย
                </Button>
              </Grid>
            </Paper>
          </Container>
        </React.Fragment>
      </div>
    );
    
}

export default ReaderProfile;