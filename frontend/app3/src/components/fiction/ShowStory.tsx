import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { FictionInterface } from "../../interfaces/fiction/IFiction";
import { CssBaseline } from "@mui/material";


function ShowStory() {
    let { id } = useParams();
    const [story, setStory] = useState<FictionInterface>({});

    const apiUrl = "http://localhost:9999";

    async function GetStoryFictionByID() {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
        };
    
        let res = await fetch(`${apiUrl}/fiction/story/`+id, requestOptions)
            .then((response) => response.json())
            .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
            });
            return res;
        }

    const getStoryFictionByID = async () => {
        let res = await GetStoryFictionByID();
        if (res) {
        setStory(res);
        }
    };

    useEffect(() => {
        getStoryFictionByID();
    }, []);


    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="md" sx={{ p: 2 }}>
                    <Paper>
                        <Box
                            display="flex"
                            sx={{
                                marginTop: 2,
                            }}
                            >
                            <Box sx={{ paddingX: 2, paddingY: 1 }}>
                                <Typography
                                gutterBottom
                                sx={{ fontSize: 36 }} 
                                component="div"
                                >
                                {story.Fiction_Name}
                                </Typography>
                                <Typography
                                gutterBottom
                                sx={{ fontSize: 15 }} 
                                component="div"
                                color="text.secondary"
                                >
                                โดย
                                </Typography>
                                <Typography
                                gutterBottom
                                sx={{ fontSize: 22 }} 
                                component="div"
                                
                                >
                                {story.Writer?.Pseudonym}
                                </Typography>
                                
                            </Box>
                        </Box>
                        <Divider />
                        <Grid container spacing={1} sx={{ padding: 1 }}>
                            <Grid item xs={12}>
                            <Box sx={{ paddingX: 2, paddingY: 1,overflow: 'auto',textOverflow: 'ellipsis', }}>
                                <Typography
                                gutterBottom
                                sx={{ fontSize: 16 }} 
                                component="div"
                                
                                >
                                {story.Fiction_Story}
                                </Typography>
                            </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </React.Fragment>
        </div>
    );
}

export default ShowStory;