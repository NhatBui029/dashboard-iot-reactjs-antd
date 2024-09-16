import { create } from 'zustand';

export const useDataSensorStore = create((set) => ({
  temperature: 0,
  humidity: 0,
  light: 0,
  updateDataSensor: (data) => set(() => (data)),
}));

export const useSocket = create((set) => ({
  socket: null,
  connect: (ws) =>
    set(() => ({
      socket: ws
    }))
}))
