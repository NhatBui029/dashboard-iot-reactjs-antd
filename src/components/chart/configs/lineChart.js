const lineChart = {
  series: [
    {
      name: "Nhiệt độ",
      data: [30, 40, 35, 50, 49, 60, 70, 91],
      offsetY: 0,
    },
    {
      name: "Độ ẩm",
      data: [10, 20, 15, 25, 28, 45, 55, 61],
      offsetY: 0,
    },
    {
      name: "Ánh sáng",
      data: [900, 80, 950, 1024, 100, 195, 420, 130],
      offsetY: 0,
    },
  ],

  options: {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false
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
      width: [2,2,2],
    },

    yaxis: [
      {
        title: {
          text: "Nhiệt độ & Độ ẩm",
        },
        seriesName: "Nhiệt độ",
        min: 0, 
        max: 100, 
        tickAmount: 5,
      },
      {
        show: false,
        seriesName: "Độ ẩm",
        min: 0, 
        max: 100, 
        tickAmount: 5,
      },
      {
        opposite: true,
        title: {
          text: "Ánh sáng",
        },
        seriesName: "Ánh sáng",
        min: 0, 
        max: 1024, 
        tickAmount: 8,
      },
    ],

    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    },

    tooltip: {
      y: [
        {
          formatter: function (val) {
            return val + "°C"; 
          },
        },
        {
          formatter: function (val) {
            return val + "%"; 
          },
        },
        {
          formatter: function (val) {
            return val + " lux"; 
          },
        },
      ],
    },
  },
};

export default lineChart;
