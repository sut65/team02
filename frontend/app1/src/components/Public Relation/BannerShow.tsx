import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { CssBaseline,} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import {    Button, Container,      
            Paper,  Typography, Slide,  
            Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';
import dayjs, { Dayjs } from "dayjs";

import { PublicRelationInterface } from "../../interfaces/IPublicRelation";
import { GetPublicRelations } from "../../services/HttpClientService";


function BannerShow() {
    const [public_relations, setPublicRelations] = useState<PublicRelationInterface[]>([]);

    const getPublicRelations = async () => {
        let res = await GetPublicRelations();
        if (res) {
          setPublicRelations(res);
      }
    };

    useEffect(() => {
        getPublicRelations();
    }, []);

    const Transition = React.forwardRef(function Transition(
      props: TransitionProps & {
        children: React.ReactElement<any, any>;
      },
      ref: React.Ref<unknown>,
    ) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Box display="flex">
                        <Box sx={{ flexGrow: 1, my:3}}>
                            <Typography component="h2" variant="h3" color="secondary" gutterBottom>
                                รายการแบนเนอร์ทั้งหมด
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                startIcon={<DashboardIcon />}
                                variant="contained"
                                color="secondary"
                                component={RouterLink}
                                to="/"
                                sx={{ p: 1, my:3, mx:0.5}}
                            >
                                แดชบอร์ด
                            </Button>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2, }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">ลำดับ</TableCell>
                                    <TableCell align="center">รูปหน้าปก</TableCell>
                                    <TableCell align="center">หัวข้อเรื่อง</TableCell>
                                    <TableCell align="center">รายละเอียด</TableCell>
                                    <TableCell align="center">นิยาย</TableCell>
                                    <TableCell align="center">จำกัดอายุ</TableCell>
                                    <TableCell align="center">นักเขียน</TableCell>
                                    <TableCell align="center">หมวดหมู่</TableCell>
                                    <TableCell align="center">ผู้รับผิดชอบ</TableCell>
                                    <TableCell align="center">ว/ด/ป</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                              {public_relations.map((row) => (
                                  <TableRow
                                        key={row.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell align="left">{row.ID}</TableCell>
                                        <TableCell align="left"><img src={`${row.Pr_cover}`} width="250" height="150"/></TableCell>
                                        <TableCell align="left">{row.Pr_topic}</TableCell>
                                        <TableCell align="left">{row.Pr_details}</TableCell>
                                        <TableCell align="left">{row.Fiction?.Fiction_Name}</TableCell>
                                        <TableCell align="left">{row.Fiction?.RatingFiction?.RatingFiction_Name}</TableCell>
                                        <TableCell align="left">{row.Fiction?.Writer?.Name}</TableCell>
                                        <TableCell align="left">{row.PR_category?.Category}</TableCell>
                                        <TableCell align="left">{row.Admin?.Admin_firstname + " " + row.Admin?.Admin_lastname}</TableCell>
                                        <TableCell align="left">{dayjs(row.Pr_time).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell align="center">
                                        </TableCell>
                                  </TableRow>
                              ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </React.Fragment>
    );
}
export default BannerShow;