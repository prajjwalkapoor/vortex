import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer, Socket } from "socket.io";
import { SerialPort } from "serialport";
const serialPort = new SerialPort({ path: "/dev/ttyACM1", baudRate: 9600 });

serialPort.setEncoding("utf8");

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
const PORT: number = 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

const connectedDevices: string[] = [];

io.on("connection", (socket: Socket) => {
  socket.emit("me", socket.id);

  const callIncoming = () => {
    if (!serialPort.isOpen) {
      console.log("Serial port not available");
      return;
    }
    const val = serialPort.read(1);
    if (val == "I") {
      io.emit("serialIncoming");
    }
  };

  const callOutgoing = () => {
    if (!serialPort.isOpen) {
      console.log("Serial port not available");
      return;
    }
    console.log('callOutgoing triggered, writing "A"');
    serialPort.write("A", (err) => {
      if (err) {
        console.error("Error writing to serial port:", err);
      }
    });
  };

  const callOEnded = () => {
    if (!serialPort.isOpen) {
      console.log("Serial port not available");
      return;
    }
    console.log('callOutgoing triggered, writing "A"');
    serialPort.write("E", (err) => {
      if (err) {
        console.error("Error writing to serial port:", err);
      }
    });
  };
  const callOngoing = () => {
    if (!serialPort.isOpen) {
      console.log("Serial port not available");
      return;
    }
    console.log('callOutgoing triggered, writing "A"');
    serialPort.write("O", (err) => {
      if (err) {
        console.error("Error writing to serial port:", err);
      }
    });
  };

  connectedDevices.push(socket.id);

  io.emit("devices", connectedDevices);

  socket.on("disconnect", () => {
    const index = connectedDevices.indexOf(socket.id);
    if (index !== -1) {
      connectedDevices.splice(index, 1);
    }
    io.emit("devices", connectedDevices);
    socket.broadcast.emit("callEnded");
  });

  socket.on(
    "callUser",
    (data: {
      userToCall: string;
      signalData: any;
      from: string;
      name: string;
    }) => {
      const { userToCall, signalData, from, name } = data;

      io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    }
  );

  socket.on("answerCall", (data: { to: string; signal: any }) => {
    const { to, signal } = data;
    callOngoing();

    io.to(to).emit("callAccepted", signal);
  });
  socket.on("triggerEndCall", () => {
    callOEnded();

    io.emit("callEnded");
  });
  socket.on("emitDtmf", (button) => {
    io.emit("playDtmfTone", button);
  });

  const portOpenSuccess = () => {
    console.log("Serial port opened successfully");
    const incomingInterval = setInterval(callIncoming, 100);
    const cleanUp = () => {
      clearInterval(incomingInterval);
      console.log("Serial port closed");
    };
    serialPort.on("close", cleanUp);
  };
  serialPort.open(portOpenSuccess);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
