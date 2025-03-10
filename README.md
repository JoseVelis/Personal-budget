# Gestor de Presupuesto Personal

Una aplicación de consola JavaScript simple para gestionar finanzas personales mediante el seguimiento de ingresos y gastos.

## 🚀 Características

- Registrar transacciones de ingresos y gastos
- Eliminar transacciones por nombre
- Ver resúmenes financieros
- Seguimiento de ingresos y gastos más altos
- Calcular saldo total

## 💻 Cómo Funciona

El programa se ejecuta en una interfaz de consola y permite a los usuarios:

1. Registrar transacciones:
   - Ingresar nombre de la transacción
   - Seleccionar tipo (Ingreso/Egreso)
   - Ingresar monto

2. Ver resúmenes que incluyen:
   - Número total de transacciones
   - Saldo actual
   - Desglose por tipo de transacción
   - Ingresos y gastos más altos

## 🛠️ Funciones Principales

```javascript
function validarDatos(nombre, tipo, monto)
// Valida los datos ingresados por el usuario para nuevas transacciones

function registrarIngresoOEgreso()
// Maneja el proceso de registro de transacciones

function mostrarResumen()
// Muestra el resumen financiero completo

function calcularTotalSaldo()
// Calcula el saldo actual (ingresos - egresos)

function mostrarResumenPorTipo()
// Muestra el desglose de totales por tipo de transacción

function eliminarMovimiento(nombre)
// Elimina una transacción por nombre

function mostrarMovimientosMaximos()
// Muestra las transacciones de mayor valor en ingresos y egresos
```

## 🤔 Reflexión sobre el Control de Flujo

El uso de estructuras de control de flujo simplificó significativamente el desarrollo:

1. **Bucles While**: 
   - Permiten la entrada continua de datos hasta que sean válidos
   - Mantienen el programa en ejecución hasta que el usuario elija salir
   - Permiten registrar múltiples transacciones en una sesión

2. **Switch**:
   - Crea una estructura de menú clara y mantenible
   - Simplifica el manejo de diferentes opciones del usuario
   - Facilita la adición de nuevas funcionalidades

3. **Condiciones If/Else**:
   - Aseguran la validación de datos
   - Manejan casos extremos (listas vacías, entradas inválidas)
   - Controlan el flujo del programa según las elecciones del usuario

Estas estructuras hicieron que el código fuera más robusto y fácil de usar, manteniendo su capacidad de mantenimiento y expansión.