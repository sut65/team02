import React from "react";
import { SigninInterface } from "../../interfaces/ISignin";
//import { WriterInterface } from "../../interfaces/writer/IWriter";


const apiUrl = "http://localhost:9999";


async function Login(data: SigninInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/login/writer`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("wid", res.data.id);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetWriterByWID() {
  let wid = localStorage.getItem("wid");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/admin/${wid}`,
    requestOptions
  )
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

async function GetWriters() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/writers`, requestOptions)
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

async function GetPrefixs() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/prefixs`, requestOptions)
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

async function GetGenders() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/genders`, requestOptions)
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

async function GetAffiliations() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/affiliations`, requestOptions)
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

// async function CreateWriter(data: WriterInterface) {
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     };
  
//     let res = await fetch(`${apiUrl}/writers`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           return res.data;
//         } else {
//           return false;
//         }
//       });
  
//     return res;
//   }
  
//   async function UpdateWriter(data: WriterInterface) {
      
//     const requestOptions = {
//         method: "PATCH",
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     }
  
//     let res = await fetch(`${apiUrl}/writers`, requestOptions)
//         .then((response) => response.json())
//         .then((res) => {
//             if (res.data) {
//                 return res.data
//             } else {
//                 return false
//             }
//         })
//     return res
//   }
  
//   async function DeleteWriter(ID:number) {
//     const requestOptions = {
//         method: "DELETE",
//         headers:{
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//         }
//     };
    
//     let res = await fetch(`${apiUrl}/writers/${ID}`, requestOptions)
//     .then((response) => response.json())
//     .then((res) => {
//         if(res.data){
//             return res.data
//         } else{
//             return false
//         }
//     })
//     return res
//   }  

export {
  Login, 
  GetWriterByWID, 
  GetWriters, 
  GetPrefixs, 
  GetGenders,
  GetAffiliations,
  // CreateWriter,
  // UpdateWriter,
  // DeleteWriter
};