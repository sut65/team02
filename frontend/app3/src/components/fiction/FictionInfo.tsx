import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { IconButton, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FictionInterface } from '../../interfaces/fiction/IFiction';

import { GetFictions } from '../../services/HttpClientService';


function FictionInfo() {

    const [fictions, setFictions] = useState<FictionInterface[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        getFictions();
    }, []);

    const getFictions = async () => {
        let res = await GetFictions();
        if (res) {
        setFictions(res);
        } 
    };

    return (
    <div>
        <Container maxWidth="md" sx={{ p: 2 }}>
            <Box
                display="flex"
                sx={{
                    marginTop: 2,
                }}
                >
                <Box sx={{ paddingX: 1.5, paddingY: 1 }}>
                
                    <Typography
                    gutterBottom
                    component="h2"
                    variant="h6"
                    >
                        <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 0.5 }}
                        >
                        <LibraryBooksIcon />
                        </IconButton>
                        นิยายทั้งหมด
                    </Typography>
                </Box>
            </Box>
            <Paper>
                <Box display="flex">
                    <Grid container spacing={0}>
                    {fictions.map((fiction:FictionInterface) => (
                        <Grid >
                        <Card
                        sx={{
                            width: 213,
                            height: 300,
                            boxShadow: "0 0.5em 1em -0.125em hsl(0deg 0% 4% / 10%), 0 0 0 1px hsl(0deg 0% 4% / 2%)",
                            border: "1px solid #f0ceff",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",}}
                        >
                            <CardContent>
                            <Typography gutterBottom sx={{ fontSize: 22 }} component="div" 
                                key={fiction.ID}>{fiction.Fiction_Name} 
                            </Typography>
                            <Typography gutterBottom sx={{ fontSize: 12 }} color="text.secondary" 
                                key={fiction.Genre?.Genre_Name}>{fiction.Genre?.Genre_Name}
                            </Typography>
                            <Typography gutterBottom variant="body1" component="div" color="text.primary" 
                                key={fiction.Writer?.Name}>{fiction.Writer?.Pseudonym}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div" color="text.secondary" 
                                key={fiction.ID}>{fiction.Fiction_Description}
                            </Typography>
                            </CardContent>
                            <CardActions >
                                <Box display="flex">
                                    <Box sx={{ flexGrow: 1 }}> 
                                    <Button
                                        id='READMORE'
                                        onClick={() =>
                                            navigate({ pathname: `/fiction/${fiction.ID}` })
                                            }
                                        color= "secondary"
                                        variant="outlined"
                                        >
                                        อ่านเพิ่มเติม
                                    </Button>
                                    </Box>
                                </Box>
                            </CardActions>
                        </Card>
                        </Grid>
                    ))}
                    </Grid>



                </Box>
            </Paper>
        </Container>
    </div>
    );
}


export default FictionInfo;