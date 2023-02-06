import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ReviewsIcon from '@mui/icons-material/Reviews';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';

import { ReviewInterface } from "../../interfaces/review/IReview";
import { CssBaseline, IconButton } from "@mui/material";

function ReviewShowbyFiction() {
    let { id } = useParams();
    const navigate = useNavigate();

    // const [fictions, setFictions] = useState<FictionInterface[]>([]);
    // const [ratings, setRatings] = useState<RatingInterface>({});
    // const [readers, setReaders] = useState<ReaderInterface>();
    const [review, setReview] = useState<ReviewInterface[]>([]);

    const apiUrl = "http://localhost:9999";

    async function GetReviewByFictionID() {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
        };
    
        let res = await fetch(`${apiUrl}/review/fiction/`+id, requestOptions)
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

    const getReviewByFictionID = async () => {
        let res = await GetReviewByFictionID();
        if (res) {
        setReview(res);
        }
    };

    useEffect(() => {
        getReviewByFictionID();
    }, []);
    // console.log(review)


    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm" sx={{ p: 2 }}>
                    <Paper>
                        <Box
                            display="flex"
                            sx={{
                                marginTop: 2,
                            }}
                            >
                            <Box sx={{ paddingX: 1.5, paddingY: 1 }}>
                            
                                <Typography
                                gutterBottom
                                component="h2"
                                variant="h6"
                                // color="text.secondary"
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
                                    รีวิวทั้งหมด
                                </Typography>
                            </Box>
                            <Box sx={{ paddingX: 0, paddingY: 1 }}>
                                <Tooltip title="ADD REVIEW">
                                    <IconButton
                                        size="small"
                                        edge="start"
                                        color="secondary"
                                        aria-label="open drawer"
                                        sx={{ mr: 2 }}
                                        onClick={() =>
                                            navigate({ pathname: `/review/create/${id}` })
                                            }
                                        >
                                        <AddCircleIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                        <Divider />
                        <Grid >
                        <Box sx={{ paddingX: 2, paddingY: 2 }}>
                            {review.map((review: ReviewInterface) => (
                                <Box sx={{ paddingX: 0, paddingY: 1 }}>
                                    <Box
                                        sx={{
                                        bgcolor: 'background.paper',
                                        boxShadow: 1,
                                        borderRadius: 2,
                                        p: 2,
                                        minWidth: 300,
                                        }}
                                        >
                                        <Box sx={{ color: 'text.primary' , fontSize: 20, fontWeight: 'bold'}}>{review.ReviewTopic}</Box>
                                        <Box sx={{ color: 'text.secondary', fontSize: 17, fontWeight: 'normal' }}>
                                            {review.ReviewDetail}
                                        </Box>
                                        <Box
                                            sx={{
                                                color: 'text.secondary',
                                                // fontWeight: 'bold',
                                                // mx: 0.5,
                                                fontSize: 14,
                                            }}
                                        >
                                            คะแนนรีวิว {review.Rating?.Rating_score} : {review.Rating?.Rating_name}
                                        </Box>
                                        <Box
                                            sx={{
                                                color: 'success.dark',
                                                display: 'inline',
                                                // fontWeight: 'bold',
                                                mx: 0.5,
                                                fontSize: 14,
                                            }}
                                        >
                                            รีวิวโดย
                                        </Box>
                                        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
                                            {review.Reader?.Name}
                                        </Box>
                                </Box>
                            </Box>
                            ))}
                        </Box>
                        </Grid>
                    </Paper>
                </Container>
            </React.Fragment>
        </div>
    );
}

export default ReviewShowbyFiction;