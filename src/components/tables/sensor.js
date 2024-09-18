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
import { useEffect, useState } from "react";
import axiosClient from "../../api/axios-client";
import { createQueryString } from "../../utils/getColor";


const { RangePicker } = DatePicker;

const columns = [
    {
        title: "STT",
        dataIndex: 'stt',
        key: 'stt',
        width: "10%",
    },
    {
        title: "ID",
        dataIndex: 'id',
        key: 'id',
        sorter: {
            compare: (a, b) => a.id - b.id,
            multiple: 3,
        },
    },

    {
        title: "Nhiệt độ",
        key: 'temperature',
        dataIndex: 'temperature',
    },
    {
        title: "Độ ẩm",
        key: 'humidity',
        dataIndex: 'humidity',
    },
    {
        title: "Ánh sáng",
        key: 'light',
        dataIndex: 'light',
    },
    {
        title: "Thời gian",
        key: 'time',
        dataIndex: 'time',
        sorter: {
            compare: (a, b) => a.time.toString().localeCompare(b.time.toString()),
            multiple: 3,
        },
    },
];

// const data = [
//     {
//         key: "1",
//         [DataSensorFields.STT]: 1,
//         [DataSensorFields.ID]: 112,
//         [DataSensorFields.TEMPERATURE]: 34,
//         [DataSensorFields.HUMIDITY]: 90,
//         [DataSensorFields.LIGHT]: 1012,
//         [DataSensorFields.TIME]: "2024:09:12-14:50:34"
//     },
//     {
//         key: "2",
//         [DataSensorFields.STT]: 2,
//         [DataSensorFields.ID]: 12,
//         [DataSensorFields.TEMPERATURE]: 24,
//         [DataSensorFields.HUMIDITY]: 99,
//         [DataSensorFields.LIGHT]: 567,
//         [DataSensorFields.TIME]: "2024:09:12-15:50:34"
//     },
// ];

function SensorTable() {
    const [data, setData] = useState();
    const [totalCount, setTotalCount] = useState();
    const [filter, setFilter] = useState({
        content: null,
        searchBy: null,
        startTime: null,
        endTime: null,
    });

    const [sortAndPage, setSortAndPage] = useState({
        page: null,
        pageSize: null,
        sortBy: null,
        orderBy: null
    })

    useEffect(() => {
        const getSensorData = async () => {
            const queryString = createQueryString(filter, sortAndPage);
            const sensorDatas = await axiosClient.get(`/table/data${queryString}`)
            console.log("🚀 ~ getSensorData ~ sensorDatas:", sensorDatas)
            // setData(sensorDatas);
        }

        getSensorData();
    }, [sortAndPage])

    const handleChangeFilter = (data) => {
        setFilter(prev => ({ ...prev, ...data }))
    }

    const handleClickSearch = () => {
        const queryString = createQueryString(filter, sortAndPage);
        console.log("🚀 ~ getSensorData ~ queryString:", queryString)
    }

    return (
        <div className="tabled">
            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Sensor Data Table"
            >
                <Flex justify="space-around" align="center" style={{ margin: "20px 0" }}>
                    <Input
                        placeholder=""
                        size="small"
                        prefix={<FaSearch />}
                        style={{ width: '20%', height: 30 }}
                        onChange={(e) => {
                            handleChangeFilter({ content: e.target.value })
                        }}
                    />
                    <Select
                        defaultValue={DataSensorFields.ALL}
                        style={{ width: '20%' }}
                        onChange={(e) => handleChangeFilter({ searchBy: e })}
                        options={[
                            { value: DataSensorFields.ALL, label: 'Tất cả' },
                            { value: DataSensorFields.ID, label: 'ID' },
                            { value: DataSensorFields.TEMPERATURE, label: 'Nhiệt độ' },
                            { value: DataSensorFields.HUMIDITY, label: 'Độ ẩm' },
                            { value: DataSensorFields.LIGHT, label: 'Ánh sáng' }
                        ]}
                    />
                    <RangePicker
                        showTime
                        onChange={(_time, timeString) => handleChangeFilter({
                            startTime: timeString[0],
                            endTime: timeString[1]
                        })}
                    />
                    <Button
                        type="primary"
                        icon={<FaSearch />}
                        style={{ width: '15%' }}
                        onClick={handleClickSearch}
                    >
                        Search
                    </Button>
                </Flex>
                <div className="table-responsive">
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            position: ['topRight'],
                            current: filter.page,
                            pageSize: filter.pageSize,
                            total: filter.totalCount
                        }}
                        className="ant-border-space"
                    // onChange={(pagination, filters, sorter, extra) => {
                    //     console.log("🚀 ~ SensorTable ~ pagination:", pagination)                  
                    //     console.log("🚀 ~ SensorTable ~ filters:", filters)
                    //     console.log("🚀 ~ SensorTable ~ sorter:", sorter)
                    //     console.log("🚀 ~ SensorTable ~ extra:", extra)
                    // }}
                    />
                </div>
            </Card>

        </div>
    )
}

export default SensorTable;