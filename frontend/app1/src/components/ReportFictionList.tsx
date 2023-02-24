import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton,} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import {    Button, Container,      
            Paper,  Typography, Slide,  
            Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';
import dayjs from "dayjs";

import { ReportFictionInterface } from "../interfaces/report_fiction/IReportFiction";
import { FictionDelete, GetReportFictions } from "../services/HttpClientService";


function ReportFictionList() {

    const [reports, setReports] = useState<ReportFictionInterface[]>([]);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [deleteID, setDeleteID] = React.useState<number>(0)
    const [openDelete, setOpenDelete] = React.useState(false);

    const getReportFictions = async () => {
        let res = await GetReportFictions();
        if (res) {
            setReports(res);
        }
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
    }
    const handleDelete = async () => {
        let res = await FictionDelete(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getReportFictions();
        setOpenDelete(false)
        window.location.href = "/report-fiction-list";
    }

    useEffect(() => {
        getReportFictions();
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
            <Container maxWidth="xl" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Box display="flex">
                        <Box sx={{ flexGrow: 1, my:3}}>
                            <Typography component="h2" variant="h3" color="secondary" gutterBottom>
                                รายการ การรายงานนิยาย
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
                        <Table sx={{ minWidth: 400, p: 2, }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>ID</TableCell> */}
                                    <TableCell align="center" style={{maxWidth: "50px", minHeight: "40px"}} >ลำดับ</TableCell>
                                    <TableCell align="center" style={{maxWidth: "150px", minHeight: "40px"}} >วันที่ระบุ</TableCell>
                                    <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}} >นิยาย</TableCell>
                                    <TableCell align="center" style={{maxWidth: "150px", minHeight: "40px"}} >หัวข้อปัญหาของนิยาย</TableCell>
                                    <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}} >รายละเอียด</TableCell>
                                    <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}} >เบอร์ติดต่อ</TableCell>  
                                    <TableCell align="center" style={{maxWidth: "200px", minHeight: "40px"}} >ผู้รายงาน</TableCell>                                      
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reports.map((row) => (
                                    <TableRow
                                        key={row.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell align="left" style={{maxWidth: "50px", minHeight: "40px"}} >{row.ID}</TableCell>
                                        <TableCell align="left" style={{maxWidth: "150px", minHeight: "40px"}} >{dayjs(row.Timestamp).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                                        <TableCell align="left" style={{maxWidth: "200px", minHeight: "40px"}} >{row.Fiction?.Fiction_Name}</TableCell>
                                        <TableCell align="left" style={{maxWidth: "150px", minHeight: "40px"}} >{row.ProblemFiction?.ProblemFiction_Topic}</TableCell>
                                        <TableCell align="left" style={{maxWidth: "200px", minHeight: "40px"}} >{row.ProblemFictionDetail}</TableCell>
                                        <TableCell align="right" style={{maxWidth: "200px", minHeight: "40px"}} >
                                            <Box display={"flex"}>
                                                <Box sx={{ flexGrow: 1 }}>
                                                {row.PhoneNumber ? (
                                                    showPhoneNumber ? row.PhoneNumber : row.PhoneNumber.substring(0, 3) + '****' + row.PhoneNumber.substring(7)
                                                ) : ('No phone number available')}
                                                </Box>
                                                <Box sx={{ flexGrow: 1 }}>
                                                {row.PhoneNumber && (
                                                <IconButton  onClick={() => setShowPhoneNumber(!showPhoneNumber)}>
                                                {showPhoneNumber ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                                </IconButton>
                                                )}
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="left" style={{maxWidth: "200px", minHeight: "40px"}} >{row.Reader?.Nickname}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup
                                                variant="outlined"
                                                >
                                            <Button
                                                startIcon={<DeleteIcon />}
                                                sx={{mx:0.5}}
                                                color="error"
                                                variant="outlined"
                                                onClick={() => { handleDialogDeleteOpen(Number(row.FictionID)) }}
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
                        open={openDelete}
                        onClose={handleDialogDeleteclose}
                        TransitionComponent={Transition}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="Report-Fiction-Delete">
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            หากคุณลบข้อมูลนี้แล้วนั้น คุณจะไม่สามารถกู้คืนได้อีก คุณต้องการลบข้อมูลนี้ใช่หรือไม่
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            color= "error" 
                            onClick={handleDialogDeleteclose}
                            >
                                ยกเลิก
                        </Button>
                        <Button 
                            color= "secondary" 
                            onClick={handleDelete} 
                            className="bg-red" 
                            autoFocus
                            >
                            ยืนยัน
                        </Button>
                    </DialogActions>
                </Dialog>
                </Paper>
            </Container>
        </React.Fragment>
    );
}
export default ReportFictionList;