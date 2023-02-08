import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { CssBaseline,} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import {    Button, Container,      
            Dialog, DialogActions,  DialogContent,  DialogContentText,  DialogTitle, 
            Paper,  Typography, Slide,  
            Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';

import { FeedbackInterface } from "../../interfaces/feedback/IFeedback";
import { FeedbackDelete } from "../../services/HttpClientService";

function FeedbackTable () {
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState<FeedbackInterface[]>([]);
    const [deletefeedbackID, setDeleteFeedbackID] = React.useState<number>(0);
    const [openDeleteFeedback, setOpenDeleteFeedback] = React.useState(false);
    const getFeedbacks = async () => {
        const apiUrl = "http://localhost:9999/feedbacks";
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
        getFeedbacks();
        setOpenDeleteFeedback(false)
    }

    useEffect(() => {
        getFeedbacks();
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
                                ประวัติการรายงานปัญหาของฉัน
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="outlined"
                                component={RouterLink}
                                to="/feedback-create"
                                sx={{ p: 1 }}
                                color= "secondary"
                            >
                                ราบงานปัญหาที่พบ
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>ID</TableCell> */}
                                    <TableCell align="center">อีเมลล์</TableCell>
                                    <TableCell align="center">เบอร์โทรศัพท์</TableCell>
                                    <TableCell align="center">หัวข้อปัญหาที่พบ</TableCell>
                                    <TableCell align="center">ระดับความรีบ</TableCell>
                                    <TableCell align="center">รายละเอียด</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {feedbacks.map((row) => (
                                    <TableRow
                                        key={row.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                        {/* <TableCell component="th" scope="row">{row.ID}</TableCell> */}
                                        <TableCell align="left">{row.Reader?.Email}</TableCell>
                                        <TableCell align="left">{row.Telephone_Number}</TableCell>
                                        <TableCell align="left">{row.ProblemSystem?.Problem_Topic}</TableCell>
                                        <TableCell align="left">{row.Priority?.Priority_Level}</TableCell>
                                        <TableCell align="left">{row.FeedbackDetail}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup
                                                variant="outlined"
                                                
                                                aria-lable="outlined button group"
                                                >
                                                <Button
                                                    onClick={() =>
                                                        navigate({ pathname: `/feedback-update/${row.ID}` })
                                                    }
                                                    color= "secondary"
                                                    variant="outlined"
                                                    >
                                                    แก้ไขการรายงาน
                                                </Button>
                                                <Button
                                                    
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => { handleDialogDeleteOpen(Number(row.ID)) }}
                                                    
                                                    >
                                                    ยกเลิกการรายงาน
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
                    {/* <DialogTitle id="alert-dialog-title">
                        {`ต้องการลบการรายงานปัญหาอิหลี  ${feedbacks.filter((feedback) => (feedbacks. === deletefeedbackID)).at(0)?.ProblemSystem?.Problem_Topic} อิหลีบ่`}
                    </DialogTitle> */}
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ต้องการลบการรายงานปัญหาอิหลีบ่
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