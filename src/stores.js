import { create } from 'zustand';

export const useDataSensorStore = create((set) => ({
  temperature: 0,
  humidity: 0,
  light: 0,
  updateDataSensor: (data) => set(() => (data)),
}));

export const useActionDeviceStore = create((set)=>({
  isOnLed: false,
  isOnAirConditioner: false,
  isOnFan: false,
  updateActionDevice: (data) => set((stage)=> ({
    ...stage,
    ...data
  }))
}))

export const useWebSocketStore = create((set, get) => ({
  socket: null,
  message: {
    temperatures: [],
    humiditys: [],
    lights: [],
    times: []
  },  // Lưu trữ các tin nhắn nhận được
  isOpen: false,  // Trạng thái kết nối WebSocket
  connect: (url) => {
    const ws = new WebSocket(url);
    const updateDataSensor = useDataSensorStore.getState().updateDataSensor; 
    const updateActionDevice = useActionDeviceStore.getState().updateActionDevice; 
    
    ws.onopen = () => {
      console.log('WebSocket is open now.');
      set({ isOpen: true });
    };

    ws.onmessage = (event) => {
      const { topic, data } = JSON.parse(event.data);
      if (topic === 'sensorData') {
        updateDataSensor(data);
        set((stage) => {
          const newMessage = {
            temperatures: [...stage.message.temperatures, data.temperature].slice(-10),
            humiditys: [...stage.message.humiditys, data.humidity].slice(-10),
            lights: [...stage.message.lights, data.light].slice(-10),
            times: [...stage.message.times, data.createdAt].slice(-10),
          };
          return {
            ...stage,
            message: newMessage
          }
        })
      }

      if(topic == 'ledok'){
        updateActionDevice({isOnLed: data == 'on'});
      }
    };

    ws.onclose = () => {
      console.log('WebSocket is closed now.');
      set({ isOpen: false });
    };

    ws.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    set({ socket: ws });
  },
  sendMessage: (message) => {
    const socket = get().socket;
    const isOpen = get().isOpen;

    if (socket && isOpen) {
      socket.send(JSON.stringify(message));  // Gửi tin nhắn qua WebSocket
    } else {
      console.error('WebSocket is not open.');
    }
  },
  closeConnection: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();  // Đóng kết nối WebSocket
    }
  },
}));