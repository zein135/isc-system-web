import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import CertiCard from "../../components/cards/CertiCard";
import { getCertifications } from "../../services/certificationService";

const HomePage = () => {
  const [certifications, setCertifications] = useState([]);
  const [name, setName] = useState("Paul");
  const getCertis = async () => {
    const response = await getCertifications();
    setCertifications(response);
  };
  useEffect(() => {
    getCertis();
  }, []);

  
  // useEffect(que hace , dependencias );

  useEffect(() => {
    console.log("Hola sin parametros");
  });
  
  // que solo se llame la primera vez 
  useEffect(() => {
    console.log("Hola soy la primera vez");
  }, []);

  // detectar un estado 
  useEffect(() => {
    console.log("hola se modifico el certifications");
  }, [certifications]);

  return (
    <>
      <Grid container spacing={2}>
        {certifications &&
          certifications.map((certification, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CertiCard key={index} certification={certification} />
              </Grid>
            );
          })}
        <Button onClick={() => setName("JUan")}>ACA _____ </Button>
      </Grid>
    </>
  );
};

export default HomePage;
