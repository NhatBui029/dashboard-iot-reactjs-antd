import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { FaMinus } from "react-icons/fa";
import { options, series } from "./configs/lineChart";
import { useEffect, useRef, useState } from "react";

function LineChart() {
  const { Title } = Typography;
  const [data, setData] = useState({
    temperature: [],
    humidity: [],
    light: [],
    time: []
  });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const sensorData = JSON.parse(event.data);
      setData((prevData) => {
        const updatedData = {
          temperature: [...prevData.temperature, sensorData.temperature].slice(-10),
          humidity: [...prevData.humidity, sensorData.humidity].slice(-10),
          light: [...prevData.light, sensorData.light].slice(-10),
          time: [...prevData.time, new Date()].slice(-10),
        }

        return updatedData;
      })
    }
    return () => ws.close();
  }, [])


  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Biểu đồ</Title>
        </div>
        <div className="sales">
          <ul>
            <li>{<FaMinus color="#008FFB" />} Nhiệt độ</li>
            <li>{<FaMinus color="#00E396" />} Độ ẩm</li>
            <li>{<FaMinus color="#FEB019" />} Ánh sáng</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={options(data)}
        series={series(data)}
        type="area"
        height={450}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
