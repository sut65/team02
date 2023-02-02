import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { WriterInterface } from "../../interfaces/writer/IWriter";
import { GenderInterface } from "../../interfaces/writer/IGender";
import { RatingFictionInterface } from "../../interfaces/fiction/IRatingFiction";
import { FictionInterface } from "../../interfaces/fiction/IFiction";

import {
    GetWriterByWID,
    GetFictions
} from "../../services/HttpClientService";

const apiUrl = "http://localhost:9999";

async function GetGenres() {
    const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
    
      let res = await fetch(`${apiUrl}/genres`, requestOptions)
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

async function GetRatingSystems() {
    const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
    
      let res = await fetch(`${apiUrl}/rating_systems`, requestOptions)
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

function FictionCreate(){
    const [genres, setGenres] = useState<GenderInterface[]>([]);
    const [fictions, setFictions] = useState<FictionInterface[]>([]);

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
    const handleClick = () => {
        id = String(fictions.map((fiction:FictionInterface ,ID) => (ID)))
    }
}export default FictionCreate