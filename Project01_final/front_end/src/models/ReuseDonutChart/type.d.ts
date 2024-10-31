export interface IReuseDonutChartProps {
  data: ChartData;
  title: string;
  description?: string;
  trendPercentage?: number;
  footerText?: string;
}

type ChartData = {
  [key: string]: number;
};
