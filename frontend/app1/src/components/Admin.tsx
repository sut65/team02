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
    GetAdmins();
  }, []);

  const getReceipts = async () => {
    let res = await GetAdmins();
    if (res) {
        setAdmins(res);
    } 
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "Admin ID", width: 30 },
    {
      field: "Admin_firstname",
      headerName: "FirstName",
      width: 150,
      valueFormatter: (params: { value: { Admin_firstname: any; }; }) => params.value.Admin_firstname,
    },
    {
      field: "Admin_lastname",
      headerName: "LastName",
      width: 150,
      valueFormatter: (params: { value: { Admin_lastname: any; }; }) => params.value.Admin_lastname,
    },
    {
      field: "Admin_email",
      headerName: "Email",
      width: 150,
      valueFormatter: (params: { value: { Admin_email: any; }; }) => params.value.Admin_email,
    },
    {
      field: "Admin_password",
      headerName: "Password",
      width: 150,
      valueFormatter: (params: { value: { Admin_password: any; }; }) => params.value.Admin_password,
    },
    {
      field: "Admin_tel",
      headerName: "Telephone Number",
      width: 150,
      valueFormatter: (params: { value: { Admin_tel: any; }; }) => params.value.Admin_tel,
    },
    {
      field: "Admin_salary",
      headerName: "Salary",
      width: 150,
      valueFormatter: (params: { value: { Admin_salary: any; }; }) => params.value.Admin_salary,
    },
    {
      field: "Admin_birthday",
      headerName: "Birthday",
      width: 300,
      valueFormatter: (params: { value: { Admin_birthday: any; }; }) => params.value.Admin_birthday,
    },
    {
        field: "Admin_date_register",
        headerName: "Register Date",
        width: 300,
        valueFormatter: (params: { value: { Admin_date_register: any; }; }) => params.value.Admin_date_register,
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
            >List of Admins
            </Typography>
            <Container maxWidth="xl">
              <div style={{ height: 600, width: "100%", marginTop: "10px" }}>
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