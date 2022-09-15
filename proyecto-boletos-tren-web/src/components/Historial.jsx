import React, { useEffect, useState } from 'react'
import { ajax } from '../util/ajax';

export const Historial = () => {
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        (async ()=>{
            const ventasTemp = await ajax('ventas');
            setHistorial(ventasTemp);
        })();
    }, []);
  return (
    <div>
        <div class="list-group mt-2">
            {
                historial &&
                historial.map((ventas)=>(
                    <div class="list-group-item list-group-item-action" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{ventas.descripcion}</h5>
                      <small>Precio Unitario: {ventas.precioUnitario}</small>
                    </div>
                    <p class="mb-1">Cantidad: {ventas.cantidad}</p>
                    <small>Total Ventas: {ventas.total}</small>
                  </div>                
                ))
            }
        </div>
    </div>
  )
}
