import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useParams} from "react-router-dom";
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
import { GetPublicRelations } from "../services/HttpClientService";
import { PublicRelationInterface } from "../interfaces/IPublicRelation";
import { FictionInterface } from "../interfaces/IFiction";
import { WriterInterface } from "../interfaces/IWriter";

function BannerUpdate(){
    let { id } = useParams();
    const [public_relations, setPublicRelations] = useState<PublicRelationInterface>({});
    const [admins, setAdmins] = useState<AdminInterface[]>([]);
    const [fictions, setFictions] = useState<FictionInterface[]>([]);
    const [Writers, setWriters] = useState<WriterInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof public_relations;
        const { value } = event.target;
        setPublicRelations({ ...public_relations, [id]: value });
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
        const name = event.target.name as keyof typeof public_relations;
        setPublicRelations({
          ...public_relations,
          [name]: event.target.value,
        });
    };

    const apiUrl = "http://localhost:9999";

    // async function GetAdminByAID() {
    //     const requestOptions = {
    //         method: "GET",
    //         headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         "Content-Type": "application/json",
    //         },
    //     };
    
    //     let res = await fetch(`${apiUrl}/admin/`+id, requestOptions)
    //         .then((response) => response.json())
    //         .then((res) => {
    //         if (res.data) {
    //             return res.data;
    //         } else {
    //             return false;
    //         }
    //         });
    //         return res;
    // }

    async function GetAdmins() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
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

    async function GetFictions() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/fictions`, requestOptions)
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

    async function GetWriters() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/writers`, requestOptions)
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

    const getPublicRelation = async () => {
        let res = await GetPublicRelations();
        if (res) {
            setPublicRelations(res);
        }
    };

    const getAdmins = async () => {
        let res = await GetAdmins();
        if (res) {
            setAdmins(res);
        }
    };

    const getFictions = async () => {
        let res = await GetFictions();
        if (res) {
            setFictions(res);
        }
    };

    const getWriters = async () => {
        let res = await GetWriters();
        if (res) {
            setWriters(res);
        }
    };

    useEffect(() => {
        getPublicRelation();
        getAdmins();
        getFictions();
        getWriters();
    }, []);
    
    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            ID: public_relations.ID,
            Pr_topic: public_relations.Pr_topic,
            Pr_cover: public_relations.Pr_cover,
            Pr_details: public_relations.Pr_details,
            Pr_time: public_relations.Pr_time,
            AdminID: convertType(public_relations.AdminID),
            FictionID: convertType(public_relations.FictionID),
            WriterID: convertType(public_relations.WriterID),
        };

        const requestOptions = {
            method: "PATCH",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(`${apiUrl}/public_relations`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.data) {
                setSuccess(true);
                setTimeout(() => {
                    window.location.href = "/public_relations";
                }, 500);
            } else {
                setError(true);
            }
        });
    }

    return (
        <div>
        <Container maxWidth="md">
           <Paper>
                <Box display="flex" sx={{marginTop: 1,}}><Box sx={{ paddingX: 1, paddingY: 1, }}>
                    <Typography component="h2" variant="h3" align="center" color="secondary" gutterBottom>แก้ไขแบนเนอร์</Typography>
                </Box></Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>
                <Snackbar
                        open={success}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        >
                        <Alert onClose={handleClose} severity="success">
                            แก้ไขแบนเนอร์สำเร็จ!!
                        </Alert>
                </Snackbar>
                <Snackbar
                        open={error}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert onClose={handleClose} severity="error">
                            แก้ไขแบนเนอร์ไม่สำเร็จ!!
                        </Alert>
                </Snackbar>

                {/* <Grid item xs={6}>
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
                            disabled 
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
                </Grid> */}

                <Grid item xs={12}>
                    <Button
                    component={RouterLink} to="/banner_list" variant="contained" color="inherit"
                        >รายการแบนเนอร์ทั้งหมด
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
}export default BannerUpdate;