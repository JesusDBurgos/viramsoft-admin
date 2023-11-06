import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import useMediaQuery from "@mui/material/useMediaQuery";
import Alert from '@mui/material/Alert';
import { Formik } from "formik";
import * as yup from "yup";
import MenuItem from "@mui/material/MenuItem";



const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mensaje, setMensaje] = useState(null);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [addUser, setAddUser] = useState(null);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const handleOpenAddForm = (user) => {
    setAddUser(user);
    setOpenAddForm(true);
  };

  const handleCloseAddForm = () => {
    setAddUser(null);
    setOpenAddForm(false);
    setMensaje(null); 
  };

  const handleOpenEditForm = (user) => {
    setSelectedUser(user);
    setOpenEditForm(true);
    setMensaje(null);
  };

  const handleCloseEditForm = () => {
    setSelectedUser(null);
    setOpenEditForm(false);
  };

  const EditarUserDialog = () => {
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
          <Header title="Editar usuario" />

          <Formik
            initialValues={{
              nombre: selectedUser ? selectedUser.nombre : "",
              username: selectedUser ? selectedUser.username : "",
              rol: selectedUser ? selectedUser.rol : "",
            }}
            onSubmit={async (values) => {
              try {
                const response = await fetch(`https://viramsoftapi.onrender.com/edit_user/${selectedUser.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values),
                });

                if (response.ok) {
                  setMensaje('Usuario actualizado exitosamente.');
                } else {
                  setMensaje('Error al actualizar el usuario.');
                }
              } catch (error) {
                console.error('Error al enviar la solicitud:', error);
                setMensaje('Error al actualizar el usuario.');
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
                    label="Cantidad"
                    name="cantidad"
                    sx={{ gridColumn: "span 2", }}
                    value={formikProps.values.cantidad}
                    onChange={formikProps.handleChange}
                  />
                  <TextField
                    style={{ margin: 1, marginBottom: 25 }}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Valor de compra"
                    name="valorCompra"
                    sx={{ gridColumn: "span 4" }}
                    value={formikProps.values.valorCompra}
                    onChange={formikProps.handleChange}
                  />

                  <TextField
                    style={{ margin: 1, marginBottom: 25 }}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Valor de venta"
                    name="valorVenta"
                    sx={{ gridColumn: "span 4" }}
                    value={formikProps.values.valorVenta}
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
    fetch('https://viramsoftapi.onrender.com/user')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.users.map((user, index) => ({
          ...user,
          id: index,
        }));
        setUsersData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const columns = [

    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "rol",
      headerName: "Rol",
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
          </IconButton>
        </div>
      ),
    },
  ];


  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/user')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.users.map((user, index) => ({
          ...user,
          id: index, // Asignando un id temporal usando el índice del array
        }));
        setUsersData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const initialValues = {
    nombre: "",
    username: "",
    password: "",
    rol: "",
  };

  const checkoutSchema = yup.object().shape({
    nombre: yup.string().required("Requerido").max(20, "El nombre debe tener como máximo 20 caracteres"),
    username: yup.string().required("Requerido").max(20, "El username debe tener como máximo 20 caracteres"),
    password: yup.string().required("Requerido").min(8, "La contraseña debe tener como mínimo 8 caracteres"),
    rol: yup.string().required("Requerido"),
  });

  const OpenAddUserDialog = () => {
    const isNonMobile = useMediaQuery("(min-width:600px");
    const handleFormSubmit = async (values) => {
      try {
        const response = await fetch('https://viramsoftapi.onrender.com/user_register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        if (response.ok) {
          setMensaje('Usuario agregado exitosamente.');
        } else {
          setMensaje('Error al agregar el usuario.');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        setMensaje('Error al agregar el usuario.');
      }
    }
    return (

      <Dialog open={openAddForm} onClose={handleCloseAddForm}>
        {mensaje && (
            <Box mb="10px">
              <Alert severity={mensaje.includes('exitosamente') ? 'success' : 'error'}>
                {mensaje}
              </Alert>
            </Box>
          )}
        <Box m="20px">
          <Header title="Agregar usuario" />

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
                    label="Nombre"
                    onBlur={handledBlur}
                    onChange={handleChange}
                    value={values.nombre}
                    name="nombre"
                    error={!!touched.nombre && !!errors.nombre}
                    helperText={touched.nombre && errors.nombre}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Username"
                    onBlur={handledBlur}
                    onChange={handleChange}
                    value={values.username}
                    name="username"
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Password"
                    onBlur={handledBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Rol"
                    select
                    onBlur={handledBlur}
                    onChange={handleChange}
                    value={values.rol}
                    name="rol"
                    error={!!touched.rol && !!errors.rol}
                    helperText={touched.rol && errors.rol}
                    sx={{ gridColumn: "span 4" }}
                  >
                    <MenuItem value="Administrador">Administrador</MenuItem>
                    <MenuItem value="Vendedor">Vendedor</MenuItem>

                  </TextField>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button style={{ marginRight: 7 }} type="submit" color="secondary" variant="contained" onClick={handleCloseAddForm}>
                    Cerrar
                  </Button>
                  <Button type="submit" color="secondary" variant="contained">
                    Agregar usuario
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
        title="Usuarios"
        subtitle="Interfaz dedicada a la gestión de usuarios"
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
            style={{ marginRight: 7 }}
          >
            Refrescar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={handleOpenAddForm}
          >
            Agregar nuevo usuario
          </Button>
        </Box>

        <DataGrid
          rows={usersData}
          columns={columns}
        />
      </Box>
      <EditarUserDialog />
      <OpenAddUserDialog />
    </Box>

  );
};

export default Users;
