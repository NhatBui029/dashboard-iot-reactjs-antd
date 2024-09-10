export const getTemperatureColor = (temperature) => {
    if (temperature <= 10) return 'rgb(0, 88, 207)';
    if (temperature <= 20) return 'rgb(65, 180, 178)';
    if (temperature <= 30) return 'rgb(249, 251, 4)';
    if (temperature <= 40) return 'rgb(254, 111, 7)';
    return 'rgb(248, 5, 0)';
};