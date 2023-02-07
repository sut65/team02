// import React from "react";
import { FeedbackInterface } from "../interfaces/feedback/IFeedback";
import { ProblemSystemInterface } from "../interfaces/feedback/IProblemSystem";
import { SigninInterface } from "../interfaces/ISignin";
// import { ReaderInterface } from "../interfaces/IReader";
// import { FictionInterface } from '../interfaces/IFiction';
// import { FeedbackInterface } from "../interfaces/feedback/IFeedback";
// import { CollectionInterface } from "../interfaces/collection/ICollection";

const apiUrl = "http://localhost:9999";


async function Login(data: SigninInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/login/reader`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("rid", res.data.id);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetReaderByRID() {
  let rid = localStorage.getItem("rid");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/reader/${rid}`,
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

async function GetReaders() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/readers`, requestOptions)
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

async function GetFictions() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/fictions`, requestOptions)
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

async function GetFeedbacks() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/feedbacks`, requestOptions)
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

async function Feedbacks(data: FeedbackInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/feedbacks`, requestOptions)
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

const ReviewDelete = async (ID: number) => {
  //console.log(ID)
  const requestOptions = {
      method: "DELETE",
      headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json", 
      },
  };
  let res = await fetch(`http://localhost:9999/reviews/`+ID, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if(res.data){
              return res.data
          } else{
              return false
          }
  })
  return res
};

const FeedbackDelete = async (ID: number) => {
  console.log(ID)
  const requestOptions = {
      method: "DELETE",
      headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json", 
      },
  };
  let res = await fetch(`http://localhost:9999/feedbacks/`+ID, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if(res.data){
              return res.data
          } else{
              return false
          }
  })
  return res
};



export {
  Login, GetReaderByRID, 
  GetReaders, 
  GetFictions,
  GetFeedbacks,
  GetProblem_systems,
  GetPriorities,
  Feedbacks,
  ReviewDelete,
  FeedbackDelete,
};