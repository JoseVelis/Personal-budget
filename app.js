console.log("<------- Personal Budget -------->");

/**
 * "Como usuario, quiero registrar el nombre, tipo(ingreso ó egreso) y monto 
 * de una compra o ingreso, para llevar un control de mi dinero."
Criterios de Aceptación:
El sistema solicita el nombre y duración.
Si el nombre está vacío o la duración es menor o igual a cero, muestra un mensaje de error.
Si los datos son válidos, se guarda la actividad.
 */

// variable global que permita registrar las operaciones
const transacciones = [];

function validarDatos(nombre, tipo, monto) {
  if (!nombre.trim()) {
    alert("Error: El nombre no puede estar vacío");
    return false;
  }
  
  if (tipo !== "1" && tipo !== "2") {
    alert("Error: Debe seleccionar 1 para Ingreso o 2 para Egreso");
    return false;
  }
  
  const montoNumerico = parseFloat(monto);
  if (isNaN(montoNumerico) || montoNumerico <= 0) {
    alert("Error: El monto debe ser un número mayor a cero");
    return false;
  }
  
  return true;
}

function mostrarResumenPorTipo() {
  const totalPorTipo = transacciones.reduce((acumulador, transaccion) => {
    const tipo = transaccion.tipoDeTransaccion;
    if (!acumulador[tipo]) {
      acumulador[tipo] = 0;
    }
    acumulador[tipo] += transaccion.monto;
    return acumulador;
  }, {});

  console.log("\n----- Resumen por Tipo -----");
  for (const tipo in totalPorTipo) {
    console.log(`Total ${tipo}: $${totalPorTipo[tipo].toFixed(2)}`);
  }
}

function calcularTotalSaldo() {
  return transacciones.reduce((acumulador, transaccion) => {
    const monto = transaccion.tipoDeTransaccion === "Ingreso" 
      ? transaccion.monto 
      : -transaccion.monto;
    return acumulador + monto;
  }, 0);
}

function mostrarResumen() {
  const cantidadMovimientos = transacciones.length;
  const saldoTotal = calcularTotalSaldo();

  console.log("\n----- Resumen General -----");
  console.log(`Cantidad de movimientos: ${cantidadMovimientos}`);
  console.log(`Saldo total: $${saldoTotal.toFixed(2)}`);
  mostrarResumenPorTipo();
  mostrarMovimientosMaximos();
}

function registrarIngresoOEgreso() {
  while (true) {
    let transaccion, tipoDeTransaccion, monto;
    let datosValidos = false;
    
    while (!datosValidos) {
      transaccion = prompt("Ingrese el nombre de la transacción");
      tipoDeTransaccion = prompt(
        "Escoja el tipo de transacción \n1) Ingreso\n2) Egreso\n\n Solo debe poner el número de la opción"
      );
      monto = prompt("Ingrese el monto de la transacción");
      
      datosValidos = validarDatos(transaccion, tipoDeTransaccion, monto);
    }

    transacciones.push({
      transaccion,
      tipoDeTransaccion: tipoDeTransaccion === "1" ? "Ingreso" : "Egreso",
      monto: parseFloat(monto),
      fechaDeCreacion: new Date(),
    });

    const confirmacion = confirm("¿Desea agregar otra transacción?");
    if (!confirmacion) {
      break;
    }
  }
  
  console.log("Transacciones registradas:", transacciones);
  mostrarResumen();
}

// Add these new functions after the existing ones
function eliminarMovimiento(nombre) {
  const indice = transacciones.findIndex(t => t.transaccion.toLowerCase() === nombre.toLowerCase());
  if (indice === -1) {
    console.log(`No se encontró ningún movimiento con el nombre "${nombre}"`);
    return false;
  }
  
  transacciones.splice(indice, 1);
  console.log(`Se eliminó el movimiento "${nombre}"`);
  return true;
}

function mostrarMovimientosMaximos() {
  const ingresos = transacciones.filter(t => t.tipoDeTransaccion === "Ingreso");
  const egresos = transacciones.filter(t => t.tipoDeTransaccion === "Egreso");
  
  const ingresoMax = ingresos.reduce((max, t) => 
    t.monto > max.monto ? t : max, { monto: 0 });
    
  const egresoMax = egresos.reduce((max, t) => 
    t.monto > max.monto ? t : max, { monto: 0 });

  console.log("\n----- Movimientos Máximos -----");
  if (ingresoMax.monto > 0) {
    console.log(`Ingreso más alto: $${ingresoMax.monto.toFixed(2)} (${ingresoMax.transaccion})`);
  }
  if (egresoMax.monto > 0) {
    console.log(`Egreso más alto: $${egresoMax.monto.toFixed(2)} (${egresoMax.transaccion})`);
  }
}

// Add this new function to manejar las opciones del menú
function mostrarMenu() {
  while (true) {
    const opcion = prompt(
      "Seleccione una opción:\n" +
      "1) Registrar movimiento\n" +
      "2) Eliminar movimiento\n" +
      "3) Ver resumen\n" +
      "4) Salir"
    );

    switch (opcion) {
      case "1":
        registrarIngresoOEgreso();
        break;
      case "2":
        const nombreEliminar = prompt("Ingrese el nombre del movimiento a eliminar:");
        eliminarMovimiento(nombreEliminar);
        if (transacciones.length > 0) mostrarResumen();
        break;
      case "3":
        if (transacciones.length > 0) mostrarResumen();
        else console.log("No hay movimientos registrados");
        break;
      case "4":
        return;
      default:
        alert("Opción no válida");
    }
  }
}

// Replace the direct call to registrarIngresoOEgreso with:
mostrarMenu();