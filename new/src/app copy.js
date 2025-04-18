"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const _1_new_route_1 = __importDefault(require("./3.routes/1_new.route"));
const land_route_1 = __importDefault(require("./server/land.route"));
const foro_route_1 = __importDefault(require("./server/foro.route"));
const _1_users_route_1 = __importDefault(require("./3.routes/1_users.route"));
const _2_curses_route_1 = __importDefault(require("./3.routes/2_curses.route"));
const _3_sections_route_1 = __importDefault(require("./3.routes/3_sections.route"));
const _4_themes_route_1 = __importDefault(require("./3.routes/4_themes.route"));
const _5_task_route_1 = __importDefault(require("./3.routes/5_task.route"));
const _6_integer_route_1 = __importDefault(require("./3.routes/6_integer.route"));
const _7_MV_route_1 = __importDefault(require("./3.routes/7_MV.route"));
const _16_TESIS_route_1 = __importDefault(require("./3.routes/16_TESIS.route"));
const _17_BIBLIOTECA_route_1 = __importDefault(require("./3.routes/17_BIBLIOTECA.route"));
const AVERAGE_route_1 = __importDefault(require("./3.routes/AVERAGE.route"));
const FilecurseTeacher_route_1 = __importDefault(require("./3.routes/FilecurseTeacher.route"));
// Initializations
const app = express_1.default();
// Settings
app.set('port', process.env.PORT || 9797);
// Middlewares
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(express_1.default.json());
// Routes
app.use("/api/news", _1_new_route_1.default);
app.use("/api/land", land_route_1.default);
app.use("/api/foro", foro_route_1.default);
app.use('/api/users', _1_users_route_1.default);
app.use("/api/curses", _2_curses_route_1.default);
app.use("/api/sections", _3_sections_route_1.default);
app.use("/api/themes", _4_themes_route_1.default);
app.use("/api/task", _5_task_route_1.default);
app.use("/api/integer", _6_integer_route_1.default);
app.use("/api/MV", _7_MV_route_1.default);
app.use("/api/TESIS", _16_TESIS_route_1.default);
app.use("/api/BIBLIOTECA", _17_BIBLIOTECA_route_1.default);
app.use("/api/AVERAGE", AVERAGE_route_1.default);
app.use("/api/FilecurseTeacher", FilecurseTeacher_route_1.default);
// this folders for this application will be used to store public file images
app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
exports.default = app;
