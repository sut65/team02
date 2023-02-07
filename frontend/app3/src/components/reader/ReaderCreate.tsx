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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import { useParams} from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ReaderInterface } from "../../interfaces/IReader";
import { PrefixInterface } from "../../interfaces/IPrefix";
import { GenderInterface } from "../../interfaces/IGender";

import { GetReaderByRID } from "../../services/HttpClientService";
import { CssBaseline } from "@mui/material";
import { timeStamp } from "console";

function ReaderCreate() {
    let { id } = useParams();
    const [readers, setReaders] = useState<ReaderInterface>({ Date_of_Birth: new Date(),});
    const [prefixs, setPredixs] = useState<PrefixInterface[]>([]);
    const [genders, setGenders] = useState<GenderInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof ReaderCreate;
        const { value } = event.target;
        setReaders({ ...readers, [id]: value });
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
        const name = event.target.name as keyof typeof readers;
        setReaders({
        ...readers,
        [name]: event.target.value,
        });
    };

    const apiUrl = "http://localhost:9999";

    async function GetGender() {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
        };
    
        let res = await fetch(`${apiUrl}/genders`, requestOptions)
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

        async function GetPrefix() {
            const requestOptions = {
                method: "GET",
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
                },
            };
        
            let res = await fetch(`${apiUrl}/prefixes`, requestOptions)
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

    async function Readers(data: ReaderInterface) {
        const requestOptions = {
            method: "POST",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        let res = await fetch(`${apiUrl}/readers`, requestOptions)
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

    const getPrefix = async () => {
        let res = await GetPrefix();
        if (res) {
        setPredixs(res);
        }
    };

    const getGenders = async () => {
        let res = await GetGender();
        if (res) {
        setGenders(res);
        }
    };


    useEffect(() => {
        getPrefix();
        getGenders();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
        Email: readers.Email,
        PrefixID: convertType(readers?.PrefixID),
        Name: readers.Name,
        Nickname: readers.Nickname,
        GenderID: convertType(readers?.GenderID),
        Date_of_Birth: readers.Date_of_Birth,
        Password: readers.Password,
        };
        console.log(data)
        let res = await Readers(data);
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
                <Container maxWidth="sm" sx={{ p: 2 }}>
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
                                สมัครสมาชิกนักอ่าน
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
                                            id="Email"
                                            type="string"
                                            size="medium"
                                            autoFocus
                                            value={readers.Email || ""}
                                            onChange={handleInputChange}
                                            label="Email"
                                        />
                                    </FormControl>
                                </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">คำนำหน้า</InputLabel>      
                                        <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="เลือกคำนำหน้า"
                                        native
                                        value={readers.PrefixID + ""}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: "PrefixID",
                                        }}                
                                        >
                                        <option aria-label="None" value=""></option>
                                        {prefixs.map((item: PrefixInterface) => (
                                            <option value={item.ID} key={item.ID}>
                                            {item.Prefix_Name}
                                            </option>
                                        ))}
                                        </Select>
                                </FormControl>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Name"
                                        type="string"
                                        size="medium"
                                        autoFocus
                                        value={readers.Name || ""}
                                        onChange={handleInputChange}
                                        label="ชื่อ-นามสกุล"
                                    />
                                </FormControl>
                            </Grid>                   
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Nickname"
                                        type="string"
                                        size="medium"
                                        autoFocus
                                        value={readers.Nickname || ""}
                                        onChange={handleInputChange}
                                        label="ชื่อเล่นที่ให้ผู้อื่นเห็น"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">เพศ</InputLabel>      
                                        <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="เลือกเพศ"
                                        native
                                        sx={{ mt: 0, mb: 3 }}
                                        value={readers.GenderID + ""}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: "GenderID",
                                        }}                
                                        >
                                        <option aria-label="None" value=""></option>
                                        {genders.map((item: GenderInterface) => (
                                            <option value={item.ID} key={item.ID}>
                                            {item.Gender}
                                            </option>
                                        ))}
                                        </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker 
                                    label="วัน/เดือน/ปี เกิด"
                                    value={readers.Date_of_Birth}
                                    onChange={(newValue) => {
                                        setReaders({
                                            ...readers,
                                            Date_of_Birth: newValue,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
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
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="Password"
                                        autoComplete="current-password"
                                        size="medium"
                                        autoFocus
                                        value={readers.Password || ""}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    component={RouterLink}
                                    to="/"
                                    variant="contained"
                                    color="inherit"
                                    >
                                    กลับ
                                </Button>
                                <Button
                                    style={{ float: "right" }}
                                    onClick={submit}
                                    // component={RouterLink}
                                    // to="/"
                                    variant="contained"
                                    color="primary"
                                    >
                                    บันทึก
                                </Button>
                            </Grid>
                            </Grid>
                    </Grid>
                    </Paper>
                </Container>
            </React.Fragment>
        </div>
    );
}

export default ReaderCreate;