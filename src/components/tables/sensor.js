import {
    Input,
    Card,
    Table,
    Button,
    Flex,
    Select,
    DatePicker
} from "antd";
import { FaSearch } from "react-icons/fa";
import { DataSensor } from "../../constant";


const { RangePicker } = DatePicker;

const columns = [
    {
        title: "STT",
        dataIndex: DataSensor.STT,
        key: DataSensor.STT,
        width: "10%",
    },
    {
        title: "ID",
        dataIndex: DataSensor.ID,
        key: DataSensor.ID,
        sorter: {
            compare: (a, b) => a[DataSensor.ID]-b[DataSensor.ID],
            multiple: 3,
        },
    },

    {
        title: "Nhiệt độ",
        key: DataSensor.TEMPERATURE,
        dataIndex: DataSensor.TEMPERATURE,
    },
    {
        title: "Độ ẩm",
        key: DataSensor.HUMIDITY,
        dataIndex: DataSensor.HUMIDITY,
    },
    {
        title: "Ánh sáng",
        key: DataSensor.LIGHT,
        dataIndex: DataSensor.LIGHT,
    },
    {
        title: "Thời gian",
        key: DataSensor.TIME,
        dataIndex: DataSensor.TIME,
        sorter: {
            compare: (a, b) => a[DataSensor.TIME].toString().localeCompare(b[DataSensor.TIME].toString()),
            multiple: 3,
        },
    },
];

const data = [
    {
        key: "1",
        [DataSensor.STT]: 1,
        [DataSensor.ID]: 112,
        [DataSensor.TEMPERATURE]: 34,
        [DataSensor.HUMIDITY]: 90,
        [DataSensor.LIGHT]: 1012,
        [DataSensor.TIME]: "2024:09:12-14:50:34"
    },
    {
        key: "2",
        [DataSensor.STT]: 2,
        [DataSensor.ID]: 12,
        [DataSensor.TEMPERATURE]: 24,
        [DataSensor.HUMIDITY]: 99,
        [DataSensor.LIGHT]: 567,
        [DataSensor.TIME]: "2024:09:12-15:50:34"
    },
];

function SensorTable() {
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);

    return (
        <div className="tabled">
            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Sensor Data Table"
            >
                <Flex justify="space-around" align="center" style={{ margin: "20px 0" }}>
                    <Input placeholder="" size="small" prefix={<FaSearch />} style={{ width: 320, height: 30 }} />
                    <Select
                        defaultValue={DataSensor.ALL}
                        style={{ width: 320 }}
                        // onChange={handleChange}
                        options={[
                            { value: DataSensor.ALL, label: 'Tất cả' },
                            { value: DataSensor.ID, label: 'ID' },
                            { value: DataSensor.TEMPERATURE, label: 'Nhiệt độ' },
                            { value: DataSensor.HUMIDITY, label: 'Độ ẩm' },
                            { value: DataSensor.LIGHT, label: 'Ánh sáng' }
                        ]}
                    />
                    <RangePicker showTime />
                    <Button type="primary" icon={<FaSearch />} style={{ width: 200 }}>
                        Search
                    </Button>
                </Flex>
                <div className="table-responsive">
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            position: ['topRight'],
                            current: 1,
                            pageSize: 10,
                            total: 100
                        }}
                        className="ant-border-space"
                        onChange={(e)=>console.log('hi: ', e)}
                    />
                </div>
            </Card>

        </div>
    )
}

export default SensorTable;