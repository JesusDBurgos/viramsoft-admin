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
import Alert from '@mui/material/Alert';

const Contacts = () => {
  const [clientesData, setClientesData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openEditForm, setOpenEditForm] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [addClient, setAddClient] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const handleOpenEditForm = (client) => {
  setSelectedClient(client);
  setOpenEditForm(true);
  setMensaje(null); // Resetear mensaje
};



  const handleCloseEditForm = () => {
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
    documento: "",
    nombre: "",
    direccion: "",
    telefono: "",
  };

  const docRegExp = /^[0-9]{8,10}$/;
  const phoneRegExp = /^[0-9]{10}$/;

  const checkoutSchema = yup.object().shape({
    documento: yup
      .string()
      .matches(docRegExp, "Documento inválido")
      .required("Requerido"),
    nombre: yup.string().required("Requerido").max(20, "El nombre debe tener como máximo 20 caracteres"),
    direccion: yup.string().required("Requerido").max(50, "La dirección debe tener como máximo 50 caracteres"),
    telefono: yup
      .string()
      .matches(phoneRegExp, "Número de teléfono inválido")
      .required("Requerido"),
  });

  const EditarClienteDialog = () => {
    const isNonMobile = useMediaQuery("(min-width:600px");
    return (
      
      <Dialog open={openEditForm} onClose={handleCloseEditForm}>
        
        
        <DialogContent>
  {mensaje && (
    <Box mb="10px">
      <Alert severity={mensaje.includes('exitosamente') ? 'success' : 'error'}>
        {mensaje}
      </Alert>
    </Box>
  )}
</DialogContent>

        <Box m="20px">
          <Header title="Editar cliente" />

          <Formik
  initialValues={{
    telefono: selectedClient ? selectedClient.telefono : "",
    nombre: selectedClient ? selectedClient.nombre : "",
    direccion: selectedClient ? selectedClient.direccion : "",
  }}
  onSubmit={async (values) => {
    try {
      const response = await fetch(`https://viramsoftapi.onrender.com/edit_costumer/${selectedClient.documento}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setMensaje('Cliente actualizado exitosamente.');
      } else {
        setMensaje('Error al actualizar el cliente.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setMensaje('Error al actualizar el cliente.');
    }
  }}
>
              {(formikProps) => (
            <form onSubmit={formikProps.handleSubmit}>
              <Box
                gap="30px"
                gridTemplateColumns="repeat(4,minmax(0, 1fr))"
                sx={{ 
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  style={{ margin: 1, marginBottom: 25 }}
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Teléfono"
                  name="telefono"
                  sx={{ gridColumn: "span 2", }}
                  value={formikProps.values.telefono}
                  onChange={formikProps.handleChange}
                />
                <TextField
                  style={{ margin: 1, marginBottom: 25}}
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Nombre"
                  name="nombre"
                  sx={{ gridColumn: "span 4" }}
                  value={formikProps.values.nombre}
                  onChange={formikProps.handleChange}
                />

                <TextField
                  style={{ margin: 1, marginBottom: 25}}
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Dirección"
                  name="direccion"
                  sx={{ gridColumn: "span 4" }}
                  value={formikProps.values.direccion}
                  onChange={formikProps.handleChange}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  style={{ marginRight: 7 }}
                  type="submit"
                  color="secondary"
                  variant="contained"
                  onClick={handleCloseEditForm}
                >
                  Cerrar
                </Button>
                <Button color="secondary" variant="contained" type="submit">
                  Guardar
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
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
        <DialogTitle ></DialogTitle>
        <Box m="20px">
          <Header title="Agregar cliente" />

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
                    label="Documento"
                    onBlur={handledBlur}
                    onChange={handleChange}
                    value={values.documento}
                    name="documento"
                    error={!!touched.documento && !!errors.documento}
                    helperText={touched.documento && errors.documento}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Teléfono"
                    onBlur={handledBlur}
                    onChange={handleChange}
                    value={values.telefono}
                    name="telefono"
                    error={!!touched.telefono && !!errors.telefono}
                    helperText={touched.telefono && errors.telefono}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nombre"
                    onBlur={handledBlur}
                    onChange={handleChange}
                    value={values.nombre}
                    name="nombre"
                    error={!!touched.nombre && !!errors.nombre}
                    helperText={touched.nombre && errors.nombre}
                    sx={{ gridColumn: "span 4" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Dirección"
                    onBlur={handledBlur}
                    onChange={handleChange}
                    value={values.direccion}
                    name="direccion"
                    error={!!touched.direccion && !!errors.direccion}
                    helperText={touched.direccion && errors.direccion}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button style={{ marginRight: 7 }} type="submit" color="secondary" variant="contained" onClick={handleCloseAddForm}>
                    Cerrar
                  </Button>
                  <Button type="submit" color="secondary" variant="contained">
                    Agregar cliente
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
            color="secondary"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            style={{ marginRight: 7}} // Añadido para separar los botones
          >
            Refrescar
          </Button>
          <Button
            variant="contained"
            color="secondary"
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
      <OpenAddClienteDialog />
    </Box>

  );
};

export default Contacts;
