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

import { AdminInterface } from "../interfaces/IAdmin";
import { GetAdminByAID, AdminDelete } from "../services/HttpClientService";


function Admin() {
    const navigate = useNavigate();
    const [admins, setAdmins] = useState<AdminInterface>({});
    const [deleteID, setDeleteID] = React.useState<number>(0)
    const [openDelete, setOpenDelete] = React.useState(false);

    const getAdmins = async () => {
        let res = await GetAdminByAID();
        if (res) {
          setAdmins(res);
      }
    };

    const handleDialogDeleteOpen = (ID: number) => {
      setDeleteID(ID)
      setOpenDelete(true)
    }
    const handleDialogDeleteclose = () => {
      setOpenDelete(false)
      setTimeout(() => {
          setDeleteID(0)
      }, 500)
    }
    const handleDelete = async () => {
      let res = await AdminDelete(deleteID)
      if (res) {
          console.log(res.data)
      } else {
          console.log(res.data)
      }
      getAdmins();
      setOpenDelete(false)
    }

    useEffect(() => {
      getAdmins();
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
                            <Typography variant="h4" component="div" color="secondary" gutterBottom>
                                รายชื่อผู้ดูแลระบบ
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color="success"
                                component={RouterLink}
                                to="/admin_create"
                                sx={{ p: 1, my:3 }}
                            >
                                เพิ่มรายชื่อผู้ดูแลระบบ
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2, }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>ID</TableCell> */}
                                    <TableCell align="center">รหัสประจำตัว</TableCell>
                                    <TableCell align="center">ชื่อ</TableCell>
                                    <TableCell align="center">นามสกุล</TableCell>
                                    <TableCell align="center">เพศ</TableCell>
                                    <TableCell align="center">ระดับการศึกษา</TableCell>
                                    <TableCell align="center">หน้าที่</TableCell>
                                    <TableCell align="center">อีเมล์</TableCell>
                                    <TableCell align="center">วันที่ลงทะเบียน</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                  <TableRow
                                        key={admins.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell align="left">{admins.ID}</TableCell>
                                        <TableCell align="left">{admins.Admin_firstname}</TableCell>
                                        <TableCell align="left">{admins.Admin_lastname}</TableCell>
                                        <TableCell align="left">{admins.Gender?.Gender}</TableCell>
                                        <TableCell align="left">{admins.Education?.Education_degree}</TableCell>
                                        <TableCell align="left">{admins.Role?.Role}</TableCell>
                                        <TableCell align="left">{admins.Admin_email}</TableCell>
                                        <TableCell align="left">{String(admins.Admin_date_register)}</TableCell>
                                        <TableCell align="center">
                                          <ButtonGroup
                                            variant="outlined"
                                            aria-lable="outlined button group"
                                            >
                                            <Button
                                              onClick={() =>
                                                navigate({ pathname: `/admin_update/${admins.ID}` })
                                              }
                                              color= "primary"
                                              variant="contained"
                                              >แก้ไขข้อมูล
                                            </Button>
                                            <Button
                                              color="error"
                                              variant="contained"
                                              onClick={() => { handleDialogDeleteOpen(Number(admins.ID)) }}
                                              >ลบผู้ดูแลระบบ
                                            </Button>
                                          </ButtonGroup>
                                        </TableCell>
                                  </TableRow>
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
                        {`คุณต้องการลบผู้ดูแลระบบชื่อ  ${admins.Admin_firstname} ${admins.Admin_lastname} ใช่หรือไม่`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          หากคุณลบข้อมูลนี้แล้วนั้น คุณจะไม่สามารถกู้คืนได้อีก คุณต้องการลบข้อมูลนี้ใช่หรือไม่
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

export default Admin;