import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AdminInterface } from "../../interfaces/IAdmin";
import { GetAdmins } from "../../services/HttpClientService";
import Paper from "@mui/material/Paper/Paper";
import Box from "@mui/material/Box/Box";
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Stack from '@mui/material/Stack';
import PrintIcon from '@mui/icons-material/Print';

function AdminList() {
const handlePrint = () => {
    window.print()
}
  const [admins, setAdmins] = useState<AdminInterface[]>([]);

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    let res = await GetAdmins();
    if (res) {
        setAdmins(res);
    } 
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "รหัสประจำตัว", width: 100 },
    {
      field: "Admin_firstname",
      headerName: "ชื่อ",
      width: 150,
      valueFormatter: (params) => params.value.Admin_firstname,
    },
    {
      field: "Admin_lastname",
      headerName: "นามสกุล",
      width: 150,
      valueFormatter: (params) => params.value.Admin_lastname,
    },
    {
      field: "Gender",
      headerName: "เพศ",
      width: 120,
      valueFormatter: (params) => params.value.Gender,
    },
    {
      field: "Admin_email",
      headerName: "อีเมล",
      width: 200,
      valueFormatter: (params) => params.value.Admin_email,
    },
    {
      field: "Admin_tel",
      headerName: "หมายเลขโทรศัพท์",
      width: 150,
      valueFormatter: (params) => params.value.Admin_tel,
    },
    {
      field: "Role",
      headerName: "หน้าที่",
      width: 150,
      valueFormatter: (params) => params.value.Role,
    },
    {
      field: "Education",
      headerName: "ระดับการศึกษา",
      width: 150,
      valueFormatter: (params) => params.value.Education_degree,
    },
    {
      field: "Admin_date_register",
      headerName: "วันที่ลงทะเบียน",
      width: 280,
      valueFormatter: (params) => params.value.Admin_date_register,
    },
  ];

  return (
    <div>
      <Paper>
        <Box display="flexr" sx={{ marginTop: 2,}}><Box sx={{ paddingX: 1, paddingY: 1, }}>
            <Typography component="h2" variant="h3" align="center" color="secondary" gutterBottom>รายชื่อผู้ดูแลระบบ</Typography>
            <Stack direction="row" justifyContent="center" alignItems="right" spacing={1}>
              <Button variant="contained" color="success" startIcon={<DashboardIcon />} component={RouterLink} to="/"
              >DashBoard</Button>
              <Button variant="contained" color="error" endIcon={<PrintIcon />} onClick={handlePrint}
              >Print</Button>
            </Stack>
            <Container maxWidth="xl">
              <div style={{ height: '100vh', width: "100%", marginTop: "10px" }}>
                <DataGrid 
                  rows={admins} 
                  getRowId={(row) => row.ID} 
                  columns={columns} pageSize={30} rowsPerPageOptions={[9]}
                  checkboxSelection
                />
              </div>
            </Container>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}export default AdminList;