import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Divider, FormControl, Grid, TextField, Typography } from '@mui/material';
import { Container } from "@mui/system";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import { Link as RouterLink } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Snackbar from "@mui/material/Snackbar";

import { ReaderInterface } from "../../interfaces/IReader";
import { ProblemSystemInterface } from "../../interfaces/feedback/IProblemSystem"; 
import { PriorityInterface } from "../../interfaces/feedback/IPriority";
import { FeedbackInterface } from "../../interfaces/feedback/IFeedback";
import { Feedbacks, GetFeedbacks, GetPriorities, GetProblem_systems, GetReaderByRID } from "../../services/HttpClientService";


//const apiUrl = "http://localhost:9999";

function FeedbackCreate() {
    const [problem_systems, setProblem_systems] = useState<ProblemSystemInterface[]>([]);
    const [priorities, setPriorities] = useState<PriorityInterface[]>([]);
    const [readers, setReaders] = useState<ReaderInterface>();
    const [feedbacks, setFeedbacks] = useState<FeedbackInterface>({});
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    

    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof FeedbackCreate;
      const { value } = event.target;
      setFeedbacks({ ...feedbacks, [id]: value });
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
    const name = event.target.name as keyof typeof feedbacks;
      setFeedbacks({
      ...feedbacks,
      [name]: event.target.value,
      });
    };

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
    ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const getProblem_systems = async () => {
      let res = await GetProblem_systems();
      if (res) {
        setProblem_systems(res);
      }
    };

    const getPriorities = async () => {
        let res = await GetPriorities();
        if (res) {
          setPriorities(res);
        }
    };

    const getReader = async () => {
      let res = await GetReaderByRID();
      feedbacks.ReaderID = res.ID;
      if (res) {
      setReaders(res);
      }
    };

    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
    };

    useEffect(() => {
        getProblem_systems();
        getPriorities();
        getReader();
    }, []);

    async function submit() {
      let data = {
        ReaderID: convertType(feedbacks.ReaderID),
        Telephone_Number: feedbacks.Telephone_Number?? "",
        ProblemSystemID: convertType(feedbacks.ProblemSystemID),
        PriorityID: convertType(feedbacks.PriorityID),
        FeedbackDetail: feedbacks.FeedbackDetail?? "",
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

      fetch(`${apiUrl}/feedbacks`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.data) {
            console.log("บันทึกได้")
            setSuccess(true);
            //getReader()
            setErrorMessage("")
            setTimeout(() => {
              window.location.href = "/feedbacks";
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
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth= "md" sx={{p: 2}}>
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
                  รายงานปัญหาที่พบ
              </Typography>
            </Box>
            <Divider />
            <Grid container spacing={3} sx={{ padding: 2 }}>
              <Grid item xs={16}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Reader"
                    variant="outlined"
                    type="string"
                    size="medium"  
                    value={readers?.Email} key={readers?.ID}
                    onChange={handleInputChange}
                    label="อีเมลล์"
                    disabled
                  />
                </FormControl>
              </Grid>
              <Grid item xs={16}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Telephone_Number"
                    type="string"
                    size="medium"
                    autoFocus
                    value={feedbacks.Telephone_Number || ""}
                    onChange={handleInputChange}
                    label="เบอร์โทรศัพท์"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={16}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">หัวข้อปัญหาที่พบ</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="หัวข้อปัญหาที่พบ"     
                    native          
                    value={feedbacks.ProblemSystemID + ""}
                    onChange={handleChange}
                    inputProps={{
                    name: "ProblemSystemID",
                    }}
                    
                  >
                    <option aria-label="None" value=""></option>
                    {problem_systems.map((item: ProblemSystemInterface) => (
                        <option value={item.ID} key={item.ID}>
                        {item.Problem_Topic}
                        </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">เลือกระดับความรีบจ้า</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="หัวข้อปัญหาที่พบ *"     
                    native          
                    value={feedbacks.PriorityID + ""}
                    onChange={handleChange}
                    inputProps={{
                    name: "PriorityID",
                    }}
                  >
                    <option aria-label="None" value=""></option>
                    {priorities.map((item: PriorityInterface) => (
                        <option value={item.ID} key={item.ID}>
                        {item.Priority_Level}
                        </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={16}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    rows={4}
                    id="FeedbackDetail"
                    type="string"
                    size="medium"
                    autoFocus
                    value={feedbacks.FeedbackDetail || ""}
                    onChange={handleInputChange}
                    label="รายละเอียด"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  component={RouterLink}
                  to="/feedbacks"
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
export default FeedbackCreate;
