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
import Man4Icon from '@mui/icons-material/Man4';
import { useNavigate, useParams } from "react-router-dom";
import {    Button, Container,      
  Dialog, DialogActions,  DialogContent,  DialogContentText,  DialogTitle, 
  Paper,  Typography, Slide,  
  Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Divider from '@mui/material/Divider';

import { ReaderInterface } from "../../interfaces/IReader";
import { GetBookshelfNumByRID, GetReaderByRID, ReaderDelete } from "../../services/HttpClientService";
import { Bookshelf_NumberInterface } from "../../interfaces/bookshelf/IBookshelf_Number";
import { GenderInterface } from "../../interfaces/IGender";

function ReaderProfile() {
  
    const params = useParams();
    const navigate = useNavigate();

    const [readers, setReaders] = useState<ReaderInterface>({Date_of_Birth: new Date(),});
    const [genders, setGenders] = useState<GenderInterface>({});
    const [deleteID, setDeleteID] = React.useState<number>(0)
    const [openDelete, setOpenDelete] = React.useState(false);
    const [bookshelf_numbers, setBookshelf_Numbers] = useState<Bookshelf_NumberInterface>({});

    const apiUrl = "http://localhost:9999";

    async function GetGender() {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
        };
    
        let res = await fetch(`${apiUrl}/genders`, requestOptions)
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
    
    const getReaders = async () => {
      let res = await GetReaderByRID();
      if (res) {
      setReaders(res);
      }
  };

  const getGenders = async () => {
    let res = await GetGender();
    if (res) {
    setGenders(res);
    }
};

  const getBookshelfs = async () => {
    let res = await GetBookshelfNumByRID();
    if (res) {
    setBookshelf_Numbers(res);
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
    getBookshelfs();
    getReaders();
    getGenders();
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
                    component="h4"
                    variant="h5"
                    // color="primary"
                    gutterBottom
                  >
                    <Man4Icon />โปรไฟล์
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
              <Box sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography>Email: {readers.Email}</Typography>
              </Box>
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