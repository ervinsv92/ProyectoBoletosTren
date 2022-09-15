const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const db = require('./db');
const Boletos = require('./modelos/boletos');
const Ventas = require('./modelos/ventas');

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.json({mensaje:'Hola Iveth desde NodeJS'});
});

app.get('/boletos', async (req, res)=>{
    const boletos = await Boletos.findAll();
    res.json(boletos);
});

app.post('/venta', async (req, res)=>{
    const {idBoleto, cantidad} = req.body;
    const boleto = await Boletos.findByPk(idBoleto);

    if(boleto == null){
        return res.status(404).json({mensaje:`El boleto con el código ${idBoleto} no existe`});
    }else if(isNaN(cantidad)){
        return res.status(404).json({mensaje:`La cantidad ${cantidad} debe ser un número entero`});
    }
    
    const ventaCreada = await Ventas.create({
        idBoleto,
        cantidad,
        total: parseFloat(parseInt(cantidad)) * parseFloat(boleto.precio)
    });

    res.json(ventaCreada);
});

app.get('/ventas', async (req, res)=>{
    const ventas = await db.query('CALL sp_historialVentas()');
    res.json(ventas);
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
