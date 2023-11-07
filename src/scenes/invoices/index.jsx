import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from "@mui/icons-material/Refresh";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const Invoices = () => {
  const [pedidosData, setPedidosData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mensajeEstado, setMensajeEstado] = useState(null);

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
    {
      field: "vendedor",
      headerName: "Vendedor",
      flex: 0.7,
    },
    {
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton color="inherit" onClick={() => handleEntregado(params)}>
            <CheckIcon />
          </IconButton>

          <IconButton color="inherit" onClick={() => handleCancelado(params)}>
            <CancelIcon />
          </IconButton>

        </div>
      ),
    },
  ];

  const handleRefresh = () => {
    setMensajeEstado(null);
    fetch("https://viramsoftapi.onrender.com/order")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.pedidos.map((pedido, index) => ({
          ...pedido,
          id: index,
        }));
        setPedidosData(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

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

  const handleEntregado = async (params) => {
    const idPedido = params.row.idPedido;
    try {
      const response = await fetch(`https://viramsoftapi.onrender.com/edit_product_state_delivered/${idPedido}`, {
        method: 'PUT',
      });
      if (response.ok) {
        console.log(`Pedido ${idPedido} marcado como entregado.`);
        setMensajeEstado(`Pedido ${idPedido} marcado como entregado.`);
      } else {
        throw new Error('No se pudo cambiar el estado del pedido a entregado');
      }
    } catch (error) {
      console.error(error);
      setMensajeEstado(`Error al cambiar el estado del pedido: ${error.message}`);
    }
  };
  


  const handleCancelado = async (params) => {
    const idPedido = params.row.idPedido;
    try {
      const response = await fetch(`https://viramsoftapi.onrender.com/edit_product_state_canceled/${idPedido}`, {
        method: 'PUT',
      });
      if (response.ok) {
        console.log(`Pedido ${idPedido} marcado como cancelado.`);
        setMensajeEstado(`Pedido ${idPedido} marcado como cancelado.`);
      } else {
        throw new Error('No se pudo cambiar el estado del pedido a cancelado');
      }
    } catch (error) {
      console.error(error);
      setMensajeEstado(`Error al cambiar el estado del pedido: ${error.message}`);
    }
  };
  



  return (
    <Box m="20px" mt="-40px">
      <Header
        title="Pedidos"
        subtitle="Interfaz dedicada a la gestión de pedidos"
      />
      {mensajeEstado && (
  <Box mb="10px">
    <Alert
      severity={
        mensajeEstado.includes("exitosamente") ? "success" : "error"
      }
    >
      {mensajeEstado}
    </Alert>
  </Box>
)}

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
        <Box display="flex" justifyContent="flex-end" marginBottom="10px">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            style={{ marginRight: 7 }} // Añadido para separar los botones
          >
            Refrescar
          </Button>
        </Box>
        <DataGrid
          rows={pedidosData}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
