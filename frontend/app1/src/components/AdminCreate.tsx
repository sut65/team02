import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
//import { useParams} from "react-router-dom";
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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { AdminInterface } from "../interfaces/IAdmin";
import { EducationInterface } from "../interfaces/IEducation";
import { GenderInterface } from "../interfaces/IGender";
import { RoleInterface } from "../interfaces/IRole";

function AdminCreate(){
    // let { id } = useParams();
    const [admins, setAdmins] =  useState<AdminInterface>({ Admin_date_register: new Date(), });
    const [genders, setGenders] = useState<GenderInterface[]>([]);
    const [educations, setEducations] = useState<EducationInterface[]>([]);
    const [roles, setRoles] = useState<RoleInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof AdminCreate;
        const { value } = event.target;
        setAdmins({ ...admins, [id]: value });
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
        const name = event.target.name as keyof typeof admins;
        setAdmins({
          ...admins,
          [name]: event.target.value,
        });
    };

    const apiUrl = "http://localhost:9999";

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

    async function GetEducations() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/educations`, requestOptions)
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

    async function GetRoles() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/roles`, requestOptions)
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

    async function Admins(data: AdminInterface) {
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
      
        let res = await fetch(`${apiUrl}/admins`, requestOptions)
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

    const getGenders = async () => {
        let res = await GetGenders();
        if (res) {
         setGenders(res);
        }
    };

    const getEducations = async () => {
        let res = await GetEducations();
        if (res) {
         setEducations(res);
        }
    };

    const getRoles = async () => {
        let res = await GetRoles();
        if (res) {
         setRoles(res);
        }
    };

    useEffect(() => {
        getGenders();
        getEducations();
        getRoles();
    }, []);
    
    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            Admin_firstname: admins.Admin_firstname,
            Admin_lastname: admins.Admin_lastname,
            Admin_email: admins.Admin_email,
            Admin_password: admins.Admin_password,
            Admin_tel: admins.Admin_tel,
            Admin_date_register: admins.Admin_date_register,
            EducationID: convertType(admins.EducationID),
            GenderID: convertType(admins.GenderID),
            RoleID: convertType(admins.RoleID),
        };

        console.log(data)
        let res = await Admins(data);
        if (res) {
          console.log("บันทึกได้")
          setSuccess(true);
          setErrorMessage("")
        } else {
          console.log("บันทึกไม่ได้")
          setError(true);
          setErrorMessage(res.error)
        }
    }

    return (
        <div>
        <Container maxWidth="md">
           <Paper>
                <Box display="flex" sx={{marginTop: 1,}}><Box sx={{ paddingX: 1, paddingY: 1, }}>
                    <Typography component="h2" variant="h3" align="center" color="secondary" gutterBottom>เพิ่มผู้ดูแลระบบ</Typography>
                </Box></Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>
                <Snackbar
                        id="success"
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
                        id="error"
                        open={error}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert onClose={handleClose} severity="error">
                        บันทึกไม่สำเร็จ!! : {errorMessage}
                        </Alert>
                </Snackbar>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                    <p>ชื่อ (First Name)</p>
                    <TextField
                        required
                        id="Admin_firstname"
                        variant="outlined"
                        type="string"
                        size="medium"
                        placeholder="กรอกชื่อจริง"
                        value={admins.Admin_firstname || ""}
                        onChange={handleInputChange}/>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                    <p>นามสกุล (Last Name)</p>
                    <TextField
                        required
                        id="Admin_lastname"
                        variant="outlined"
                        type="string"
                        size="medium"
                        placeholder="กรอกนามสกุล"
                        value={admins.Admin_lastname || ""}
                        onChange={handleInputChange}/>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <FormControl fullWidth variant="outlined">
                        <p>เพศ (Gender)</p>
                    <Select
                        required
                        native
                        value={admins.GenderID + ""}
                        onChange={handleChange}
                        inputProps={{
                            name: "GenderID",
                        }}>
                        <option aria-label="None" value="">เลือกเพศ</option>
                        {genders.map((item: GenderInterface) => (
                            <option value={item.ID} key={item.ID}>
                            {item.Gender}
                            </option>
                        ))}
                    </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={5}>
                    <FormControl fullWidth variant="outlined">
                        <p>ระดับการศึกษา (Education)</p>
                    <Select
                        required
                        native
                        value={admins.EducationID + ""}
                        onChange={handleChange}
                        inputProps={{
                            name: "EducationID",
                        }}>
                        <option aria-label="None" value="">เลือกระดับการศึกษา</option>
                        {educations.map((item: EducationInterface) => (
                            <option value={item.ID} key={item.ID}>
                            {item.Education_degree}
                            </option>
                        ))}
                    </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined">
                        <p>หน้าที่ (Responsibility)</p>
                    <Select
                        required
                        native
                        value={admins.RoleID + ""}
                        onChange={handleChange}
                        inputProps={{
                            name: "RoleID",
                        }}>
                        <option aria-label="None" value="">เลือกหน้าที่</option>
                        {roles.map((item: RoleInterface) => (
                            <option value={item.ID} key={item.ID}>
                            {item.Role}
                            </option>
                        ))}
                    </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>อีเมล (E-mail)</p>
                    <TextField
                        required
                        id="Admin_email"
                        variant="outlined"
                        type="string"
                        size="medium"
                        placeholder="กรอกอีเมล"
                        value={admins.Admin_email || ""}
                        onChange={handleInputChange}/>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>รหัสผ่าน (Password)</p>
                        <TextField
                        id="Admin_password"
                        variant="outlined"
                        type="string"
                        size="medium"
                        placeholder="กรอกรหัสผ่าน"
                        value={admins.Admin_password || ""}
                        onChange={handleInputChange}
                    />
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>เบอร์โทรศัพท์ (ตัวอย่าง 0637756269)</p>  
                        <TextField
                        required
                        id="Admin_tel"
                        variant="outlined"
                        type="string"
                        size="medium"
                        placeholder="กรอกเบอร์โทรศัพท์"
                        value={admins.Admin_tel || ""}
                        onChange={handleInputChange}/>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>วันที่ลงทะเบียน</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker 
                                value={admins.Admin_date_register}
                                onChange={(newValue) => {
                                    setAdmins({
                                    ...admins,
                                    Admin_date_register: newValue,
                                    });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Button
                    component={RouterLink} to="/admins" variant="contained" color="inherit"
                        >รายชื่อผู้ดูแลระบบทั้งหมด
                    </Button>
                    <Button style={{ float: "right" }}
                        onClick={submit}
                        variant="contained"
                        color="success"
                        >ลงทะเบียนตอนนี้
                    </Button>
                </Grid>
            </Grid>
            </Paper>
        </Container>
        </div>
    );
}export default AdminCreate;