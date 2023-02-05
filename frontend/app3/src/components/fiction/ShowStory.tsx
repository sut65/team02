import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { CssBaseline, Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { FictionInterface } from "../../interfaces/fiction/IFiction"; 

function ShowFictions() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [fictions, setFictions] = useState<FictionInterface[]>([]);


    const apiUrl = "http://localhost:9999";

    const getFictions = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
        };
        fetch(`${apiUrl}/fiction/story/${id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
            if (res.data) {
                setFictions(res.data);
            }
        });
    };

    useEffect(() => {
        getFictions();
    }, [id]);


    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Box display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                นิยายของฉัน
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to="/fiction-create"
                                sx={{ p: 1 }}
                            >
                                สร้างงานเขียน
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">นิยาย</TableCell>
                                    <TableCell align="center">ผู้แต่ง</TableCell>
                                    <TableCell align="center">หมวดหมู่นิยาย</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fictions.map((row) => (
                                    <TableRow
                                        key={row.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                        <TableCell align="left">{row.Fiction_Name}</TableCell>
                                        {/* <TableCell align="left">{row.Writer?.Pseudonym}</TableCell> */}
                                        <TableCell align="left">{row.Genre?.Genre_Name}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup
                                                variant="outlined"
                                                aria-lable="outlined button group"
                                                >
                                                <Button
                                                    onClick={() =>
                                                        navigate({ pathname: `/fictions/${row.ID}` })
                                                    }
                                                    variant="contained"
                                                    component={RouterLink}
                                                    to="/fiction-add"
                                                    >
                                                    อ่านเพิ่มเติม
                                                </Button>
                                                <Button
                                                    color="error"
                                                    >
                                                    ลบนิยาย
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

export default ShowFictions;