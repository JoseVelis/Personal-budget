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

1. Exportar Datos a CSV
Descripción: Como usuario, quiero poder exportar todas las transacciones a un archivo CSV para poder analizarlas en herramientas externas como Excel o Google Sheets.

Criterios de Aceptación:

Agregar un botón "Exportar a CSV".

Generar un archivo CSV con las columnas: Descripción, Monto, Tipo (Ingreso/Egreso), Fecha.

Descargar automáticamente el archivo CSV al hacer clic en el botón.

2. Filtrar Transacciones por Fecha
Descripción: Como usuario, quiero poder filtrar las transacciones por un rango de fechas para poder ver los movimientos de un período específico.

Criterios de Aceptación:

Agregar un selector de fechas (desde/hasta) en la interfaz.

Mostrar solo las transacciones que caen dentro del rango seleccionado.

Actualizar automáticamente la lista de transacciones al cambiar el filtro.

3. Categorías de Transacciones
Descripción: Como usuario, quiero poder asignar categorías a las transacciones (por ejemplo, Comida, Transporte, Entretenimiento) para organizar mejor mis gastos.

Criterios de Aceptación:

Agregar un campo de selección de categoría en el formulario de registro.

Mostrar las categorías en la lista de transacciones.

Permitir filtrar transacciones por categoría.

4. Gráficos de Resumen
Descripción: Como usuario, quiero ver gráficos que resuman mis ingresos y egresos para tener una visión más clara de mi situación financiera.

Criterios de Aceptación:

Integrar una librería de gráficos como Chart.js.

Mostrar un gráfico de barras con los ingresos y egresos por mes.

Mostrar un gráfico circular con la distribución de gastos por categoría.

5. Sincronización con la Nube
Descripción: Como usuario, quiero poder sincronizar mis transacciones con la nube para acceder a mis datos desde cualquier dispositivo.

Criterios de Aceptación:

Implementar un sistema de autenticación (por ejemplo, con Firebase).

Guardar las transacciones en una base de datos en la nube.

Sincronizar automáticamente los datos al iniciar sesión desde otro dispositivo.