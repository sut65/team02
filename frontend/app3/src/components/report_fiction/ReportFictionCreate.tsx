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
import { CssBaseline } from "@mui/material";

import { FictionInterface } from "../../interfaces/fiction/IFiction";
import { ProblemFictionInterface } from "../../interfaces/report_fiction/IProblemFiction";
import { ReaderInterface } from "../../interfaces/IReader";
import { ReportFictionInterface } from "../../interfaces/report_fiction/IReportFiction";

import { GetReaderByRID } from "../../services/HttpClientService";

function ReportFictionCreate() {
    let { id } = useParams();
    const [fiction, setFiction] = useState<FictionInterface>({});
    const [problems, setProblems] = useState<ProblemFictionInterface[]>([]);
    const [readers, setReaders] = useState<ReaderInterface>();
    const [report, setReport] = useState<ReportFictionInterface>({});

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = React.useState("");

    // ===================================================================================//

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof report;
        const { value } = event.target;
        setReport({ ...report, [id]: value });
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
        const name = event.target.name as keyof typeof report;
        setReport({
        ...report,
        [name]: event.target.value,
        });
    };

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
        ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // ===================================================================================//

    const apiUrl = "http://localhost:9999";

    async function GetFictionByID() {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
        };
    
        let res = await fetch(`${apiUrl}/fiction/`+id, requestOptions)
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
    
    async function GetProblemFiction() {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/problem_fictions`, requestOptions)
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

    const getFiction = async () => {
        let res = await GetFictionByID();
        if (res) {
        setFiction(res);
        }
    };

    const getProblemFictions = async () => {
        let res = await GetProblemFiction();
        if (res) {
        setProblems(res);
        }
    };

    const getReader = async () => {
        let res = await GetReaderByRID();
        report.ReaderID = res.ID;
        if (res) {
        setReaders(res);
        }
    };

    useEffect(() => {
        getFiction();
        getProblemFictions();
        getReader();
    }, []);

    // ===================================================================================//

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
        FictionID:              fiction.ID,
        ProblemFictionID:       convertType(report.ProblemFictionID),
        ProblemFictionDetail:   report.ProblemFictionDetail?? "",
        ReaderID:               convertType(report.ReaderID),
        PhoneNumber:            report.PhoneNumber,
        };
        console.log(data)
        const apiUrl = "http://localhost:9999";

        const requestOptionsPost = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/report_fictions`, requestOptionsPost)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                setAlertMessage("บันทึกข้อมูลสำเร็จ");
                setSuccess(true);
                setTimeout(() => {
                window.location.href = "/report-fictions";
                }, 500);
            } else {
                setAlertMessage(res.error);
                setError(true);
            }
        });
    }

    // ===================================================================================//


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
                        {message}
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={error}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert onClose={handleClose} severity="error">
                        {message}
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
                                รายงานนิยาย
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />
                            <Grid container spacing={3} sx={{ padding: 2 }}>
                            <Grid item xs={12}>
                                        <FormControl fullWidth>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="FictionID"
                                            type="string"
                                            size="medium"
                                            value={fiction.Fiction_Name   || ""}
                                            label="นิยาย"
                                            disabled
                                        />
                                        </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">หัวข้อปัญหาของนิยาย</InputLabel>      
                                            <Select
                                            required
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="หัวข้อปัญหาของนิยาย"
                                            native
                                            value={report.ProblemFictionID + ""}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: "ProblemFictionID",
                                            }}                
                                            >
                                            <option aria-label="None" value=""></option>
                                            {problems.map((item: ProblemFictionInterface) => (
                                                <option value={item.ID} key={item.ID}>
                                                {item.ProblemFiction_Topic}
                                                </option>
                                            ))}
                                            </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        multiline
                                        rows={4}
                                        id="ProblemFictionDetail"
                                        type="string"
                                        size="medium"
                                        value={report.ProblemFictionDetail || ""}
                                        onChange={handleInputChange}
                                        label="รายละเอียด"
                                    />
                                    </FormControl>
                                </Grid>                                
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="ReaderID"
                                            variant="outlined"
                                            type="string"
                                            size="medium"  
                                            value={readers?.Nickname} key={readers?.ID}
                                            onChange={handleInputChange}
                                            label="ผู้รายงาน"
                                            disabled
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="PhoneNumber"
                                            type="string"
                                            size="medium"
                                            value={report.PhoneNumber}
                                            onChange={handleInputChange}
                                            label="เบอร์ติดต่อ"
                                        />
                                    </FormControl>
                                </Grid>            
                            <Grid item xs={12}>
                                <Button
                                    component={RouterLink}
                                    to="/fictions"
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

export default ReportFictionCreate;