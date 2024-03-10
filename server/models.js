import db from "./db.js"
import { DataTypes } from "sequelize"
// import { v4 as uuidv4 } from 'uuid';


const Product = db.define('products', {
      id: {type: DataTypes.INTEGER, primaryKey: true}, 
      categoryId: {type: DataTypes.INTEGER},
      title: {type: DataTypes.STRING, unique: true, allowNull: false},
      image: {type:DataTypes.STRING, allowNull: false},
      rating: {type:DataTypes.STRING},
      price: {type:DataTypes.INTEGER, allowNull: false}
}, { timestamps: false })


const Category = db.define('categories', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},

}, { timestamps: false })

const Order = db.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false}
}, { timestamps: false });

const OrderItem = db.define('order_items', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    orderId: {type: DataTypes.INTEGER, allowNull: false},    
    productId: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false}
}, { timestamps: false });

Order.hasMany(OrderItem, {foreignKey: 'orderId'});
OrderItem.belongsTo(Order, {foreignKey: 'orderId'});

OrderItem.belongsTo(Product, {foreignKey: 'productId'});
Product.hasMany(OrderItem, {foreignKey: 'productId'});

Product.belongsTo(Category);
Category.hasMany(Product); 
                            
export default { 
    Product,
    Category,
    Order,
    OrderItem
}