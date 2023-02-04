import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";

import { ReaderInterface } from "../../interfaces/IReader"; 
import { GenderInterface } from "../../interfaces/IGender";
import { PrefixInterface } from "../../interfaces/IPrefix";
import ReaderProfile from "./ReaderProfile";

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//     props,
//     ref
// ) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// function StudentCreate() {
//     const [date, setDate] = React.useState<Date | null>(null);
//     const [success, setSuccess] = React.useState(false);
//     const [error, setError] = React.useState(false);
//     const [errorMessage, setErrorMessage] = React.useState("");

//     const [prefix, setPrefix] = React.useState<PrefixInterface[]>([]);
//     const [gender, setGender] = React.useState<GenderInterface[]>([]);
//     const [reader, setReader] = React.useState<ReaderInterface[]>([]);({
//             Date_of_Birth_: new Date(),
//     });

//     const apiUrl = "http://localhost:9999";
//     const requestOptions = {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json"
//         },    };

//     const handleClose = (
//         event?: React.SyntheticEvent | Event,
//         reason?: string
//     ) => {
//         if (reason === "clickaway") {
//             return;
//         }
//         setSuccess(false);
//         setError(false);
//     };

//     const handleInputChange = (
//         event: React.ChangeEvent<{ id?: string; value: any }>
//     ) => {
//         const id = event.target.id as keyof typeof ReaderProfile;
//         const { value } = event.target;
//         setReader({ ...reader, [id]: value });
//     };

//     const handleChange = (event: SelectChangeEvent) => {
//         const name = event.target.name as keyof typeof reader;
//         setReader({
//             ...reader,
//             [name]: event.target.value,
//         });
//     };

//     const getPrefix = async () => {
//         fetch(`${apiUrl}/blood_types`, requestOptions)
//             .then((response) => response.json())
//             .then((res) => {
//                 if (res.data) {
//                     console.log(res.data)
//                     setPrefix(res.data);
//                 }
//                 else { console.log("NO DATA") }
//             });
//     };

//     const getGender = async () => {
//         fetch(`${apiUrl}/els`, requestOptions)
//             .then((response) => response.json())
//             .then((res) => {
//                 if (res.data) {
//                     console.log(res.data)
//                     setGender(res.data);
//                 }
//                 else { console.log("NO DATA") }
//             });
//     };

//     useEffect(() => {
//         getGender();
//         getPrefix();
//     }, []);

//     const convertType = (data: string | number | undefined) => {
//         let val = typeof data === "string" ? parseInt(data) : data;
//         return val;
//     };

//     async function submit() {
//         let data = {
//             Email: reader.Email ?? "",
//             Name: reader.Name ?? "",
//             Nickname: reader.Nickname ?? "",
//             Date_of_Birth: reader.Date_of_Birth ?? "",
//             Password: reader.Password ?? "",

//             prefix: convertType(prefix.PrefixID),
//             gender: convertType(gender.GenderID),
//         };

//         console.log(data)

//         const requestOptions = {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data),
//         };

//         fetch(`${apiUrl}/students`, requestOptions)
//             .then((response) => response.json())
//             .then((res) => {
//                 if (res.data) {
//                     setSuccess(true);
//                     setErrorMessage("")
//                 } else {
//                     setError(true);
//                     setErrorMessage(res.error)
//                 }
//             });
//     }

//     return (
//         <Container maxWidth="md">
//             <Snackbar
//                 open={success}
//                 autoHideDuration={6000}
//                 onClose={handleClose}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//             >
//                 <Alert onClose={handleClose} severity="success">
//                 <div className="good-font">
//                     สมัครสมาชิกสำเร็จ
//                 </div>
//                 </Alert>
//             </Snackbar>
//             <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
//                 <Alert onClose={handleClose} severity="error">
//                 <div className="good-font">
//                     สมัครสมาชิกไม่สำเร็จ
//                 </div>
//                 </Alert>
//             </Snackbar>
//             <Paper>
//                 <Box
//                     display="flex"
//                     sx={{
//                         marginTop: 2,
//                     }}
//                 >
//                     <Box sx={{ paddingX: 2, paddingY: 1 }}>
//                         <Typography
//                             component="h2"
//                             variant="h6"
//                             color="primary"
//                             gutterBottom
//                         >
//                             <div className="good-font">
//                             สมัครสมาชิกนักอ่าน
//                             </div>
//                         </Typography>
//                     </Box>
//                 </Box>
//                 <Divider />
//                 <Grid container spacing={3} sx={{ padding: 2 }}>

//                     <Grid item xs={6}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">Email</p>
//                             <TextField
//                                 id="Email"
//                                 variant="outlined"
//                                 type="string"
//                                 size="medium"
//                                 value={reader.Email || ""}
//                                 onChange={handleInputChange}
//                             />
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={6}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">ชื่อนามสกุล</p>
//                             <TextField
//                                 id="Name"
//                                 variant="outlined"
//                                 type="string"
//                                 size="medium"
//                                 value={reader.Email || ""}
//                                 onChange={handleInputChange}
//                             />
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={6}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">วันเดือนปีเกิด</p>
//                             <LocalizationProvider dateAdapter={AdapterDateFns}>
//                                 <DatePicker
//                                     value={std.Sdob}
//                                     onChange={(newValue) => {
//                                         setStd({
//                                             ...std,
//                                             Sdob: newValue,
//                                         });
//                                     }}
//                                     renderInput={(params) => <TextField {...params} />}
//                                 />
//                             </LocalizationProvider>
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={6}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">กลุ่มเลือด</p>
//                             <Select
//                                 native
//                                 value={std.BTID + ""}
//                                 onChange={handleChange}
//                                 inputProps={{
//                                     name: "BTID",
//                                 }}
//                             >
//                                 <option aria-label="None" value="">
//                                     เลือกกลุ่มเลือด
//                                 </option>
//                                 {bloodType.map((item: BTInterface) => (
//                                     <option value={item.ID} key={item.ID}>
//                                         {item.Btname}
//                                     </option>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">เลขประจำตัวประชาชน</p>
//                             <TextField
//                                 id="Sidentity_number"
//                                 variant="outlined"
//                                 type="string"
//                                 size="medium"
//                                 value={std.Sidentity_number || ""}
//                                 onChange={handleInputChange}
//                             />
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">เบอร์โทรศัพท์</p>
//                             <TextField
//                                 id="Phone_Number"
//                                 variant="outlined"
//                                 type="string"
//                                 size="medium"
//                                 value={std.Phone_Number || ""}
//                                 onChange={handleInputChange}
//                             />
//                         </FormControl>
//                     </Grid>


//                     <Grid item xs={12}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">ที่อยู่</p>
//                             <TextField
//                                 id="Address"
//                                 variant="outlined"
//                                 type="string"
//                                 size="medium"
//                                 value={std.Address || ""}
//                                 onChange={handleInputChange}
//                             />
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">ชื่อผู้ปกครอง</p>
//                             <TextField
//                                 id="Sparent"
//                                 variant="outlined"
//                                 type="string"
//                                 size="medium"
//                                 value={std.Sparent || ""}
//                                 onChange={handleInputChange}
//                             />
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={6}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">ระดับการศึกษา</p>
//                             <Select
//                                 native
//                                 value={std.ELID + ""}
//                                 onChange={handleChange}
//                                 inputProps={{
//                                     name: "ELID",
//                                 }}
//                             >
//                                 <option aria-label="None" value="">
//                                     เลือกระดับการศึกษา
//                                 </option>
//                                 {eLevel.map((item: ELInterface) => (
//                                     <option value={item.ID} key={item.ID}>
//                                         {item.Elname}
//                                     </option>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">วัน/เดือน/ปีที่เข้าศึกษา</p>
//                             <LocalizationProvider dateAdapter={AdapterDateFns}>
//                                 <DatePicker
//                                     value={std.Admission_Date}
//                                     onChange={(newValue) => {
//                                         setStd({
//                                             ...std,
//                                             Admission_Date: newValue,
//                                         });
//                                     }}
//                                     renderInput={(params) => <TextField {...params} />}
//                                 />
//                             </LocalizationProvider>
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={6}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">วุฒิก่อนเข้าศึกษา</p>
//                             <Select
//                                 native
//                                 value={std.EQID + ""}
//                                 onChange={handleChange}
//                                 inputProps={{
//                                     name: "EQID",
//                                 }}
//                             >
//                                 <option aria-label="None" value="">
//                                     เลือกวุฒิก่อนเข้าศึกษา
//                                 </option>
//                                 {eQuali.map((item: EQInterface) => (
//                                     <option value={item.ID} key={item.ID}>
//                                         {item.Eqname}
//                                     </option>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">จบการศึกษาจาก</p>
//                             <TextField
//                                 id="Graduate_School"
//                                 variant="outlined"
//                                 type="string"
//                                 size="medium"
//                                 value={std.Graduate_School || ""}
//                                 onChange={handleInputChange}
//                             />
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">เกรดเฉลี่ยก่อนเข้าศึกษา</p>
//                             <TextField
//                                 id="Grade"
//                                 variant="outlined"
//                                 type="number"
//                                 size="medium"
//                                 InputProps={{ inputProps: { min: 1 } }}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 value={std.Grade || ""}
//                                 onChange={handleInputChange}
//                             />
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={6}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">สาขาวิชา</p>
//                             <Autocomplete
//                                 disablePortal
//                                 id="BranchID"
//                                 getOptionLabel={(item: BranchInterface) => `${item.Brname}`}
//                                 options={branch}
//                                 sx={{ width: 'auto' }}
//                                 isOptionEqualToValue={(option, value) =>
//                                     option.ID === value.ID}
//                                 onChange={(e, value) => { std.BranchID = value?.ID }}
//                                 renderInput={(params) => <TextField {...params} label="เลือกสาขา" />}
//                             />
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <FormControl fullWidth variant="outlined">
//                             <p className="good-font">อาจารย์ที่ปรึกษา</p>
//                             <Select
//                                 native
//                                 value={std.TeacherID + ""}
//                                 onChange={handleChange}
//                                 inputProps={{
//                                     name: "TeacherID",
//                                 }}
//                             >
//                                 <option aria-label="None" value="">
//                                     เลือกอาจารย์ที่ปรึกษา
//                                 </option>
//                                 {teacher.map((item: TInterface) => (
//                                     <option value={item.ID} key={item.ID}>
//                                         {item.TfirstName}
//                                         {" "}
//                                         {item.TlastName}
//                                     </option>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <Button component={RouterLink} to="/StudentShow" variant="contained">
//                         <div className="good-font">
//                             กลับ
//                         </div>
//                         </Button>
//                         <Button
//                             style={{ float: "right" }}
//                             onClick={submit}
//                             variant="contained"
//                             color="primary"
//                         >
//                             <div className="good-font">
//                             บันทึก
//                             </div>
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </Paper>
//         </Container>
//     );
// }

// export default StudentCreate;