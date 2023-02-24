import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from '@mui/material/InputLabel';import Snackbar from "@mui/material/Snackbar";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Divider, FormControl, Grid, TextField, Typography } from '@mui/material';
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { ReaderInterface } from "../../interfaces/IReader";
import { PackageTopUpInterface } from "../../interfaces/topup/IPackageTopUp"; 
import { PaymentTypeInterface } from "../../interfaces/topup/IPaymentType";
import { TopUpInterface } from "../../interfaces/topup/ITopUp";

const apiUrl = "http://localhost:9999";

function TopUpCreate(){
    const [package_top_ups, setPackageTopUps] = useState<PackageTopUpInterface[]>([]);
    const [payment_types, setPaymentTypes] = useState<PaymentTypeInterface[]>([]);
    const [readers, setReaders] = useState<ReaderInterface>();
    const [top_up, setTopUp] = React.useState<TopUpInterface>({});
    const [topup_date, settopup_date] = React.useState<Dayjs | null>(dayjs());
    

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = React.useState("");
    
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

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
    )   {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    async function GetReaderByRID() {
        let rid = localStorage.getItem("rid");
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(
          `${apiUrl}/reader/${rid}`,
          requestOptions
        )
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
    
    async function GetPackageTopUps() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/package_top_ups`, requestOptions)
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

    async function GetPaymentTypes() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/payment_types`, requestOptions)
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
    
    useEffect(() => {
      getReader();
      getPackageTopUps();
      getPaymentTypes();
    }, []);

    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
    };


    async function submit() {
      let data ={
        ReaderID: convertType(top_up.ReaderID),
        PackageTopUpID: convertType(top_up.PackageTopUpID),
        PaymentTypeID: convertType(top_up.PaymentTypeID),
        Topup_phone_number: top_up.Topup_phone_number,
        Note: top_up.Note,
        topup_date: top_up.Topup_date,
      };
      console.log(data);
      
      const apiUrl = "http://localhost:9999";
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch(`${apiUrl}/top_ups`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.data) {
            setAlertMessage("บันทึกข้อมูลสำเร็จ");
            setSuccess(true);
            setTimeout(() => {
              window.location.href = "/top_ups";
              }, 1000);
          } else {
            setAlertMessage(res.error);
            setError(true);
          }
        });
    }

    return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth= "md" sx={{p: 2}}>
          <Snackbar
            open={success}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
            <Alert onClose={handleClose} severity="success">
            เติมเหรียญสำเร็จ!!
            </Alert>
          </Snackbar>
          <Snackbar
            open={error}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
            <Alert onClose={handleClose} severity="error">
              เติมเหรียญไม่สำเร็จ!! : {message}
            </Alert>
          </Snackbar>
          <Paper>
            <Box
              sx={{
                display: 'flex',
                paddingX: 2, paddingY: 1
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                gutterBottom
                >
                  เติมเหรียญ
              </Typography>
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
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DateTimePicker
                                    label="วันที่และเวลาที่เติม"
                                    renderInput={(params) => <TextField {...params} />}
                                    value={topup_date}
                                    onChange={(newValue) => {
                                      settopup_date(newValue);
                                    }}
                                    disabled
                                  />
                                </LocalizationProvider>
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
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        multiline
                                        rows={3}
                                        id="Note"
                                        variant="outlined"
                                        type="string"
                                        size="medium"  
                                        value={top_up.Note || ""}
                                        onChange={handleInputChange}
                                        label="บันทึกช่วยจำ"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    component={RouterLink}
                                    to="/reader-profile"
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
                                    เติมเหรียญ
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