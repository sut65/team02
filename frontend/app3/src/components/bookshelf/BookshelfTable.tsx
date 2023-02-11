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

import { Added_BookInterface } from "../../interfaces/bookshelf/IAdded_Book";
import { AddedBookDelete } from "../../services/HttpClientService";
import { Bookshelf_NumberInterface } from "../../interfaces/bookshelf/IBookshelf_Number";
import { FictionInterface } from "../../interfaces/fiction/IFiction";
import { WriterInterface } from "../../interfaces/writer/IWriter";

function BookshelfTable () {
    const navigate = useNavigate();
    const [addedbooks, setAddedBooks] = useState<Added_BookInterface[]>([]);
    const [deleteAddedBookID, setDeleteAddedBookID] = React.useState<number>(0);
    const [openDeleteAddedBook, setOpenDeleteAddedBook] = React.useState(false);
    const [bookshelf_numbers, setBookshelf_Numbers] = useState<Bookshelf_NumberInterface>({});
    const [fictions, setFictions] = useState<FictionInterface>({});
    const [writers, setWriters] = useState<WriterInterface>({});
    
    // const getAddedBooks = async () => {
    //     const _id = localStorage.getItem("rid")
    //     const apiUrl = "http://localhost:9999/added_book/bsid/"+_id;
    //     const requestOptions = {
    //         method: "GET",
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             "Content-Type": "application/json",
    //         },
    //     };
    //     console.log(`Bearer ${localStorage.getItem("token")}`);
    //     fetch(apiUrl, requestOptions)
    //         .then((response) => response.json())
    //         .then((res) => {
    //             //console.log(res.data)
    //             if (res.data) {
    //                 setAddedBooks(res.data);
    //             }
    //     });
    // };

    const getAddedBooks = async () => {
        const apiUrl = "http://localhost:9999/added_book/bsid/";
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
                    setAddedBooks(res.data);
                }
        });
    };

    //หาไอดีของ bookshelf
    const getBookshelfs = async () => {
        const _id = localStorage.getItem("rid")
        const apiUrl = "http://localhost:9999/bookshelf_number/"+_id;
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        console.log(`Bearer ${localStorage.getItem("token")}`);
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log('res...', res.data);
                console.log('res...', res.data.ID);
                if (res.data) {
                    setBookshelf_Numbers(res.data);
                }
        });
      };


      const getFiction = async () => {
        // const _id = localStorage.getItem("rid")
        const apiUrl = "http://localhost:9999/fictions";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        console.log(`Bearer ${localStorage.getItem("token")}`);
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log('res...', res.data);
                console.log('res...', res.data.ID);
                if (res.data) {
                    setWriters(res.data);
                }
        });
      };
      
      


    const handleDialogDeleteOpen = (ID: number) => {
        setDeleteAddedBookID(ID)
        setOpenDeleteAddedBook(true)
    }
    const handleDialogDeleteclose = () => {
        setOpenDeleteAddedBook(false)
        setTimeout(() => {
            setDeleteAddedBookID(0)
        }, 500)
    }
    const handleDelete = async () => {
        let res = await AddedBookDelete(deleteAddedBookID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getAddedBooks();
        setOpenDeleteAddedBook(false)
    }

    useEffect(() => {
        getFiction();
        getBookshelfs();
        getAddedBooks();
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
                                {bookshelf_numbers.Bookshelf_Name}
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="outlined"
                                // component={RouterLink}
                                // to="/bookshelf-update/"
                                onClick={() =>
                                    navigate({ pathname: `/bookshelf-update/${bookshelf_numbers.ID}` })
                                }
                                sx={{ p: 1 }}
                                color= "secondary"
                            >
                                ถ้าชื่อไม่โอ
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>ID</TableCell> */}
                                    <TableCell align="center">นิยายในชั้นหนังสือของเจ้า</TableCell>
                                    <TableCell align="center">อ่านนิยาย  ||  ลบนิยาย</TableCell>
                                    {/* <TableCell align="center">หัวข้อปัญหาที่พบ</TableCell>
                                    <TableCell align="center">ระดับความรีบ</TableCell>
                                    <TableCell align="center">รายละเอียด</TableCell>
                                    <TableCell align="center">Action</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {addedbooks.map((row) => (
                                    <TableRow
                                        key={row.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                        {/* <TableCell component="th" scope="row">{row.ID}</TableCell> */}
                                        <TableCell align="left">{row.Fiction?.Fiction_Name}</TableCell>
                                        {/* <TableCell align="left">{row.FictionInterface?.Writer?.Name}</TableCell> */}
                                        {/* <TableCell align="left">{row.ProblemSystem?.Problem_Topic}</TableCell>
                                        <TableCell align="left">{row.Priority?.Priority_Level}</TableCell>
                                        <TableCell align="left">{row.FeedbackDetail}</TableCell> */}
                                        <TableCell align="center">
                                            <ButtonGroup
                                                variant="outlined"
                                                
                                                aria-lable="outlined button group"
                                                >
                                                <Button
                                                    onClick={() =>
                                                        navigate({ pathname: `/fiction/story/${row.FictionID}` })
                                                    }
                                                    color= "secondary"
                                                    variant="outlined"
                                                    >
                                                    ไปอ่านค่ะ
                                                </Button>
                                                <Button
                                                    
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => { handleDialogDeleteOpen(Number(row.ID)) }}
                                                    
                                                    >
                                                    ออกไปเนอะ
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog
                        open={openDeleteAddedBook}
                        onClose={handleDialogDeleteclose}
                        TransitionComponent={Transition}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    {/* <DialogTitle id="alert-dialog-title">
                        {`ต้องการลบการรายงานปัญหาอิหลี  ${feedbacks.filter((feedback) => (feedbacks. === deletefeedbackID)).at(0)?.ProblemSystem?.Problem_Topic} อิหลีบ่`}
                    </DialogTitle> */}
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            จะเอาออกจริงๆเหรอ
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color= "error" onClick={handleDialogDeleteclose}>ไม่ให้ออกแล้วจ้า</Button>
                        <Button color= "secondary" onClick={handleDelete} className="bg-red" autoFocus>
                            ออกไปเลยนะ
                        </Button>
                    </DialogActions>
                </Dialog>
                </Paper>
            </Container>
        </React.Fragment>
    );

}       
export default BookshelfTable;