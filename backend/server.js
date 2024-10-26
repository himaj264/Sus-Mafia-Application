const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const { initializeBlockchain } = require('./config/blockchain');
const startChecking = require('./config/cronjob');

const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schemas/index.js');
const graphqlResolvers = require('./graphql/resolvers/index.js');

// load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();
// Blockchain
initializeBlockchain();
// Cron Job
startChecking();

// Create Express instance
const app = express();

// Express setup
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route files
const chatRouter = require('./routes/chatRouter');

// Dev middleware Morgan
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
} else {
	console.log(`${process.env.NODE_ENV} mode running.`);
}

// Home
app.get('/', (req, res) => {
	res.status(200).send(
		`<h1>SusMafia API is running</h1>`
	);
});

// Mount routers
app.use('/api/v1/chat', chatRouter);
app.use(
  '/graphql',
  graphqlHTTP((req, res, graphQLParams) => {
    return {
      schema: graphqlSchema,
      rootValue: graphqlResolvers,
      context: { req },
      graphiql: process.env.NODE_ENV === 'development' ? true : false,
    };
  })
);

// Handling invalid routes
app.get('*', (req, res) => {
	res.status(200).send(
		`<h1>Invalid API URL</h1>`
	);
});

// access env vars
const PORT = process.env.PORT || 8080;

const server = app.listen(
	PORT,
	console.log(
		`The server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
	)
);

// Web Sockets
const io = require('socket.io')(server, {
cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}});

const Chat = require("./models/chatModel");

io.on("connection", (socket) => {
	// Join Room
	socket.on("Join Room", (roomId) => {
    socket.join(roomId);
    console.log(`User with ID: ${socket.id} joined room: ${roomId}`);
  });

  socket.on("Input Chat Message", async (msg) => {
    try {
      let chat;

      if (msg.roomId) {
        chat = new Chat({
          chatMessage: msg.chatMessage,
          sender: msg.sender,
          type: msg.type,
          roomId: msg.roomId,
        });
      }
			else {
				chat = new Chat({
          chatMessage: msg.chatMessage,
          sender: msg.sender,
          type: msg.type,
        });
			}

      chat.save((err, doc) => {
        if (err) console.log(err);
        Chat.findById(doc._id)
          .populate("sender")
          .exec((err, doc) => {
						return socket.to(msg.roomId).emit("Output Chat Message", doc);
            // return io.emit("Output Chat Message", doc);
          });
      });
    } catch (error) {
      console.log(error);
    }
  });

	socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

/**
 * Error handler.
 * Sends 400 for Mongoose validation errors.
 * 500 otherwise.
 * Do all error handling here.
 */
app.use((err, req, res, next) => {
	console.log('Async error handler');

	if (err.name === 'ValidationError') {
		return res.status(400).json(err.errors);
	}
	if (err.name === 'CastError') {
		return res.status(404).json(err.errors);
	} else {
		console.log(err);
	}

	return res.status(500).json(err);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log('UNHANDLE');
	console.log(`Error: ${err.message}`);
	//close server and exit process
	server.close(() => process.exit(1));
});