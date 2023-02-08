import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Container } from "@mui/system";
import { useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

import { ReaderInterface } from "../../interfaces/IReader";
import { Added_BookInterface } from "../../interfaces/bookshelf/IAdded_Book";
import { Bookshelf_NumberInterface } from "../../interfaces/bookshelf/IBookshelf_Number";
import { FictionInterface } from '../../interfaces/fiction/IFiction';
import { GetFictions } from '../../services/HttpClientService';

function Bookshelf() {
    let { id } = useParams();
    const [reader, setReader] = React.useState<ReaderInterface[]>([]);
    const [bookshelf_number, setBookshelf_Number] = React.useState<Bookshelf_NumberInterface>();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);


    return (
    <div>
        <Container maxWidth="md">
          <Paper> 
            <center>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    m: 10,
                    width: 1050,
                    height: 60,
                  },
                }}
              >
                <Typography
                  component="h2"
                  variant="h5"
                  //color="primary"
                  gutterBottom
                >
                  <TextField
                  fullWidth
                  required
                  id="Bookshelf_Name"
                  label="ชั้นหนังสือของคุณ"
                  type="string"
                  value={bookshelf_number?.Bookshelf_Name} key={bookshelf_number?.ID}
                  // onChange={handleInputChange}
                  InputProps={{
                  readOnly: true,}}
                />
                </Typography>
              </Box>
            </center>
          </Paper>
            </Container>


    </div>
    );
    
}

export default Bookshelf;