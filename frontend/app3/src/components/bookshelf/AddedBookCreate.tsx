import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useParams} from "react-router-dom";
import { CssBaseline, IconButton } from "@mui/material";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

import { FictionInterface } from "../../interfaces/fiction/IFiction";
import { ProblemFictionInterface } from "../../interfaces/report_fiction/IProblemFiction";
import { ReaderInterface } from "../../interfaces/IReader";
import { ReportFictionInterface } from "../../interfaces/report_fiction/IReportFiction";

import { GetReaderByRID, GetBookshelfNumByRID } from "../../services/HttpClientService";
import { Bookshelf_NumberInterface } from "../../interfaces/bookshelf/IBookshelf_Number";
import { Added_BookInterface } from "../../interfaces/bookshelf/IAdded_Book";

function AddedBookCreate() {
    let { id } = useParams();
    const navigate = useNavigate();
    
    const [fiction, setFiction] = useState<FictionInterface>({});
    const [readers, setReaders] = useState<ReaderInterface>();
    const [addedbooks, setAddedBooks] = useState<Added_BookInterface>();
    const [bookshelf, setBookshelf] = useState<Bookshelf_NumberInterface>({});

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = React.useState("");

    // ===================================================================================//

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof addedbooks;
        const { value } = event.target;
        setAddedBooks({ ...addedbooks, [id]: value });
    };
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
        return;
        }
        setSuccess(false);
        setError(false);
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof addedbooks;
        setAddedBooks({
        ...addedbooks,
        [name]: event.target.value,
        });
    };

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
        ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // ===================================================================================//

    const apiUrl = "http://localhost:9999";

    async function GetFictionByID() {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
        };
    
        let res = await fetch(`${apiUrl}/fiction/`+id, requestOptions)
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


    const getFiction = async () => {
        let res = await GetFictionByID();
        if (res) {
        setFiction(res);
        }
    };

    const getReader = async () => {
        let res = await GetReaderByRID();
        bookshelf.ReaderID = res.ID;
        if (res) {
        setReaders(res);
        }
    };

    const getBookshelfByRID = async () => {
        let res = await GetBookshelfNumByRID();
        bookshelf.ReaderID = res.ID;
        if (res) {
        setBookshelf(res);
        }
    };

    useEffect(() => {
        getBookshelfByRID();
        getFiction();
        getReader();
    }, []);

    // ===================================================================================//

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
        Bookshelf_NumberID:     bookshelf.ID,
        FictionID:              fiction.ID,
        };
        console.log(data)
        const apiUrl = "http://localhost:9999";

        const requestOptionsPost = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/added_books`, requestOptionsPost)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                setAlertMessage("บันทึกข้อมูลสำเร็จ");
                setSuccess(true);
                setTimeout(() => {
                window.location.href = "/bookshelf-table";
                }, 1000);
            } else {
                setAlertMessage(res.error);
                setError(true);
            }
        });
    }

    // ===================================================================================//


    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm" sx={{ p: 2 }}>
                    <Snackbar
                        id="success"
                        open={success}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        >
                        <Alert onClose={handleClose} severity="success">
                        เพิ่มสำเร็จ {message}
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        id="error"
                        open={error}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert onClose={handleClose} severity="error">
                        เพิ่มไม่สำเร็จ!! : คุณได้เพิ่มนิยายเรื่อง "{fiction.Fiction_Name}" เข้าชั้นแล้ว
                        {/* {message} */}
                        </Alert>
                    </Snackbar>
                    <Paper>
                        <Box
                            display="flex"
                            sx={{
                                marginTop: 2,
                            }}
                            >
                            <Box sx={{ paddingX: 2, paddingY: 1 }}>
                                <Typography
                                component="h2"
                                variant="h6"
                                // color="primary"
                                gutterBottom
                                >
                                <IconButton
                                    size="small"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 0.5 }}
                                >
                                    <BookmarkAddIcon />
                                </IconButton>
                                คุณต้องการเพิ่มนิยายนี้เข้าชั้นหรือไม่?
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />
                            <Grid container spacing={3} sx={{ padding: 2 }}>
                            <Grid item xs={12}>
                                        <FormControl fullWidth>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="FictionID"
                                            type="string"
                                            size="medium"
                                            value={fiction.Fiction_Name   || ""}
                                            label="นิยายที่คุณต้องการเพิ่มเข้าชั้น"
                                            disabled
                                        />
                                        </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="Fiction"
                                            variant="outlined"
                                            type="string"
                                            size="medium"  
                                            value={bookshelf?.Bookshelf_Name} key={bookshelf?.ID}
                                            onChange={handleInputChange}
                                            label="ชั้นหนังสือของคุณ"
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>  
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="Fiction"
                                            variant="outlined"
                                            type="string"
                                            size="medium"  
                                            value={readers?.Nickname} key={readers?.Nickname}
                                            onChange={handleInputChange}
                                            label="ผู้เพิ่มหนังสือ"
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>                                       
                            <Grid item xs={12}>
                                <Button
                                    id="back"
                                    onClick={() => navigate({pathname: `/fiction/${id}`})}
                                    variant="contained"
                                    color="inherit"
                                    >
                                    ไม่ต้องการเพิ่ม
                                </Button>
                                <Button
                                    id="submit"
                                    style={{ float: "right" }}
                                    onClick={submit}
                                    variant="contained"
                                    color="secondary"
                                    >
                                    ใช่ฉันต้องการเพิ่มเข้าชั้น
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </React.Fragment>
        </div>
    );
}

export default AddedBookCreate;