import {
    Card,
    Table,
    Button,
    Flex,
    Select,
    DatePicker
} from "antd";
import { FaSearch } from "react-icons/fa";
import { ActionHistoryFields, actionDevices, devices } from "../../constant";


const { RangePicker } = DatePicker;

const columns = [
    {
        title: "STT",
        dataIndex: ActionHistoryFields.STT,
        key: ActionHistoryFields.STT,
        width: "10%",
    },
    {
        title: "ID",
        dataIndex: ActionHistoryFields.ID,
        key: ActionHistoryFields.ID,
        sorter: {
            compare: (a, b) => a[ActionHistoryFields.ID]-b[ActionHistoryFields.ID],
            multiple: 3,
        },
    },

    {
        title: "Thiết bị",
        key: ActionHistoryFields.DEVICE_NAME,
        dataIndex: ActionHistoryFields.DEVICE_NAME,
    },
    {
        title: "Hành động",
        key: ActionHistoryFields.ACTION,
        dataIndex: ActionHistoryFields.ACTION,
    },
    {
        title: "Thời gian",
        key: ActionHistoryFields.TIME,
        dataIndex: ActionHistoryFields.TIME,
        sorter: {
            compare: (a, b) => a[ActionHistoryFields.TIME].toString().localeCompare(b[ActionHistoryFields.TIME].toString()),
            multiple: 3,
        },
    },
];

const data = [
    {
        key: "1",
        [ActionHistoryFields.STT]: 1,
        [ActionHistoryFields.ID]: 112,
        [ActionHistoryFields.DEVICE_NAME]: devices.AIR_CONDITIONER,
        [ActionHistoryFields.ACTION]: actionDevices.ON,
        [ActionHistoryFields.TIME]: "2024:09:12-14:50:34"
    },
    {
        key: "2",
        [ActionHistoryFields.STT]: 2,
        [ActionHistoryFields.ID]: 12,
        [ActionHistoryFields.DEVICE_NAME]: devices.FAN,
        [ActionHistoryFields.ACTION]: actionDevices.OFF,
        [ActionHistoryFields.TIME]: "2024:09:12-15:50:34"
    },
];

function ActionTable() {

    return (
        <div className="tabled">
            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Sensor Data Table"
            >
                <Flex justify="space-around" align="center" style={{ margin: "20px 0" }}>
                    <RangePicker showTime />
                    <Select
                        defaultValue={ActionHistoryFields.ALL}
                        style={{ width: 320 }}
                        // onChange={handleChange}
                        options={[
                            { value: ActionHistoryFields.ALL, label: 'Tất cả' },
                            { value: 'FAN', label: devices.FAN },
                            { value: 'LED', label: devices.LED },
                            { value: 'AIR_CONDITIONER', label: devices.AIR_CONDITIONER },
                        ]}
                    />
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

export default ActionTable;