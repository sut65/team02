import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import {  Divider, Grid, IconButton,} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import Moment from 'moment';
import {    Button, Container,      
            Dialog, DialogActions,  DialogContent,  DialogContentText,  DialogTitle, 
            Paper,  Typography, Slide,  
    
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { WriterInterface } from "../../interfaces/writer/IWriter";
import { GetWriterByWID, WriterDelete } from "../../services/writer/WriterService";



function WriterTable() {

    const navigate = useNavigate();
    const [writers, setWriters] = useState<WriterInterface>({});

    const [deleteID, setDeleteID] = React.useState<number>(0)
    const [openDelete, setOpenDelete] = React.useState(false);

    const getWriters = async () => {
        let res = await GetWriterByWID();
        if (res) {
        setWriters(res);
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
        let res = await WriterDelete(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getWriters();
        setOpenDelete(false)
        localStorage.clear();
        window.location.href = "/";
    }


    useEffect(() => {
        getWriters();
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
        <Container maxWidth="md">
            <Paper>
                <Box display="flex" sx={{marginTop: 1,}}><Box sx={{ paddingX: 1, paddingY: 1, }}>
                    <Typography component="h2" variant="h4" align="center"  gutterBottom>
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
                </Box></Box>
                <Grid item xs={12}>
                        <Typography variant="h3" align="center" color="secondary">{writers.Pseudonym}</Typography>
                    </Grid>
                <Divider />
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Box sx={{ paddingX: 2, paddingY: 1 }}>
                        <div>
                            <Typography variant="h5" >ชื่อ-นามสกุล: {writers.Prefix?.Prefix_Name} {writers.Name}</Typography>
                            <Typography variant="h5" >เพศ: {writers.Gender?.Gender}</Typography>
                            <Typography variant="h5" >วันเกิด: {Moment(writers.Writer_birthday).format('DD MMMM YYYY')}</Typography>
                            <Typography variant="h5" >อีเมล์: {writers.Email}</Typography>
                            <Typography variant="h5" >ต้นสังกัด: {writers.Affiliation?.Affiliation_name}</Typography>
    
                        </div>
                    </Box>
                    <Grid item xs={12}>
                        <Button
                            startIcon={<EditIcon />}
                            onClick={() =>
                                navigate({ pathname: `/writer/update/${writers.ID}` })
                            }
                            color= "secondary"
                            variant="contained"
                            >
                            แก้ไขข้อมูล
                        </Button>
                        <Button
                            startIcon={<DeleteIcon />}
                            style={{ float: "right" }}
                            color="error"
                            variant="contained"
                            onClick={() => { handleDialogDeleteOpen(Number(writers.ID)) }}
                            >
                            ลบบัญชี
                        </Button>
                    </Grid>
                </Grid>
                <Dialog
                        open={openDelete}
                        onClose={handleDialogDeleteclose}
                        TransitionComponent={Transition}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {`คุณต้องการลบแอคเคาน์นักเขียนชื่อ  ${writers.Name} ใช่หรือไม่`}
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
        </div>
    );
}

export default WriterTable;