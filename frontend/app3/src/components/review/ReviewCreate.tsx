import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";


import { FictionInterface } from "../../interfaces/IFiction";
import { RatingInterface } from "../../interfaces/review/IRating";
import { ReaderInterface } from "../../interfaces/IReader";
import { ReviewInterface } from "../../interfaces/review/IReview";

import { GetReaderByRID } from "../../services/HttpClientService";


function ReviewCreate() {
    const [fictions, setFictions] = useState<FictionInterface[]>([]);
    const [ratings, setRatings] = useState<RatingInterface[]>([]);
    const [readers, setReaders] = useState<ReaderInterface>();
    const [review, setReview] = useState<ReviewInterface>({});

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof ReviewCreate;
        const { value } = event.target;
        setReview({ ...review, [id]: value });
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
        const name = event.target.name as keyof typeof review;
        setReview({
        ...review,
        [name]: event.target.value,
        });
    };

    const apiUrl = "http://localhost:9999";

    async function GetFictions() {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/fictions`, requestOptions)
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
    
    async function GetRating() {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/ratings`, requestOptions)
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

    async function Reviews(data: ReviewInterface) {
        const requestOptions = {
            method: "POST",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        let res = await fetch(`${apiUrl}/products`, requestOptions)
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

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
    ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const getFictions = async () => {
        let res = await GetFictions();
        if (res) {
        setFictions(res);
        }
    };

    const getRatings = async () => {
        let res = await GetRating();
        if (res) {
        setRatings(res);
        }
    };

    const getReader = async () => {
        let res = await GetReaderByRID();
        review.ReaderID = res.ID;
        if (res) {
        setReaders(res);
        }
    };

    useEffect(() => {
        getFictions();
        getRatings();
        getReader();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
        //Timestamp: date,
        FictionID: convertType(review.FictionID),
        ReviewTopic: review.ReviewTopic?? "",
        RatingID: convertType(review.RatingID),
        ReviewDetail: review.ReviewDetail?? "",
        ReaderID: convertType(review.ReaderID),
        // FictionID: convertType(review.FictionID),
        // ReviewTopic: review.ReviewTopic,
        // RatingID: convertType(review.RatingID),
        // ReviewDetail: review.ReviewDetail,
        // ReaderID: convertType(review.ReaderID),
        };
        console.log(data)
        let res = await Reviews(data);
        if (res) {
        setSuccess(true);
        } else {
        setError(true);
        }
    }

    return (
        <Container maxWidth="md">
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="success">
                บันทึกสำเร็จ!!
                </Alert>
            </Snackbar>
            <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="error">
                บันทึกไม่สำเร็จ!!
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
                        color="primary"
                        gutterBottom
                        >
                        เขียนรีวิว
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>
                    <Grid item xs={12}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">นิยาย</InputLabel>      
                                <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="นิยาย"
                                native
                                value={review.FictionID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "FictionID",
                                }}                
                                >
                                <option aria-label="None" value=""></option>
                                {fictions.map((item: FictionInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                    {item.F_name}
                                    </option>
                                ))}
                                </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="ReviewTopic"
                            type="string"
                            size="medium"
                            autoFocus
                            value={review.ReviewTopic || ""}
                            onChange={handleInputChange}
                            label="หัวข้อที่ต้องการรีวิว"
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">คะแนนรีวิว</InputLabel>      
                                <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="คะแนนรีวิว"
                                native
                                value={review.RatingID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "RatingID",
                                }}                
                                >
                                <option aria-label="None" value=""></option>
                                {fictions.map((item: RatingInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                    {item.Rating_name}
                                    </option>
                                ))}
                                </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="ReviewDetail"
                            variant="outlined"
                            type="string"
                            size="medium"  
                            value={review.ReviewDetail || ""}
                            onChange={handleInputChange}
                            label="รายละเอียด"
                        />
                        </FormControl>
                    </Grid>                    
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                        <InputLabel id="demo-simple-select-label">ผู้เขียนรีวิว</InputLabel>      
                        <Select
                            native
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Employee"                
                            value={review.ReaderID + ""}
                            onChange={handleChange}
                            disabled
                            inputProps={{
                            name: "ReaderID",
                            }}
                        >
                            <option aria-label="None" value=""></option>
                            {/* <option value={readers.ID} key={readers?.ID}>
                            {readers?.Name}
                            </option>     */}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                        component={RouterLink}
                        to="/products"
                        variant="contained"
                        color="inherit"
                        >
                        BACK
                        </Button>
                        <Button
                        style={{ float: "right" }}
                        onClick={submit}
                        variant="contained"
                        color="primary"
                        >
                        SAVE
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default ReviewCreate;