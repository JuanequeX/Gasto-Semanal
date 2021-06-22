import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from './Error';

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {

  //States para agregar el nombre y la cantidad de gato
  const [ nombre, guardarNombre ] = useState('');
  const [ cantidad, guardarCantidad ] = useState(0);
  const [ error, guardarError ] = useState(false);

  //State para cuando el ususario ya a agregado el gasto
  const agregarGasto = e => {
    e.preventDefault();

    //Validacion
    if(cantidad < 1 || isNaN( cantidad ) || nombre.trim() === '') {
      guardarError(true)
      return;
    }
    guardarError(false);

    //Construir un gasto
    const gasto = {
      nombre,
      cantidad,
      id: shortid.generate()
    }
    //Pasar el gasto al componente principal
    guardarGasto(gasto);
    guardarCrearGasto(true);
    //Reseteo del formulario para seguir agregando gastos
    guardarNombre('');
    guardarCantidad(0);
  }
  return (
    <form
      onSubmit = { agregarGasto }
    >
      <h2>Agrega tus gastos aqui</h2>
      {error ? <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto" /> 
        : null
      }

      <div className = "campo">
        <label>Nombre del Gasto</label>
        <input
          type = "text"
          className = "u-full-width"
          placeholder = "Ej. Transporte"
          value = {nombre}
          onChange = { e => guardarNombre(e.target.value)}
        />

        <label>Cantidad del Gasto</label>
        <input
          type = "number"
          className = "u-full-width"
          placeholder = "Ej. $500"
          value = {cantidad}
          onChange = {e => guardarCantidad( parseInt( e.target.value,10 ) )}
        />
      </div>

        <input
          type = "submit"
          className = "button-primary u-full-width"
          value = "Agregar Gasto"
        />
    </form>
  );
}

Formulario.propTypes = {
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired
}
export default Formulario;
