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
  const [clientesData, setClientesData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openEditForm, setOpenEditForm] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
const [editedClient, setEditedClient] = useState(null);
const [addClient, setAddClient] = useState(null);

const handleOpenEditForm = (client) => {
  setEditedClient(client);
  setOpenEditForm(true);
};

const handleOpenAddForm = (client) => {
  setAddClient(client);
  setOpenAddForm(true);
};

const handleCloseEditForm = () => {
  setEditedClient(null);
  setOpenEditForm(false);
};
const handleCloseAddForm = () => {
  setAddClient(null);
  setOpenAddForm(false);
};

const EditarClienteDialog = () => {
  return (
    <Dialog open={openEditForm} onClose={handleCloseEditForm}>
      <DialogTitle style={{ background: '#141B2D' }} sx={{ color: '#FFFFFF' }}>Editar cliente</DialogTitle>
      <DialogContent style={{ background: '#141B2D', padding: 10 }}>
        <Box>
          
        </Box>
        {editedClient && (
          <form>
            <TextField
              label="Nombre"
              value={editedClient.nombre}
              sx={{ '& .MuiInputBase-input': { color: '#FFFFFF' } }}
              style={{ borderColor: '#FFFFFF', padding: 5,}}
              // Otros props como onChange, fullWidth, etc.
            />
            <TextField
              label="Dirrección"
              value={editedClient.direccion}
              sx={{ '& .MuiInputBase-input': { color: '#FFFFFF' } }}
              style={{ borderColor: '#FFFFFF', padding: 5}}
              // Otros props como onChange, fullWidth, etc.
            />
            <TextField
              label="Teléfono"
              value={editedClient.telefono}
              sx={{ '& .MuiInputBase-input': { color: '#FFFFFF' } }}
              style={{ borderColor: '#FFFFFF', padding: 5}}
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

const AddClienteDialog = () => {
  return (
    <Dialog open={openAddForm} onClose={handleCloseAddForm}>
      <DialogTitle style={{ background: '#141B2D' }} sx={{ color: '#FFFFFF' }}>Agregar cliente</DialogTitle>
      <DialogContent style={{ background: '#141B2D', padding: 10 }}>
      <Box>
          
          </Box>
          {addClient && (
            <form>
              <TextField
                label="Documento"
                sx={{ '& .MuiInputBase-input': { color: '#FFFFFF' } }}
                style={{ borderColor: '#FFFFFF', padding: 5,}}
                // Otros props como onChange, fullWidth, etc.
              />
              <TextField
                label="Nombre"
                sx={{ '& .MuiInputBase-input': { color: '#FFFFFF' } }}
                style={{ borderColor: '#FFFFFF', padding: 5,}}
                // Otros props como onChange, fullWidth, etc.
              />
              <TextField
                label="Dirrección"
                sx={{ '& .MuiInputBase-input': { color: '#FFFFFF' } }}
                style={{ borderColor: '#FFFFFF', padding: 5}}
                // Otros props como onChange, fullWidth, etc.
              />
              <TextField
                label="Teléfono"
                sx={{ '& .MuiInputBase-input': { color: '#FFFFFF' } }}
                style={{ borderColor: '#FFFFFF', padding: 5,}}
                // Otros props como onChange, fullWidth, etc.
              />
              {/* Otros campos de texto */}
            </form>
          )}
      </DialogContent>
      <DialogActions style={{ background: '#141B2D' }}>
        <Button onClick={handleCloseAddForm} color="inherit">
          Cerrar
        </Button>
        <Button /*onClick={handleCloseForm}*/ color="inherit">
          Guardar cliente
        </Button>
        {/* Botón para guardar los cambios */}
      </DialogActions>
    </Dialog>
  );
};

const handleRefresh = () => {
  fetch('https://viramsoftapi.onrender.com/costumer')
    .then(response => response.json())
    .then(data => {
      const formattedData = data.clientes.map((cliente, index) => ({
        ...cliente,
        id: index,
      }));
      setClientesData(formattedData);
    })
    .catch(error => console.error('Error fetching data:', error));
};

  const columns = [
    
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
    {
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton color="inherit" onClick={() => handleOpenEditForm(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => handleOpenAddForm(params.row)}>
            <AddIcon />
          </IconButton>
        </div>
      ),
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
          rows={clientesData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <EditarClienteDialog />
      <AddClienteDialog/>
    </Box>
    
  );
};

export default Products;
