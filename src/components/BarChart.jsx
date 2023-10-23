import { useTheme } from "@emotion/react";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData } from "../data/mockData";

const BarChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const data = [
        {
          "country": "AD",
          "hot dog": 192,
          "hot dogColor": "hsl(336, 70%, 50%)",
          "burger": 52,
          "burgerColor": "hsl(348, 70%, 50%)",
          "sandwich": 56,
          "sandwichColor": "hsl(309, 70%, 50%)",
          "kebab": 146,
          "kebabColor": "hsl(46, 70%, 50%)",
          "fries": 23,
          "friesColor": "hsl(180, 70%, 50%)",
          "donut": 16,
          "donutColor": "hsl(40, 70%, 50%)"
        },
        {
          "country": "AE",
          "hot dog": 103,
          "hot dogColor": "hsl(346, 70%, 50%)",
          "burger": 42,
          "burgerColor": "hsl(38, 70%, 50%)",
          "sandwich": 42,
          "sandwichColor": "hsl(266, 70%, 50%)",
          "kebab": 63,
          "kebabColor": "hsl(52, 70%, 50%)",
          "fries": 100,
          "friesColor": "hsl(200, 70%, 50%)",
          "donut": 24,
          "donutColor": "hsl(272, 70%, 50%)"
        },
        {
          "country": "AF",
          "hot dog": 160,
          "hot dogColor": "hsl(21, 70%, 50%)",
          "burger": 107,
          "burgerColor": "hsl(91, 70%, 50%)",
          "sandwich": 175,
          "sandwichColor": "hsl(19, 70%, 50%)",
          "kebab": 181,
          "kebabColor": "hsl(292, 70%, 50%)",
          "fries": 164,
          "friesColor": "hsl(342, 70%, 50%)",
          "donut": 48,
          "donutColor": "hsl(310, 70%, 50%)"
        },
        {
          "country": "AG",
          "hot dog": 109,
          "hot dogColor": "hsl(255, 70%, 50%)",
          "burger": 200,
          "burgerColor": "hsl(328, 70%, 50%)",
          "sandwich": 86,
          "sandwichColor": "hsl(356, 70%, 50%)",
          "kebab": 178,
          "kebabColor": "hsl(42, 70%, 50%)",
          "fries": 56,
          "friesColor": "hsl(264, 70%, 50%)",
          "donut": 21,
          "donutColor": "hsl(237, 70%, 50%)"
        },
        {
          "country": "AI",
          "hot dog": 198,
          "hot dogColor": "hsl(260, 70%, 50%)",
          "burger": 37,
          "burgerColor": "hsl(138, 70%, 50%)",
          "sandwich": 197,
          "sandwichColor": "hsl(161, 70%, 50%)",
          "kebab": 160,
          "kebabColor": "hsl(316, 70%, 50%)",
          "fries": 55,
          "friesColor": "hsl(258, 70%, 50%)",
          "donut": 65,
          "donutColor": "hsl(217, 70%, 50%)"
        },
        {
          "country": "AL",
          "hot dog": 79,
          "hot dogColor": "hsl(350, 70%, 50%)",
          "burger": 181,
          "burgerColor": "hsl(8, 70%, 50%)",
          "sandwich": 186,
          "sandwichColor": "hsl(280, 70%, 50%)",
          "kebab": 125,
          "kebabColor": "hsl(108, 70%, 50%)",
          "fries": 176,
          "friesColor": "hsl(274, 70%, 50%)",
          "donut": 95,
          "donutColor": "hsl(169, 70%, 50%)"
        },
        {
          "country": "AM",
          "hot dog": 146,
          "hot dogColor": "hsl(141, 70%, 50%)",
          "burger": 168,
          "burgerColor": "hsl(188, 70%, 50%)",
          "sandwich": 190,
          "sandwichColor": "hsl(319, 70%, 50%)",
          "kebab": 49,
          "kebabColor": "hsl(278, 70%, 50%)",
          "fries": 144,
          "friesColor": "hsl(310, 70%, 50%)",
          "donut": 39,
          "donutColor": "hsl(309, 70%, 50%)"
        }
      ]

  return (
    <ResponsiveBar
      data={data}
      theme={{
        axis: {
            domain: {
                line: {
                    stroke: colors.grey[100]
                }
            },
            legend: {
                text: {
                    fill: colors.grey[100]
                }
            },
            ticks: {
                line: {
                    stroke: colors.grey[100],
                    strokeWidth: 1
                },
                text: {
                    fill: colors.grey[100]
                }
            },
            legends: {
                text: {
                    fill: colors.grey[100],
                },
            }
        }
      }}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
};

export default BarChart;
