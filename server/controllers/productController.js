import Models from "../models.js"

class ProductController {

  async getAll(req, res, next) {
    const products = await Models.Product.findAll()
    res.json(products)
  }

  async findById(req, res, next) {
    const { id } = req.params;
    const product = await Models.Product.findByPk(id);
    res.json(product);
  }

}

export default new ProductController()