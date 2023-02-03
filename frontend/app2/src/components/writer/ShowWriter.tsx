import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { WriterInterface } from "../../interfaces/writer/IWriter";
import { GetWriters } from "../../services/writer/WriterService";
import moment from "moment";

function Writers() {
  const [Writers, setWriters] = useState<WriterInterface[]>([]);

  useEffect(() => {
    getWriters();
  }, []);

  const getWriters = async () => {
    let res = await GetWriters();
    if (res) {
      setWriters(res);
    } 
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 50 },
    {
        field: "Prefix",
        headerName: "คำนำหน้า",
        width: 150,
        valueFormatter: (params) => params.value.Prefix,
    },
    {
        field: "Name",
        headerName: "ชื่อ-นามสกุล",
        width: 150,
        valueFormatter: (params) => params.value.Name,
    },
    {
      field: "Gender",
      headerName: "เพศ",
      width: 100,
      valueFormatter: (params) => params.value.Gender,
    },
    { field: "Writer_birthday", 
      headerName: "วันเกิด", 
      width: 150 ,
      renderCell:(params) => moment(params.row.Writer_birthday).format('YYYY-MM-DD'),
    },
    {
      field: "Affiliation",
      headerName: "สังกัด",
      width: 150,
      valueFormatter: (params) => params.value.Affiliation,
    },
    {
      field: "Pseudonym",
      headerName: "นามปากกา",
      width: 130,
      valueFormatter: (params) => params.value.Pseudonym,
    },

    
  ];

  return (
    <div>
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
             Writer Information
            </Typography>
          </Box>
          {/* <Box>
            <Button
              component={RouterLink}
              to="/members/create"
              variant="contained"
              color="primary"
            >
              Create Member
            </Button>
          </Box> */}
        </Box>
        <div style={{ height: 600, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={Writers}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}

export default Writers;