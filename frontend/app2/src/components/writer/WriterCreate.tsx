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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { WriterInterface } from "../../interfaces/writer/IWriter";
import { PrefixInterface } from "../../interfaces/writer/IPrefix";
import { GenderInterface } from "../../interfaces/writer/IGender";
import { AffiliationInterface } from "../../interfaces/writer/IAffiliation";
import { CssBaseline } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

function WriterCreate() {
    const [writer, setWriter] = useState<WriterInterface>({Writer_birth: new Date()});
    const [prefixs, setPrefixs] = useState<PrefixInterface[]>([]);
    const [genders, setGenders] = useState<GenderInterface[]>([]);
    const [affiliations, setAffiliations] = useState<AffiliationInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof WriterCreate;
        const { value } = event.target;
        setWriter({ ...writer, [id]: value });
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
        const name = event.target.name as keyof typeof writer;
        setWriter({
        ...writer,
        [name]: event.target.value,
        });
    };

    const apiUrl = "http://localhost:9999";

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
      
      async function GetAffiliations() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/affiliations`, requestOptions)
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

    const getAffiliations = async () => {
        let res = await GetAffiliations();
        if (res) {
        setAffiliations(res);
        }
    };

    useEffect(() => {
        getPrefixs();
        getGenders();
        getAffiliations();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
        PrefixID: convertType(writer.PrefixID),
        Name: writer.Name ,
        GenderID: convertType(writer.GenderID),
        Writer_birthday: writer.Writer_birthday,
        AffiliationID: convertType(writer.AffiliationID),
        Pseudonym: writer.Pseudonym,
        Email: writer.Email,
        Password: writer.Password,
        
        };
        console.log(data)
        const apiUrl = "http://localhost:9999";
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/writers`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log(res);
            if (res.data) {
              setErrorMessage("บันทึกข้อมูลสำเร็จ");
              setSuccess(true);
              setTimeout(() => {
                window.location.href = "/";
                }, 1000);
            } else {
              console.log("บันทึกข้อมูลไม่สำเร็จ")
              setError(true);
              setErrorMessage(res.error)
            }
      });
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
                                gutterBottom
                                >
                                ลงทะเบียนนักเขียน
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />
                            <Grid container spacing={3} sx={{ padding: 2 }}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">คำนำหน้า</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="คำนำหน้า"
                                            native
                                            value={writer.PrefixID + ""}
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
                                            value={writer.Name || ""}
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
                                        value={writer.GenderID + ""}
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
                              <FormControl fullWidth >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <DatePicker
                                    label="วันเกิด"
                                    value={writer.Writer_birthday}
                                    onChange={(newValue) => {
                                      setWriter({
                                        ...writer,
                                        Writer_birthday: newValue,
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
                                        id="Pseudonym"
                                        variant="outlined"
                                        type="string"
                                        size="medium"  
                                        value={writer.Pseudonym || ""}
                                        onChange={handleInputChange}
                                        label="นามปากกา"
                                    />
                                </FormControl>
                            </Grid>                    
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">ต้นสังกัด</InputLabel>      
                                      <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="ต้นสังกัด"
                                        native
                                        value={writer.AffiliationID + ""}
                                        onChange={handleChange}
                                        inputProps={{
                                          name: "AffiliationID",
                                        }}                
                                        >
                                        <option aria-label="None" value=""></option>
                                        {affiliations.map((item: AffiliationInterface) => (
                                            <option value={item.ID} key={item.ID}>
                                            {item.Affiliation_name}
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
                                        value={writer.Email || ""}
                                        onChange={handleInputChange}
                                        label="อีเมล์"
                                    />
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
                                        value={writer.Password || ""}
                                        onChange={handleInputChange}
                                        label="รหัสผ่าน"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    component={RouterLink}
                                    to="/writers"
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

export default WriterCreate;