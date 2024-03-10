import Models from "../models.js"

class OrderController {

  async getAll(req, res, next) {
    const orders = await Models.Order.findAll()
    res.json(orders)
  }

  async findById(req, res, next) {
    const { id } = req.params;
    const order = await Models.Order.findByPk(id, { 
      include: Models.OrderItem 
    });
    
    res.json(order);
  }

  async create(req, res, next) {
    const { email, phone, address, orderItems } = req.body;
    
    const order = await Models.Order.create({ email, phone, address });

    for (let item of orderItems) {
      await Models.OrderItem.create({
        orderId: order.id,
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      });
    }   

    const result = await Models.Order.findByPk(order.id, { include: Models.OrderItem });
    
    res.json(result);
  }
}

export default new OrderController()