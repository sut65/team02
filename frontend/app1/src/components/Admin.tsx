import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AdminInterface } from "../interfaces/IAdmin";
import { GetAdmins } from "../services/HttpClientService";
import Paper from "@mui/material/Paper/Paper";
import Box from "@mui/material/Box/Box";

function Admins() {
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
      field: "GenderID",
      headerName: "เพศ",
      width: 80,
      valueFormatter: (params) => params.value.Gender,
    },
    {
      field: "Admin_email",
      headerName: "อีเมล",
      width: 150,
      valueFormatter: (params) => params.value.Admin_email,
    },
    {
      field: "Admin_tel",
      headerName: "หมายเลขโทรศัพท์",
      width: 150,
      valueFormatter: (params) => params.value.Admin_tel,
    },
    {
      field: "RoleID",
      headerName: "หน้าที่",
      width: 150,
      valueFormatter: (params) => params.value.Role,
    },
    {
      field: "EducationID",
      headerName: "ระดับการศึกษา",
      width: 150,
      valueFormatter: (params) => params.value.Education_degree,
    },
    {
      field: "Admin_salary",
      headerName: "เงินเดือน",
      width: 150,
      valueFormatter: (params) => params.value.Admin_salary,
    },
    {
      field: "Admin_birthday",
      headerName: "วันเกิด",
      width: 300,
      valueFormatter: (params) => params.value.Admin_birthday,
    },
    {
      field: "Admin_date_register",
      headerName: "วันที่ลงทะเบียน",
      width: 300,
      valueFormatter: (params) => params.value.Admin_date_register,
    },
    {
      field: "ExecutiveAdminID",
      headerName: "ผู้ดูแล",
      width: 300,
      valueFormatter: (params) => params.value.Executive_firstname,
    },
  ];

  return (
    <div>
      <Paper>
        <Box
          display="flexr"
          sx={{
            marginTop: 2,
          }}
        ><Box sx={{ paddingX: 1, paddingY: 1, }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >รายชื่อผู้ดูแลระบบ
            </Typography>
            <Container maxWidth="xl">
              <div style={{ height: 1000, width: "100%", marginTop: "10px" }}>
                <DataGrid
                  rows={admins}
                  getRowId={(row) => row.ID}
                  columns={columns}
                  pageSize={30}
                  rowsPerPageOptions={[9]}
              /></div>
            </Container>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}export default Admins;