const lineChart = {
  series: [
    {
      name: "Nhiệt độ",
      data: [350, 40, 300, 220, 500, 250, 400, 230, 500],
      offsetY: 0,
    },
    {
      name: "Độ ẩm",
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
      offsetY: 0,
    },
    {
      name: "Ánh sáng",
      data: [300, 20, 408, 540, 90, 200, 540, 130, 1260],
      offsetY: 0,
    },
  ],

  options: {
    chart: {
      width: "100%",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: [2, 2, 2]
    },

    yaxis: [{
      title: {
        text: 'Nhiệt độ & Độ ẩm',
      },
    
    }, {
      opposite: true,
      title: {
        text: 'Ánh sáng'
      }
    }],

    xaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 500,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },

    // tooltip: {
    //   y: {
    //     formatter: function (val) {
    //       return val;
    //     },
    //   },
    // },
  },
};

export default lineChart;
