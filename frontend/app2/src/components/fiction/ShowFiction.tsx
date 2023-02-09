import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import {    Button, Container,      
    Dialog, DialogActions,  DialogContent,  DialogContentText,  DialogTitle, 
    Paper,  Typography, Slide,  
    Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';


import { FictionInterface } from "../../interfaces/fiction/IFiction"; 
import { FictionDelete } from "../../services/fiction/HttpClientService"; 

function ShowFictions() {
    const params = useParams();
    const navigate = useNavigate();
    const [fictions, setFictions] = useState<FictionInterface[]>([]);
    const [deletefictionID, setDeleteFictionID] = React.useState<number>(0);
    const [openDeleteFiction, setOpenDeleteFiction] = React.useState(false);

    const getFictions = async () => {
        const apiUrl = "http://localhost:9999/fictions";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        fetch(apiUrl, requestOptions)
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
        getFictions();
        setOpenDeleteFiction(false)
    }
    useEffect(() => {
        getFictions();
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
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Box display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                นิยายของฉัน
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color= "secondary"
                                component={RouterLink}
                                to="/fiction-create"
                                sx={{ p: 1 }}
                            >
                                สร้างงานเขียน
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">นิยาย</TableCell>
                                    <TableCell align="center">ผู้แต่ง</TableCell>
                                    <TableCell align="center">หมวดหมู่นิยาย</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fictions.map((row) => (
                                    <TableRow
                                        key={row.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                        <TableCell align="left">{row.Fiction_Name}</TableCell>
                                        <TableCell align="left">{row.Writer?.Pseudonym}</TableCell>
                                        <TableCell align="left">{row.Genre?.Genre_Name}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup
                                                variant="outlined"
                                                aria-lable="outlined button group"
                                                >
                                                <Button
                                                    onClick={() =>
                                                        navigate({ pathname: `/fiction-update/${row.ID}` })
                                                    }
                                                    color= "secondary"
                                                    variant="outlined"
                                                    >
                                                    แก้ไขนิยาย
                                                </Button>
                                                <Button
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => { handleDialogDeleteOpen(Number(row.ID)) }}
                                                    >
                                                    ลบนิยาย
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
        </React.Fragment>
    );
}

export default ShowFictions;