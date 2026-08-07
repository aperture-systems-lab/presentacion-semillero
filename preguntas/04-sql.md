# SQL

Consultas, tipos, fechas y joins

18 pregunta(s). Las pistas y las respuestas van plegadas: despliégalas solo cuando lo hayas intentado.

[← volver al índice](README.md)

---

## 1. sql-typeof-1

Completa la sentencia para obtener el tipo de dato de la columna `date_time`.

**Elige el código que da la salida**

````sql
SELECT ____(date_time) AS "Type"
FROM sales
LIMIT 1;
````

**Opciones**

1. `TYPEOF`
2. `PG_TYPEOF`
3. `DTYPE`
4. `DATATYPE`

**Salida esperada**

````
Type
timestamp without time zone
````

<details>
<summary>Pista</summary>

Es una función propia de PostgreSQL y lleva el prefijo del motor.

</details>

<details>
<summary>Respuesta</summary>

````
PG_TYPEOF
````

`PG_TYPEOF(expresión)` devuelve el tipo de dato en PostgreSQL. `TYPEOF` es de SQLite, no de Postgres.

</details>

---

## 2. sql-typeof-2

Completa la sentencia para obtener el tipo de dato de la columna `category`.

**Elige el código que da la salida**

````sql
____ AS data
FROM sales
LIMIT 1;
````

**Opciones**

1. `SELECT TYPE(column = category)`
2. `SELECT PG_TYPE(category)`
3. `SELECT TYPEOF(category)`
4. `SELECT PG_TYPEOF(category)`

**Salida esperada**

````
data
character varying
````

<details>
<summary>Pista</summary>

Misma función que en la pregunta anterior, ahora con el SELECT incluido.

</details>

<details>
<summary>Respuesta</summary>

````
SELECT PG_TYPEOF(category)
````

`SELECT PG_TYPEOF(category)` devuelve `character varying`, que es como PostgreSQL llama a `VARCHAR`.

</details>

---

## 3. sql-cast-decimal

La tabla `transactions` guarda `amount` como entero, en centavos. Conviértelo a una columna `amount_dollars` con dos decimales (1 dólar = 100 centavos). Ninguna venta llega a 1000 dólares.

**Completa el código**

````sql
SELECT
    txid,
    (amount / 100.0) :: __________________ AS amount_dollars
FROM transactions
LIMIT 5;
````

**Salida esperada**

````
txid   amount_dollars
1      467.92
2      3.08
3      10.00
4      0.99
5      89.99
````

<details>
<summary>Pista</summary>

El tipo lleva dos números: cuántos dígitos en total y cuántos después del punto. Menos de 1000 dólares son 3 dígitos enteros.

</details>

<details>
<summary>Respuesta</summary>

````
DECIMAL(5,2)
````

`DECIMAL(precisión, escala)`: 3 dígitos enteros + 2 decimales = precisión 5, escala 2. `NUMERIC` es sinónimo en PostgreSQL.

</details>

---

## 4. sql-to-date

La tabla `incidents` guarda `day` como texto con formato día-mes-año (por ejemplo «31-12-2019»). Conviértela en una columna de tipo fecha llamada `incident_date`.

**Completa el código**

````sql
SELECT
    incident_id,
    ______________(day, 'DD-MM-YYYY') AS incident_date
FROM incidents;
````

**Salida esperada**

````
Incident_id   Incident_date
1             2017-02-07
2             2018-09-18
3             2019-03-30
4             2019-07-03
````

<details>
<summary>Pista</summary>

La función recibe el texto y la plantilla de formato, y devuelve una fecha.

</details>

<details>
<summary>Respuesta</summary>

````
TO_DATE
````

`TO_DATE(texto, formato)` interpreta la cadena según la plantilla. Sin ella, Postgres no sabría si «03-07» es 3 de julio o 7 de marzo.

</details>

---

## 5. sql-regex-letras

La tabla `users` guarda nombres de usuario que pueden llevar minúsculas, dígitos y algunos caracteres especiales. Escribe la consulta que identifica a los usuarios cuyo `username` contiene solo letras.

**Elige el código que da la salida**

````sql
SELECT
  first_name, last_name
FROM users
WHERE username ~ '____';
````

**Opciones**

1. `^[a-z]$`
2. `^*[a-z]$`
3. `^[a-z]+$`
4. `^[a-z].$`

**Salida esperada**

````
first_name   last_name
Maribel      Spinoza
Zack         Zizkel
````

<details>
<summary>Pista</summary>

Hace falta permitir una o más letras, no exactamente una.

</details>

<details>
<summary>Respuesta</summary>

````
^[a-z]+$
````

`^[a-z]+$` exige que toda la cadena, de principio a fin, sean una o más letras minúsculas. `^[a-z]$` solo aceptaría nombres de una sola letra.

</details>

---

## 6. sql-not-null

Tenemos la tabla `Employee`. Modifícala para aplicar una restricción sobre `employee_id` de forma que no pueda ser nulo.

**Elige el código que da la salida**

````sql
ALTER TABLE Employee
ALTER COLUMN employee_id ____;

INSERT INTO Employee (Employee_id,Salary) VALUES (9, 50000);

SELECT * FROM Employee;
````

**Opciones**

1. `IS NOT NULL`
2. `NOT NULL`
3. `CHECK NOT NULL`
4. `SET NOT NULL`

<details>
<summary>Pista</summary>

`IS NOT NULL` es una condición de filtrado, no una modificación de la tabla.

</details>

<details>
<summary>Respuesta</summary>

````
SET NOT NULL
````

En `ALTER COLUMN` la restricción se aplica con `SET NOT NULL`. `IS NOT NULL` solo se usa dentro de un `WHERE`.

</details>

---

## 7. sql-between-join

Trabajas con dos tablas de un servicio de streaming. `movies` tiene el nombre y la duración de cada película; `viewings` tiene la fecha, el id de película, las visualizaciones y los minutos totales de ese día. Devuelve el promedio de minutos vistos por película entre el 1 y el 5 de julio de 2024.

**Datos**

````
--movies
| movie_id | movie_name | movie_length |
| M001     | Movie 1    | 120          |
| M002     | Movie 2    | 90           |
| M003     | Movie 3    | 110          |

--viewings
| date       | movie_id | total_views | total_minutes |
| 2024-07-01 | M001     | 100         | 12000         |
| 2024-07-02 | M002     | 150         | 13500         |
| 2024-07-03 | M003     | 200         | 22000         |
````

**Completa el código**

````sql
WITH subquery as (
    SELECT
        movie_id
        ,avg(total_minutes) avg_minutes
    FROM viewings
    WHERE date ____________________
    GROUP BY movie_id
)

SELECT
    a.movie_name
    ,b.avg_minutes
FROM movies a
____________________ b
ON a.movie_id=b.movie_id
````

**Salida esperada**

````
movie_name   avg_minutes
Movie 1      18000.000000000000
Movie 2      24400.000000000000
Movie 3      26883.333333333333
````

<details>
<summary>Pista</summary>

Para un rango de fechas hay un operador dedicado. Y al segundo hueco le sigue el alias `b`, así que ahí va la unión con la subconsulta.

</details>

<details>
<summary>Respuesta</summary>

````
BETWEEN '2024-07-01' AND '2024-07-05'   ·   INNER JOIN subquery
````

`BETWEEN a AND b` incluye los dos extremos. La subconsulta se trata como cualquier tabla: `INNER JOIN subquery b ON …`.

</details>

---

## 8. sql-extract-dow

La columna `date` de la tabla `sales` tiene formato de tipo DATE `DD/MM/YY`. Completa la sentencia para extraer el día de la semana de cada fila.

**Completa el código**

````sql
SELECT EXTRACT(____________ FROM date) as day
FROM sales
LIMIT 5;
````

**Salida esperada**

````
day
3
3
1
3
3
````

<details>
<summary>Pista</summary>

El campo se llama por sus siglas en inglés: «day of week».

</details>

<details>
<summary>Respuesta</summary>

````
DOW
````

`EXTRACT(DOW FROM fecha)` devuelve el día de la semana (0 = domingo en PostgreSQL). `DAY` habría devuelto el día del mes.

</details>

---

## 9. sql-alter-type

Tienes la tabla `sales`. La columna `amount` puede tener decimales y quieres redondearlos. ¿Cómo cambias el tipo de la columna `amount` a entero?

**Completa el código**

````sql
ALTER TABLE sales
ALTER COLUMN amount ____________________ ROUND(amount);

SELECT * FROM sales;
````

**Salida esperada**

````
Id   amount
1    101
2    201
````

<details>
<summary>Pista</summary>

Hay que decir a qué tipo se cambia y, además, con qué expresión se convierten los valores que ya existen.

</details>

<details>
<summary>Respuesta</summary>

````
TYPE INT USING
````

`ALTER COLUMN col TYPE nuevo_tipo USING expresión`: la cláusula `USING` indica cómo transformar los datos actuales, aquí redondeándolos.

</details>

---

## 10. sql-date-trunc

Completa la sentencia para truncar la columna `delivery_date` a precisión de minuto.

**Completa el código**

````sql
SELECT ________________('min', delivery_date) as new_delivery_date, delivery_date
FROM orders
LIMIT 3;
````

**Salida esperada**

````
new_delivery_date     delivery_date
2022-10-14 10:28:00   2022-10-14 10:28:43
2022-10-12 08:20:00   2022-10-12 08:20:55
2022-10-15 10:53:00   2022-10-15 10:53:45
````

<details>
<summary>Pista</summary>

Truncar no es redondear: los segundos simplemente se van a cero.

</details>

<details>
<summary>Respuesta</summary>

````
DATE_TRUNC
````

`DATE_TRUNC(unidad, timestamp)` recorta todo lo más fino que la unidad indicada. Con `'min'` los segundos quedan en 00.

</details>

---

## 11. sql-sum-groupby

Trabajas en una agencia de viajes con la tabla `holiday_clients`, donde se guardan el id del cliente, su tipo de vacaciones preferido, el número de viajes previos y la fecha del último. Crea una consulta que muestre el total de viajes por tipo de vacaciones preferido.

**Datos**

````
| client_id | preference | num_trips | last_holiday |
|      1031 | Active     |         3 | 2022-03-02   |
|      1032 | Beach      |         3 | 2022-03-06   |
|       ... | ...        |       ... | ...          |
````

**Completa el código**

````sql
SELECT
  preference,
  ____________________ AS total_trips
FROM holiday_clients
______________ preference
ORDER BY total_trips;
````

**Salida esperada**

````
preference   total_trips
Active       20
Other        21
Beach        51
````

<details>
<summary>Pista</summary>

«Total de viajes» es una suma, y para calcularla por categoría hay que agrupar.

</details>

<details>
<summary>Respuesta</summary>

````
SUM(num_trips)   ·   GROUP BY
````

`SUM` es la función de agregación y `GROUP BY preference` define los grupos sobre los que se aplica.

</details>

---

## 12. sql-cast-text

Tienes la tabla `employees` y quieres detectar las filas cuya fecha no sigue un patrón concreto. ¿Cómo te aseguras primero de que la columna se convierte a tipo texto?

**Completa el código**

````sql
SELECT *
FROM employees
WHERE hire_date__________TEXT !~ '^\d{4}-\d{2}-\d{2}$';
````

<details>
<summary>Pista</summary>

PostgreSQL tiene un operador corto de conversión de tipos, de dos caracteres.

</details>

<details>
<summary>Respuesta</summary>

````
::
````

`valor::TIPO` es la conversión abreviada de PostgreSQL, equivalente a `CAST(valor AS TIPO)`. Los operadores de regex necesitan texto, no fechas.

</details>

---

## 13. sql-alias

Obtén la lista de todos los `customers` que tienen registros en la tabla de ventas.

**Completa el código**

````sql
SELECT *
FROM customers __________
WHERE EXISTS (SELECT * from sales WHERE customer_id = C.customer_id)
````

**Salida esperada**

````
customer_id   customer_name   city_id   ordered_items
GGH414        Green House     BUE       10
UIA116        UI Art          BUE       20
````

<details>
<summary>Pista</summary>

La subconsulta ya usa un nombre corto para referirse a la tabla externa.

</details>

<details>
<summary>Respuesta</summary>

````
C
````

La subconsulta correlacionada llama `C.customer_id` a la tabla de fuera, así que `customers` necesita ese alias. `AS` es opcional en las tablas.

</details>

---

## 14. sql-union

La tabla `users` guarda las cuentas del sitio y `new_users` las creadas en las últimas 24 horas, algunas de las cuales ya pueden estar en `users`. Crea una consulta que muestre las entradas de ambas tablas juntas, sin repetir las que aparezcan en las dos.

**Datos**

````
-- users
| user_id | username | first_name | last_name |
|    1000 | kramos9  | Frank      | Kramos    |
|    1001 | 83quincy | John       | Quincy    |
|     ... | ...      | ...        | ...       |
````

**Completa el código**

````sql
SELECT user_id, last_name FROM users
______________
SELECT user_id, last_name FROM new_users
ORDER BY user_id DESC
LIMIT 5;
````

**Salida esperada**

````
user_id   last_name
2323      Smith
2322      Hofmann
2321      Svoboda
2320      Haskell
2319      Raskal
````

<details>
<summary>Pista</summary>

Hay dos variantes de este operador; una conserva los duplicados y la otra no.

</details>

<details>
<summary>Respuesta</summary>

````
UNION
````

`UNION` elimina las filas repetidas; `UNION ALL` las habría conservado todas, que es justo lo que aquí no queremos.

</details>

---

## 15. sql-avg-groupby

Trabajas en una empresa de juegos en línea. La tabla `accounts` guarda el nombre de usuario, los créditos restantes y la fecha de creación de la cuenta. Crea una consulta que muestre el promedio de créditos de las cuentas creadas en cada año.

**Datos**

````
| username | credits | created    |
| corin    |   74.26 | 2022-07-31 |
| brant    |   48.71 | 2022-07-24 |
| ...      |     ... | ...        |
````

**Completa el código**

````sql
SELECT
  TO_CHAR(created, 'YYYY') AS year,
  __________________ :: DECIMAL (4,2) AS mean_credit
FROM accounts
GROUP BY ______________
ORDER BY year;
````

**Salida esperada**

````
year   mean_credit
2021   52.96
2022   54.59
````

<details>
<summary>Pista</summary>

PostgreSQL sí acepta agrupar por el alias definido en el SELECT.

</details>

<details>
<summary>Respuesta</summary>

````
AVG(credits)   ·   year
````

`AVG` promedia dentro de cada grupo y el `GROUP BY year` reutiliza el alias del `TO_CHAR`. El `::DECIMAL(4,2)` solo recorta los decimales del resultado.

</details>

---

## 16. sql-sqlalchemy

Consulta la tabla `movies` de la base de datos `movies.sqlite` para devolver las películas cuyo `director_id` es 4762.

**Completa el código**

````sql
from sqlalchemy import create_engine
import pandas as pd

engine = create_engine("sqlite:///movies.sqlite")
conn = engine.connect()

query = conn.____________("SELECT * FROM movies WHERE director_id = 4762")
df = pd.DataFrame(query.fetchall())

conn.close()
print(df[1].head(4))
````

**Salida esperada**

````
0                   Avatar
1                  Titanic
2  Terminator 2: Judgment Day
3                True Lies
Name: 1, dtype: object
````

<details>
<summary>Pista</summary>

Sobre la conexión se lanza la sentencia; luego `fetchall` recoge las filas.

</details>

<details>
<summary>Respuesta</summary>

````
execute
````

`conn.execute(sql)` manda la consulta y devuelve un cursor; `fetchall()` trae todas las filas para construir el DataFrame.

</details>

---

## 17. sql-case-migracion-exitosa

La tabla `eco_mov_recomendacion_car` tiene 235407 registros y `resultados.reporte_coordinador_productizar` es la de abajo. ¿Qué valor devuelve la columna `migracion_exitosa`?

**Datos**

````
table_name                 end_status  migrated_records
eco_mov_recomendacion_car  OK          2
eco_mov_recomendacion_car  OK          2
eco_mov_recomendacion_car  OK          74
eco_mov_recomendacion_car  OK          15
eco_mov_recomendacion_car  OK          2
````

**Elige el código que da la salida**

````sql
with aux as (
  select 1 as key, *
  from resultados.reporte_coordinador_productizar
  where trim(end_status) = 'OK'
  order by migrated_records
  limit 1
),
aux2 as (
  select 1 as key, count(*) as cnt_real
  from eco_mov_recomendacion_car
)
select
  (CASE
     WHEN cnt_real > migrated_records then 2
     WHEN cnt_real = migrated_records then 1
     WHEN cnt_real < migrated_records then 3
     ELSE 0
   END) as migracion_exitosa
from aux2 t1
left join aux t2 on (t1.key = t2.key);
````

**Opciones**

1. `1`
2. `2`
3. `3`
4. `Error`

<details>
<summary>Pista</summary>

`aux` se queda con una sola fila. Mira por qué columna ordena y en qué sentido antes de aplicar el `limit 1`.

</details>

<details>
<summary>Respuesta</summary>

````
2
````

`aux` ordena por `migrated_records` ascendente y toma la primera fila, así que trae el valor más pequeño. `aux2` cuenta los 235407 registros de la otra tabla. Como 235407 es mayor, se cumple el primer WHEN y la consulta devuelve 2.

</details>

---

## 18. sql-create-table-fail

Sobre `resultados.reporte_coordinador_productizar`, crea una tabla con las columnas `table_name`, `migrated_records` y `end_status`, quedándote con los registros de `end_status` igual a 'FAIL' y `start_date` de los últimos 3 meses. Añade dos variables: `ejecucion_tarde`, que vale 1 si `end_date` cae por la tarde, y `Fail_registros_cero`, que vale 1 si `end_status` es 'FAIL' y `migrated_records` es 0. ¿Cuál de las cuatro opciones lo cumple?

**Elige el código que da la salida**

````sql
-- opcion_A
create table jcd_opcion_A as
select table_name, migrated_records, end_status,
  CASE WHEN hour(end_date) > 12 THEN 1 END as ejecucion_tarde,
  CASE WHEN end_status = "FAIL" and migrated_records = 0 THEN 1 END as Fail_registros_cero
from resultados.reporte_coordinador_productizar
where end_status = "FAIL" and start_date >= (now() - interval 3 month);

-- opcion_B
create table jcd_opcion_B as
select *,
  CASE WHEN hour(end_date) > 12 THEN 1 ELSE 0 END as ejecucion_tarde,
  CASE WHEN end_status = "FAIL" and migrated_records = 0 THEN 1 ELSE 0 END as Fail_registros_cero
from resultados.reporte_coordinador_productizar
where end_status = "FAIL" and start_date >= (now() - interval 3 month);

-- opcion_C
create table jcd_opcion_C as
select table_name, migrated_records, end_status,
  if(hour(end_date) > 12, 0, 1) as ejecucion_tarde,
  if(end_status = "FAIL" and migrated_records = 0, 0, 1) as Fail_registros_cero
from resultados.reporte_coordinador_productizar
where end_status = "FAIL" and start_date >= (now() - interval 3 month);

-- opcion_D
create table jcd_opcion_D as
select table_name, migrated_records, end_status,
  if(hour(end_date) > 12, 1, 0) as ejecucion_tarde,
  if(migrated_records = 0, 1, 0) as Fail_registros_cero
from resultados.reporte_coordinador_productizar
where end_status = "FAIL" and start_date >= (now() - interval 3 month);
````

**Opciones**

1. `jcd_opcion_A`
2. `jcd_opcion_B`
3. `jcd_opcion_C`
4. `jcd_opcion_D`

<details>
<summary>Pista</summary>

Revisa tres cosas en cada una: qué columnas selecciona, qué devuelve cuando la condición NO se cumple, y si el 1 y el 0 están en ese orden.

</details>

<details>
<summary>Respuesta</summary>

````
jcd_opcion_D
````

La A deja los CASE sin ELSE, así que da NULL en vez de 0. La B selecciona `*` en lugar de las tres columnas pedidas. La C invierte los valores: pone 0 cuando la condición se cumple. La D selecciona las columnas correctas y sus `if` devuelven 1 al cumplirse y 0 si no; el `end_status` de la segunda variable ya lo garantiza el WHERE.

</details>

---
