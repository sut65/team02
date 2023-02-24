import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import EditIcon from '@mui/icons-material/Edit';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Button, Container, IconButton, Paper,  Typography, } from '@mui/material';
import dayjs from "dayjs";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AdminInterface } from "../interfaces/IAdmin";
import { GetAdminByAID } from "../services/HttpClientService";

function Profile(){
    const navigate = useNavigate();
    const [admins, setAdmins] = useState<AdminInterface>({});

    const GetAdmins = async () => {
        let res = await GetAdminByAID();
        if (res) {
            setAdmins(res);
            }
    };

    useEffect(() => {
        GetAdmins();
    }, []);

    return (
        <div>
        <Container maxWidth="md">
            <Paper>
                <Box display="flex" sx={{marginTop: 1,}}><Box sx={{ paddingX: 1, paddingY: 1, }}>
                <Typography component="h2" variant="h4" align="center"  gutterBottom>
                        <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 0.5 }}
                        >
                        <AccountBoxIcon />
                    </IconButton>
                    โปรไฟล์ของคุณ
                    </Typography>
                </Box></Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>
                    <Grid item xs={12}>
                        <Typography variant="h3" align="center" color="error">{admins.Admin_firstname} {admins.Admin_lastname}</Typography>
                    </Grid>
                    <Box sx={{ paddingX: 2, paddingY: 1 }}>
                        <div>
                            <Typography variant="h5" >ชื่อ: {admins.Admin_firstname}</Typography>
                            <Typography variant="h5" >นามสกุล: {admins.Admin_lastname}</Typography>
                            <Typography variant="h5" >อีเมล: {admins.Admin_email}</Typography>
                            <Typography variant="h5" >เบอร์โทรศัพท์: {admins.Admin_tel}</Typography>
                            <Typography variant="h5" >เพศ: {admins.Gender?.Gender}</Typography>
                            <Typography variant="h5" >ระดับการศึกษา: {admins.Education?.Education_degree}</Typography>
                            <Typography variant="h5" >หน้าที่: {admins.Role?.Role}</Typography>
                            <Typography variant="h5" >วันที่ลงทะเบียน: {dayjs(admins.Admin_date_register).format('YYYY-MM-DD HH:mm:ss')}</Typography>
                        </div>
                    </Box>
                    <Grid item xs={12}>
                        <Button
                            startIcon={<DashboardIcon />}
                            variant="contained"
                            color="secondary"
                            component={RouterLink}
                            to="/"
                            sx={{mx:0.5}}
                            >แดชบอร์ด
                        </Button>
                            <Button
                            style={{ float: "right" }}
                            startIcon={<EditIcon />}
                            sx={{mx:0.5}}
                            onClick={() =>
                            navigate({ pathname: `/admin/update/${admins.ID}` })
                            }
                            color= "primary"
                            variant="contained"
                            >แก้ไขโปรไฟล์
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
        </div>
    );
}export default Profile;