import { LineChart } from '@mui/x-charts';

type ChartData = {
  pData: number[];
  uData: number[];
  tData: number[];
};

type ChartsProps = {
  chartData: ChartData;
  xLabels: string[];
  margin?: { right: number };
};

function Charts({ chartData, xLabels, margin = { right: 24 } }: ChartsProps) {
  return (
    <LineChart
      height={300}
      width={1000}
      series={[
        { data: chartData.pData, label: 'Pressure x10 [hPa]', color: '#00cfd6' },
        { data: chartData.uData, label: 'Humidity [%]', color: '#a259f7' },
        { data: chartData.tData, label: 'Temperature [°C]', color: '#ff00c3' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      yAxis={[{}]}
      margin={margin}
    />
  );
}

export default Charts;