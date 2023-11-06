import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";

const Invoices = () => {
  const [pedidosData, setPedidosData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    
    
    {
      field: "idPedido",
      headerName: "ID",
      flex: 0.4,
    },
    {
      field: "observacion",
      headerName: "Observación",
      headerAlign: "left",
      flex: 1,
      align: "left",
    },
    {
      field: "nombre",
      headerName: "Cliente",
      flex: 1,
    },
    {
      field: "documentoCliente",
      headerName: "Documento",
      flex: 0.7,
      cellClassName: "name-column-cell",
    },
    {
      field: "direccion",
      headerName: "Dirección",
      flex: 1,
    },
    {
      field: "telefono",
      headerName: "Teléfono",
      flex: 0.7,
    },
    {
      field: "fechaPedido",
      headerName: "Fecha de pedido",
      flex: 0.8,
    },
    {
      field: "fechaEntrega",
      headerName: "Fecha de entrega",
      flex: 0.8,
    },
    {
      field: "valorTotal",
      headerName: "Valor total",
      flex: 0.8,
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 0.7,
    },
    
    
  ];

  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/order')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.pedidos.map((pedido, index) => ({
          ...pedido,
          id: index, // Asignando un id temporal usando el índice del array
        }));
        setPedidosData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box m="20px" mt="-40px">
      <Header
        title="Pedidos"
        subtitle="Interfaz dedicada a la gestión de pedidos"
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
          rows={pedidosData}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
