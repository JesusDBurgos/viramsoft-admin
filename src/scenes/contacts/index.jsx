import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const Contacts = () => {
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

  const handleCloseEditForm = () => {
    setEditedClient(null);
    setOpenEditForm(false);
  };

  const handleOpenAddForm = (client) => {
    setAddClient(client);
    setOpenAddForm(true);
  };

  const handleCloseAddForm = () => {
    setAddClient(null);
    setOpenAddForm(false);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
  };
  
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  
  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
  });

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
                style={{ borderColor: '#FFFFFF', padding: 5, }}
              // Otros props como onChange, fullWidth, etc.
              />
              <TextField
                label="Dirrección"
                value={editedClient.direccion}
                sx={{ '& .MuiInputBase-input': { color: '#FFFFFF' } }}
                style={{ borderColor: '#FFFFFF', padding: 5 }}
              // Otros props como onChange, fullWidth, etc.
              />
              <TextField
                label="Teléfono"
                value={editedClient.telefono}
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

  const OpenAddClienteDialog = () => {
    const isNonMobile = useMediaQuery("(min-width:600px");
  const handleFormSubmit = (values) => {
    console.log(values);
  };
    return (
      
      <Dialog open={openAddForm} onClose={handleCloseAddForm}>
        <DialogTitle style={{ background: '#141B2D' }} sx={{ color: '#FFFFFF' }}>Agregar cliente</DialogTitle>
        <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handledBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4,minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handledBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handledBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handledBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handledBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handledBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handledBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
      </Dialog>
    );
  };

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
    style={{ marginRight: '10px' }} // Añadido para separar los botones
  >
    Refrescar
  </Button>
  <Button
    variant="contained"
    color="primary"
    startIcon={<AddIcon />}
    onClick={handleOpenAddForm}
  >
    Agregar nuevo cliente
  </Button>
</Box>


        <DataGrid
          rows={clientesData}
          columns={columns}
        />
      </Box>
      <EditarClienteDialog />
      <OpenAddClienteDialog/>
    </Box>

  );
};

export default Contacts;
