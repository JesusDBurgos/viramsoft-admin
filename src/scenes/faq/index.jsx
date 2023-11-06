import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Información de contacto" subtitle="Aquí puede contactar a los desarrolladores." />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Víctor Manuel Peraza Beltrán
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Info</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Jesus David Burgos Torres
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Info</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Raúl Eduardo Calderón Vasquez
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Info</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
