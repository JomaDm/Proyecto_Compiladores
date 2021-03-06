# Proyecto

## Descripción

Desarrollar un programa para construir afn utilizando el método de Thompson, y para realizar la unión de n afn's para la construcción del AFD para un analizador léxico.

El programa debe tener un menú con las siguientes opciones:

- Crear un AFN básico ✔️ \* Entrada: Un simbolo o un rango de valores a o [b-e] ✔️

- Unir dos AFN's ✔️ \* Crear dos nuevos estados(incial y de aceptación) y quitar estados de aceptación a los AFN's previos ✔️

- Concatenar 2 AFN's ✔️ \* Determinar cual es el primer automata y quitar estado de aceptación de AFN1 conectando estado final e incial de f1 y f2. Conservar el estado final del segundo AFN. ✔️

- Cerrradora positiva(transitiva) ✔️ \* Quitar estado de aceptación a un automata y agregar dos estados nuevos(incial y de aceptación), agregar una transición Epsilon de los antiguos estados de aceptación e inicial ✔️

- Cerradura \* ✔️

- Opcional ✔️

- Unir AFN's para construir un analizador léxico(dados por el usuario) ✔️

- Convertir AFN A AFD con la salida de la tabla ✔️

- En AFN a AFD agregar opcion para descargar un txt con el afd ✔️

- En Analizar lexicamente agregar una opcion para cargar un afd al analizador desde un archivo. ✔️

- Corregir Analizar lexicamente una cadena ✔️

- Corregir boton Cargar AFD para evitar el doble click 

- Terminar analisis sintactico por decenso recursivo ✔️

- Agregar un input para nombrar los AFD ✔️

- Implementar postfijo ✔️

- Gramatica libre de contexto a AFN ✔️

- Terminar analisis sintactico por decenso recursivo para la gramatica de gramaticas

- Construir el arreglo de reglas

- Operacion First y Follow

- Construir la tabla LL(1) para una secuencia de entrada

- Analizador lexico para la cadena de entrada(Usar la tabla LL(1))

- Analisis sintactico usando LL(1)

- Fin

## Anotaciones opcionales

- Considerar el ASCII(para epsilon un no imprimible) ✔️

- Verficar al ingresar un rango para las transiciones si se trata de valores coherentes(se cumpla el rango) ✔️

- Verificar lo que sucede cuando se cambia de pestaña pues los id se reinician ✔️

- Verificar que los rangos para crear un nuevo automata sean correctos ✔️

- Revisar porque se modifican los originales y no las copias como se especifica en las funciones para concatenar y transitiva ✔️

- Agregar nuevos automatas al arreglo ✔️

- Imprimir bien las transiciones ✔️

- Debe existir una funcion para reasignar los id de los estados pues se duplican ✔️

- AFD no necesita ser un objeto, solo se necesita la tabla(la ultima columna representa si el estado es de aceptación y el token) y que el analizador lexico haga uso de la tabla(texto plano) para que se mantenga generico ✔️