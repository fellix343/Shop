const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
    async create(req, res) {
        const { name } = req.body;
        const brand = await Brand.create({ name });
        return res.json(brand);
    }
    async getAll(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }
    async destroy(req, res) {
        const { name } = req.body;
        if (!name) {
            return res.status(404).json("Имя бренда не было указано ");
        }
        const brand = await Brand.findOne({ where: { name: name } });
        if (!brand) {
            return res.status(404).json("Брєнд с данным именем не найден  ");
        }
        const delBrand = await Brand.destroy({ where: { name: name } });
        return res.status(200).json(...(brand + "Брєнд удалён"));
    }
    async chengeName(req, res) {
        const { name, newName } = req.body;
        if (!name) {
            return res.status(404).json("Имя бренда не было указано ");
        } else if (!newName) {
            return res
                .status(401)
                .json("Нельзя заменить имя на пустую строку ");
        }
        const brand = await Brand.findOne({ where: { name: name } });
        if (!brand) {
            return res.status(404).json("Брєнд с данным именем не найден  ");
        }
        const chengeBrand = await Brand.update(
            { newName },
            { where: { name: name } }
        );
        return res.status(200).json(brand + "Изменение внесенны" + chengeBrand);
    }
}
module.exports = new BrandController();
