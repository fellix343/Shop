const uuid = require("uuid");
const path = require("path");
const { dirname } = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError.js");

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", fileName));

            const device = await Device.create({
                name,
                price,
                brandId,
                typeId,
                img: fileName,
            });

            if (info) {
                info = JSON.parse(info);
                info.forEach((i) =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id,
                    })
                );
            }

            return res.status(200).json(device);
        } catch (e) {
            console.log(e.message);
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res) {
        //Вот кусок говна
        let { brandId, typeId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset });
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({
                where: { brandId },
                limit,
                offset,
            });
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: { typeId },
                limit,
                offset,
            });
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: { typeId, brandId },
                limit,
                offset,
            });
        }
        return res.json(devices);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: "info" }],
        });
        return res.json(device);
    }
    async destroy(req, res) {
        const { name } = req.body;
        if (!name) {
            return res.status(404).json("Имя девайса не было указано ");
        }
        const device = await Device.findOne({ where: { name: name } });
        if (!brand) {
            return res.status(404).json("Девайс с данным именем не найден  ");
        }
        const delDevice = await Device.destroy({ where: { name: name } });
        return res.status(200).json(...(device + "Брєнд удалён"));
    }
    async chengeName(req, res) {
        const { name, newName, newPrice } = req.body;
        if (!name) {
            return res.status(404).json("Имя девайса не было указано ");
        } else if (!newName) {
            return res
                .status(401)
                .json("Нельзя заменить имя на пустую строку ");
        }
        const device = await Device.findOne({ where: { name: name } });
        newPrice = device.price ? newPrice === 0 : !newPrice;
        if (!brand) {
            return res.status(404).json("Девайс с данным именем не найден  ");
        }
        const chengeDevice = await Device.update(
            { name: newName, price: newPrice },
            { where: { name: name } }
        );
        return res
            .status(200)
            .json(...(device + "Девайс обновлён" + chengeDevice));
    }
}
module.exports = new DeviceController();
