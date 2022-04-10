require('dotenv').config();

const Hapi = require('@hapi/hapi');

console.log('Berjalan');

const album = require('./api/album');
const AlbumService = require('./services/AlbumService');

const init = async () => {
    const albumService = new AlbumService();

    const server = Hapi.server({
       port: process.env.PORT,
       host: process.env.HOST,
       routes: {
           cors: {
               origin: ['*']
           }
       }
    });
    await server.register([
        {
            plugin: album,
            options: {
                service: albumService
            }
        }
    ]);
    await server.start();
    console.log(`Server Berjalan Pada ${server.info.uri}`);
}
init();