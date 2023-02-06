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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { AdminInterface } from "../interfaces/IAdmin";
import { EducationInterface } from "../interfaces/IEducation";
import { ExecutiveInterface } from "../interfaces/IExecutiveAdmin";
import { GenderInterface } from "../interfaces/IGender";
import { RoleInterface } from "../interfaces/IRole";

import{
    GetExecutiveByAID,
    GetGenders,
    GetEducations,
    GetRoles,
    Admins,
} from "../services/HttpClientService"

const apiUrl = "http://localhost:9999";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AdminCreate(){
    const [genders, setGenders] = useState<GenderInterface[]>([]);
    const [educations, setEducations] = useState<EducationInterface[]>([]);
    const [roles, setRoles] = useState<RoleInterface[]>([]);
    const [executives, setExecutives] = useState<ExecutiveInterface>();
    const [admins, setAdmins] = useState<AdminInterface>({
        Admin_birthday: new Date(),
        Admin_date_register: new Date(),
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
        console.log(name);
    };

    const getExecutives = async () => {
        let res = await GetExecutiveByAID();
        admins.ExecutiveAdminID = res.ID;
        if (res) {
            setExecutives(res);
        }
    };

    const getGenders = async () => {
        let res = await GetGenders();
        if (res) {
         setGenders(res);
         console.log(res)
        }
    };

    const getEducations = async () => {
        let res = await GetEducations();
        if (res) {
         setEducations(res);
         console.log(res)
        }
    };

    const getRoles = async () => {
        let res = await GetRoles();
        if (res) {
         setRoles(res);
         console.log(res)
        }
    };

    useEffect(() => {
        getExecutives()
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
            Admin_firstname: admins.Admin_firstname??  "",
            Admin_lastname: admins.Admin_lastname??  "",
            Admin_email: admins.Admin_email??  "",
            Admin_password: admins.Admin_password??  "",
            Admin_tel: admins.Admin_tel??  "",
            Admin_salary: typeof admins.Admin_salary === "string" ? parseFloat(admins.Admin_salary) : 0.0,
            Admin_birthday: admins.Admin_birthday,
            Admin_date_register: admins.Admin_date_register,
            ExecutiveAdminID: convertType(admins.ExecutiveAdminID),
            EducationID: convertType(admins.EducationID),
            GenderID: convertType(admins.GenderID),
            RoleID: convertType(admins.RoleID),
        };

        console.log(data)
        let res = await Admins(data);
        if (res) {
          setSuccess(true);
        } else {
          setError(true);
        }
    }

    return (
        <Container maxWidth="md">
           <Paper>
                <Box display="flex" sx={{marginTop: 1,}}><Box sx={{ paddingX: 1, paddingY: 1, }}>
                    <Typography component="h2" variant="h3" align="center" color="secondary" gutterBottom>เพิ่มผู้ดูแลระบบ</Typography>
                </Box></Box>
                <Divider />

                <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                        <p>ผู้ดูแลระบบระดับสูง (Executive Admin)</p>  
                    <Select 
                        value={admins.ExecutiveAdminID + ""}
                        onChange={handleChange}
                        disabled
                        inputProps={{name: "ExecutiveAdminID",}}>
                        <option value={executives?.ID} key={executives?.ID}>
                            {executives?.Executive_firstname} {executives?.Executive_lastname}
                        </option>    
                    </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                    <p>ชื่อ (First Name)</p>
                    <TextField
                        id="Admin_firstname"
                        variant="outlined"
                        type="string"
                        size="medium"
                        placeholder="please enter First Name"
                        value={admins.Admin_firstname || ""}
                        onChange={handleInputChange}/>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                    <p>นามสกุล (Last Name)</p>
                    <TextField
                        id="Admin_lastname"
                        variant="outlined"
                        type="string"
                        size="medium"
                        placeholder="please enter Last Name"
                        value={admins.Admin_lastname || ""}
                        onChange={handleInputChange}/>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <FormControl fullWidth variant="outlined">
                        <p>เพศ (Gender)</p>
                    <Select
                        native
                        value={admins.GenderID + ""}
                        onChange={handleChange}
                        inputProps={{
                            name: "GenderID",
                        }}>
                        <option aria-label="None" value="">
                            choose Gender
                        </option>
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
                        native
                        value={admins.EducationID + ""}
                        onChange={handleChange}
                        inputProps={{
                            name: "EducationID",
                        }}>
                        <option aria-label="None" value="">
                            choose education
                        </option>
                            {educations.map((item: EducationInterface) => (
                        <option value={item.ID} key={item.ID}>
                            {item.Education_degree}
                        </option>
                        ))}
                    </Select>
                    </FormControl>
                </Grid>

                {/* <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined">
                        <p>วันที่ลงทะเบียน (Application Date)</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={admins.Admin_date_register}
                            onChange={(newValue) => {
                            setAdmins({
                                ...admins,
                                Admin_date_register: newValue,
                            });
                        }}
                        renderInput={(params) => <TextField {...params} />}/>
                        </LocalizationProvider>
                    </FormControl>
                </Grid> */}

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                    <p>อีเมล (E-mail)</p>
                    <TextField
                        id="Admin_email"
                        variant="outlined"
                        type="string"
                        size="medium"
                        placeholder="please enter E-mail"
                        value={admins.Admin_email || ""}
                        onChange={handleInputChange}/>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>รหัสผ่าน (Password)</p>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>}
                        // value={admins.Admin_password || ""}
                        // onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p>หน้าที่ (Responsibility)</p>
                    <Select
                        native
                        value={admins.RoleID + ""}
                        onChange={handleChange}
                        inputProps={{
                            name: "RoleID",
                        }}>
                        <option aria-label="None" value="">
                            choose Role
                        </option>
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
                    <p>เงินเดือน (Salary)</p>
                    <TextField
                        id="Admin_salary"
                        variant="outlined"
                        type="number"
                        size="medium"
                        placeholder="please enter Salary"
                        value={admins.Admin_salary || ""}
                        onChange={handleInputChange}/>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                        <p>เบอร์โทรศัพท์ (ตัวอย่าง 0637756269)</p>  
                        <TextField
                        id="Admin_tel"
                        variant="outlined"
                        type="string"
                        size="medium"
                        placeholder="please enter Phone Number"
                        value={admins.Admin_tel || ""}
                        onChange={handleInputChange}/>
                    </FormControl>
                </Grid>

                {/* <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined">
                        <p>วันที่ลงทะเบียน (Application Date)</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={admins.Admin_date_register}
                            onChange={(newValue) => {
                            setAdmins({
                                ...admins,
                                Admin_date_register: newValue,
                            });
                        }}
                        renderInput={(params) => <TextField {...params} />}/>
                        </LocalizationProvider>
                    </FormControl>
                </Grid> */}

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
    );
}export default AdminCreate;