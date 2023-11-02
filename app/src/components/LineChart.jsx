import { ResponsiveLine } from "@nivo/line";
import { mockLineData as data } from "../data/mockData";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const Line = ({ isDashboard = false, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const reversedData = data.labels
    .slice() // Copia el arreglo para no modificar el original
    .reverse()
    .map((label, index) => ({
      x: label,
      y: data.data[data.labels.length - 1 - index],
    }));
  const chartData = [
    {
      id: "Ventas",
      data: reversedData,
    },
  ];

  return (
    <ResponsiveLine
      data={chartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        legend: isDashboard ? undefined : "transportation",
        tickRotation: -20,
        legend: "Semanas",
        legendOffset: 26,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={true}
      enableArea={true}
      areaBaselineValue={0}
      animate={true}
      enableSlices="x"
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default Line;
