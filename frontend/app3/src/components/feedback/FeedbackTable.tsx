import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { CssBaseline, IconButton} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import {    Button, Container,      
            Dialog, DialogActions,  DialogContent,  DialogContentText,  DialogTitle, 
            Paper,  Typography, Slide,  
            Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';  
import dayjs from "dayjs";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { FeedbackInterface } from "../../interfaces/feedback/IFeedback";
import { FeedbackDelete } from "../../services/HttpClientService";

function FeedbackTable () {
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState<FeedbackInterface[]>([]);
    const [deletefeedbackID, setDeleteFeedbackID] = React.useState<number>(0);
    const [openDeleteFeedback, setOpenDeleteFeedback] = React.useState(false);
 
    const getFeedbackByFID = async () => {
        const apiUrl = "http://localhost:9999/feedback/fid/";
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
                    setFeedbacks(res.data);
                }
        });
    };

    const handleDialogDeleteOpen = (ID: number) => {
        setDeleteFeedbackID(ID)
        setOpenDeleteFeedback(true)
    }
    const handleDialogDeleteclose = () => {
        setOpenDeleteFeedback(false)
        setTimeout(() => {
            setDeleteFeedbackID(0)
        }, 500)
    }
    const handleDelete = async () => {
        let res = await FeedbackDelete(deletefeedbackID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getFeedbackByFID();
        setOpenDeleteFeedback(false)
        window.location.href = "/feedbacks";
    }

    useEffect(() => {
        getFeedbackByFID();
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
                    <Box display="flex" sx={{ marginTop: 2}}>
                        <Box sx={{ flexGrow: 1 }}>
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
                                    <FeedbackRoundedIcon />
                                </IconButton>
                                ประวัติการรายงานปัญหาของฉัน
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to="/feedback-create"
                                sx={{ p: 1 }}
                                color= "secondary"
                            >
                                รายงานปัญหาที่พบเพิ่มเติม
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell variant="head" align="center" style={{maxWidth: "200px", minHeight: "40px"}}>อีเมลล์</TableCell>
                                    <TableCell variant="head" align="center" style={{maxWidth: "200px", minHeight: "40px"}}>เบอร์โทรศัพท์</TableCell>
                                    <TableCell variant="head" align="center" style={{maxWidth: "200px", minHeight: "40px"}}>หัวข้อปัญหาที่พบ</TableCell>
                                    <TableCell variant="head" align="center" style={{maxWidth: "200px", minHeight: "40px"}}>ระดับความรีบ</TableCell>
                                    <TableCell variant="head" align="center" style={{maxWidth: "200px", minHeight: "40px"}}>รายละเอียด</TableCell>
                                    <TableCell variant="head" align="center" style={{maxWidth: "200px", minHeight: "40px"}}>เวลาที่รายงานปัญหา</TableCell>
                                    <TableCell variant="head" align="center" style={{maxWidth: "200px", minHeight: "40px"}}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {feedbacks.map((row) => (
                                    <TableRow
                                        key={row.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                         <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}}>{row.Reader?.Email}</TableCell>
                                        <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}}>{row.Telephone_Number}</TableCell>
                                        <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}}>{row.ProblemSystem?.Problem_Topic}</TableCell>
                                        <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}}>{row.Priority?.Priority_Level}</TableCell>
                                        <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}}>{row.FeedbackDetail}</TableCell>
                                        <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}}>{dayjs(row.Feedback_Date).format('ddd, MMM D, YYYY h:mm A')}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup
                                                variant="outlined"
                                                aria-lable="outlined button group"
                                                >
                                                <Button
                                                    startIcon={<EditIcon />}
                                                    onClick={() =>
                                                        navigate({ pathname: `/feedback-update/${row.ID}` })
                                                    }
                                                    color= "secondary"
                                                    variant="outlined"
                                                    >
                                                    แก้ไข
                                                </Button>
                                                <Button
                                                    startIcon={<DeleteIcon />}
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => { handleDialogDeleteOpen(Number(row.ID)) }}
                                                    
                                                    >
                                                    ยกเลิก
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog
                        open={openDeleteFeedback}
                        onClose={handleDialogDeleteclose}
                        TransitionComponent={Transition}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {`ต้องการลบการรายงานปัญหาอิหลีบ่`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            หากลบแล้วกู้คืนไม่ได้แล้วนะ!!
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
export default FeedbackTable;