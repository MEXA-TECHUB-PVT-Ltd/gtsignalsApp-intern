const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv')
const socketIo = require('socket.io');
const bodyParser = require("body-parser");
const http = require('http');

const pool = require("././app/config/dbconfig")
const imageUploadRouter = require('./app/uploadimage');
// const serviceAccount = require('./gtcaptionsignals-firebase-adminsdk-ujvae-29a88cdd4e.json'); // Adjust the path

const app = express();
// const io = socketIo(server);
const port = 4000;

dotenv.config();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}));

app.use(express.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check the 'type' field in the request to determine the folder
    const uploadType = req.body.type === 'broker' ? 'broker' : 'profile_image';
    const uploadPath = `./uploads/${uploadType}`;

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST endpoint for uploading images
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: true, msg: 'No file uploaded.' });
  }

  const uploadType = req.body.type === 'broker' ? 'broker' : 'profile_image';
  const imageUrl = `uploads/${uploadType}/${req.file.filename}`;

  res.status(200).json({ error: false, imageUrl: imageUrl });
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/uploadimage', imageUploadRouter);
app.use("/admin", require("./app/routes/admin/adminroutes"))
app.use("/user", require("./app/routes/user/userroutes"))
app.use("/applink", require("./app/routes/applink/applinkroutes"))
app.use("/ratelink", require("./app/routes/ratelink/ratelinkroutes"))
app.use("/chatlink", require("./app/routes/chat/chatlinkroutes"))
app.use("/signal", require("./app/routes/signal/signalroutes"))
app.use("/takeprofit", require("./app/routes/takeprofit/takeprofitroutes"))
app.use("/broker", require("./app/routes/broker/brokerroutes"))
app.use("/wishlist", require("./app/routes/wishlist/wishlistroutes"))
app.use("/notifications", require("./app/routes/notification/notificationroutes"))

app.get('/', (req, res) => {
  res.json({ message: 'GT Caption Signals !' });
});

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

// const connectedUsers = {};
// // global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//     //   global.chatSocket = socket;
//     console.log("Socket Connected ===>" + socket.id);

//     socket.on('login', (userInfo) => {
//         connectedUsers[userInfo] = socket.id;
//         connectedUsers[userInfo.userId] = { socketId: socket.id, username: userInfo.username };
//         console.log(`User ${userInfo.userId} connected`);
//     });

//     socket.on('privateMessage', ({ targetUserId, message }) => {
//         const targetSocketId = connectedUsers[targetUserId]?.socketId;
//         console.log("userID", targetUserId);
//         if (targetSocketId) {
//             // Send the private message to the target user
//             io.to(targetSocketId).emit('privateMessage', { senderId: targetUserId, message });
//         } else {
//             // Handle the case when the target user is not online
//             console.log(`User ${targetUserId} is not online`);
//         }
//     });

//     socket.on('disconnect', () => {
//         // Remove the disconnected user from the connectedUsers object
//         const userId = Object.keys(connectedUsers).find(key => connectedUsers[key] === socket.id);
//         if (userId) {
//             delete connectedUsers[userId];
//             console.log(`User ${userId} disconnected`);
//         }
//     });

// }); 

const users = {};

let adminSocket = null;

const saveMessageToDB = async (userId, adminId, message, senderType) => {
 console.log(userId, adminId, message, senderType);
 try {
  const query = 'INSERT INTO messages (user_id, admin_id, sender_type, message) VALUES ($1, $2, $3, $4)';
  await pool.query(query, [userId, adminId, senderType, message]);
  console.log('Message saved to the database.');
} catch (error) {
  console.error('Error saving message to the database:', error);
}
};

const getInitialMessages = async () => {
  try {
    const query = 'SELECT * FROM messages';
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

let currentUserId = null;

io.on('connection', async (socket) => {
  // When a new user connects
  socket.on('user_connect', (userId) => {
    users[userId] = socket;
    console.log(userId);
    currentUserId = userId;
    console.log(`User ${userId} connected.`);
  });

  // When an admin connects
  socket.on('admin_connect', () => {
    if (adminSocket) {
      adminSocket.disconnect(); // Disconnect existing admin
    }
    adminSocket = socket;
    console.log('Admin connected.');
  });

  socket.on('user_message', async (data) => {
    if (adminSocket) {
      adminSocket.emit('message_from_user', { userId: currentUserId, message: data });
      const userId = 1; // Your desired user ID
      // console.log("currentUserId", currentUserId)
      // console.log("user",currentUserId, 1, data, 'user')
      await saveMessageToDB(currentUserId, 1, data, 'user');
    } else {
      console.log('Admin is not connected.');
    }
  });

  socket.on('admin_message', async (data) => {
    const { userId, message } = data;
    if (users[userId]) {
      users[userId].emit('message_from_admin', message);
      // console.log("admin", userId, 1, data.message, 'admin');
      await saveMessageToDB(userId, 1, data.message, 'admin');
    } else {
      console.log(`User ${userId} is not connected.`);
    }
  });
  
  const initialMessages = await getInitialMessages();
  socket.emit('initial_messages', initialMessages);
  
  // Handle disconnecons
  socket.on('disconnectit', () => {
    if (socket === adminSocket) {
      adminSocket = null;
      console.log('Admin disconnected.');
    } else {
      const userId = Object.keys(users).find((key) => users[key] === socket);
      if (userId) {
        delete users[userId];
        console.log(`User ${userId} disconnected.`);
      }
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
}); 