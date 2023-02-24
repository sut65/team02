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
import dayjs from "dayjs";
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';

import { FeedbackInterface } from "../interfaces/feedback/IFeedback"; 

const apiUrl = "http://localhost:9999";

async function GetFeedbacks() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/feedbacks`, requestOptions)
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

const FeedbackDelete = async (ID: number) => {
    console.log(ID)
    const requestOptions = {
        method: "DELETE",
        headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", 
        },
    };
    let res = await fetch(`http://localhost:9999/feedbacks/`+ID, requestOptions)
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

function FeedbackList () {
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState<FeedbackInterface[]>([]);
    const [deletefeedbackID, setDeleteFeedbackID] = React.useState<number>(0);
    const [openDeleteFeedback, setOpenDeleteFeedback] = React.useState(false);
 
    const getFeedbacks = async () => {
        let res = await GetFeedbacks();
        if (res) {
            setFeedbacks(res);
        }
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
        window.location.href = "/feedbacks-list";
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
                            รายการ การรายงานปัญหาของนักอ่าน
                            </Typography>
                        </Box>
                        <Box>
                        <Button
                                startIcon={<DashboardIcon />}
                                variant="contained"
                                color="secondary"
                                component={RouterLink}
                                to="/"
                                sx={{ p: 1, my:3, mx:0.5}}
                            >
                                แดชบอร์ด
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>ID</TableCell> */}
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
                                        {/* <TableCell component="th" scope="row">{row.ID}</TableCell> */}
                                        <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}}>{row.Reader?.Email}</TableCell>
                                        <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}}>{row.Telephone_Number}</TableCell>
                                        <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}}>{row.ProblemSystem?.Problem_Topic}</TableCell>
                                        <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}}>{row.Priority?.Priority_Level}</TableCell>
                                        <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}}>{row.FeedbackDetail}</TableCell>
                                        <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}}>{dayjs(row.Feedback_Date).format('ddd, MMM D, YYYY h:mm A')}</TableCell>
                                        <TableCell align="center">
                                        <ButtonGroup
                                                variant="outlined"
                                                >
                                            <Button
                                                startIcon={<DeleteIcon />}
                                                sx={{mx:0.5}}
                                                color="error"
                                                variant="outlined"
                                                onClick={() => { handleDialogDeleteOpen(Number(row.ID)) }}
                                                >จัดการ
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
export default FeedbackList;