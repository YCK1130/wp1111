import server from "./server";
import mongo from "./mongo";
// const server = server;

const PORT = process.env.PORT | 4000;
mongo.connect();

server.listen({ port: PORT }, () => {
    console.log(`The server is up on port ${PORT}!`);
});
