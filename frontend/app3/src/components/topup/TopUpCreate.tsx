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

import { ReaderInterface } from "../../interfaces/IReader";
import { PackageTopUpInterface } from "../../interfaces/topup/IPackageTopUp";
import { PaymentTypeInterface } from "../../interfaces/topup/IPaymentType";
import { ReaderCoinInterface } from "../../interfaces/topup/IReaderCoin";
import { TopUpInterface } from "../../interfaces/topup/ITopUp";

import { 
    GetReaderByRID,
    GetTopUps,
    GetPackageTopUps, 
    GetPaymentTypes,
    GetReaderCoins,   
} from "../../services/topup/TopUpService";
import { CssBaseline } from "@mui/material";
import { writer } from "repl";
import { GenderInterface } from "../../interfaces/IGender";
import { PrefixInterface } from "../../interfaces/IPrefix";
import { AffiliationInterface } from "../../interfaces/writer/IAffiliation";

const apiUrl = "http://localhost:9999";

function TopUpCreate() {
    const [readers, setReaders] = useState<ReaderInterface>();
    const [package_top_ups, setPackageTopUps] = useState<PackageTopUpInterface[]>([]);
    const [payment_types, setPaymentTypes] = useState<PaymentTypeInterface[]>([]);
    const [reader_coins, setReaderCoins] = useState<ReaderCoinInterface[]>([]);
    const [top_up, setTopUp] = useState<TopUpInterface>({});
    

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof TopUpCreate;
        const { value } = event.target;
        setTopUp({ ...top_up, [id]: value });
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
        const name = event.target.name as keyof typeof top_up;
        setTopUp({
        ...top_up,
        [name]: event.target.value,
        });
    };

    const apiUrl = "http://localhost:9999";

    async function TopUp(data: TopUpInterface) {
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
      
        let res = await fetch(`${apiUrl}/top_ups`, requestOptions)
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

    const getReader = async () => {
        let res = await GetReaderByRID();
       top_up.ReaderID = res.ID;
        if (res) {
        setReaders(res);
        }
    };

    const getPackageTopUps = async () => {
        let res = await GetPackageTopUps();
        if (res) {
        setPackageTopUps(res);
        }
    };

    const getPaymentTypes = async () => {
        let res = await GetPaymentTypes();
        if (res) {
        setPaymentTypes(res);
        }
    };

    const getReaderCoins = async () => {
        let res = await GetReaderCoins();
        if (res) {
        setReaderCoins(res);
        }
    };

    useEffect(() => {
        getReader();
        getPackageTopUps();
        getPaymentTypes();
        getReaderCoins();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
        ReaderID: convertType(top_up.ReaderID),
        PackageTopUpID: convertType(top_up.PackageTopUpID),
        PaymentTypeID: convertType(top_up.PaymentTypeID),
        Topup_phone_number: top_up.Topup_phone_number,
        // Topup_date: topup_date,
        ReaderCoinID: convertType(top_up.ReaderCoinID),
        
        
        };
        console.log(data)
        let res = await TopUp(data);
        if (res) {
        setSuccess(true);
        } else {
        setError(true);
        }
    }
    return (
        <div>
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="md" sx={{ p: 2 }}>
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
                                // color="primary"
                                gutterBottom
                                >
                                เติมเงิน
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />
                            <Grid container spacing={3} sx={{ padding: 2 }}>
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
                                        value={readers?.Name} key={readers?.ID}
                                        onChange={handleInputChange}
                                        label="ชื่อนักอ่าน"
                                        disabled
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">โปรโมชั่น</InputLabel>      
                                        <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="โปรโมชั่น"
                                        native
                                        value={top_up.PackageTopUpID + ""}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: "PackageTopUpID",
                                        }}                
                                        >
                                        <option aria-label="None" value=""></option>
                                        {package_top_ups.map((item: PackageTopUpInterface) => (
                                            <option value={item.ID} key={item.ID}>
                                            {item.Promotion}
                                            </option>
                                        ))}
                                        </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">ราคา</InputLabel>      
                                        <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="ราคา"
                                        native
                                        value={top_up.PackageTopUpID + ""}
                                        onChange={handleChange}
                                        disabled
                                        inputProps={{
                                            name: "PackageTopUpID",
                                        }}                
                                        >
                                        <option aria-label="None" value=""></option>
                                        {package_top_ups.map((item: PackageTopUpInterface) => (
                                            <option value={item.ID} key={item.ID}>
                                            {item.Price}
                                            </option>
                                        ))} 
                                        </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">จำนวนเหรียญ</InputLabel>      
                                        <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="จำนวนเหรียญ"
                                        native
                                        value={top_up.PackageTopUpID + ""}
                                        onChange={handleChange}
                                        disabled
                                        inputProps={{
                                            name: "PackageTopUpID",
                                        }}                
                                        >
                                        <option aria-label="None" value=""></option>
                                        {package_top_ups.map((item: PackageTopUpInterface) => (
                                            <option value={item.ID} key={item.ID}>
                                            {item.Total}
                                            </option>
                                        ))}
                                        </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">ประเภทการชำระเงิน</InputLabel>      
                                            <Select
                                            required
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="ประเภทการชำระเงิน"
                                            native
                                            value={top_up.PaymentTypeID + ""}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: "PaymentTypeID",
                                            }}                
                                            >
                                            <option aria-label="None" value=""></option>
                                            {payment_types.map((item: PaymentTypeInterface) => (
                                                <option value={item.ID} key={item.ID}>
                                                {item.Payment_Type}
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
                                        id="Topup_phone_number"
                                        variant="outlined"
                                        type="string"
                                        size="medium"  
                                        value={top_up.Topup_phone_number || ""}
                                        onChange={handleInputChange}
                                        label="เบอร์โทรศัพท์มือถือที่ติดต่อได้"
                                    />
                                </FormControl>
                            </Grid>                    
                            {/* <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                <p>เหรียญนักอ่าน</p>
                                <TextField
                                    disabled
                                    value={top_up.ReaderID}
                                    type="number"
                                >
                                    <option aria-label="None" value=""></option>
                                    {reader_coins.map((item: ReaderCoinInterface ) => (
                                        <option value={item.ID} key={item.ID}>
                                        {item.R_coin} 
                                        </option> //key ไว้อ้างอิงว่าที่1ชื่อนี้ๆๆ value: เก็บค่า
                                    )
                                    )}
                                </TextField>
                                </FormControl>
                            </Grid> */}
                            <Grid item xs={12}>
                                <Button
                                    component={RouterLink}
                                    to="/top_ups"
                                    variant="contained"
                                    color="inherit"
                                    >
                                    กลับ
                                </Button>
                                <Button
                                    style={{ float: "right" }}
                                    onClick={submit}
                                    variant="contained"
                                    color="primary"
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
export default TopUpCreate;
