const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");
const { decode } = require("punycode");

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    });
};
class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email && !password) {
            return next(ApiError.badRequest("Некорректный email или password"));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(
                ApiError.badRequest("Пользователь с таким email уже существует")
            );
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, role, password: hashPassword });
        const basket = await Basket.create({ userId: user.id });
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }
    async login(req, res, next) {
        console.log(1);
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal("Пользователь не найден  "));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal("Пользователь не найден"));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    }
    async destroy(req, res) {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json("Пользователь не авторизован");
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const user = User.findOne({
            where: {
                email: decode.email,
                role: decode.role,
                id: decode.id,
            },
        });
        if (!user) {
            return res.status(404).json("Пользователь не найден");
        }
        const delUser = User.destroy({
            where: {
                email: decode.email,
                role: decode.role,
                id: decode.id,
            },
        });
        console.log(delUser);
        res.status(200).json(user, { message: "Пользователь успешно удалён" });
    }
    async uppdate(req, res) {
        const { email, password } = req.body;
        if (!email && !password) {
            res.status(449).json("Не достаточно данных");
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json("Пользователь не авторизован");
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const user = User.findOne({
            where: {
                email: decode.email,
                role: decode.role,
                id: decode.id,
            },
        });
        if (!user) {
            return res.status(404).json("Пользователь не найден");
        }
        email = user.email ? !email : email == " ";
        password = user.password ? !password : password == " ";
        const hashPassword = await bcrypt.hash(password, 5);
        const uppUser = User.update({ email: email, password: password });
        res.status(200).json({ uppUser }, { user });
    }
}
module.exports = new UserController();
