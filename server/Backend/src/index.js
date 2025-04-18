/*
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./database");
const https = __importStar(require("https"));
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
const readFile = util.promisify(fs.readFile);
async function startServer() {
    database_1.startConnection();
    https.createServer({
        cert: fs.readFileSync('/etc/letsencrypt/live/www.esfapa.edu.pe/fullchain.pem'),
        key: fs.readFileSync('/etc/letsencrypt/live/www.esfapa.edu.pe/privkey.pem')
    }, app_1.default).listen(app_1.default.get('port'), function () {
        console.log('Servidor https correindo en el puerto 443');
    });
}
startServer();
*/ 

const app_1 = __importDefault(require("./app"));
const database_1 = require("./database");
async function main() {
  startConnection();
  await app_1.listen(app.get('port'));
  console.log('Server on port', app.get('port'));
}
main();
