import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { CssBaseline,} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import {    Button, Container,      
            Dialog, DialogActions,  DialogContent,  DialogContentText,  DialogTitle, 
            Paper,  Typography, Slide,  
            Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';

import { WriterInterface } from "../../interfaces/writer/IWriter";
// const WriterDelete = async (ID: number) => {
//     console.log(ID)
//     const requestOptions = {
//         method: "DELETE",
//         headers: { 
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json", 
//         },
//     };
//     let res = await fetch(`http://localhost:9999/writers/`+ID, requestOptions)
//         .then((response) => response.json())
//         .then((res) => {
//             if(res.data){
//                 return res.data
//             } else{
//                 return false
//             }
//     })
//     return res
//   };

//   function WriterTable() {
//     const params = useParams();
//     const navigate = useNavigate();

//     const [writers, setWriters] = useState<WriterInterface[]>([]);
//     //For Delete state 
//     const [deleteID, setDeleteID] = React.useState<number>(0)

//     // For Set dialog open
//     const [openDelete, setOpenDelete] = React.useState(false);
//     const apiUrl = "http://localhost:9999";
//     const getWriters = async () => {
//         const apiUrl = "http://localhost:9999/review/rid/";
//         const requestOptions = {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 "Content-Type": "application/json",
//             },
//         };
//         fetch(`${apiUrl}${localStorage.getItem("wid")}`, requestOptions)
//             .then((response) => response.json())
//             .then((res) => {
//                 console.log(res.data)
//                 if (res.data) {
//                     setWriters(res.data);
//                 }
//         });
//     };


function WriterTable() {
    const params = useParams();
    const navigate = useNavigate();

    const [writers, setWriters] = useState<WriterInterface[]>([]);


    const apiUrl = "http://localhost:9999";
    const getWriters = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
        };
        fetch(`${apiUrl}/writers`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
            if (res.data) {
                setWriters(res.data);
            }
        });
    };

    // const handleDialogDeleteOpen = (ID: number) => {
    //     setDeleteID(ID)
    //     setOpenDelete(true)
    // }
    // const handleDialogDeleteclose = () => {
    //     setOpenDelete(false)
    //     setTimeout(() => {
    //         setDeleteID(0)
    //     }, 500)
    // }
    // const handleDelete = async () => {
    //     let res = await WriterDelete(deleteID)
    //     if (res) {
    //         console.log(res.data)
    //     } else {
    //         console.log(res.data)
    //     }
    //     getWriters();
    //     setOpenDelete(false)
    // }

    useEffect(() => {
        getWriters();
    }, []);

    // const Transition = React.forwardRef(function Transition(
    //     props: TransitionProps & {
    //         children: React.ReactElement<any, any>;
    //     },
    //     ref: React.Ref<unknown>,
    // ) {
    //     return <Slide direction="up" ref={ref} {...props} />;
    // });

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Box display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                ประวัติข้อมูลนักเขียน
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to="/writer/create"
                                sx={{ p: 1 }}

                            >
                                เพิ่มนักเขียน
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>ID</TableCell> */}
                                    <TableCell align="center">คำนำหน้า</TableCell>
                                    <TableCell align="center">ชื่อ-นามสกุล</TableCell>
                                    <TableCell align="center">เพศ</TableCell>
                                    <TableCell align="center">วันเกิด</TableCell>
                                    <TableCell align="center">อีเมล์</TableCell>
                                    <TableCell align="center">ต้นสังกัด</TableCell>
                                    <TableCell align="center">นามปากกา</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {writers.map((row) => (
                                    <TableRow
                                        key={row.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                        {/* <TableCell component="th" scope="row">{row.ID}</TableCell> */}
                                        <TableCell align="left">{row.Prefix?.Prefix_Name}</TableCell>
                                        <TableCell align="left">{row.Name}</TableCell>
                                        <TableCell align="left">{row.Gender?.Gender}</TableCell>
                                        <TableCell align="left">{String(row.Writer_birthday)}</TableCell>
                                        <TableCell align="left">{row.Email}</TableCell>
                                        <TableCell align="left">{row.Affiliation?.Affiliation_name}</TableCell>
                                        <TableCell align="left">{row.Pseudonym}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup
                                                variant="outlined"
                                                // eslint-disable-next-line jsx-a11y/aria-props
                                                aria-lable="outlined button group"
                                                >
                                                <Button
                                                    onClick={() =>
                                                        navigate({ pathname: `/writer/${row.ID}` })
                                                    }
                                                    variant="contained"
                                                    >
                                                    แก้ไขขูล
                                                </Button>
                                                <Button
                                                    color="error"
                                                    >
                                                    ลบนักเขียน
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                        {/* <Dialog
                            open={openDelete}
                            onClose={handleDialogDeleteclose}
                            TransitionComponent={Transition}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {`คุณต้องการรีวิวนิยายเรื่อง  ${writers.filter((writer) => (writer.ID === deleteID)).at(0)?.Fiction?.Fiction_Name} ใช่หรือไม่`}
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
                        </Dialog> */}
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default WriterTable;