import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from "@mui/material/FormControl";
import { useNavigate, useParams } from "react-router-dom";
import {    Button, Container,      
  Dialog, DialogActions,  DialogContent,  DialogContentText,  DialogTitle, 
  Paper,  Typography, Slide,  
  Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Divider from '@mui/material/Divider';

import { ReaderInterface } from "../../interfaces/IReader";
import { GetReaderByRID, ReaderDelete } from "../../services/HttpClientService";

function ReaderProfile() {
  
    const params = useParams();
    const navigate = useNavigate();

    const [readers, setReaders] = useState<ReaderInterface>({Date_of_Birth: new Date(),});
    const [deleteID, setDeleteID] = React.useState<number>(0)
    const [openDelete, setOpenDelete] = React.useState(false);
    


    // useEffect(() => {
    //     getReader();
    // }, []);
    // const card = (
    //   <React.Fragment>
    //     <CardContent>
    //       <center>
    //       <Typography variant="h5" component="div">
    //         be{bull}nev{bull}o{bull}lent
    //       </Typography>
    //       </center>
    //     </CardContent>
        
    //     <CardActions>
    //       <Button size="small">Learn More</Button>
    //     </CardActions>
    //   </React.Fragment>
    // );
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

    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
  };
    return (
    // <div>
    //   <Card variant="outlined">{card}</Card>
    // </div>
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
                    component="h2"
                    variant="h4"
                    // color="primary"
                    gutterBottom
                  >
                    โปรไฟล์
                  </Typography> 
                </Box>
              </Box>
              <Divider />
              <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item xs={12}>
                  ToT
                </Grid>
              </Grid>
              <Grid item xs={12} spacing={5} sx={{ padding: 2 }}>
                <Button 
                // component={RouterLink} 
                // to="/reader-update/:id"
                variant="contained"
                color="primary"
                onClick={() =>
                  navigate({ pathname: `/reader-update/${readers.ID}` })
              }
                >
                  อัปเดตว้อย
                </Button>
              </Grid>
              <Grid item xs={12} spacing={5} sx={{ padding: 2 }}>
                <Button 
                // component={RouterLink} 
                // to="/reader-update/:id"
                variant="contained"
                color="error"
                onClick={() => { handleDialogDeleteOpen(Number(readers.ID)) }
              }
                >
                  ออกไป
                </Button>
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