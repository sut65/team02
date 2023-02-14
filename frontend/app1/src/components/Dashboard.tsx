import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import { useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { PublicRelationInterface } from "../interfaces/IPublicRelation";
import { GetPublicRelations } from "../services/HttpClientService";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

function Dashboard() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [public_relations, setPublicRelations] = useState<PublicRelationInterface[]>([]);

  const apiUrl = "http://localhost:9999";
  
  const getPublicRelations = async () => {
    let res = await GetPublicRelations();
    if (res) {
      setPublicRelations(res);
    }
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
    ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

  useEffect(() => {
    getPublicRelations();
  }, []);

  return (
    // {public_relations.map((pr))}
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {public_relations.map((pr) => pr.Pr_topic)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {public_relations.map((pr) => pr.Pr_details)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}export default Dashboard;