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

    const getTopUps = async () => {
    const apiUrl = "http://localhost:9999/top_up/tid/";
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
                               เติมเหรียญ
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>ID</TableCell> */}
                                    <TableCell align="center">ชื่อนักอ่าน</TableCell>
                                    <TableCell align="center">ราคา</TableCell>
                                    <TableCell align="center">ประเภทการชำระ</TableCell>
                                    <TableCell align="center">เบอร์โทรศัพท์มือถือที่ติดต่อได้</TableCell>
                                    <TableCell align="center">วันที่และเวลา</TableCell>
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
                                        <TableCell align="left">{row.Reader?.Name}</TableCell>
                                        <TableCell align="left">{row.PackageTopUp?.Price}</TableCell>
                                        <TableCell align="left">{row.PaymentType?.Payment_Type}</TableCell>
                                        <TableCell align="left">{row.Topup_phone_number}</TableCell>
                                        <TableCell align="left">{String(row.Topup_date)}</TableCell>
                                        <TableCell align="left">{row.ReaderCoin?.R_coin}</TableCell>
                                        <TableCell align="center">
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