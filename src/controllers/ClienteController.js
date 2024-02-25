const { request, response } = require("express");
const bcrypt = require('bcrypt');

// //instanciar otros archivos
const Cliente = require('../models/Cliente');
const jwt = require('../helpers/Jwt');

const registro_cliente = async (req = request, res = response) => {

    try {
        const data = req.body;
        const clienteExistente = await Cliente.findOne({ email: data.email });

        if (clienteExistente) {
            return res.status(409).send({ msg: 'El correo ya existe en la base de datos', data: undefined });
        }
        if (!data.password) {
            return res.status(400).send({ msg: 'No hay una contraseña', data: undefined });
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Guardar el registro de cliente en la base de datos
        const nuevoCliente = new Cliente({
          nombres: data.nombres,
          apellidos: data.apellidos,
          email: data.email,
          password: hashedPassword,
        });
    
        await nuevoCliente.save();
    
        res.status(201).send({ data: true });
      } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Error en el servidor', data: undefined });
      }

};

const login_cliente = async (req = request, res = response) => {

  try {
    const data = req.body;

    // Verificar si el correo electrónico existe en la base de datos
    const cliente = await Cliente.findOne({ email: data.email });
    if (!cliente) {
      return res.status(404).send({ msg: 'El correo no está registrado', data: undefined });
    }

    // Verificar la coincidencia de contraseñas
    const passwordMatch = await bcrypt.compare(data.password, cliente.password);
    if (!passwordMatch) {
      return res.status(401).send({ msg: 'Contraseña incorrecta', data: undefined });
    }

    // Resto del código para el proceso de inicio de sesión
    // ...
    // Generar el token de acceso
    const token = jwt.createToken(cliente);

    res.status(200).send({ data: { cliente, token } });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Error en el servidor', data: undefined });
  }

};

const obtenerClientes = async (req = request, res = response) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).send({ data: clientes });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Error en el servidor', data: undefined });
  }
};

module.exports = {
    registro_cliente,
    login_cliente,
    obtenerClientes
};