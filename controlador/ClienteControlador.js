const modelo = require('../modelo/ClienteModelo');

class ClienteControlador {
    // Crear nuevo cliente
    static async crearCliente(req, res) {
        const { t1: doc, t2: name, t3: tel, t4: email, t5: contra } = req.body;
        
        // ------------👁️‍🗨️ validaciones 👁️‍🗨️----------------
        // Validar campos vacíos
        const errorCampos = ClienteControlador.verCampos(doc, name, tel, email, contra);
        if (errorCampos) {
            return res.status(400).json({ error: errorCampos });
        }

        // Validar documento
        const erorIde = ClienteControlador.verIde(doc);
        if (erorIde) {
            return res.status(400).json({ error: erorIde });
        }

        // Validar nombres completos
        const errornom = ClienteControlador.vernom(name);
        if (errornom) {
            return res.status(400).json({ error: errornom });
        }

        // Validar teléfono
        const errortel = ClienteControlador.verTel(tel);
        if (errortel) {
            return res.status(400).json({ error: errortel });
        }

        // Validar correo
        const errorem = ClienteControlador.veremail(email);
        if (errorem) {
            return res.status(400).json({ error: errorem });
        }

        // Validar contraseña
        const errorkey = ClienteControlador.verkey(contra);
        if (errorkey) {
            return res.status(400).json({ error: errorkey });
        }

        // Si las validaciones pasan, intentamos crear el cliente
        try {
            const result = await modelo.crearClientes(doc, name, tel, email, contra);
            res.status(201).json({ mensaje: 'Cliente creado', id: result.insertId });
        } catch (err) {
            if (err.message.includes("Duplicate entry")) {
                return res.status(409).json({ 
                    error: 'Ya existe un usuario con estos datos.',
                    sugerencia: 'Intenta recuperar la cuenta o inicia sesión.' 
                });
            } else {
                return res.status(500).json({ error: 'Error inesperado: ' + err.message });
            }
        }
        // ------------👁️‍🗨️ fin validaciones 👁️‍🗨️------------
    }

    //-------------------validaciones----------------------------

    static verCampos(doc, name, tel, email, contra) {
        if (!doc || !name || !tel || !email || !contra) {
            return 'Todos los campos son obligatorios.';
        }
        return null; // no encontró campos vacíos
    }

    // Validar documento
    static verIde(doc) {
        if (!/^\d{8,10}$/.test(doc)) {
            return 'La identificación debe tener entre 8 y 10 dígitos numéricos.';
        }
        return null; // Todo bien
    }

    // Verificar nombres completos
    static vernom(name) {
        const nom = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
        if (!nom.test(name)) {
            return 'Nombres y apellidos inválidos. Mínimo 3 caracteres, máximo 100, solo letras y espacios.';
        }
        return null;
    }

    // Verificar teléfono
    static verTel(tel) {
        if (!/^\d{10}$/.test(tel)) {
            return 'El teléfono debe tener exactamente 10 dígitos numéricos.';
        }
        return null; // Todo bien
    }

    // Validar correo
    static veremail(email) {
        const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!er.test(email) || email.length > 200) {
            return 'Correo inválido. Ejemplo válido: ejemplo@email.com';
        }
        return null;
    }

    // Verificar contraseña
    static verkey(contra) {
        const key = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!key.test(contra)) {
            return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.';
        }
        return null;
    }
}

module.exports = ClienteControlador;
