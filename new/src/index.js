"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
import app from './app';
import { startConnection } from './database'
import * as https from 'https';
import * as fs from 'fs';
import * as util from 'util'
const readFile = util.promisify(fs.readFile);
async function startServer() {
  startConnection();
  https.createServer({
    cert: fs.readFileSync('/etc/letsencrypt/live/www.esfapa.edu.pe/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/www.esfapa.edu.pe/privkey.pem')
  },app).listen(app.get('port'), function(){
    console.log('Servidor https correindo en el puerto 443');
  });
}
startServer();

*/

const app_1 = __importDefault(require("./app"));
const database_1 = require("./database");
async function main() {
    database_1.startConnection();
    await app_1.default.listen(app_1.default.get('port'));
    console.log('Server on port', app_1.default.get('port'));
}
main();
