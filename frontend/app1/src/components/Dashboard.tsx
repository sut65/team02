import React, { useState, useEffect } from "react";

import { PublicRelationInterface } from "../interfaces/IPublicRelation";
import { GetPublicRelations } from "../services/HttpClientService";

function Dashboard() {
  const [ Banners, setBanners ] = useState<PublicRelationInterface[]>([]);

  const getBanners = async () => {
        let res = await GetPublicRelations();
        if (res) {
          setBanners(res);
      }
  };
  
  useEffect( ()=> {
    const getBanners= async()=>{
      const reqData = await fetch("http://localhost:3000/");
      const resData = await reqData.json();
      console.log(resData);
    }
    getBanners();
  },[])

  return(
    <React.Fragment>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          { Banners.map((banner, index)=>(
            <div className={ index===0? "carousel-item active" : "carousel-item" } key={ banner.ID}>
            <img src={ banner.Pr_cover } className="d-block w-100" alt='...' />
          </div>
          ))}
          
          </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
    </React.Fragment>

  )
}
export default Dashboard