import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { FaMinus } from "react-icons/fa";
import lineChart from "./configs/lineChart";

function LineChart() {
  const { Title } = Typography;

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Biểu đồ</Title>
          {/* <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph> */}
        </div>
        <div className="sales">
          <ul>
            <li>{<FaMinus color="#008FFB"/>} Nhiệt độ</li>
            <li>{<FaMinus color="#00E396"/>} Độ ẩm</li>
            <li>{<FaMinus color="#FEB019"/>} Ánh sáng</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={450}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
