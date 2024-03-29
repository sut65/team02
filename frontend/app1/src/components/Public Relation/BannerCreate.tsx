import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from '@mui/material/IconButton';

import { AdminInterface } from "../../interfaces/IAdmin";
import { PublicRelationInterface } from "../../interfaces/IPublicRelation";
import { FictionInterface } from "../../interfaces/IFiction";
import { PRCategoryInterface } from "../../interfaces/IPRCategory";

function BannerCreate(){
    const [image, setImage] = React.useState<string | ArrayBuffer | null>("");
    
    const [public_relations, setPublicRelations] =  useState<PublicRelationInterface>({Pr_time: new Date(),});
    const [admins, setAdmins] = useState<AdminInterface>();
    const [fictions, setFictions] = useState<FictionInterface[]>([]);
    const [categoies, setCategories] = useState<PRCategoryInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onImgChange = (event: any) => {
      const image = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
          const base64Data = reader.result;
          setImage(base64Data)
      }
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof BannerCreate;
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

    async function GetAdminByAID() {
      let aid = localStorage.getItem("aid");
      const requestOptions = {
          method: "GET",
          headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          },
      };
  
      let res = await fetch(`${apiUrl}/admin/${aid}`, requestOptions)
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

    async function GetCategories() {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
    
      let res = await fetch(`${apiUrl}/categories`, requestOptions)
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

    async function PublicRelations(data: PublicRelationInterface) {
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
      
        let res = await fetch(`${apiUrl}/public_relations`, requestOptions)
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

    const getAdmins = async () => {
      let res = await GetAdminByAID();
      public_relations.AdminID = res.ID;
      if (res) {
        setAdmins(res);
      }
    };

    const getCategories = async () => {
      let res = await GetCategories();
      if (res) {
        setCategories(res);
      }
    };

    const getFictions = async () => {
        let res = await GetFictions();
        if (res) {
         setFictions(res);
        }
    };

    useEffect(() => {
        getAdmins();
        getCategories();
        getFictions();
    }, []);
    

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            Pr_topic: public_relations.Pr_topic,
            Pr_cover: image,
            Pr_details: public_relations.Pr_details,
            Pr_time: public_relations.Pr_time,
            AdminID: convertType(public_relations.AdminID),
            FictionID: convertType(public_relations.FictionID),
            PR_categoryID: convertType(public_relations.PR_categoryID),
        };

        console.log(data)

        const apiUrl = "http://localhost:9999";

        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        };
      
        fetch(`${apiUrl}/public_relations`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log(res)
            if (res.data) {
              console.log("บันทึกได้")
              setSuccess(true);
              setErrorMessage("")
              setTimeout(() => {
                window.location.href = "/banner_list";
            }, 500);
            } else {
              console.log("บันทึกไม่ได้")
              setError(true);
              setErrorMessage(res.error)
            }
          });
        }

    return (
      <div>
        <Container maxWidth="md">
           <Paper>
                <Box display="flex" sx={{marginTop: 1,}}><Box sx={{ paddingX: 1, paddingY: 1, }}>
                    <Typography component="h2" variant="h3" align="center" color="secondary" gutterBottom>สร้างแบนเนอร์</Typography>
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

                <Grid item xs={10}>
                  <Box component="form" sx={{'& > :not(style)': { m: 1, width: '100%' },}}
                    ><TextField
                        required
                        multiline
                        id="Pr_topic"
                        variant="outlined"
                        label="หัวข้อเรื่อง (Topic)"
                        type="string"
                        size="medium"
                        value={public_relations.Pr_topic || ""}
                        onChange={handleInputChange}/>
                  </Box>
                </Grid>

                <Grid item xs={2}>
                    <FormControl fullWidth variant="outlined">
                    <IconButton color="secondary" aria-label="upload picture" component="label">
                      <input hidden accept="image/*" type="file" 
                      onChange={onImgChange}
                      />
                    <AddPhotoAlternateIcon sx={{ fontSize:72, mt: -1.3}}/>
                    </IconButton>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <img src={`${image}`} alt="preview-cover" height="500"/>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                        <p>รายละเอียด (Details)</p>
                    <TextField
                        required
                        multiline
                        id="Pr_details"
                        variant="outlined"
                        type="string"
                        size="medium"
                        placeholder="กรุณากรอกรายละเอียด"
                        value={public_relations.Pr_details || ""}
                        onChange={handleInputChange}/>
                    </FormControl>
                </Grid>

                <Grid item xs={4.5}>
                    <FormControl fullWidth variant="outlined">
                        <p>นิยาย (Fiction)</p>
                    <Select
                        required
                        native
                        value={public_relations.FictionID + ""}
                        onChange={handleChange}
                        inputProps={{
                            name: "FictionID",
                        }}>
                        <option aria-label="None" value="">เลือกนิยาย</option>
                        {fictions.map((item: FictionInterface) => (
                            <option value={item.ID} key={item.ID}>
                            {item.Fiction_Name}
                            </option>
                        ))}
                    </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <FormControl fullWidth variant="outlined">
                        <p>จำกัดอายุ (Age-restricted)</p>
                    <Select
                        disabled
                        native
                        value={public_relations.FictionID + ""}
                        onChange={handleChange}
                        inputProps={{
                            name: "FictionID",
                        }}>
                        <option aria-label="None" value="">Age-restricted</option>
                        {fictions.map((item: FictionInterface) => (
                            <option value={item.ID} key={item.ID}>
                            {item.RatingFiction?.RatingFiction_Name}
                            </option>
                        ))}
                    </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4.5}>
                    <FormControl fullWidth variant="outlined">
                        <p>นักเขียน (Writer)</p>
                    <Select
                        disabled
                        native
                        value={public_relations.FictionID + ""}
                        onChange={handleChange}
                        inputProps={{
                            name: "WriterID",
                        }}>
                        <option aria-label="None" value="">Writer</option>
                        {fictions.map((item: FictionInterface) => (
                            <option value={item.ID} key={item.ID}>
                            {item.Writer?.Name}
                            </option>
                        ))}
                    </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined">
                        <p>หมวดหมู่การประชาสัมพันธ์</p>
                    <Select
                        native
                        value={public_relations.PR_categoryID + ""}
                        onChange={handleChange}
                        inputProps={{
                            name: "PR_categoryID",
                        }}>
                        <option aria-label="None" value="">เลือกหมวดหมู่</option>
                        {categoies.map((item: PRCategoryInterface) => (
                            <option value={item.ID} key={item.ID}>
                            {item.Category}
                            </option>
                        ))}
                    </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth variant="outlined">
                    <p>ผู้ดูแลระบบ (Admin)</p>  
                    <Select           
                      value={public_relations.AdminID + ""}
                      onChange={handleChange}
                      disabled 
                      inputProps={{
                        name: "AdminID",
                      }}
                    >                        
                      <option value={admins?.ID} key={admins?.ID}>
                        {admins?.Admin_firstname} {admins?.Admin_lastname}
                      </option> 
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined">
                        <p>ระบุวันที่ (Time Stamp)</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={public_relations.Pr_time}
                                onChange={(newValue) => {
                                  setPublicRelations({
                                    ...public_relations,
                                    Pr_time: newValue,
                                    });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Button
                    component={RouterLink} to="/banner_list" variant="contained" color="inherit"
                        >รายการแบนเนอร์ทั้งหมด
                    </Button>
                    <Button style={{ float: "right" }}
                        onClick={submit}
                        variant="contained"
                        color="success"
                        >โพสต์ตอนนี้
                    </Button>
                </Grid>
            </Grid>
            </Paper>
        </Container>
      </div>
    );
}export default BannerCreate;