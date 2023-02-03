import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FictionInterface } from '../../interfaces/fiction/IFiction';
import { GetFictionByFID } from '../../services/HttpClientService';

const  FictionInfoDetail= (props: { id: string}) => {
  // const [fictions, setFictions] = useState<FictionInterface[]>([]);

  // const [fictions, setFictions] = useState<FictionInterface[]>([]);
  // const { id } = useParams();

  // const getFictions = async () => {
  //   let res = await GetFictionByFID();
  //   // fictions.map = res.id;
  //   if (res) {
  //     setFictions(res);
  //   }
  // };

  // useEffect(() => {
  //   getFictions();
  // }, []);

  // const convertType = (data: string | number | undefined) => {
  //   let val = typeof data === "string" ? parseInt(data) : data;
  //   return val;
  // };

  const [fiction, setFiction] = useState<FictionInterface | null>(null);
  // const [fiction, setFiction] = useState<FictionInterface>();
  useEffect(() => {
    // ดึงข้อมูลจาก backend ด้วย id ที่ส่งมาจาก props
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/fiction/${(props.id)}`);
      // const response = await fetch(`http://localhost:8080/fiction/`);
      const data = await response.json();
      setFiction(data);
    };
    fetchData();
    //console.log(props.id);
  }, [(props.id)]);

  if (!fiction) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* แสดงข้อมูลของ fiction นี้ */}
      {/* <Typography>
        
        </Typography> */}
      {/* <Typography>{fiction.F_name}</Typography> */}
      {/* ... */}
      {fiction.Fiction_Name}
    </>
    
  );
};

export default FictionInfoDetail;