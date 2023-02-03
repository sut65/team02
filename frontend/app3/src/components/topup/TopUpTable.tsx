import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { TopUpInterface } from "../../interfaces/topup/ITopUp";
import { CssBaseline, Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function TopUpTable() {
    const params = useParams();
    const navigate = useNavigate();

    const [top_ups, setTopUps] = useState<TopUpInterface[]>([]);


    const apiUrl = "http://localhost:9999";
    const getTopUps = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
        };
        fetch(`${apiUrl}/top_ups`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
            if (res.data) {
                setTopUps(res.data);
            }
        });
    };

    useEffect(() => {
        getTopUps();
    }, []);


    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Box display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                ประวัติการเติมเหรียญ
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to="/top_up/create"
                                sx={{ p: 1 }}

                            >
                                Top Up
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>ID</TableCell> */}
                                    <TableCell align="center">ชื่อนักเขียน</TableCell>
                                    <TableCell align="center">ยอดรวม</TableCell>
                                    <TableCell align="center">ประเภทการชำระ</TableCell>
                                    <TableCell align="center">เบอร์โทรศัพท์มือถือที่ติดต่อได้</TableCell>
                                    {/* <TableCell align="center">วันเกิด</TableCell> */}
                                    <TableCell align="center">เหรียญนักอ่าน</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {top_ups.map((row) => (
                                    <TableRow
                                        key={row.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                        {/* <TableCell component="th" scope="row">{row.ID}</TableCell> */}
                                        <TableCell align="left">{row.Reader.Name}</TableCell>
                                        <TableCell align="left">{row.PackageTopUp.Total}</TableCell>
                                        <TableCell align="left">{row.PaymentType.Payment_Type}</TableCell>
                                        <TableCell align="left">{row.Topup_phone_number}</TableCell>
                                        {/* <TableCell align="left">{row.Topup_date}</TableCell> */}
                                        <TableCell align="left">{row.ReaderCoin.R_coin}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup
                                                variant="outlined"
                                                // eslint-disable-next-line jsx-a11y/aria-props
                                                aria-lable="outlined button group"
                                                >
                                                <Button
                                                    onClick={() =>
                                                        navigate({ pathname: `/top_up/${row.ID}` })
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

export default TopUpTable;