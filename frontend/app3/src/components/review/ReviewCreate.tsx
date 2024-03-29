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
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useParams} from "react-router-dom";

import { FictionInterface } from "../../interfaces/fiction/IFiction";
import { RatingInterface } from "../../interfaces/review/IRating";
import { ReaderInterface } from "../../interfaces/IReader";
import { ReviewInterface } from "../../interfaces/review/IReview";

import { GetReaderByRID } from "../../services/HttpClientService";
import { CssBaseline, IconButton } from "@mui/material";

function ReviewCreate() {
    let { id } = useParams();
    const navigate = useNavigate();

    const [fiction, setFiction] = React.useState<FictionInterface>({});
    const [ratings, setRatings] = React.useState<RatingInterface[]>([]);
    const [readers, setReaders] = React.useState<ReaderInterface>();
    const [review, setReview] = React.useState<ReviewInterface>({});

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = React.useState("");

    // ===================================================================================//

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

    const getFiction = async () => {
        let res = await GetFictionByID();
        if (res) {
        setFiction(res);
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
        getFiction();
        getRatings();
        getReader();
    }, []);

    // ===================================================================================//

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
        FictionID: fiction.ID,
        ReviewTopic: review.ReviewTopic?? "",
        RatingID: convertType(review.RatingID),
        ReviewDetail: review.ReviewDetail?? "",
        ReaderID: convertType(review.ReaderID),
        };

        const apiUrl = "http://localhost:9999";

        const requestOptionsPost = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/reviews`, requestOptionsPost)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                setAlertMessage("บันทึกข้อมูลสำเร็จ");
                setSuccess(true);
                setTimeout(() => {
                window.location.href = "/reviews";
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
                            {message}
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
                        บันทึกไม่สำเร็จ!! : {message} {fiction.Fiction_Name} ไปแล้ว
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
                                    <ReviewsIcon />
                                </IconButton>
                                เขียนรีวิว
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
                                            value={fiction.Fiction_Name  || ""}
                                            onChange={handleInputChange}
                                            label="นิยาย"
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
                            <Grid item xs={6}>
                                <FormControl fullWidth >
                                    <InputLabel id="Rating_score">คะแนนรีวิว</InputLabel>      
                                        <Select
                                        required
                                        labelId="Rating_score"
                                        id="Rating_score"
                                        label="คะแนนรีวิว"
                                        native
                                        value={review.RatingID + ""}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: "RatingID",
                                        }}                
                                        >
                                        <option aria-label="None" value=""></option>
                                        {ratings.map((item: RatingInterface) => (
                                            <option value={item.ID} key={item.ID}>
                                            {item.Rating_score}
                                            </option>
                                        ))}
                                        </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth >
                                    <InputLabel id="Rating_name">ระดับรีวิว</InputLabel>      
                                        <Select
                                        required
                                        labelId="Rating_name"
                                        id="Rating_name"
                                        label="ระดับรีวิว"
                                        native
                                        disabled
                                        value={review.RatingID + ""}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: "RatingID",
                                        }}                
                                        >
                                        <option aria-label="None" value=""></option>
                                        {ratings.map((item: RatingInterface) => (
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
                                        multiline
                                        rows={4}
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
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Reader"
                                        variant="outlined"
                                        type="string"
                                        size="medium"  
                                        value={readers?.Nickname} key={readers?.ID}
                                        onChange={handleInputChange}
                                        label="ผู้เขียนรีวิว"
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
                                    กลับ
                                </Button>
                                <Button
                                    id="submit"
                                    style={{ float: "right" }}
                                    onClick={submit}
                                    variant="contained"
                                    color="secondary"
                                    >
                                    บันทึก
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </React.Fragment>
        </div>
    );
}

export default ReviewCreate;