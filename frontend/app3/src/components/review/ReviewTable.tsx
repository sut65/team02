import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { CssBaseline, IconButton,} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import {    Button, Container,      
            Dialog, DialogActions,  DialogContent,  DialogContentText,  DialogTitle, 
            Paper,  Typography, Slide,  
            Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';

import { ReviewInterface } from "../../interfaces/review/IReview";
import ReviewsIcon from '@mui/icons-material/Reviews';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function ReviewTable() {

    const navigate = useNavigate();
    const [reviews, setReviews] = useState<ReviewInterface[]>([]);
    const [deleteID, setDeleteID] = React.useState<number>(0)
    const [openDelete, setOpenDelete] = React.useState(false);

    //=============================================================//

    const getReviews = async () => {
        const apiUrl = "http://localhost:9999/review/rid/";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        fetch(`${apiUrl}${localStorage.getItem("rid")}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data)
                if (res.data) {
                    setReviews(res.data);
                }
        });
    };

    const ReviewDelete = async (id: number) => {
        //console.log(id)
        const requestOptions = {
            method: "DELETE",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json", 
            },
        };
        let res = await fetch(`http://localhost:9999/reviews/`+id, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if(res.data){
                    return res.data
                } else{
                    return false
                }
        })
        return res
    };

    // ===================================================================================//

    const handleDialogDeleteOpen = (id: number) => {
        setDeleteID(id)
        setOpenDelete(true)
    }
    const handleDialogDeleteclose = () => {
        setOpenDelete(false)
        setTimeout(() => {
            setDeleteID(0)
        }, 500)
        window.location.href = "/reviews";
    }
    const handleDelete = async () => {
        let res = await ReviewDelete(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getReviews();
        setOpenDelete(false)
        window.location.href = "/reviews";
    }

    useEffect(() => {
        getReviews();
        
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
                <Box  display="flex" sx={{ marginTop: 2}} >
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
                                    <ReviewsIcon />
                                </IconButton>
                                ประวัติการเขียนรีวิว
                            </Typography>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>ID</TableCell> */}
                                    <TableCell variant="head" align="center" style={{maxWidth: "200px", minHeight: "40px"}} >นิยาย</TableCell>
                                    <TableCell variant="head" align="center" style={{maxWidth: "200px", minHeight: "40px"}} >หัวข้อที่ต้องการรีวิว</TableCell>
                                    <TableCell variant="head" align="center" style={{maxWidth: "200px", minHeight: "40px"}} >คะแนนรีวิว</TableCell>
                                    <TableCell variant="head" align="center" style={{maxWidth: "200px", minHeight: "40px"}} >ระดับรีวิว</TableCell>
                                    <TableCell variant="head" align="center" style={{maxWidth: "200px", minHeight: "40px"}} >รายละเอียด</TableCell>
                                    {/* <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}} >ผู้เขียนรีวิว</TableCell> */}
                                    <TableCell variant="head" align="center" style={{maxWidth: "200px", minHeight: "40px"}} >Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reviews.map((row) => (
                                    <TableRow
                                        key={row.ID}
                                        sx={{"&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                        {/* <TableCell component="th" scope="row">{row.ID}</TableCell> */}
                                        <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}} >{row.Fiction?.Fiction_Name}</TableCell>
                                        <TableCell align="center" style={{maxWidth: "70px", minHeight: "40px"}} >{row.ReviewTopic}</TableCell>
                                        <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}} >{row.Rating?.Rating_score}</TableCell>
                                        <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}} >{row.Rating?.Rating_name}</TableCell>                                    
                                        <TableCell align="left" style={{maxWidth: "200px", minHeight: "40px"}} >{row.ReviewDetail}</TableCell>
                                        {/* <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}} >{row.Reader?.Nickname}</TableCell> */}
                                        <TableCell align="center">
                                            <ButtonGroup
                                                variant="outlined"
                                                >
                                                <Button
                                                    id="Edit"
                                                    startIcon={<EditIcon />}
                                                    onClick={() =>
                                                        navigate({ pathname: `/review/update/${row.ID}` })
                                                    }
                                                    color= "secondary"
                                                    variant="outlined"
                                                    >
                                                    แก้ไข
                                                </Button>
                                                <Button
                                                    id="Delete"
                                                    startIcon={<DeleteIcon />}
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => { handleDialogDeleteOpen(Number(row.ID)) }}
                                                    
                                                    >
                                                    ลบ
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog
                        open={openDelete}
                        onClose={handleDialogDeleteclose}
                        TransitionComponent={Transition}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {`ท่านนักอ่านต้องการรีวิวนิยายเรื่อง  ${reviews.filter((review) => (review.ID === deleteID)).at(0)?.Fiction?.Fiction_Name} ใช่ม่ะ`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            หากท่านนักอ่านลบรีวิวนี้แล้ว ลบแล้วลบเลยกู้คืนไม่ได้นะ
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            color= "error" 
                            onClick={handleDialogDeleteclose}
                        >
                            ยกเลิก
                        </Button>
                        <Button color= "secondary" onClick={handleDelete} className="bg-red" autoFocus>
                            ยืนยัน
                        </Button>
                    </DialogActions>
                </Dialog>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default ReviewTable;