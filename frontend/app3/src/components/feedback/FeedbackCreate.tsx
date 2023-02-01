import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Container } from "@mui/system";
import { useParams } from 'react-router-dom';

import { ReaderInterface } from "../../interfaces/IReader";
import { Problem_systemInterface } from "../../interfaces/feedback/IProblem_system";
import { PriorityInterface } from "../../interfaces/feedback/IPriority";
import { FeedbackInterface } from "../../interfaces/feedback/IFeedback";

import { 
    GetReaderByRID,
    Feedbacks,
    GetFeedbacks,
    
} from "../../services/HttpClientService";

const apiUrl = "http://localhost:9999";

async function GetProblem_systems() {
    const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
    
      let res = await fetch(`${apiUrl}/problem_systems`, requestOptions)
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

async function GetPriorities() {
    const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
    
      let res = await fetch(`${apiUrl}/priorities`, requestOptions)
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

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });


function FeedbackCreate() {
    const [problem_systems, setProblem_systems] = useState<Problem_systemInterface[]>([]);
    const [priorities, setPriorities] = useState<PriorityInterface[]>([]);
    const [readers, setReaders] = useState<ReaderInterface>();
    const [feedbacks, setFeedbacks] = useState<FeedbackInterface[]>([]);

    
    let { id } = useParams();

    const getProblem_systems = async () => {
        let res = await GetProblem_systems();
        if (res) {
          setProblem_systems(res);
        }
    };

    const getPriorities = async () => {
        let res = await GetPriorities();
        if (res) {
          setPriorities(res);
        }
    };

    // const getReader = async () => {
    //     let res = await GetReaderByRID();
    //     feedbacks = res.ID;
    //     if (res) {
    //       setReaders(res);
    //     }
    //   };

    useEffect(() => {
        getProblem_systems();
        getPriorities();
        //getReader();
    }, []);

    const getFeedbacks = async () => {
      let res = await GetFeedbacks();
      if (res) {
      setFeedbacks(res);
      } 
    };

    const handleClick = () => {
      id = String(feedbacks.map((feedback:FeedbackInterface, ID) => (ID)))
    }

    return (
    <div>
        <Container maxWidth="md">
          <Paper> 
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 720,
                  height: 720,
                },
              }}
            >
              {/* <Box
                sx={{
                  width: 120,
                  height: 120,
                  backgroundColor: 'primary.dark',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.8, 0.8, 0.8],
                  },
                }}
              /> */}
              <Typography
                component="h2"
                variant="h6"
                //color="primary"
                gutterBottom
              >
                รายงานปัญหานักอ่าน
              </Typography>
            </Box>


          </Paper> 
        </Container>

    </div>
    );
}
export default FeedbackCreate;
