import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect, React } from "react";
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
import useMediaQuery from "@mui/material/useMediaQuery";
import Alert from '@mui/material/Alert';
import { Formik, Field } from "formik";
import * as yup from "yup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import {
  FormControl,
  InputLabel,
  Card,
  CardMedia,
} from "@mui/material";



const Products = () => {
  const [productosData, setProductosData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mensaje, setMensaje] = useState(null);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [addProduct, setAddProduct] = useState(null);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  

  const handleOpenAddForm = (product) => {
    setAddProduct(product);
    setOpenAddForm(true);
  };

  const handleCloseAddForm = () => {
    setAddProduct(null);
    setOpenAddForm(false);
    setImagenSeleccionada(null);
    setMensaje(null);
  };

  const handleOpenEditForm = (product) => {
    setSelectedProduct(product);
    setOpenEditForm(true);
    setMensaje(null); // Resetear mensaje
  };

  const handleCloseEditForm = () => {
    setSelectedProduct(null);
    setOpenEditForm(false);
  };

  const EditarProductoDialog = () => {
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
          <Header title="Editar producto" />

          <Formik


            initialValues={{
              cantidad: selectedProduct ? selectedProduct.cantidad : "",
              valorCompra: selectedProduct ? selectedProduct.valorCompra : "",
              valorVenta: selectedProduct ? selectedProduct.valorVenta : "",
              imagen: selectedProduct && selectedProduct.imagenes ? (selectedProduct.imagenes.length > 0 ? selectedProduct.imagenes[0] : '') : '',
              imagenes: selectedProduct && selectedProduct.imagenes ? selectedProduct.imagenes : []
            }}
            validationSchema={checkoutSchema2}
            onSubmit={async (values) => {
              try {
                const response = await fetch(`https://viramsoftapi.onrender.com/edit_product/${selectedProduct.idProducto}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values),
                });

                if (response.ok) {
                  setMensaje('Producto actualizado exitosamente.');
                } else {
                  setMensaje('Error al actualizar el producto.');
                }
              } catch (error) {
                console.error('Error al enviar la solicitud:', error);
                setMensaje('Error al actualizar el producto.');
              }
            }}
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
                    onBlur={handledBlur}
                    error={!!touched.cantidad && !!errors.cantidad}
                    helperText={touched.cantidad && errors.cantidad}
                    sx={{ gridColumn: "span 2" }}
                    value={values.cantidad}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ margin: 1, marginBottom: 25 }}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Valor de compra"
                    name="valorCompra"
                    onBlur={handledBlur}
                    error={!!touched.valorCompra && !!errors.valorCompra}
                    helperText={touched.valorCompra && errors.valorCompra}
                    sx={{ gridColumn: "span 2" }}
                    value={values.valorCompra}
                    onChange={handleChange}
                  />

                  <TextField
                    style={{ margin: 1, marginBottom: 25 }}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Valor de venta"
                    name="valorVenta"
                    onBlur={handledBlur}
                    error={!!touched.valorVenta && !!errors.valorVenta}
                    helperText={touched.valorVenta && errors.valorVenta}
                    sx={{ gridColumn: "span 2" }}
                    value={values.valorVenta}
                    onChange={handleChange}
                  />

                  <Field name="imagen" type="hidden" />
                  <FormControl fullWidth variant="filled">
                    <Button
                      style={{ marginRight: 7 }}
                      color="secondary"
                      variant="contained"
                      component="label"
                    >
                      Subir imagen
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setImagenSeleccionada(file);
                          }
                        }}
                      />
                    </Button>

                    {imagenSeleccionada && (
                      <Card style={{ marginTop: "30px" }}>
                        <CardMedia
                          component="img"
                          alt="Imagen seleccionada"
                          style={{ maxWidth: '300px', maxHeight: '300px' }}
                          image={URL.createObjectURL(imagenSeleccionada)}
                        />
                      </Card>
                    )}

                    <Button
                      style={{ marginTop: '20px', marginBottom: '20px' }}
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        if (imagenSeleccionada) {
                          console.log('ID del producto:', selectedProduct.idProducto);
                          const formData = new FormData();
                          formData.append('imagen', imagenSeleccionada);

                          fetch(`https://viramsoftapi.onrender.com/cargar_imagen?producto_id=${selectedProduct.idProducto}`, {

                            method: 'POST',
                            body: formData,
                          })
                            .then(response => {
                              if (response.ok) {
                                console.log('Imagen cargada con éxito');
                                // Puedes realizar aquí las acciones adicionales después de cargar la imagen.
                              } else {
                                console.error('Error al cargar la imagen');
                                // Puedes manejar el error aquí.
                              }
                            })
                            .catch(error => {
                              console.error('Error al enviar la solicitud:', error);
                              // Puedes manejar el error de la solicitud aquí.
                            });
                        }
                      }}
                    >
                      Cargar Imagen
                    </Button>
                  </FormControl>
                  {values.imagenes && values.imagenes.length > 0 ? (
                    <img
                      src={`data:image/jpeg;base64,${values.imagenes[0]}`}
                      alt="Imagen del producto"
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                  ) : (
                    <div>No hay imagen disponible</div>
                  )}


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
    setImagenSeleccionada(null);
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

  const initialValues = {
    nombre: "",
    marca: "",
    categoria: "",
    cantidad: "",
    valorCompra: "",
    valorVenta: "",
    unidadMedida: "",
    imagen: "",
  };

  const cantRegExp = /^[0-9]{1,4}$/;
  const valCoRegExp = /^[0-9]{3,5}$/;
  const valVeRegExp = /^[0-9]{3,5}$/;

  const checkoutSchema = yup.object().shape({
    nombre: yup.string().required("Requerido").max(20, "El nombre debe tener como máximo 20 caracteres"),
    marca: yup.string().required("Requerido").max(20, "La marca debe tener como máximo 20 caracteres"),
    categoria: yup.string().required("Requerido"),
    cantidad: yup
      .string()
      .matches(cantRegExp, "Cantidad inválida")
      .required("Requerido"),
    valorCompra: yup
      .string()
      .matches(valCoRegExp, "Valor de compra inválido")
      .required("Requerido"),
    valorVenta: yup
      .string()
      .matches(valVeRegExp, "Valor de venta inválido")
      .required("Requerido"),
    unidadMedida: yup.string().required("Requerido").max(10, "La unidad de medida debe tener como máximo 10 caracteres"),
  });

  const checkoutSchema2 = yup.object().shape({
    cantidad: yup
      .string()
      .matches(cantRegExp, "Cantidad inválida")
      .required("Requerido"),
    valorCompra: yup
      .string()
      .matches(valCoRegExp, "Valor de compra inválido")
      .required("Requerido"),
    valorVenta: yup
      .string()
      .matches(valVeRegExp, "Valor de venta inválido")
      .required("Requerido"),
    unidadMedida: yup.string().required("Requerido").max(10, "La unidad de medida debe tener como máximo 10 caracteres"),
  });

  const convertImageToBase64 = (image) => {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const base64String = event.target.result.split(',')[1];
        resolve(base64String);
      };
      fileReader.readAsDataURL(image);
    });
  };

  const OpenAddProductoDialog = () => {
    
    const isNonMobile = useMediaQuery("(min-width:600px");
    const handleFormSubmit = async (values) => {
      try {
        if (imagenSeleccionada) {
          const imagenBase64 = await convertImageToBase64(imagenSeleccionada);
          values.imagen = imagenBase64;
        }
        const response = await fetch('https://viramsoftapi.onrender.com/create_product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          setMensaje('Producto agregado exitosamente.');
        } else {
          setMensaje('Error al agregar el producto.');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        setMensaje('Error al agregar el producto.');
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
          <Header title="Agregar producto" />

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
                    label="Marca"
                    onBlur={handledBlur}
                    onChange={handleChange}
                    value={values.marca}
                    name="marca"
                    error={!!touched.marca && !!errors.marca}
                    helperText={touched.marca && errors.marca}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Categoría"
                    select
                    onBlur={handledBlur}
                    onChange={handleChange}
                    value={values.categoria}
                    name="categoria"
                    error={!!touched.categoria && !!errors.categoria}
                    helperText={touched.categoria && errors.categoria}
                    sx={{ gridColumn: "span 4" }}
                  >
                    <MenuItem value="Líquidos">Líquidos</MenuItem>
                    <MenuItem value="Sólidos">Sólidos</MenuItem>
                    <MenuItem value="Polvos">Polvos</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                  </TextField>


                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Cantidad"
                    onBlur={handledBlur}
                    onChange={handleChange}
                    value={values.cantidad}
                    name="cantidad"
                    error={!!touched.cantidad && !!errors.cantidad}
                    helperText={touched.cantidad && errors.cantidad}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Valor de compra"
                    onBlur={handledBlur}
                    onChange={handleChange}
                    value={values.valorCompra}
                    name="valorCompra"
                    error={!!touched.valorCompra && !!errors.valorCompra}
                    helperText={touched.valorCompra && errors.valorCompra}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Valor de venta"
                    onBlur={handledBlur}
                    onChange={handleChange}
                    value={values.valorVenta}
                    name="valorVenta"
                    error={!!touched.valorVenta && !!errors.valorVenta}
                    helperText={touched.valorVenta && errors.valorVenta}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Unidad de medida"
                    onBlur={handledBlur}
                    onChange={handleChange}
                    value={values.unidadMedida}
                    name="unidadMedida"
                    error={!!touched.unidadMedida && !!errors.unidadMedida}
                    helperText={touched.unidadMedida && errors.unidadMedida}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl fullWidth variant="filled" >
                    <InputLabel></InputLabel>
                    <Button
                      variant="contained"
                      component="label"
                      fullWidth
                    >
                      Subir imagen
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => setImagenSeleccionada(e.target.files[0])}
                      />
                    </Button>
                    {imagenSeleccionada && (
                      <Card style={{ marginTop: "30px" }}>
                        <CardMedia
                          component="img"
                          alt="Imagen seleccionada"
                          height="140"
                          image={URL.createObjectURL(imagenSeleccionada)}
                        />
                      </Card>
                    )}
                  </FormControl>

                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button style={{ marginRight: 7 }} type="submit" color="secondary" variant="contained" onClick={handleCloseAddForm}>
                    Cerrar
                  </Button>
                  <Button type="submit" color="secondary" variant="contained">
                    Agregar producto
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
    <Box m="20px" mt="-50px">
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
            color="secondary"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            style={{ marginRight: 7 }} // Añadido para separar los botones
          >
            Refrescar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={handleOpenAddForm}
          >
            Agregar nuevo producto
          </Button>
        </Box>

        <DataGrid
          rows={productosData}
          columns={columns}
        />
      </Box>
      <EditarProductoDialog />
      <OpenAddProductoDialog />
    </Box>

  );
};

export default Products;
