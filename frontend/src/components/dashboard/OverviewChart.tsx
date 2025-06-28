import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './OverviewChart.module.css';

interface OverviewChartProps {
  chartData: any;
  chartOptions: any;
}

const OverviewChart: React.FC<OverviewChartProps> = ({ chartData, chartOptions }) => (
  <Line data={chartData} options={chartOptions} className={styles.chart} />
);

export default OverviewChart; 