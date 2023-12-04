import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Información de contacto" subtitle="Aquí puede contactar a los desarrolladores" />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Víctor Manuel Peraza Beltrán
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PhoneIcon /> <Typography>Teléfono: 3128876635</Typography>
          <br />
          <EmailIcon /> <Typography>Correo: perazavm04@gmail.com</Typography>
          <br />
          <LinkedInIcon /> <Typography>LinkedIn: www.linkedin.com/in/victor-peraza-18v25e</Typography>
          <br />
          <InstagramIcon /> <Typography>Instagram: @therealvicvel</Typography>
          <img
            alt="profile-user"
            width="100"
            height="100"
            src={`../../assets/vic.jpg`}
            style={{
              borderRadius: "50%",
              marginTop: 20,
            }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Jesus David Burgos Torres
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PhoneIcon /> <Typography>Teléfono: 3157017746</Typography>
          <br />
          <EmailIcon /> <Typography>Correo: jesusdburgost@gmail.com</Typography>
          <br />
          <LinkedInIcon /> <Typography>LinkedIn: https://www.linkedin.com/in/jesus-burgos/</Typography>
          <img
            alt="profile-user"
            width="100"
            height="100"
            src={`../../assets/jes.jpg`}
            style={{
              borderRadius: "50%",
              marginTop: 20,
            }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Raúl Eduardo Calderón Vasquez
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PhoneIcon /> <Typography>Teléfono: 3044730878</Typography>
          <br />
          <EmailIcon /> <Typography>Correo: recalderon30@misena.edu.co</Typography>
          <img
            alt="profile-user"
            width="100"
            height="100"
            src={`../../assets/edu.jpg`}
            style={{
              borderRadius: "50%",
              marginTop: 20,
            }}
          />
        </AccordionDetails>
      </Accordion>
      <br />
      <Header subtitle="Aquí puede contactar a la orientadora"/>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Magda Milena Garcia Gamboa
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PhoneIcon /> <Typography>Teléfono: 3003059416</Typography>
          <br />
          <EmailIcon /> <Typography>Correo: magmigarcia@misena.edu.co</Typography>
          
          <img
            alt="profile-user"
            width="100"
            height="100"
            src={`../../assets/mag.jpg`}
            style={{
              borderRadius: "50%",
              marginTop: 20,
            }}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
