import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import { CssBaseline,} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import {    Button, Container,      
            Dialog, DialogActions,  DialogContent,  DialogContentText,  DialogTitle, 
            Paper,  Typography, Slide,  
            Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';

import { AdminInterface } from "../interfaces/IAdmin";
import { GetAdmins, AdminDelete } from "../services/HttpClientService";


function Admin() {
    const navigate = useNavigate();
    const [admins, setAdmins] = useState<AdminInterface[]>([]);
    const [deleteID, setDeleteID] = React.useState<number>(0)
    const [openDelete, setOpenDelete] = React.useState(false);

  //   const getAdmins = async () => {
  //     const apiUrl = "http://localhost:9999/admin/";
  //     const requestOptions = {
  //         method: "GET",
  //         headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             "Content-Type": "application/json",
  //         },
  //     };
  //     fetch(`${apiUrl}${localStorage.getItem("aid")}`, requestOptions)
  //         .then((response) => response.json())
  //         .then((res) => {
  //             console.log(res.data)
  //             if (res.data) {
  //                 setAdmins(res.data);
  //             }
  //     });
  // };

    const getAdmins = async () => {
        let res = await GetAdmins();
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
                                startIcon={<GroupAddIcon />}
                                variant="contained"
                                color="success"
                                component={RouterLink}
                                to="/admin_create"
                                sx={{ p: 1, my:3, mx:0.5}}
                            >
                                เพิ่มรายชื่อผู้ดูแลระบบ
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                startIcon={<HomeIcon />}
                                variant="contained"
                                color="secondary"
                                component={RouterLink}
                                to="/"
                                sx={{ p: 1, my:3, mx:0.5}}
                            >
                                หน้าแรก
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
                              {admins.map((row) => (
                                  <TableRow
                                        key={row.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell align="left">{row.ID}</TableCell>
                                        <TableCell align="left">{row.Admin_firstname}</TableCell>
                                        <TableCell align="left">{row.Admin_lastname}</TableCell>
                                        <TableCell align="left">{row.Gender?.Gender}</TableCell>
                                        <TableCell align="left">{row.Education?.Education_degree}</TableCell>
                                        <TableCell align="left">{row.Role?.Role}</TableCell>
                                        <TableCell align="left">{row.Admin_email}</TableCell>
                                        <TableCell align="left">{String(row.Admin_date_register)}</TableCell>
                                        <TableCell align="center">
                                          <ButtonGroup
                                            variant="outlined"
                                            aria-lable="outlined button group"
                                            >
                                            <Button
                                              startIcon={<EditIcon />}
                                              sx={{mx:0.5}}
                                              onClick={() =>
                                                navigate({ pathname: `/admin/update/${row.ID}` })
                                              }
                                              color= "primary"
                                              variant="contained"
                                              >อัพเดต
                                            </Button>
                                            <Button
                                              startIcon={<DeleteIcon />}
                                              sx={{mx:0.5}}
                                              color="error"
                                              variant="contained"
                                              onClick={() => { handleDialogDeleteOpen(Number(row.ID)) }}
                                              >ลบ
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
                        {/* {`คุณต้องการลบผู้ดูแลระบบชื่อ  ${admins.filter((admin) => (admin.ID === deleteID)).at(0)?.${Admin_firstname} ${admins.Admin_lastname} ใช่หรือไม่`} */}
                         {/* {`คุณต้องการลบผู้ดูแลระบบชื่อ  ${admins.Admin_firstname} ${admins.Admin_lastname} ใช่หรือไม่`} */}
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