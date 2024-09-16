import {
  Card,
  Col,
  Flex,
  Row,
  Typography,
  Switch,
  Progress,
  message
} from "antd";

import LineChart from "../components/chart/LineChart";
import { FaTemperatureLow, FaFan, FaLightbulb, FaRegSnowflake } from "react-icons/fa";
import { RiWaterPercentFill } from "react-icons/ri";
import { MdLightMode } from "react-icons/md";
import '../assets/styles/home.css'
import { useState } from "react";
import { useDataSensorStore, useSocket } from "../stores";
import axios from "axios";

function Home() {
  const { Title } = Typography;
  const [fanStatus, setFanStatus] = useState(false);
  const [lightStatus, setLightStatus] = useState(false);
  const [airConditionerStatus, setAirConditionerStatus] = useState(false);
  const { temperature, humidity, light } = useDataSensorStore();
  const { socket } = useSocket();

  const weatherDatas = [
    {
      title: "Nhiệt độ",
      value: temperature,
      unit: "*C",
      icon: <FaTemperatureLow size={18} />,
      progressColor: '#008FFB',
      bnb: "redtext",
    },
    {
      title: "Độ ẩm",
      value: humidity,
      unit: "%",
      icon: <RiWaterPercentFill size={18} />,
      progressColor: '#00E396',
      bnb: "redtext",
    },
    {
      title: "Ánh sáng",
      value: light,
      unit: "Lux",
      icon: <MdLightMode size={18} />,
      progressColor: '#FEB019',
      bnb: "redtext",
    }
  ];

  const actionDatas = [
    {
      title: "Quạt",
      status: fanStatus,
      icon: <FaFan size={50} className={fanStatus ? "spin-icon" : ""} />,
      onChange: (e) => {
        setFanStatus(e);
        socket.send(JSON.stringify({
          topic: 'action/fan',
          message: e ? 'on' : 'off'
        }))
      }
    },
    {
      title: "Điều hòa",
      status: airConditionerStatus,
      icon: <FaRegSnowflake size={50} color={airConditionerStatus ? "rgb(140, 208, 242)" : ""} />,
      onChange: (e) => {
        setAirConditionerStatus(e);
        socket.send(JSON.stringify({
          topic: 'action/air_conditioner',
          message: e ? 'on' : 'off'
        }))
      }
    },
    {
      title: "Đèn",
      status: lightStatus,
      icon: <FaLightbulb size={50} color={lightStatus ? "yellow" : ""} />,
      onChange: (e) => {
        setLightStatus(e);
        socket.send(JSON.stringify({
          topic: 'action/led',
          message: e ? 'on' : 'off'
        }))
      }
    }
  ]


  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {weatherDatas.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox" >
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={6}>
                      <span style={{ color: "#000" }}>{c.title}</span>
                      <Title level={3}>
                        {c.value} <small style={{ color: c.progressColor }}>{c.unit}</small>
                      </Title>
                    </Col>
                    <Col xs={14}>
                      <Progress percent={60} showInfo={false} strokeColor={c.progressColor} />
                    </Col>
                    <Col xs={4}>
                      <div className="icon-box" style={{ backgroundColor: c.progressColor }}>{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={18}>
            <Card bordered={false} className="criclebox h-full" style={{ width: '100%' }}>
              <LineChart style={{ width: '100%' }} />
            </Card>
          </Col>
          <Col xs={6} >
            <Flex vertical justify="space-between" className="h-full">
              {actionDatas.map((action, index) => (
                <Card key={index}>
                  <Row gutter={[24, 0]}>
                    <Col xs={15}>
                      <Title level={5} style={{ margin: 0 }}>
                        {action.title}
                      </Title>
                      <Switch checkedChildren="ON" unCheckedChildren="OFF" onChange={action.onChange} />
                    </Col>
                    <Col xs={9} >
                      {action.icon}
                    </Col>
                  </Row>
                </Card>
              ))}
            </Flex>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
