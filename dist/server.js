"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = require("./middlewares/auth");
var users_1 = require("./handlers/users");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res, next) {
    res.send("hiiii");
});
app.post('/signup', users_1.createNewUser);
app.post('/signin', users_1.signin);
app.use('/api/v1', auth_1.protect, router_1.default);
app.use(function (err, req, res, next) {
    console.log(err);
    res.json({ message: "had an error: ".concat(err.message) });
});
exports.default = app;
//# sourceMappingURL=server.js.map