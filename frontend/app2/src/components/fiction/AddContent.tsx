import React, { useState, useEffect } from "react";
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

import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";

import { FictionInterface } from '../../interfaces/fiction/IFiction';
import { FictionDelete } from "../../services/fiction/HttpClientService"; 

import { GetFictions } from '../../services/fiction/HttpClientService'; 


function AddContent() {

    const [fictions, setFictions] = useState<FictionInterface[]>([]);
    const [deletefictionID, setDeleteFictionID] = React.useState<number>(0);
    const [openDeleteFiction, setOpenDeleteFiction] = React.useState(false);

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

    const handleDialogDeleteOpen = (ID: number) => {
        setDeleteFictionID(ID)
        setOpenDeleteFiction(true)
    }
    const handleDialogDeleteclose = () => {
        setOpenDeleteFiction(false)
        setTimeout(() => {
            setDeleteFictionID(0)
        }, 500)
    }
    const handleDelete = async () => {
        let res = await FictionDelete(deletefictionID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getFictions();
        setOpenDeleteFiction(false)
    }
    return (
    <div>
        <Container maxWidth="lg" sx={{ p: 2 }}>
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
                        นิยายของฉัน
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
                            width: 575,
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
                                    <ButtonGroup
                                                variant="outlined"
                                                aria-lable="outlined button group"
                                                >
                                                <Button
                                                    onClick={() =>
                                                        navigate({ pathname: `/fiction-update/${fiction.ID}` })
                                                    }
                                                    color= "secondary"
                                                    variant="outlined"
                                                    >
                                                    แก้ไขนิยาย
                                                </Button>
                                                <Button
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => { handleDialogDeleteOpen(Number(fiction.ID)) }}
                                                    >
                                                    ลบนิยาย
                                                </Button>
                                            </ButtonGroup>
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
export default AddContent;
//159