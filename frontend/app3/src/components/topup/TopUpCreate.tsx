 import React, {useEffect, useState} from "react";
// import { Link } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import { Container } from "@mui/system";
// import { useParams } from 'react-router-dom';

// import { ReaderInterface } from "../../interfaces/IReader";
// import { PackageTopUpInterface } from "../../interfaces/topup/IPackage_Top_Up";
// import { PaymentTypeInterface } from "../../interfaces/topup/IPayment_Type";
// import { ReaderCoinInterface } from "../../interfaces/topup/IReader_Coin";

// import { 
//     GetReaderByRID,
//     Feedbacks,
    
// } from "../../services/HttpClientService";

// const apiUrl = "http://localhost:9999";

// async function GetProblem_systems() {
//     const requestOptions = {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       };
    
//       let res = await fetch(`${apiUrl}/problem_systems`, requestOptions)
//         .then((response) => response.json())
//         .then((res) => {
//           if (res.data) {
//             return res.data;
//           } else {
//             return false;
//           }
//         });
    
//       return res;
// }

// async function GetPriorities() {
//     const requestOptions = {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       };
    
//       let res = await fetch(`${apiUrl}/priorities`, requestOptions)
//         .then((response) => response.json())
//         .then((res) => {
//           if (res.data) {
//             return res.data;
//           } else {
//             return false;
//           }
//         });
    
//       return res;
// }


// function FeedbackCreate() {
//     const [problem_systems, setProblem_systems] = useState<Problem_systemInterface[]>([]);
//     const [priorities, setPriorities] = useState<PriorityInterface[]>([]);
//     const [readers, setReaders] = useState<ReaderInterface>();
//     const [feedback, setFeedback] = useState<FeedbackInterface>({});

    
//     let { id } = useParams();

//     const getProblem_systems = async () => {
//         let res = await GetProblem_systems();
//         if (res) {
//           setProblem_systems(res);
//         }
//     };

//     const getPriorities = async () => {
//         let res = await GetPriorities();
//         if (res) {
//           setPriorities(res);
//         }
//     };

//     // const getReader = async () => {
//     //     let res = await GetReaderByRID();
//     //     fee = res.ID;
//     //     if (res) {
//     //       setEmployees(res);
//     //     }
//     //   };

//     useEffect(() => {
//         getProblem_systems();
//         getPriorities();
//         //getReaders();
//     }, []);


//     // const handleClick = () => {
//     //     id = String(feedbacks.map((feedback:FeedbackInterface ,ID) => (ID)))
//     // }

//     return (
//     <div>
//         <Container maxWidth = "md">
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexWrap: 'wrap',
//                     '& > :not(style)': {
//                         m: 1,
//                         width: 128,
//                         height: 128,
//                     },
//                 }}
//             >

//             </Box>
//         </Container>
//     </div>
//     )
// }
// export default FeedbackCreate;
