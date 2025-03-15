// Obtener elementos del DOM
const form = document.querySelector("form");
const transactionList = document.querySelector("#transaction-list");
const notification = document.getElementById("notification"); // Elemento para mostrar mensajes
const transacciones = [];

// Clase base Movimiento
function Movimiento(descripcion, monto, tipo) {
  this.descripcion = descripcion;
  this.monto = monto;
  this.tipo = tipo;
  this.fecha = new Date().toLocaleDateString();
}

// Métodos comunes
Movimiento.prototype.validarGeneral = function () {
  if (this.monto <= 0) {
    return { ok: false, message: "El monto debe ser mayor a 0" };
  }
  if (this.descripcion.trim() === "") {
    return { ok: false, message: "Debe completar la descripción" };
  }
  return { ok: true, message: "Validación general exitosa" };
};

Movimiento.prototype.render = function () {
  const esEgreso = this.tipo === "expense";
  const colorTexto = esEgreso ? "text-red-600" : "text-green-600";
  const colorFondo = esEgreso ? "bg-red-50" : "bg-green-50";
  const signo = esEgreso ? "-" : "+";

  const newRow = `
    <tr class="hover:${colorFondo} ${colorFondo}/30 transition-colors duration-200">
      <td class="px-4 py-3 font-medium">${this.descripcion}</td>
      <td class="px-4 py-3 ${colorTexto} font-bold">${signo}$${Math.abs(
    this.monto
  ).toFixed(2)}</td>
      <td class="px-4 py-3 text-gray-500">${this.fecha}</td>
      <td class="px-4 py-3">
        <span class="inline-block rounded-full px-3 py-1 text-xs ${colorFondo} ${colorTexto}">
          ${this.tipo}
        </span>
      </td>
    </tr>
  `;
  transactionList.insertAdjacentHTML("beforeend", newRow);
};

// Método para recalcular totales
Movimiento.prototype.recalcularTotales = function () {
  const income = transacciones
    .filter((t) => t.tipo === "income")
    .reduce((total, t) => total + Number(t.monto), 0);

  const expense = transacciones
    .filter((t) => t.tipo === "expense")
    .reduce((total, t) => total + Number(t.monto), 0);

  const balance = income - expense;

  // Actualizar el DOM
  document.getElementById("balance").textContent = `$${balance.toFixed(2)}`;
  document.getElementById("income").textContent = `$${income.toFixed(2)}`;
  document.getElementById("expense").textContent = `$${expense.toFixed(2)}`;
};

// Clase Ingreso (hereda de Movimiento)
function Ingreso(descripcion, monto) {
  Movimiento.call(this, descripcion, monto, "income");
}

Ingreso.prototype = Object.create(Movimiento.prototype);
Ingreso.prototype.constructor = Ingreso;

// Validación específica para Ingreso
Ingreso.prototype.validarEspecifico = function () {
  if (this.monto > 10000) {
    return { ok: false, message: "El monto de ingreso no puede superar $10,000" };
  }
  return { ok: true, message: "Validación de ingreso exitosa" };
};

// Clase Egreso (hereda de Movimiento)
function Egreso(descripcion, monto) {
  Movimiento.call(this, descripcion, monto, "expense");
}

Egreso.prototype = Object.create(Movimiento.prototype);
Egreso.prototype.constructor = Egreso;

// Validación específica para Egreso
Egreso.prototype.validarEspecifico = function () {
  if (this.monto > 5000) {
    return { ok: false, message: "El monto de egreso no puede superar $5,000" };
  }
  return { ok: true, message: "Validación de egreso exitosa" };
};

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = "success") {
  notification.textContent = mensaje;
  notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${
    tipo === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  notification.classList.remove("hidden");

  // Ocultar la notificación después de 3 segundos
  setTimeout(() => {
    notification.classList.add("hidden");
  }, 3000);
}

// Función para crear el movimiento adecuado
function crearMovimiento(tipo, descripcion, monto) {
  let movimiento;
  if (tipo === "income") {
    movimiento = new Ingreso(descripcion, monto);
  } else if (tipo === "expense") {
    movimiento = new Egreso(descripcion, monto);
  } else {
    return { ok: false, message: "Tipo de movimiento no válido" };
  }

  // Validar general y específico
  const validacionGeneral = movimiento.validarGeneral();
  if (!validacionGeneral.ok) {
    return validacionGeneral;
  }

  const validacionEspecifica = movimiento.validarEspecifico();
  if (!validacionEspecifica.ok) {
    return validacionEspecifica;
  }

  return { ok: true, message: "Movimiento creado exitosamente", movimiento };
}

// Función para manejar el formulario
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const descripcion = formData.get("description");
  const monto = Number(formData.get("amount"));
  const tipo = formData.get("type");

  const resultado = crearMovimiento(tipo, descripcion, monto);

  if (resultado.ok) {
    transacciones.push(resultado.movimiento);
    resultado.movimiento.render();
    resultado.movimiento.recalcularTotales(); // Actualizar totales
    mostrarNotificacion(resultado.message, "success"); // Mostrar notificación
    form.reset(); // Resetear el formulario
  } else {
    mostrarNotificacion(resultado.message, "error"); // Mostrar notificación de error
  }
});

// Eliminar transacción
transactionList.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const row = event.target.closest("tr");
    const descripcion = row.querySelector("td").textContent;

    const index = transacciones.findIndex((t) => t.descripcion === descripcion);
    if (index !== -1) {
      transacciones.splice(index, 1);
    }

    row.remove();
    const movimiento = new Movimiento();
    movimiento.recalcularTotales(); // Actualizar totales
  }
});