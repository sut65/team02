import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { CssBaseline, IconButton} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';import Snackbar from "@mui/material/Snackbar";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Divider, FormControl, Grid, TextField, Typography } from '@mui/material';
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { WriterInterface } from "../../interfaces/writer/IWriter";
import { GenreInterface } from "../../interfaces/fiction/IGenre"; 
import { RatingFictionInterface } from "../../interfaces/fiction/IRatingFiction";
import { FictionInterface } from "../../interfaces/fiction/IFiction";
import { GetGenres, GetRatingFictions, GetWriterByWID } from "../../services/fiction/HttpClientService";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';



function FictionCreate(){
    const [genres, setGenres] = useState<GenreInterface[]>([]);
    const [rating_fictions, setRating_fictions] = useState<RatingFictionInterface[]>([]);
    const [writers, setWriters] = useState<WriterInterface>({});
    const [fictions, setFictions] = useState<FictionInterface>({});
    const [fiction_date, setfiction_date] = React.useState<Dayjs | null>(dayjs());


    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof FictionCreate;
        const { value } = event.target;
        setFictions({ ...fictions, [id]: value });
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
        const name = event.target.name as keyof typeof fictions;
        setFictions({
          ...fictions,
          [name]: event.target.value,
        });
    };

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
    )   {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    
    const getGenres = async () => {
        let res = await GetGenres();
        if (res) {
          setGenres(res);
        }
    };
    
    const getRatingFicitons = async () => {
        let res = await GetRatingFictions();
        if (res) {
          setRating_fictions(res);
        }
    };

    const getWriter = async () => {
      let res = await GetWriterByWID();
      fictions.WriterID = res.ID;
      if (res) {
        setWriters(res);
      }
    };
    
    useEffect(() => {
      getGenres();
      getRatingFicitons();
      getWriter();
    }, []);

    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
    };


    async function submit() {
      let data ={
        Fiction_Name: fictions.Fiction_Name?? "",
        Fiction_Description: fictions.Fiction_Description?? "",
        GenreID: convertType(fictions.GenreID),
        RatingFictionID: convertType(fictions.RatingFictionID),
        WriterID: convertType(fictions.WriterID),
        Fiction_Date: fiction_date,
        Fiction_Story: fictions.Fiction_Story?? "",
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

      fetch(`${apiUrl}/fictions`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.data) {
            console.log("บันทึกได้")
            setSuccess(true);
            setErrorMessage("")
            setTimeout(() => {
              window.location.href = "/fictions";
          }, 1000);
          } else {
            console.log("บันทึกไม่ได้")
            setError(true);
            setErrorMessage(res.error)
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
              บันทึกนิยายสำเร็จ!!
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
                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 0.5 }}
                >
                    <DriveFileRenameOutlineRoundedIcon />
                </IconButton>
                  สร้างงานเขียน
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
                    id="Fiction_Name"
                    type="string"
                    size="medium"
                    autoFocus
                    value={ fictions.Fiction_Name || ""}
                    onChange={handleInputChange}
                    label="ชื่อเรื่อง"
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
                    id="Fiction_Description"
                    type="string"
                    size="medium"
                    autoFocus
                    value={ fictions.Fiction_Description|| ""}
                    onChange={handleInputChange}
                    label="คำโปรย"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">หมวดหมู่นิยาย</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="หมวดหมู่นิยาย"     
                    native          
                    value={fictions.GenreID + ""}
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
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">ระดับของเนื้อหา</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="ระดับของเนื้อหา"     
                    native          
                    value={fictions.RatingFictionID + ""}
                    onChange={handleChange}
                    inputProps={{
                    name: "RatingFictionID",
                    }}
                  >
                    <option aria-label="None" value=""></option>
                    {rating_fictions.map((item: RatingFictionInterface) => (
                        <option value={item.ID} key={item.ID}>
                        {item.RatingFiction_Name}
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
                    id="Pseudonym"
                    type="string"
                    size="medium"
                    value={writers.Pseudonym || ""}
                    onChange={handleInputChange}
                    label="นามปากกา"
                    disabled

                  >
                   
                </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="วันที่อัพเดต"
                      renderInput={(params) => <TextField {...params} />}
                      value={fiction_date}
                      onChange={(newValue) => {
                        setfiction_date(newValue);
                      }}
                      disabled
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Container>
        <Container maxWidth="md">
          <Paper>
            <Box sx={{
              display: 'flex',
              paddingX: 2, paddingY: 1
            }}
            >
            <Typography
              component="h1"
              variant="h6"
              gutterBottom
            >
              เพิ่มเนื้อหานิยาย
            </Typography>
            </Box>  
          </Paper>
          <Paper>
          <Box>
            <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    
                    id="Fiction_Story"
                    type="string"
                    size="medium"
                    autoFocus
                    value={ fictions.Fiction_Story|| ""}
                    onChange={handleInputChange}
                    //label="คำโปรย"
                  />
                </FormControl>
            </Grid>
          </Box>
          <Box  display="flex" sx= {{paddingX: 2, paddingY: 0.5}}>
            <Box sx={{ flexGrow: 1 , paddingX: 2, paddingY: 0.5}}>
            <Button
                    component={RouterLink}
                    to="/fiction-show"
                    variant="contained"
                    color="inherit"
                    >
                    กลับ
                    </Button>
            </Box>
            <Box sx={{ flexGrow: 1 , paddingX: 2, paddingY: 0.5}}>
            <Button
                      style={{ float: "right" }}
                      onClick={submit}
                      variant="contained"
                      color="primary"
                    >
                    บันทึก
                    </Button>
            </Box>
          </Box>  
          </Paper>

        </Container>
      </React.Fragment>

    </div>
    );
    
  }export default FictionCreate
//381