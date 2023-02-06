import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { FictionInterface } from "../../interfaces/fiction/IFiction";
import { CssBaseline, IconButton } from "@mui/material";
import ReviewShowbyFiction from "../review/ReviewShowbyFiction";
import InfoIcon from '@mui/icons-material/Info';


function FictionInfoDetail() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [fiction, setFiction] = useState<FictionInterface>({});
  // const [genres, setGenres] = useState<GenderInterface[]>([]);
  // const [ratingFics, setRatingFics] = useState<RatingFictionInterface[]>([]);
  // const [writer, setwriter] = useState<WriterInterface[]>([]);
  

  // const [success, setSuccess] = useState(false);
  // const [error, setError] = useState(false);


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

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
  ) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const getFictionByID = async () => {
      let res = await GetFictionByID();
      if (res) {
      setFiction(res);
      }
  };
  // const getGenres = async () => {
  //     let res = await GetGenre();
  //     if (res) {
  //     setFictions(res);
  //     }
  // };

  // const getRatingFiction = async () => {
  //     let res = await GetRatingFiction();
  //     if (res) {
  //     setRatingFics(res);
  //     }
  // };

  // const getWriter = async () => {
  //     let res = await GetWriter();
  //     if (res) {
  //     setwriter(res);
  //     }
  // };

  useEffect(() => {
      getFictionByID();
      // getGenres();
      // getRatingFiction();
      // getWriter();
  }, []);
  console.log(fiction)

  return (
      <div>
          <React.Fragment>
              <CssBaseline />
              <Container maxWidth="sm" sx={{ p: 2 }}>
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
                                      <IconButton
                                        size="small"
                                        edge="start"
                                        color="inherit"
                                        aria-label="open drawer"
                                        sx={{ mr: 0.5 }}
                                        >
                                        <InfoIcon />
                                    </IconButton>
                              รายละเอียดนิยาย
                              </Typography>
                          </Box>
                      </Box>
                      <Divider />
                      <Grid container spacing={1} sx={{ padding: 1 }}>
                        <Grid item xs={12}>
                          <Box sx={{ paddingX: 2, paddingY: 1 }}>
                              <Typography
                              component="h2"
                              variant="h4"
                              // color="primary"
                              gutterBottom
                              >
                              {fiction.Fiction_Name}
                              </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ paddingX: 2, paddingY: 1 }}>
                              <Typography
                              gutterBottom
                              sx={{ fontSize: 15 }} 
                              component="div"
                              color="text.secondary"
                              >
                                โดย  
                              </Typography>
                              <Typography
                              // gutterBottom
                              sx={{ fontSize: 23 }} 
                              component="div"
                              
                              >
                                {fiction.Writer?.Pseudonym}
                              </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ paddingX: 2, paddingY: 1 }}>
                              <Typography
                              gutterBottom
                              sx={{ fontSize: 15 }} 
                              component="div"
                              color="text.secondary"
                              >
                              เรื่อย่อ :
                              </Typography>
                              <Typography
                              gutterBottom
                              sx={{ fontSize: 20 }} 
                              component="div"
                              // color="text.secondary"
                              >
                                {fiction.Fiction_Description}
                              </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ paddingX: 2, paddingY: 1 }}>
                              <Typography
                              gutterBottom
                              sx={{ fontSize: 17 }} 
                              component="div"
                              // color="text.secondary"
                              >
                              หมวดหมู่ : {fiction.Genre?.Genre_Name}
                              </Typography>
                              <Typography
                              gutterBottom
                              sx={{ fontSize: 17 }} 
                              component="div"
                              // color="text.secondary"
                              >
                              ระดับเนื้อหา : {fiction.RatingFiction?.RatingFiction_Name}
                              </Typography>
                          </Box>
                          <Divider />
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" sx={{ paddingX: 2, paddingY: 1 ,justifyContent: 'space-between'}} >
                            <Box >
                              <Button 
                                variant="outlined"
                                onClick={() =>
                                  navigate({ pathname: `/fiction/story/${fiction.ID}` })
                                }
                                >
                                  อ่านเนื้อเรื่องจ้า
                              </Button>
                            </Box>
                            <Box>
                              <Button 
                                variant="outlined" 
                                color="success" 
                                onClick={() =>
                                  navigate({ pathname: `/fiction/story/${fiction.ID}` })
                                }
                                >
                                  เพิ่มเข้าชั้น
                              </Button>
                            </Box>
                            <Box>
                              <Button 
                                variant="outlined" 
                                color="error"
                                onClick={() =>
                                  navigate({ pathname: `/report-fiction/create/${fiction.ID}` })
                                } 
                                >
                                  รายงานนิยาย
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                    </Grid>
                  </Paper>
              </Container>
              <ReviewShowbyFiction/>
          </React.Fragment>
      </div>
  );
}

export default FictionInfoDetail;