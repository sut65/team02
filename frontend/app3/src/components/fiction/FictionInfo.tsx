/* eslint-disable no-lone-blocks */
import * as React from 'react';
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
    const handleClick = () => {
        
    }

    return (
    <div>
        <Container maxWidth="md" sx={{ p: 2 }}>
            {/* <Box flexGrow={1}>
                <Typography
                component="h2"
                variant="h6"
                //   color="primary"
                gutterBottom
                >
                Fiction
                </Typography>
            </Box> */}
            <Paper>
                <Box>
                    {/* <Card sx={{ maxWidth: 256 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            {fictions.map(item => (                
                                <Typography gutterBottom variant="h5" component="div" 
                                key={item.ID}>{item.F_name}</Typography>
                            ))}               
                            {fictions.map(item => (
                                <Typography variant="body2" color="text.secondary" 
                                key={item.F_Description}>{item.F_Description}</Typography>
                            ))} 
                            
                        </CardContent>

                        <CardActions>
                            <Button size="small">Share</Button>
                            {fictions.map(item => (
                                <Link href={`/fiction/${item.ID}`} color="inherit" underline="none" > 
                                <Button size="small">Learn More</Button>
                                </Link>
                            ))}

                        </CardActions>
                    </Card> */}
                    
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
                                key={fiction.Writer?.Name}>{fiction.Writer?.Name}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div" color="text.secondary" 
                                key={fiction.ID}>{fiction.Fiction_Description}
                            </Typography>

                            </CardContent>
                            <CardActions >
                                <Box display="flex">
                                    <Button
                                        onClick={() =>
                                            navigate({ pathname: `/fiction/${fiction.ID}` })
                                            }
                                        color= "secondary"
                                        variant="outlined"
                                        >
                                        อ่านเพิ่มเติม
                                    </Button>
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