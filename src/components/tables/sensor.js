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
import { DataSensorFields } from "../../constant";


const { RangePicker } = DatePicker;

const columns = [
    {
        title: "STT",
        dataIndex: DataSensorFields.STT,
        key: DataSensorFields.STT,
        width: "10%",
    },
    {
        title: "ID",
        dataIndex: DataSensorFields.ID,
        key: DataSensorFields.ID,
        sorter: {
            compare: (a, b) => a[DataSensorFields.ID]-b[DataSensorFields.ID],
            multiple: 3,
        },
    },

    {
        title: "Nhiệt độ",
        key: DataSensorFields.TEMPERATURE,
        dataIndex: DataSensorFields.TEMPERATURE,
    },
    {
        title: "Độ ẩm",
        key: DataSensorFields.HUMIDITY,
        dataIndex: DataSensorFields.HUMIDITY,
    },
    {
        title: "Ánh sáng",
        key: DataSensorFields.LIGHT,
        dataIndex: DataSensorFields.LIGHT,
    },
    {
        title: "Thời gian",
        key: DataSensorFields.TIME,
        dataIndex: DataSensorFields.TIME,
        sorter: {
            compare: (a, b) => a[DataSensorFields.TIME].toString().localeCompare(b[DataSensorFields.TIME].toString()),
            multiple: 3,
        },
    },
];

const data = [
    {
        key: "1",
        [DataSensorFields.STT]: 1,
        [DataSensorFields.ID]: 112,
        [DataSensorFields.TEMPERATURE]: 34,
        [DataSensorFields.HUMIDITY]: 90,
        [DataSensorFields.LIGHT]: 1012,
        [DataSensorFields.TIME]: "2024:09:12-14:50:34"
    },
    {
        key: "2",
        [DataSensorFields.STT]: 2,
        [DataSensorFields.ID]: 12,
        [DataSensorFields.TEMPERATURE]: 24,
        [DataSensorFields.HUMIDITY]: 99,
        [DataSensorFields.LIGHT]: 567,
        [DataSensorFields.TIME]: "2024:09:12-15:50:34"
    },
];

function SensorTable() {

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
                        defaultValue={DataSensorFields.ALL}
                        style={{ width: 320 }}
                        // onChange={handleChange}
                        options={[
                            { value: DataSensorFields.ALL, label: 'Tất cả' },
                            { value: DataSensorFields.ID, label: 'ID' },
                            { value: DataSensorFields.TEMPERATURE, label: 'Nhiệt độ' },
                            { value: DataSensorFields.HUMIDITY, label: 'Độ ẩm' },
                            { value: DataSensorFields.LIGHT, label: 'Ánh sáng' }
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