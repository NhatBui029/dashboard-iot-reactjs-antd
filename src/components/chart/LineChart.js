import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { FaMinus } from "react-icons/fa";
import { options, series } from "./configs/lineChart";
import { useEffect, useState } from "react";
import { useDataSensorStore, useSocket } from "../../stores";

function LineChart() {
  const { Title } = Typography;
  const [data, setData] = useState({
    temperatures: [],
    humiditys: [],
    lights: [],
    times: []
  });
  const { updateDataSensor } = useDataSensorStore();
  const {socket, connect} = useSocket();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    if(!socket) connect(ws)
    ws.onmessage = (event) => {
      const {topic, data} = JSON.parse(event.data)
      if (topic === 'sensorData') {
        updateDataSensor(data);
        setData((prevData) => ({
          temperatures: [...prevData.temperatures, data.temperature].slice(-10),
          humiditys: [...prevData.humiditys, data.humidity].slice(-10),
          lights: [...prevData.lights, data.light].slice(-10),
          times: [...prevData.times, data.createdAt].slice(-10),
        }))
      }
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
