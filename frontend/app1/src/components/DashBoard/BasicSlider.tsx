import React, { useState, useEffect } from "react";
import './Slider.css'
import BtnSlider from "./BtnSlider";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import { PublicRelationInterface } from "../../interfaces/IPublicRelation";
import { GetPublicRelations } from "../../services/HttpClientService";

function BasicSlider() {
    const [public_relations, setPublicRelations] = useState<PublicRelationInterface[]>([]);
    const [slideIndex, setSlideIndex] = useState(1);

    const nextSlide = () => {
        if (slideIndex != public_relations.length) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === public_relations.length) {
            setSlideIndex(1)
        }
    }
    const prevSlide = () => {
        if (slideIndex != 1) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1) {
            setSlideIndex(public_relations.length)
        }
    }

    const moveDot = (index: React.SetStateAction<number>) => {
        setSlideIndex(index)
    }

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

    return(
        <div className="container-slider">
            {public_relations.map((data, index) => {
                return(
                    <div key={data.ID} 
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <h1>{data.Pr_topic}</h1>
                        <p>{data.Pr_details}</p>
                        <img src={`${data.Pr_cover}`}/>
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"}/>
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: public_relations.length}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
}
export default BasicSlider;