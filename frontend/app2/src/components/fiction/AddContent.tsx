import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



import { WriterInterface } from "../../interfaces/writer/IWriter";
import { GenderInterface } from "../../interfaces/writer/IGender";
import { RatingFictionInterface } from "../../interfaces/fiction/IRatingFiction";
import { FictionInterface } from "../../interfaces/fiction/IFiction";
import { GetFictions, GetGenres, GetRatingSystems } from "../../services/fiction/HttpClientService";

// import {
//     GetWriterByWID,
//     GetFictions,
//     Fictions,
//     GetGenres,
//     GetRatingSystems,
// } from "../../services/HttpClientService";

const apiUrl = "http://localhost:9999";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
)   {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddContent(){
    const [genres, setGenres] = useState<GenderInterface[]>([]);
    const [rating_systems, setRating_systems] = useState<RatingFictionInterface[]>([]);
    const [writers, setWriters] = useState<WriterInterface>();
    const [fictions, setFictions] = useState<FictionInterface>({});

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [alignment, setAlignment] = React.useState('left');
    const [formats, setFormats] = React.useState(() => ['italic']);

    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        '& .MuiToggleButtonGroup-grouped': {
          margin: theme.spacing(0.5),
          border: 0,
          '&.Mui-disabled': {
            border: 0,
          },
          '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
          },
          '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
          },
        },
      }));

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof AddContent;
        const { value } = event.target;
        setFictions({ ...fictions, [id]: value });
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
        const name = event.target.name as keyof typeof fictions;
        setFictions({
          ...fictions,
          [name]: event.target.value,
        });
    };

    const handleFormat = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: string[],
      ) => {
        setFormats(newFormats);
      };
    
      const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
      ) => {
        setAlignment(newAlignment);
      };
    
    const getGenres = async () => {
        let res = await GetGenres();
        if (res) {
          setGenres(res);
        }
    };
    
    const getRatingSystems = async () => {
        let res = await GetRatingSystems();
        if (res) {
          setRating_systems(res);
        }
    };
    
    // const GetWriters = async () => {
    //     let res = await GetWriterByWID();
    //     fictions.WriterByWID = res.ID;
    //     if (res) {
    //       setWriters(res);
    //     }
    // };

    let { id } = useParams();

    useEffect(() => {
        getFictions();
    }, []);

    const getFictions = async () => {
        let res = await GetFictions();
        if (res) {
        setFictions(res);
        } 
    };
    // const handleClick = () => {
    //     id = String(fictions.map((fiction:FictionInterface ,ID) => (ID)))
    // }
    return (
        <div>
            <Container maxWidth="md">
            <Paper> 
            <Box
                sx={{
                    display: 'flex',
                    paddingX: 2, paddingY: 1
                }}
                >
                <Typography
                    component="h1"
                    variant="h6"
                    gutterBottom
                >
                    เพิ่มเนื้อหานิยาย
                </Typography>
            </Box>
            <Paper
                elevation={0}
                sx={{
                display: 'flex',
                border: (theme) => `1px solid ${theme.palette.divider}`,
                flexWrap: 'wrap',
                }}
            > 
                <StyledToggleButtonGroup
                    size="small"
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
            >
                    <ToggleButton value="left" aria-label="left aligned">
                        <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                        <FormatAlignCenterIcon />
                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">
                        <FormatAlignRightIcon />
                    </ToggleButton>
                    <ToggleButton value="justify" aria-label="justified" disabled>
                        <FormatAlignJustifyIcon />
                    </ToggleButton>
            </StyledToggleButtonGroup>
            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
            <StyledToggleButtonGroup
                size="small"
                value={formats}
                onChange={handleFormat}
                aria-label="text formatting"
            >
                <ToggleButton value="bold" aria-label="bold">
                    <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton value="italic" aria-label="italic">
                    <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton value="underlined" aria-label="underlined">
                    <FormatUnderlinedIcon />
                </ToggleButton>
                <ToggleButton value="color" aria-label="color" disabled>
                    <FormatColorFillIcon />
                    <ArrowDropDownIcon />
                </ToggleButton>
            </StyledToggleButtonGroup>
            </Paper>
            <TextField  sx={{
                    display: 'flex',
                    paddingX: 2, paddingY: 1
                }} 
                id="filled-multiline-static"
                multiline
                rows={100000}
                variant="standard"
            >
                <StyledToggleButtonGroup
                size="small"
                value={formats}
                onChange={handleFormat}
                aria-label="text formatting"
            >
                <ToggleButton value="bold" aria-label="bold">
                    <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton value="italic" aria-label="italic">
                    <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton value="underlined" aria-label="underlined">
                    <FormatUnderlinedIcon />
                </ToggleButton>
                <ToggleButton value="color" aria-label="color" disabled>
                    <FormatColorFillIcon />
                    <ArrowDropDownIcon />
                </ToggleButton>
            </StyledToggleButtonGroup>
            </TextField>
            
                
            
            

                
                
                
    
            </Paper> 
            </Container>
        </div>
        );

    
        


}export default AddContent