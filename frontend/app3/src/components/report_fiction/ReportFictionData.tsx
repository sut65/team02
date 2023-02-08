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

import { ReportFictionInterface } from "../../interfaces/report_fiction/IReportFiction";


function ReportFictionData() {

    const navigate = useNavigate();
    const [reports, setReports] = useState<ReportFictionInterface[]>([]);

    const [deleteID, setDeleteID] = React.useState<number>(0)
    const [openDelete, setOpenDelete] = React.useState(false);
    
    const getReportFictionsByRID = async () => {
        const apiUrl = "http://localhost:9999/report_fiction/rid/";
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
                    setReports(res.data);
                }
        });
    };

    const ReportFictionDelete = async (id: number) => {
        const requestOptions = {
            method: "DELETE",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json", 
            },
        };
        let res = await fetch(`http://localhost:9999/report_fictions/`+id, requestOptions)
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

    //////////////////////////////////////

    const handleDialogDeleteOpen = (id: number) => {
        setDeleteID(id)
        setOpenDelete(true)
    }
    const handleDialogDeleteclose = () => {
        setOpenDelete(false)
        setTimeout(() => {
            setDeleteID(0)
        }, 500)
    }
    const handleDelete = async () => {
        let res = await ReportFictionDelete(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getReportFictionsByRID();
        setOpenDelete(false)
    }


    useEffect(() => {
        getReportFictionsByRID();
        
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
                                ประวัติการรายงานนิยาย
                            </Typography>
                        </Box>
                        <Box>
                            {/* <Button
                                variant="outlined"
                                component={RouterLink}
                                to="/review/create"
                                sx={{ p: 1 }}
                                color= "secondary"
                            >
                                Create Review
                            </Button> */}
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>ID</TableCell> */}
                                    <TableCell align="center">นิยาย</TableCell>
                                    <TableCell align="center">หัวข้อปัญหาของนิยาย</TableCell>
                                    <TableCell align="center">รายละเอียด</TableCell>
                                    <TableCell align="center">เบอร์ติดต่อ</TableCell>
                                    <TableCell align="center">ผู้รายงาน</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reports.map((row) => (
                                    <TableRow
                                        key={row.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                        {/* <TableCell component="th" scope="row">{row.ID}</TableCell> */}
                                        <TableCell align="center">{row.Fiction?.Fiction_Name}</TableCell>
                                        <TableCell align="center">{row.ProblemFiction?.ProblemFiction_Topic}</TableCell>
                                        <TableCell align="center">{row.ProblemFictionDetail}</TableCell>
                                        <TableCell align="center">{row.PhoneNumber}</TableCell>
                                        <TableCell align="center">{row.Reader?.Nickname}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup
                                                variant="outlined"
                                                // eslint-disable-next-line jsx-a11y/aria-props
                                                aria-lable="outlined button group"
                                                >
                                                <Button
                                                    onClick={() =>
                                                        navigate({ pathname: `/report-fiction/update/${row.ID}` })
                                                    }
                                                    color= "secondary"
                                                    variant="outlined"
                                                    >
                                                    Edit
                                                </Button>
                                                <Button
                                                    // onClick={() =>  ReviewDelete(Number(row.ID))}
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => { handleDialogDeleteOpen(Number(row.ID)) }}
                                                    
                                                    >
                                                    DEL
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
                        {`ท่านนักอ่านต้องการายงานนิยายเรื่อง  ${reports.filter((report) => (report.ID === deleteID)).at(0)?.Fiction?.Fiction_Name} ใช่ม่ะ`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            หากท่านนักอ่านลบรีวิวนี้แล้ว ลบแล้วลบเลยกู้คืนไม่ได้นะ
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color= "error" onClick={handleDialogDeleteclose}>ยกเลิก</Button>
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

export default ReportFictionData;