import {
  Card,
  Col,
  Row,
  Typography
} from "antd";

import LineChart from "../components/chart/LineChart";
import { FaTemperatureLow} from "react-icons/fa";
import { RiWaterPercentFill } from "react-icons/ri";
import { MdLightMode } from "react-icons/md";
function Home() {
  const { Title } = Typography;

  const count = [
    {
      today: "Nhiệt độ",
      title: "30",
      persent: "*C",
      icon: <FaTemperatureLow size={18}/>,
      bnb: "bnb2",
    },
    {
      today: "Độ ẩm",
      title: "92",
      persent: "%",
      icon: <RiWaterPercentFill size={18}/>,
      bnb: "bnb2",
    },
    {
      today: "Ánh sáng",
      title: "1200",
      persent: "Lux",
      icon: <MdLightMode size={18} />,
      bnb: "redtext",
    }
  ];

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row  gutter={[24, 0]}>
          <Col xs={18}>
            <Card bordered={false} className="criclebox h-full" style={{ width: '100%' }}>
              <LineChart style={{ width: '100%' }} />
            </Card>
          </Col>
          <Col xs={6}>
            <Card>
              hi
            </Card>
            <Card>
              hi
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
