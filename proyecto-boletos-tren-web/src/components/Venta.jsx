import React, { useEffect, useState } from 'react';
import { ajax } from '../util/ajax';

export const Venta = () => {
  const [boletos, setBoletos] = useState([]);
  const [boletoSeleccionado, setBoletoSeleccionado] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    (async ()=>{
        const boletosTemp = await ajax('boletos');
        setBoletos(boletosTemp);
    })();
  }, []);
  
  const cmbBoletos_change = (event)=>{
    setBoletoSeleccionado(event.target.value);
  }

  const txtCantidad_change = (event)=>{
    setCantidad(event.target.value);
    if(boletoSeleccionado==0){
        setTotal(0);
    }else{
        setTotal(boletos.find(x => x.id == boletoSeleccionado).precio * parseFloat(event.target.value))
    }
  }

  const guardar = async ()=>{
    if(boletoSeleccionado == 0){
        alert("Debe seleccionar el boleto.");
        return;
    }else if(isNaN(cantidad)){
        alert("La cantidad debe ser un número mayor a 0.");
        return;
    }else if(cantidad == 0){
        alert("La cantidad debe ser un número mayor a 0.");
        return;
    }

    const boletosTemp = await ajax('venta',{
        idBoleto:boletoSeleccionado,
        cantidad
    },'POST');
    limpiar();
    alert("Venta guardada");
  }

  const limpiar = ()=>{
    setBoletoSeleccionado(0);
    setCantidad(0);
    setTotal(0);
  }

  return (
    <div>
        <div className='row mt-2'>
            <label htmlFor="">Boleto:</label>
            <div className='col-lg-4'>
                <select name="" id="" className='form-select' value={boletoSeleccionado} onChange={cmbBoletos_change}>
                    <option value={0}>Seleccione...</option>
                    {   
                        boletos &&
                        boletos.map((boleto)=>(<option key={boleto.id} value={boleto.id}>{boleto.descripcion}</option>))
                    }
                </select>
            </div>
        </div>
        <div className='row mt-2'>
            <label htmlFor="">Cantidad:</label>
            <div className='col-lg-4'>
               <input type="text" className='form-control' value={cantidad} onChange={txtCantidad_change}/>
            </div>
        </div>
        <div className='row mt-2'>
            <label htmlFor="">Total:</label>
            <div className='col-lg-4'>
               <input type="text" className='form-control' disabled value={total}/>
            </div>
        </div>
        <div className='row mt-2'>
            <div className='col-lg-4'>
                <button className='btn btn-primary col-lg-12' onClick={guardar}>Guardar</button>
            </div>
        </div>
    </div>
  )
}
