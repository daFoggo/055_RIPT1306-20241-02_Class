type ChartData = {
  [key: string]: number;
};

export interface IReusablePieChartProps {
  data: ChartData;
  title: string;
  description?: string;
  leftFooterText?: string;
  rightFooterText?: string;
}
