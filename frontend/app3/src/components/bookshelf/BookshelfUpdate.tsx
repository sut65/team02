import React, {useEffect, useState} from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Container, Snackbar, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { ReaderInterface } from "../../interfaces/IReader";
import { Bookshelf_NumberInterface } from "../../interfaces/bookshelf/IBookshelf_Number";
import { GetReaderByRID } from "../../services/HttpClientService";

const apiUrl = "http://localhost:9999";
function Bookshelf() {
    let { id } = useParams();
    const [reader, setReader] = React.useState<ReaderInterface>();
    const [bookshelf_number, setBookshelf_Number] = React.useState<Bookshelf_NumberInterface>({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    async function GetBookshelfNumByRID() {
      const requestOptions = {
          method: "GET",
          headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          },
      };
  
      let res = await fetch(`${apiUrl}/bookshelf_number/`+id, requestOptions)
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



    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof bookshelf_number;
      const { value } = event.target;
      setBookshelf_Number({ ...bookshelf_number, [id]: value });
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

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
    ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const getReader = async () => {
      let res = await GetReaderByRID();
      bookshelf_number.ReaderID = res.ID;
      if (res) {
      setReader(res);
      }
    };

    const getbookshelf = async () => {
      let res = await GetBookshelfNumByRID();
      bookshelf_number.ReaderID = res.ID;
      if (res) {
      setBookshelf_Number(res);
      }
    };

    useEffect(() => {
        getbookshelf();
        getReader();
    }, []);

    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
    };

    async function submit() {
      let data = {
        ID: bookshelf_number.ID,
        ReaderID: convertType(bookshelf_number.ReaderID),
        Bookshelf_Name : bookshelf_number.Bookshelf_Name,
      };
      console.log(data);
      
      const requestOptions = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch(`${apiUrl}/bookshelf_numbers`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.data) {
          setSuccess(true);
          setTimeout(() => {
              window.location.href = "/bookshelf_numbers";
          }, 500);
      } else {
          setError(true);
      }
      });
  }

    return (
    <div>
      <React.Fragment>
        <Container maxWidth="md">
        <Snackbar
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
                        open={error}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert onClose={handleClose} severity="error">
                        บันทึกไม่สำเร็จ!!
                        </Alert>
                    </Snackbar>
          <Paper> 
            <center>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    m: 6,
                    width: 1050,
                    height: 5,
                  },
                }}
              >
                  <TextField
                  fullWidth
                  required
                  id="Bookshelf_Name"
                  label="ชื่อชั้นหนังสือของคุณ"
                  type="string"
                  value={bookshelf_number.Bookshelf_Name || ""}
                  onChange={handleInputChange}
                  // InputProps={{
                  // readOnly: true,}}
                />
                <Grid item xs={2}>
                  <Button
                    // style={{ float: "right" }}
                    onClick={submit}
                    variant="contained"
                    color="primary"
                    >
                    บันทึก
                </Button>
                <Button
                style={{ float: "right" }}
                    component={RouterLink}
                    to="/bookshelf-table"
                    variant="contained"
                    color="inherit"
                    >
                    กลับ
                </Button>
          </Grid>
              </Box>
            </center>
          </Paper>
            </Container>

      </React.Fragment>
    </div>
    );
    
}

export default Bookshelf;