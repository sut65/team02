import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
import dayjs, { Dayjs } from "dayjs";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HistoryIcon from '@mui/icons-material/History';
import { ReaderInterface } from "../../interfaces/IReader";
import { GetReaderByRID } from "../../services/HttpClientService";

function TopUpTable() {
    const [readers, setReaders] = useState<ReaderInterface>({ Date_of_Birth: new Date(),});
    const [top_ups, setTopUps] = useState<TopUpInterface[]>([]);

    const getReaders = async () => {
        let res = await GetReaderByRID();
        if (res) {
        setReaders(res);
        }
      };
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
        getReaders();
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Box display="flex">
                        <Box sx={{ flexGrow: 1, my:3}}>
                            <Typography variant="h4" gutterBottom component="div">
                                <HistoryIcon/>ประวัติการเติมเหรียญ
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1, my:3}}>
                            <Typography variant="h5" color="error" >
                                เหรียญของฉัน : {readers.ReaderCoin}
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                startIcon={<CurrencyExchangeIcon />}
                                variant="contained"
                                color="success"
                                component={RouterLink}
                                to="/top_up/create"
                                sx={{ p: 1, my:3, mx:0.5}}
                            >
                               เติมเหรียญ
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                startIcon={<AccountBoxIcon />}
                                variant="contained"
                                color="inherit"
                                component={RouterLink}
                                to="/reader-profile"
                                sx={{ p: 1, my:3, mx:0.5}}

                            >
                               โปรไฟล์
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 600, p: 2 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>ID</TableCell> */}
                                    <TableCell align="center">ชื่อนักอ่าน</TableCell>
                                    <TableCell align="center">โปรโมชั่น</TableCell>
                                    <TableCell align="center">ราคา</TableCell>
                                    <TableCell align="center">จำนวนเหรียญที่เติม</TableCell>
                                    <TableCell align="center">ประเภทการชำระ</TableCell>
                                    <TableCell align="center">วันที่และเวลา</TableCell>
                                    <TableCell align="center">เบอร์โทรศัพท์มือถือที่ติดต่อได้</TableCell>
                                    <TableCell align="center">บันทึกช่วยจำ</TableCell>
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
                                        <TableCell align="left">{row.PackageTopUp?.Promotion}</TableCell>
                                        <TableCell align="center">{row.PackageTopUp?.Price}</TableCell>
                                        <TableCell align="center">{row.PackageTopUp?.Total}</TableCell>
                                        <TableCell align="center">{row.PaymentType?.Payment_Type}</TableCell>
                                        <TableCell align="center">{dayjs(row.Topup_date).format('DD MMMM YYYY HH:mm:ss')}</TableCell>
                                        <TableCell align="center">{row.Topup_phone_number}</TableCell>
                                        <TableCell align="left">{row.Note}</TableCell>
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