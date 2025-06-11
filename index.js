const express = require("express");
const cors = require("cors");
const transporter = require("./nodemailerconfig");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
    const { nombre, correo, mensaje } = req.body;

    try {
    await transporter.sendMail({
        from: `"Formulario - Porfolio" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: "Nuevo mensaje de contacto",
        html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>
        `,
    });

    res.status(200).json({ message: "Mensaje enviado con éxito" });
    } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ error: "Error al enviar el mensaje" });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
