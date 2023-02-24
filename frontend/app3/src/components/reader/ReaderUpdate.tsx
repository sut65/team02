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
import { useNavigate } from "react-router-dom";
import { useParams} from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ReaderInterface } from "../../interfaces/IReader";
import { PrefixInterface } from "../../interfaces/IPrefix";
import { GenderInterface } from "../../interfaces/IGender";
import { GenreInterface } from "../../interfaces/fiction/IGenre";

function ReaderUpdate() {
    let { id } = useParams();

    const [prefixs, setPrefixs] = useState<PrefixInterface[]>([]);
    const [genders, setGenders] = useState<GenderInterface[]>([]);
    const [reader, setReaders] = useState<ReaderInterface>({ Date_of_Birth: new Date(),});
    const [genres, setGenres] = useState<GenreInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof reader;
        const { value } = event.target;
        setReaders({ ...reader, [id]: value });
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
        const name = event.target.name as keyof typeof reader;
        setReaders({
        ...reader,
        [name]: event.target.value,
        });
    };

    const apiUrl = "http://localhost:9999";

    async function GetReaderByID() {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
        };
    
        let res = await fetch(`${apiUrl}/reader/`+id, requestOptions)
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

    async function GetPrefixs() {
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
    
    async function GetGenders() {
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

    async function GetGenre() {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
        };
    
        let res = await fetch(`${apiUrl}/genres`, requestOptions)
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

    const getReaderByID = async () => {
        let res = await GetReaderByID();
        if (res) {
        setReaders(res);
        }
    };
    const getPrefixs = async () => {
        let res = await GetPrefixs();
        if (res) {
        setPrefixs(res);
        }
    };

    const getGenders = async () => {
        let res = await GetGenders();
        if (res) {
        setGenders(res);
        }
    };

    const getGenres = async () => {
        let res = await GetGenre();
        if (res) {
        setGenres(res);
        }
    };

    useEffect(() => {
        getPrefixs();
        getGenders();
        getGenres();
        getReaderByID();
    }, []);
    console.log(reader)

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
        ID: reader.ID,
        PrefixID: convertType(reader.PrefixID),
        Name: reader.Name,
        Nickname: reader.Nickname,
        GenderID: convertType(reader.GenderID),
        GenreID: convertType(reader.GenreID),
        Email: reader.Email,
        Password: reader.Password,
        Date_of_Birth: reader.Date_of_Birth,
        };

        const requestOptions = {
            method: "PATCH",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(`${apiUrl}/readers`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.data) {
                setSuccess(true);
                setErrorMessage("บันทึกสำเร็จ")
                setTimeout(() => {
                    window.location.href = "/reader-profile";
                }, 500);
            } else {
                setError(true);
                setErrorMessage(res.error)
            }
            });
    }


    return (
        <div>
            <React.Fragment>
                {/* <CssBaseline /> */}
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
                        บันทึกไม่สำเร็จ!! : {errorMessage}
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
                               อัปเดตโปรไฟล์นักอ่าน
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />
                            <Grid container spacing={2} sx={{ padding: 1 }}>
                            <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="Nickname"
                                            variant="outlined"
                                            type="string"
                                            size="medium"  
                                            value={reader.Nickname || ""}
                                            onChange={handleInputChange}
                                            label="ชื่อเล่น"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">คำนำหน้า</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="คำนำหน้า"
                                            native
                                            value={reader.PrefixID + ""}
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
                                </Grid>
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
                                            value={reader.Name || ""}
                                            onChange={handleInputChange}
                                            label="ชื่อ-สกุล"
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
                                            label="เพศ"
                                            native
                                            value={reader.GenderID + ""}
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
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="Email"
                                            variant="outlined"
                                            type="string"
                                            size="medium"  
                                            value={reader.Email || ""}
                                            onChange={handleInputChange}
                                            label="อีเมล์"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={20} >
                              <FormControl fullWidth >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <DatePicker
                                    label="วันเกิด"
                                    value={reader.Date_of_Birth}
                                    onChange={(newValue) => {
                                      setReaders({
                                        ...reader,
                                        Date_of_Birth: newValue,
                                      });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                  />
                                </LocalizationProvider>
                              </FormControl>
                            </Grid>
                            <Grid item xs={20}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">แนวนิยายที่ชอบ</InputLabel>      
                                        <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="เลือกแนวนิยายที่ชอบ"
                                        native
                                        sx={{ mt: 2, mb: 0 }}
                                        value={reader.GenreID + ""}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: "GenreID",
                                        }}                
                                        >
                                        <option aria-label="None" value=""></option>
                                        {genres.map((item: GenreInterface) => (
                                            <option value={item.ID} key={item.ID}>
                                            {item.Genre_Name}
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
                                            id="Password"
                                            variant="outlined"
                                            type="string"
                                            size="medium"  
                                            value={reader.Password || ""}
                                            onChange={handleInputChange}
                                            label="รหัสผ่าน"
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

export default ReaderUpdate;