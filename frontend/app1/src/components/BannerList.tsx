import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EditIcon from '@mui/icons-material/Edit';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { CssBaseline,} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import {    Button, Container,      
            Dialog, DialogActions,  DialogContent,  DialogContentText,  DialogTitle, 
            Paper,  Typography, Slide,  
            Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';
import dayjs, { Dayjs } from "dayjs";

import { PublicRelationInterface } from "../interfaces/IPublicRelation";
import { GetPublicRelations, PRDelete } from "../services/HttpClientService";


function BannerList() {
    const navigate = useNavigate();
    const [public_relations, setPublicRelations] = useState<PublicRelationInterface[]>([]);
    const [deleteID, setDeleteID] = React.useState<number>(0)
    const [openDelete, setOpenDelete] = React.useState(false);

    const getPublicRelations = async () => {
        let res = await GetPublicRelations();
        if (res) {
          setPublicRelations(res);
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
      let res = await PRDelete(deleteID)
      if (res) {
          console.log(res.data)
      } else {
          console.log(res.data)
      }
      getPublicRelations();
      setOpenDelete(false)
    }

    useEffect(() => {
        getPublicRelations();
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
                                รายการแบนเนอร์ทั้งหมด
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                startIcon={<GroupAddIcon />}
                                variant="contained"
                                color="success"
                                component={RouterLink}
                                to="/banner_c"
                                sx={{ p: 1, my:3, mx:0.5}}
                            >
                                สร้างแบนเนอร์
                            </Button>
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
                                    <TableCell align="center">ลำดับ</TableCell>
                                    <TableCell align="center">รูปหน้าปก</TableCell>
                                    <TableCell align="center">หัวข้อเรื่อง</TableCell>
                                    <TableCell align="center">รายละเอียด</TableCell>
                                    <TableCell align="center">นวนิยาย</TableCell>
                                    <TableCell align="center">จำกัดอายุ</TableCell>
                                    <TableCell align="center">นักเขียน</TableCell>
                                    <TableCell align="center">ผู้รับผิดชอบ</TableCell>
                                    <TableCell align="center">ว/ด/ป</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                              {public_relations.map((row) => (
                                  <TableRow
                                        key={row.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell align="left">{row.ID}</TableCell>
                                        <TableCell align="left"><img src={`${row.Pr_cover}`} width="250" height="150"/></TableCell>
                                        <TableCell align="left">{row.Pr_topic}</TableCell>
                                        <TableCell align="left">{row.Pr_details}</TableCell>
                                        <TableCell align="left">{row.Fiction?.Fiction_Name}</TableCell>
                                        <TableCell align="left">{row.Fiction?.RatingFiction?.RatingFiction_Name}</TableCell>
                                        <TableCell align="left">{row.Fiction?.Writer?.Name}</TableCell>
                                        <TableCell align="left">{row.Admin?.Admin_firstname + " " + row.Admin?.Admin_lastname}</TableCell>
                                        <TableCell align="left">{dayjs(row.Pr_time).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell align="center">
                                          <ButtonGroup
                                            variant="outlined"
                                            aria-lable="outlined button group"
                                            >
                                            <Button
                                              startIcon={<EditIcon />}
                                              sx={{mx:0.5}}
                                              onClick={() =>
                                                navigate({ pathname: `/pr/update/${row.ID}` })
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
export default BannerList;