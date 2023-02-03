import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { ReviewInterface } from "../../interfaces/review/IReview";
import { CssBaseline, Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function ReviewTable() {
    const params = useParams();
    const navigate = useNavigate();

    const [reviews, setReviews] = useState<ReviewInterface[]>([]);


    const getReviews = async () => {
        const apiUrl = "http://localhost:9999/review/rid/";
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
                    setReviews(res.data);
                }
        });
    };

    useEffect(() => {
        getReviews();
    }, []);


    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Box display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                ประวัติการรีวิว
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to="/review/create"
                                sx={{ p: 1 }}
                                color= "secondary"

                            >
                                Create Review
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>ID</TableCell> */}
                                    <TableCell align="center">นิยาย</TableCell>
                                    <TableCell align="center">หัวข้อที่ต้องการรีวิว</TableCell>
                                    <TableCell align="center">คะแนนรีวิว</TableCell>
                                    <TableCell align="center">รายละเอียด</TableCell>
                                    <TableCell align="center">ผู้เขียนรีวิว</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reviews.map((row) => (
                                    <TableRow
                                        key={row.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                        {/* <TableCell component="th" scope="row">{row.ID}</TableCell> */}
                                        <TableCell align="left">{row.Fiction?.Fiction_Name}</TableCell>
                                        <TableCell align="left">{row.ReviewTopic}</TableCell>
                                        <TableCell align="left">{row.Rating?.Rating_name}</TableCell>
                                        <TableCell align="left">{row.ReviewDetail}</TableCell>
                                        <TableCell align="left">{row.Reader?.Name}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup
                                                variant="outlined"
                                                // eslint-disable-next-line jsx-a11y/aria-props
                                                aria-lable="outlined button group"
                                                >
                                                <Button
                                                    onClick={() =>
                                                        navigate({ pathname: `/review/${row.ID}` })
                                                    }
                                                    color= "secondary"
                                                    variant="contained"
                                                    >
                                                    Edit
                                                </Button>
                                                <Button
                                                    // onClick={() => ServiceDelete(row.ID)}
                                                    color="error"
                                                    variant="contained"
                                                    >
                                                    DEL
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default ReviewTable;