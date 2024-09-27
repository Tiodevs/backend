"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    // receber o token no header de autenticação
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    // verifica se o token é válido
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        // injetar o id do usuário dentro do request
        // INPORTANTE, tem que criar o type dele sobscrevendo o do express
        req.user_id = sub;
        console.log(sub);
        return next();
    }
    catch (error) {
        return res.status(403).json({ error: 'Invalid JWT Token' });
    }
}
