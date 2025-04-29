const dbService = require('./bd/Conexion');
const bcrypt = require('bcrypt');
class ClienteModelo {
    static async crearClientes(doc, name, tel, email, contras) {
        const query = 'INSERT INTO usuarios (documento, nombre, telefono, correo, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
        try {
          // Generar el hash de la contraseña con bcrypt
          const salto = 10; // Nivel de seguridad de encriptación
          const contra = await bcrypt.hash(contras, saltRounds);
    
          return await dbService.query(query, [doc, name, tel, email, contra, "Cliente", "Activo"]);
        } catch (err) {
          throw new Error(`Error al crear el Cliente: ${err.message}`);
        }
      }
    
    
}
module.exports = ClienteModelo;