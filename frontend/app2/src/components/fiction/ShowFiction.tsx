import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { IconButton} from '@mui/material';

import { useNavigate } from "react-router-dom";
import { TransitionProps } from '@mui/material/transitions';

import { FictionInterface } from '../../interfaces/fiction/IFiction';
import { FictionDelete } from "../../services/fiction/HttpClientService"; 

import {    Button, Container,      
    Dialog, DialogActions,  DialogContent,  DialogContentText,  DialogTitle, 
    Paper,  Typography, Slide,  
    
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function ShowFiction() {
    
    const [fictions, setFictions] = useState<FictionInterface[]>([]);
    const [deletefictionID, setDeleteFictionID] = React.useState<number>(0);
    const [openDeleteFiction, setOpenDeleteFiction] = React.useState(false);

    const navigate = useNavigate();
  

    const getFictionByWID = async () => {
        const apiUrl = "http://localhost:9999/fiction/wid/";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        fetch(`${apiUrl}${localStorage.getItem("wid")}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data)
                if (res.data) {
                    setFictions(res.data);
                }
        });
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
        getFictionByWID();
        setOpenDeleteFiction(false)
        window.location.href = "/fiction-show";
    }

    useEffect(() => {
        getFictionByWID();
    }, []);

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

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
                            <Grid item xs={12}>
                            <Box display="flex" sx={{ paddingX: 2, paddingY: 1 ,justifyContent: 'space-between'}} >
                            <Box >
                              <Button 
                                id="editFiction"
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() =>
                                    navigate({ pathname: `/fiction-update/${fiction.ID}` })
                                }
                                >
                                  แก้ไขนิยาย
                              </Button>
                            </Box>
                            <Box>
                              <Button 
                                id="deletefiction"
                                variant="outlined" 
                                color="error" 
                                startIcon={<DeleteIcon />}
                                onClick={() => { handleDialogDeleteOpen(Number(fiction.ID)) }}
                                >
                                  ลบนิยาย
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                        </CardActions>
                        </Card>
                        </Grid>
                    ))}
                    </Grid>
                </Box>
                <Dialog
                        open={openDeleteFiction}
                        onClose={handleDialogDeleteclose}
                        TransitionComponent={Transition}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {`ต้องการลบนิยายเรื่องนี้ใช่มั๊ย`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            หากลบไปแล้วกู้คืนไม่ได้แล้วนะ!!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color= "error" onClick={handleDialogDeleteclose}>บ่ลบแล้วจ้า</Button>
                        <Button color= "secondary" onClick={handleDelete} className="bg-red" autoFocus>
                            ลบไปเลยจ้า
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
    </div>
    );
}
export default ShowFiction;
//159