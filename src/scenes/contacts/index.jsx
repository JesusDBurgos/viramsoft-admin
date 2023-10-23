import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";

const Contacts = () => {
  const [clientesData, setClientesData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    
    {
      field: "documento",
      headerName: "Documento",
      flex: 1,
      cellClassName: "name-column-cell",
    },
    {
      field: "nombre",
      headerName: "Nombre",
      headerAlign: "left",
      flex: 1,
      align: "left",
    },
    {
      field: "direccion",
      headerName: "Dirección",
      flex: 1,
    },
    {
      field: "telefono",
      headerName: "Teléfono",
      flex: 1,
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
    },
  ];

  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/costumer')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.clientes.map((cliente, index) => ({
          ...cliente,
          id: index, // Asignando un id temporal usando el índice del array
        }));
        setClientesData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box m="20px">
      <Header
        title="Clientes"
        subtitle="Interfaz dedicada a la gestión de clientes"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column-cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={clientesData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
