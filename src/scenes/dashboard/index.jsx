import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dashboardData, setDashboardData] = useState(null);
  const [semanasAtras, setSemanasAtras] = useState(4);
  const [databc, setDatabc] = useState(null);

  useEffect(() => {
    fetch("https://viramsoftapi.onrender.com/indicadores_dashboard")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((data, key) => ({
          ...data,
        }));
        setDashboardData(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const fetchDatabc = () => {
    fetch(
      `https://viramsoftapi.onrender.com/ventas_por_periodo?semanas_atras=${semanasAtras}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((responseData) => {
        // Actualiza el estado con los datos recibidos
        setDatabc(responseData);
        console.log(databc);
      })
      .catch((error) => {
        console.error("Error de la solicitud:", error);
      });
  };

  useEffect(() => {
    fetchDatabc();
  }, [semanasAtras]);

  console.log(dashboardData);
  if (dashboardData === null) {
    return <div>Cargando...</div>;
  }

  console.log(databc);
  if (databc === null) {
    return <div>Cargando...</div>;
  }

  const total = databc.data.reduce((acc, curr) => {
    return acc + Number(curr);
  }, 0);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" mt="-50px">
        <Header
          title="DASHBOARD"
          subtitle="Bienvenido a Viramsoft ADMIN"
        ></Header>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1  */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData[0].total_pedidos}
            subtitle="Total en ventas"
            progress={
              dashboardData[2].porc_total_pedidos
                ? parseFloat(dashboardData[2].porc_total_pedidos) / 100
                : 0
            }
            increase={dashboardData[2].porc_total_pedidos}
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData[0].clientes_nuevos}
            subtitle="Nuevos clientes"
            progress={
              dashboardData[2].porc_clientes_nuevos
                ? parseFloat(dashboardData[2].porc_clientes_nuevos) / 100
                : 0
            }
            increase={dashboardData[2].porc_clientes_nuevos}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData[0].pedidos_entregados}
            subtitle="Pedidos entregados"
            progress={
              dashboardData[2].porc_pedidos_entregados
                ? parseFloat(dashboardData[2].porc_pedidos_entregados) / 100
                : 0
            }
            increase={dashboardData[2].porc_pedidos_entregados}
            icon={
              <LocalShippingIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData[0].ganancias}
            subtitle="Ganancias"
            progress={
              dashboardData[2].por_ganancias
                ? parseFloat(dashboardData[2].porc_ganancias) / 100
                : 0
            }
            increase={dashboardData[2].porc_ganancias}
            icon={
              <TrendingUpOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Ventas por semanas
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                ${total}
              </Typography>
            </Box>
          </Box>
          <Box height="250px" mt="-20px">
            <LineChart isDashboard={true} data={databc} />
          </Box>
        </Box>
        {/* TRANSACTIONS */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[800]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Pedidos recientes
            </Typography>
          </Box>

          {Object.values(dashboardData[1]).map((pedido, key) => {
            return (
              <Box
                key={key}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[800]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[100]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {pedido.vendedor}
                  </Typography>
                  <Typography color={colors.greenAccent[100]}>
                    Pedido número: {pedido.idPedido}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{pedido.fechaEntrega}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${pedido.valorTotal}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
