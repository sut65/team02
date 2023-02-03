import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { WriterInterface } from "../../interfaces/writer/IWriter";
import { CssBaseline, Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


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

    useEffect(() => {
        getWriters();
    }, []);


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
                                Create Writer
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
                                    {/* <TableCell align="center">วันเกิด</TableCell> */}
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
                                        <TableCell align="left">{row.Prefix.Prefix_Name}</TableCell>
                                        <TableCell align="left">{row.Name}</TableCell>
                                        <TableCell align="left">{row.Gender.Gender}</TableCell>
                                        {/* <TableCell align="left">{row.Writer_birthday}</TableCell> */}
                                        <TableCell align="left">{row.Affiliation.Affiliation_name}</TableCell>
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
                                                    Edit
                                                </Button>
                                                <Button
                                                    // onClick={() => ServiceDelete(row.ID)}
                                                    color="error"
                                                    >
                                                    Delete
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

export default WriterTable;