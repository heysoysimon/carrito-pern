const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
})

const getProduct = async (req, res) => {
  const response = await pool.query('SELECT id, nombre, des, imagen, precio FROM productos;');
  // para que acepte el otro dominio
  res.setHeader('Access-Control-Allow-Origin', '*');

  const productos = response.rows.map((producto) => {
    return {
      ...producto,
      precio: Number(producto.precio) // Convertir la propiedad "precio" a un número
    }
  })

  console.log(productos)
  res.status(200).json(productos);
};

const createProducto = async (req, res) => {
  const { nombre, des, imagen, precio } = req.body;
  const precioNum = Number(precio); // Convertir la propiedad "precio" a un número
  const response = await pool.query('INSERT INTO productos (nombre, des, imagen, precio) VALUES ($1, $2, $3, $4)', [nombre, des, imagen, precioNum]);

  console.log(response)
  res.json({
    message: 'Producto agregado satisfactoriamente',
    body: {
      producto: {
        nombre,
        des,
        imagen,
        precio // Enviar la propiedad "precio" como un número en la respuesta
      }
    }
  })
}

const deleteProducto = async (req,res) => {
  const id = req.params.id
  const response = await pool.query('DELETE FROM  productos WHERE id = $1', [id])
  console.log(response)
  res.json( `producto ${id} eleminado`)
}

const updateProducto = async (req, res) => {
  const id = req.params.id
  const { nombre, des, imagen, precio } = req.body;
  const precioNum = Number(precio); // Convertir la propiedad "precio" a un número
  const response = await pool.query(
    'UPDATE productos SET nombre = $1, des = $2, imagen = $3, precio = $4 WHERE id = $5',[
    nombre,
    des, 
    imagen, 
    precio, // Pasar la propiedad "precio" como un número a la consulta SQL
    id
    ]);
  console.log(response)
  res.json('Producto actualizado satisfactoriamente')
}
const getProductById = async (req, res) => {
  const id = req.params.id
  const response = await pool.query('SELECT * FROM productos WHERE id = $1', [id])
  const producto = response.rows[0];

  producto.precio = Number(producto.precio); // Convertir la propiedad "precio" a un número

  res.json(producto)
}
module.exports = {
  getProduct,
  createProducto,
  deleteProducto,
  updateProducto,
  getProductById
}
