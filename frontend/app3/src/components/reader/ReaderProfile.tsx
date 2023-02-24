import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from "react-router-dom";
import {    Button, Container,      
  Dialog, DialogActions,  DialogContent,  DialogContentText,  DialogTitle, 
  Paper,  Typography, Slide, IconButton,    
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Divider from '@mui/material/Divider';
import dayjs from "dayjs";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HistoryIcon from '@mui/icons-material/History';
import { ReaderInterface } from "../../interfaces/IReader";
import { GetReaderByRID, ReaderDelete } from "../../services/HttpClientService";


function ReaderProfile() {
  
    const navigate = useNavigate();

    const [readers, setReaders] = useState<ReaderInterface>({Date_of_Birth: new Date(),});
    const [deleteID, setDeleteID] = React.useState<number>(0)
    const [openDelete, setOpenDelete] = React.useState(false);



    
    const getReaders = async () => {
      let res = await GetReaderByRID();
      if (res) {
      setReaders(res);
      }
  };


  const handleDialogDeleteOpen = (ID: number) => {
    setDeleteID(ID)
    setOpenDelete(true)
}
const handleDialogDeleteclose = () => {
    setOpenDelete(false)
    window.location.href = "/reader-profile";
    setTimeout(() => {
        setDeleteID(0)
    }, 500)
}
const handleDelete = async () => {
    let res = await ReaderDelete(deleteID)
    if (res) {
        console.log(res.data)
    } else {
        console.log(res.data)
    }
    getReaders();
    setOpenDelete(false)
    localStorage.clear();
    window.location.href = "/";
}

  useEffect(() => {
    getReaders();
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
      <div>
        <React.Fragment>
          <Container maxWidth="sm" sx={{ p: 2 }}>
            <Paper>
              <Box
                display="flex"
                sx={{
                marginTop: 2,
                }}>
                <Box sx={{ paddingX: 2, paddingY: 1 }}>
                  <Typography
                    component="h4"
                    variant="h5"
                    gutterBottom
                  >
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 0.5 }}
                    >
                        <AccountBoxIcon />
                      </IconButton>
                      โปรไฟล์ของคุณ
                  </Typography> 
                </Box>
              </Box>
              <Divider />
              <center>
              <Grid container spacing={3} sx={{ padding: 2 }}>
                
                <Grid item xs={12}>
                  <h2>{readers.Nickname}</h2>
                </Grid>
                
              </Grid>
              </center>
              <Grid item xs={12} spacing={5} sx={{ padding: 2 }}>
                <Box sx={{ paddingX: 2, paddingY: 1 }}>
                  <Typography>ชื่อ: {readers.Name}</Typography>
                  <Typography>อีเมล์: {readers.Email}</Typography>
                  <Typography>เพศ: {readers.Gender?.Gender}</Typography>
                  <Typography>วันเกิด: {dayjs(readers.Date_of_Birth).format('YYYY-MM-DD')}</Typography>
                  <Typography>แนวที่ชอบ: {readers.Genre?.Genre_Name}</Typography>
                  <Typography>เหรียญของฉัน: {readers.ReaderCoin}</Typography> 
                </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" sx={{ paddingX: 2, paddingY: 1 ,justifyContent: 'space-between'}} >
                    <Box >
                      <Button 
                        startIcon={<CurrencyExchangeIcon />}
                        style={{ float: "right" }}
                        variant="contained"
                        color="success"
                        onClick={() =>
                        navigate({ pathname: `/top_up/create` })
                        }
                        >
                          เติมเหรียญ
                      </Button>
                    </Box>
                    <Box>
                    <Button
                      startIcon={<HistoryIcon />} 
                      style={{ float: "left" }}
                      variant="contained"
                      color="success"
                      onClick={() =>
                      navigate({ pathname: `/top_ups` })
                      }
                      >
                        ประวัติการเติมเหรียญ
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" sx={{ paddingX: 2, paddingY: 1 ,justifyContent: 'space-between'}} >
                    <Box >
                      <Button
                        startIcon={<EditIcon />} 
                        style={{ float: "left" }}
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          navigate({ pathname: `/reader-update/${readers.ID}` })}
                        >
                        แก้ไขโปรไฟล์
                      </Button>
                    </Box>
                    <Box>
                    <Button 
                      startIcon={<DeleteIcon />}
                      style={{ float: "right" }}
                      variant="contained"
                      color="error"
                      onClick={() => { handleDialogDeleteOpen(Number(readers.ID)) }}
                      >
                        ลบบัญชี
                      </Button>
                    </Box>
                  </Box>
                </Grid>

              <Grid item xs={12} spacing={5} sx={{ padding: 2 }}>
              <Divider />
              </Grid>
              
              <Dialog
                        open={openDelete}
                        onClose={handleDialogDeleteclose}
                        TransitionComponent={Transition}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {`คุณต้องการลบแอคเคาน์นักอ่านชื่อ  ${readers.Nickname} ใช่หรือไม่`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            หากคุณลบข้อมูลนี้แล้วนั้น คุณจะไม่สามารถกู้คืนได้อีก คุณต้องการลบข้อมูลนี้ใช่หรือไม่
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color= "error" onClick={handleDialogDeleteclose}>ยกเลิก</Button>
                        <Button color= "secondary" onClick={handleDelete} className="bg-red" autoFocus 
                        >
                            ยืนยัน
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
          </Container>
        </React.Fragment>
      </div>
    );
    
}

export default ReaderProfile;