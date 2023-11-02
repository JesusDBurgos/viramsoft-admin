import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

const Products = () => {
  const [productosData, setProductosData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openEditForm, setOpenEditForm] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  const handleOpenEditForm = (product) => {
    setEditedProduct(product);
    setOpenEditForm(true);
  };

  const handleCloseEditForm = () => {
    setEditedProduct(null);
    setOpenEditForm(false);
  };

  const EditarProductoDialog = () => {
    return (
      <Dialog open={openEditForm} onClose={handleCloseEditForm}>
        <DialogTitle style={{ background: '#141B2D' }} sx={{ color: '#FFFFFF' }}>Editar producto</DialogTitle>
        <DialogContent style={{ background: '#141B2D', padding: 10 }}>
          <Box>

          </Box>
          {editedProduct && (
            <form>
              <TextField
                label="Valor compra"
                value={editedProduct.valorCompra}
                sx={{ '& .MuiInputBase-input': { color: '#FFFFFF' } }}
                style={{ borderColor: '#FFFFFF', padding: 5, }}
              // Otros props como onChange, fullWidth, etc.
              />
              <TextField
                label="Valor venta"
                value={editedProduct.valorVenta}
                sx={{ '& .MuiInputBase-input': { color: '#FFFFFF' } }}
                style={{ borderColor: '#FFFFFF', padding: 5 }}
              // Otros props como onChange, fullWidth, etc.
              />
              <TextField
                label="Cantidad"
                value={editedProduct.cantidad}
                sx={{ '& .MuiInputBase-input': { color: '#FFFFFF' } }}
                style={{ borderColor: '#FFFFFF', padding: 5 }}
              // Otros props como onChange, fullWidth, etc.
              />
              {/* Otros campos de texto */}
            </form>
          )}
        </DialogContent>
        <DialogActions style={{ background: '#141B2D' }}>
          <Button onClick={handleCloseEditForm} color="inherit">
            Cerrar
          </Button>
          <Button /*onClick={handleCloseForm}*/ color="inherit">
            Guardar cambios
          </Button>
          {/* Botón para guardar los cambios */}
        </DialogActions>
      </Dialog>
    );
  };

  const handleRefresh = () => {
    fetch('https://viramsoftapi.onrender.com/product')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.productos.map((producto, index) => ({
          ...producto,
          id: index,
        }));
        setProductosData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const columns = [

    {
      field: "idProducto",
      headerName: "ID",
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
      field: "marca",
      headerName: "Marca",
      flex: 1,
    },
    {
      field: "categoria",
      headerName: "Categoría",
      flex: 1,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      flex: 1,
    },
    {
      field: "valorCompra",
      headerName: "Valor compra",
      flex: 1,
    },
    {
      field: "valorVenta",
      headerName: "Valor venta",
      flex: 1,
    },
    {
      field: "unidadMedida",
      headerName: "Unidad medida",
      flex: 1,
    },
    {
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton color="inherit" onClick={() => handleOpenEditForm(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="inherit">
            <AddIcon />
          </IconButton>
        </div>
      ),
    },
  ];


  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/product')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.productos.map((producto, index) => ({
          ...producto,
          id: index, // Asignando un id temporal usando el índice del array
        }));
        setProductosData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box m="20px">
      <Header
        title="Productos"
        subtitle="Interfaz dedicada a la gestión de productos"
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
        <Box display="flex" justifyContent="flex-end" marginBottom="10px">
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Refrescar
          </Button>
        </Box>

        <DataGrid
          rows={productosData}
          columns={columns}
        />
      </Box>
      <EditarProductoDialog />
    </Box>

  );
};

export default Products;
