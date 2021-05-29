const express = require("express");
const socketio = require("socket.io")
const http = require("http");
const cors = require("cors");
const dotenv = require('dotenv');
const { GET_PROVIDER, GET_PROVIDER_TV } = require('./serchProvider');
const { GET_COUNTREIS } = require('./getRegions');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'polling']
});
dotenv.config();

io.on('connection', onConcection);

async function onConcection(client) {
    client.on('getProvider', handle_get_provider);
    client.on('getProviderTv', handle_get_provider_tv);
    client.on('getRegion', handle_movie_region);

    async function handle_movie_region(name, movieId, createYear, flags, type) {
        var fix_name = name.toLowerCase();
        const data = await GET_COUNTREIS(fix_name, createYear);
        if (data) {
            client.emit("updateFlag", data, movieId);
        }
    }

    async function handle_get_provider(value, movieid, year, cuurentName) {
        const data = await GET_PROVIDER(value, cuurentName);
        client.emit("updateProvider", data, movieid);
    }
    async function handle_get_provider_tv(value, movieid, year) {
        const data = await GET_PROVIDER_TV(value, year);
        client.emit("updateProviderTv", data, movieid);
    }

}
app.use(cors())

if (process.env.PROD) {
    app.use(express.static(path.join(__dirname, './client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'))
    })
}
const port = process.env.PORT || 8008;

server.listen(port, () => console.log(`server is running on port ${port}`));
