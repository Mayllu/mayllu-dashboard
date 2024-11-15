import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const getColor = (bar) => {
    return bar.data[`${bar.id}Color`];
  };

  // Calculando el total de reportes
  const totalReports = data.reduce((total, item) => {
    return total + item.Alumbrado + item.Parques + item.Seguridad + item.Residuos + item.Calles + item.Otros;
  }, 0);

  return (
    <>
      <div style={{ margin: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>
        Reportes Actuales en DB: {totalReports}
      </div>
      <ResponsiveBar
        data={data}
        keys={["Alumbrado", "Parques", "Seguridad", "Residuos", "Calles", "Otros"]}
        indexBy="category"
        colors={getColor}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.5} // Aumentado para más espacio entre barras
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Categoría",
          legendPosition: "middle",
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Cantidad",
          legendPosition: "middle",
          legendOffset: -40
        }}
        enableLabel={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[]}
        role="application"
        barAriaLabel={(e) => `${e.id}: ${e.formattedValue} en categoría: ${e.indexValue}`}
      />
    </>
  );
};

export default BarChart;
