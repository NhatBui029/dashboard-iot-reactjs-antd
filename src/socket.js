class WebSocketService {
    constructor() {
        this.socket = null;
    }

    // Khởi tạo kết nối WebSocket
    initiateSocketConnection() {
        if (!this.socket) {
            this.socket = new WebSocket('ws://localhost:8080'); // URL của WebSocket server
            console.log('Kết nối WebSocket được khởi tạo.');
        }
        return this.socket;
    }


    // Gửi message qua WebSocket
    sendMessage(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
            console.log('Message đã gửi:', message);
        } else {
            console.log('WebSocket chưa kết nối hoặc chưa sẵn sàng.');
        }
    }

    // Ngắt kết nối WebSocket
    disconnectSocket() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
            console.log('WebSocket đã ngắt kết nối.');
        }
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;
