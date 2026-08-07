export const TEMAS = {
  python: { nombre: "python", desc: "fundamentos: funciones, bucles y lambdas" },
  pandas: { nombre: "pandas", desc: "dataframes: limpieza, filtros y grupos" },
  apis: { nombre: "apis", desc: "consumir y alimentar APIs con requests" },
  sql: { nombre: "sql", desc: "consultas, tipos, fechas y joins" },
  ingenieria: { nombre: "ingeniería", desc: "tests, git, docs y empaquetado" },
  probabilidad: {
    nombre: "probabilidad",
    desc: "distribuciones y cálculo de probabilidades",
  },
  estadistica: {
    nombre: "estadística",
    desc: "contrastes, intervalos, correlación y diseño experimental",
  },
  viz: { nombre: "visualización", desc: "gráficos con matplotlib y seaborn" },
  ml: { nombre: "machine learning", desc: "regresión, clustering y reducción" },
  ia: { nombre: "ia & llms", desc: "modelos de lenguaje, RAG y agentes" },
};

export const BANCO = [

  {
    id: "py-lambda-filter",
    tema: "python",
    tipo: "completar",
    enunciado:
      "Filtra la lista de abajo con una función `lambda` de forma que solo se devuelvan los valores mayores o iguales a 15.",
    codigo: `my_list = [15, 18, 17, 12, 11, 7, 8]
filter_list = filter({{0}}, my_list)
print(list(filter_list))`,
    huecos: [
      {
        respuestas: ["lambda x: x >= 15", "lambda x: 15 <= x"],
        ancho: 22,
      },
    ],
    salida: "[15, 18, 17]",
    pista: "`filter` espera primero una función que devuelva True o False para cada elemento.",
    explicacion:
      "`filter(f, iterable)` conserva los elementos para los que `f` devuelve True. La lambda recibe cada valor y responde si pasa el corte.",
  },
  {
    id: "py-continue",
    tema: "python",
    tipo: "completar",
    enunciado:
      "Completa la sentencia para que, después de avisar del error, el bucle salte directo a la siguiente vuelta sin ejecutar el resto del cuerpo.",
    codigo: `test_result = ['Success', 'Success', 'Success', 'Success', 'Success', 'Error', 'Success', 'Success']
cnt = 0

for a in test_result:
    cnt += 1
    if a == 'Error':
        print('Error found in execution number:', cnt)
        {{0}}
    print('Execution number', cnt, a)`,
    huecos: [{ respuestas: ["continue"], ancho: 12 }],
    salida: `Execution number 1 Success
Execution number 2 Success
Execution number 3 Success
Execution number 4 Success
Execution number 5 Success
Error found in execution number: 6
Execution number 7 Success
Execution number 8 Success`,
    pista: "No queremos cortar el bucle entero, solo esta vuelta.",
    explicacion:
      "`continue` salta a la siguiente iteración; `break` habría abortado el bucle y las ejecuciones 7 y 8 no se imprimirían.",
  },
  {
    id: "py-default-arg",
    tema: "python",
    tipo: "completar",
    enunciado:
      "Crea una función que devuelva el doble del número que recibe y `0` si no recibe nada.",
    codigo: `def doubled({{0}}):
  return 2*input_num

print(doubled())`,
    huecos: [{ respuestas: ["input_num=0"], ancho: 16 }],
    salida: "0",
    pista: "Un argumento puede traer su propio valor por defecto.",
    explicacion:
      "Con `input_num=0` el argumento pasa a ser opcional: si nadie lo pasa, Python usa el valor por defecto.",
  },
  {
    id: "py-args",
    tema: "python",
    tipo: "completar",
    enunciado:
      "Completa la función `first_name`, que recibe el nombre completo de una persona como varios argumentos e imprime solo el primero.",
    codigo: `def first_name({{0}}):
  print("The first name is " + name[0])

first_name("Sagar","Ilyas","Jacky")`,
    huecos: [{ respuestas: ["*name"], ancho: 14 }],
    salida: "The first name is Sagar",
    pista: "El cuerpo usa `name[0]`: dentro, `name` tiene que ser una secuencia.",
    explicacion:
      "`*name` recoge todos los argumentos posicionales en una tupla, así que `name[0]` es el primero.",
  },
  {
    id: "py-for-in",
    tema: "python",
    tipo: "completar",
    enunciado:
      "Completa la sentencia para recorrer los puntajes y listar los que superaron la prueba.",
    codigo: `{{0}} x {{1}} df['score']:
    if x > 65:
        print('Test passed with', x, 'points')`,
    huecos: [
      { respuestas: ["for"], ancho: 8 },
      { respuestas: ["in"], ancho: 8 },
    ],
    salida: `Test passed with 69 points
Test passed with 82 points`,
    pista: "Es la forma más básica de recorrer una secuencia en Python.",
    explicacion:
      "`for x in secuencia:` va asignando a `x` cada elemento; el `if` de dentro decide cuáles se imprimen.",
  },
  {
    id: "py-while",
    tema: "python",
    tipo: "completar",
    enunciado: "Completa el código para que imprima todos los números naturales hasta `n`.",
    codigo: `# Set value of n
n = 10

# initialize counter
i = 1

{{0}} i <= n:
  print(i)
  i = i+1    # update counter`,
    huecos: [{ respuestas: ["while"], ancho: 10 }],
    salida: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
    pista: "La condición se comprueba antes de cada vuelta y el contador se actualiza a mano.",
    explicacion:
      "`while` repite mientras la condición sea verdadera. Como el contador se incrementa dentro, el bucle termina al llegar a 11.",
  },

  {
    id: "pd-fillna",
    tema: "pandas",
    tipo: "completar",
    enunciado:
      "En el dataframe `df`, rellena los valores faltantes de `column one` con el promedio de esa misma columna.",
    datos: `   column one  column two
a    0.430473    0.982138
b         nan         nan
c   -0.520513    0.341685
d         nan         nan
e    0.816822     -1.5588
f         nan         nan`,
    codigo: `import pandas as pd

df["column one"] = df["column one"].fillna({{0}})

print(df)`,
    huecos: [
      {
        respuestas: ['df["column one"].mean()', "df['column one'].mean()"],
        ancho: 26,
      },
    ],
    salida: `    column one  column two
a     0.430473    0.982138
b     0.242261         NaN
c    -0.520513    0.341685
d     0.242261         NaN
e     0.816822   -1.558805
f     0.242261         NaN`,
    pista: "`fillna` recibe el valor con el que rellenar; ese valor lo calcula la propia columna.",
    explicacion:
      "`.mean()` ignora los NaN por defecto, así que el promedio sale de los tres valores presentes y se usa para tapar los huecos.",
  },
  {
    id: "pd-to-datetime",
    tema: "pandas",
    tipo: "completar",
    enunciado:
      "Tienes un DataFrame `data` con las columnas `date` y `time` como texto. Crea una columna `datetime` de tipo fecha-hora combinando las dos.",
    datos: `      date        time
2022-10-11   12:30 PM
2022-09-30   02:15 AM
2022-08-17   04:00 PM`,
    codigo: `import pandas as pd

data['datetime'] = {{0}}(data['date'] + ' ' + data['time'])

data['datetime']`,
    huecos: [{ respuestas: ["pd.to_datetime"], ancho: 20 }],
    salida: `0   2022-10-11 12:30:00
1   2022-09-30 02:15:00
2   2022-08-17 16:00:00
Name: datetime, dtype: datetime64[ns]`,
    pista: "La función vive en el propio pandas, no en el DataFrame.",
    explicacion:
      "`pd.to_datetime` interpreta la cadena y devuelve una serie `datetime64[ns]`, que ya permite ordenar, restar y extraer partes de la fecha.",
  },
  {
    id: "pd-isin",
    tema: "pandas",
    tipo: "completar",
    enunciado:
      "Tienes un dataset de ventas `df` de varios restaurantes. Filtra los datos para quedarte solo con las tiendas `ABC01` y `GHI03`.",
    datos: ` store   number_of_clients   date         bill_total
 MNO05   4                   2022-06-24   127.39
 ABC01   8                   2023-05-16   179.88
 MNO05   4                   2022-05-11   197.12
 GHI03   8                   2023-08-08   193.94
 ...     ...                 ...          ...`,
    codigo: `import numpy as np
import pandas as pd

filtered_df = df[df['store'].{{0}}(['ABC01', 'GHI03'])]
filtered_df.head()`,
    huecos: [{ respuestas: ["isin"], ancho: 12 }],
    salida: `    store  number_of_clients        date  bill_total
1   ABC01                  8  2023-05-16      179.88
3   GHI03                  8  2023-08-08      193.94
8   ABC01                  1  2023-06-22      223.06
11  GHI03                  6  2022-08-27       36.65
12  GHI03                  7  2022-10-05      136.90`,
    pista: "Para varios valores no sirve `==`: hace falta preguntar «¿está en esta lista?».",
    explicacion:
      "`.isin(lista)` devuelve una serie booleana con True donde el valor pertenece a la lista, y esa máscara filtra el DataFrame.",
  },
  {
    id: "pd-groupby-count",
    tema: "pandas",
    tipo: "completar",
    enunciado:
      "Dado un dataframe `df` con nombres, país y salario, calcula cuántas personas hay por país.",
    datos: `Country   Name      Salary
USA       Alex      120000
Canada    Jon        90000
UK        Will       75000
USA       Dominic   150000
Canada    Rachel     80000
UK        Sara       95000`,
    codigo: `import pandas as pd

grouped_df = df.groupby("Country")["Name"].{{0}}
grouped_df`,
    huecos: [{ respuestas: ["count()", "size()"], ancho: 14 }],
    salida: `Country
Canada    2
UK        2
USA       2
Name: Name, dtype: int64`,
    pista: "No queremos sumar ni promediar salarios: queremos contar filas por grupo.",
    explicacion:
      "Tras `groupby`, `.count()` cuenta los valores no nulos de la columna dentro de cada grupo.",
  },
  {
    id: "pd-regex-findall",
    tema: "pandas",
    tipo: "opcion",
    enunciado:
      "Dado el dataset `df`, filtra con expresiones regulares las frases que empiezan por 'The' y terminan con la letra 'n'.",
    datos: `   Sentence                Author
0  The sun in Spain        Tom F.
1  The walk to the moon    Malik P.
2  Holding on to dear life John W.
3  A cold winters night    Lilli C.`,
    codigo: `import pandas as pd

filtered = df['Sentence'].str.findall('{{?}}')
print(filtered)`,
    opciones: ["^The.n$", "^The*n$", "^The.*n$"],
    correcta: 2,
    salida: `0       [The sun in Spain]
1    [The walk to the moon]
2                       []
3                       []
Name: Sentence, dtype: object`,
    pista: "Hay que permitir cualquier cantidad de cualquier carácter entre 'The' y la 'n' final.",
    explicacion:
      "`^` ancla al principio y `$` al final. `.` es «cualquier carácter» y `*` es «cero o más veces», así que `.*` cubre todo lo que haya en medio. En `^The*n$` el `*` afectaría solo a la 'e'.",
  },

  {
    id: "api-json",
    tema: "apis",
    tipo: "completar",
    enunciado: "Completa la sentencia para recibir un objeto JSON desde la API correspondiente.",
    codigo: `import requests

url = 'https://jsonplaceholder.typicode.com/posts/1'
response = requests.get(url)

data = response.{{0}}
print(data)`,
    huecos: [{ respuestas: ["json()"], ancho: 14 }],
    salida: `{'userId': 1, 'id': 1, 'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', 'body': 'quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto'}`,
    pista: "`response.text` daría una cadena; queremos un diccionario de Python.",
    explicacion:
      "`.json()` es un método: parsea el cuerpo de la respuesta y devuelve el objeto de Python equivalente.",
  },
  {
    id: "api-post",
    tema: "apis",
    tipo: "completar",
    enunciado:
      "Has recopilado los datos de un producto nuevo y quieres darlo de alta en la API.",
    codigo: `import requests

BASE_URL = 'https://fakestoreapi.com'

add_product = {
    "title": 'test new product',
    "price": 14.5,
    "description": 'lorem ipsum set',
    "image": 'https://i.pravatar.cc',
    "category": 'toys'
}

response = requests.{{0}}(f"{BASE_URL}/products", json=add_product)
print(response.json())`,
    huecos: [{ respuestas: ["post"], ancho: 12 }],
    salida: `{'id': 21, 'title': 'test new product', 'price': 14.5, 'description': 'lorem ipsum set', 'image': 'https://i.pravatar.cc', 'category': 'toys'}`,
    pista: "Crear un recurso nuevo tiene su propio verbo HTTP.",
    explicacion:
      "`POST` se usa para crear recursos. La respuesta trae el `id` que asignó el servidor.",
  },
  {
    id: "api-put",
    tema: "apis",
    tipo: "completar",
    enunciado:
      "Actualiza el producto existente con id `21` y envía el cambio a la API.",
    codigo: `import requests

BASE_URL = 'https://fakestoreapi.com'

product_update = {
    "title": 'updating test product',
    "category": 'appliances'
}

response = requests.{{0}}(f"{BASE_URL}/products/21", json=product_update)
print(response.json())`,
    huecos: [{ respuestas: ["put", "patch"], ancho: 12 }],
    salida: `{'id': 21, 'title': 'updating test product', 'category': 'appliances'}`,
    pista: "El recurso ya existe y la URL apunta a él: no lo estamos creando.",
    explicacion:
      "`PUT` actualiza un recurso concreto. `POST` habría creado otro producto en vez de modificar el 21.",
  },

  {
    id: "sql-typeof-1",
    tema: "sql",
    tipo: "opcion",
    enunciado: "Completa la sentencia para obtener el tipo de dato de la columna `date_time`.",
    codigo: `SELECT {{?}}(date_time) AS "Type"
FROM sales
LIMIT 1;`,
    opciones: ["TYPEOF", "PG_TYPEOF", "DTYPE", "DATATYPE"],
    correcta: 1,
    salida: `Type
timestamp without time zone`,
    pista: "Es una función propia de PostgreSQL y lleva el prefijo del motor.",
    explicacion:
      "`PG_TYPEOF(expresión)` devuelve el tipo de dato en PostgreSQL. `TYPEOF` es de SQLite, no de Postgres.",
  },
  {
    id: "sql-typeof-2",
    tema: "sql",
    tipo: "opcion",
    enunciado: "Completa la sentencia para obtener el tipo de dato de la columna `category`.",
    codigo: `{{?}} AS data
FROM sales
LIMIT 1;`,
    opciones: [
      "SELECT TYPE(column = category)",
      "SELECT PG_TYPE(category)",
      "SELECT TYPEOF(category)",
      "SELECT PG_TYPEOF(category)",
    ],
    correcta: 3,
    salida: `data
character varying`,
    pista: "Misma función que en la pregunta anterior, ahora con el SELECT incluido.",
    explicacion:
      "`SELECT PG_TYPEOF(category)` devuelve `character varying`, que es como PostgreSQL llama a `VARCHAR`.",
  },
  {
    id: "sql-cast-decimal",
    tema: "sql",
    tipo: "completar",
    enunciado:
      "La tabla `transactions` guarda `amount` como entero, en centavos. Conviértelo a una columna `amount_dollars` con dos decimales (1 dólar = 100 centavos). Ninguna venta llega a 1000 dólares.",
    codigo: `SELECT
    txid,
    (amount / 100.0) :: {{0}} AS amount_dollars
FROM transactions
LIMIT 5;`,
    huecos: [
      {
        respuestas: [
          "DECIMAL(5,2)",
          "NUMERIC(5,2)",
          "DECIMAL(5, 2)",
          "NUMERIC(5, 2)",
        ],
        ancho: 18,
      },
    ],
    salida: `txid   amount_dollars
1      467.92
2      3.08
3      10.00
4      0.99
5      89.99`,
    pista:
      "El tipo lleva dos números: cuántos dígitos en total y cuántos después del punto. Menos de 1000 dólares son 3 dígitos enteros.",
    explicacion:
      "`DECIMAL(precisión, escala)`: 3 dígitos enteros + 2 decimales = precisión 5, escala 2. `NUMERIC` es sinónimo en PostgreSQL.",
  },
  {
    id: "sql-to-date",
    tema: "sql",
    tipo: "completar",
    enunciado:
      "La tabla `incidents` guarda `day` como texto con formato día-mes-año (por ejemplo «31-12-2019»). Conviértela en una columna de tipo fecha llamada `incident_date`.",
    codigo: `SELECT
    incident_id,
    {{0}}(day, 'DD-MM-YYYY') AS incident_date
FROM incidents;`,
    huecos: [{ respuestas: ["TO_DATE"], ancho: 14 }],
    salida: `Incident_id   Incident_date
1             2017-02-07
2             2018-09-18
3             2019-03-30
4             2019-07-03`,
    pista: "La función recibe el texto y la plantilla de formato, y devuelve una fecha.",
    explicacion:
      "`TO_DATE(texto, formato)` interpreta la cadena según la plantilla. Sin ella, Postgres no sabría si «03-07» es 3 de julio o 7 de marzo.",
  },
  {
    id: "sql-regex-letras",
    tema: "sql",
    tipo: "opcion",
    enunciado:
      "La tabla `users` guarda nombres de usuario que pueden llevar minúsculas, dígitos y algunos caracteres especiales. Escribe la consulta que identifica a los usuarios cuyo `username` contiene solo letras.",
    codigo: `SELECT
  first_name, last_name
FROM users
WHERE username ~ '{{?}}';`,
    opciones: ["^[a-z]$", "^*[a-z]$", "^[a-z]+$", "^[a-z].$"],
    correcta: 2,
    salida: `first_name   last_name
Maribel      Spinoza
Zack         Zizkel`,
    pista: "Hace falta permitir una o más letras, no exactamente una.",
    explicacion:
      "`^[a-z]+$` exige que toda la cadena, de principio a fin, sean una o más letras minúsculas. `^[a-z]$` solo aceptaría nombres de una sola letra.",
  },
  {
    id: "sql-not-null",
    tema: "sql",
    tipo: "opcion",
    enunciado:
      "Tenemos la tabla `Employee`. Modifícala para aplicar una restricción sobre `employee_id` de forma que no pueda ser nulo.",
    codigo: `ALTER TABLE Employee
ALTER COLUMN employee_id {{?}};

INSERT INTO Employee (Employee_id,Salary) VALUES (9, 50000);

SELECT * FROM Employee;`,
    opciones: ["IS NOT NULL", "NOT NULL", "CHECK NOT NULL", "SET NOT NULL"],
    correcta: 3,
    pista: "`IS NOT NULL` es una condición de filtrado, no una modificación de la tabla.",
    explicacion:
      "En `ALTER COLUMN` la restricción se aplica con `SET NOT NULL`. `IS NOT NULL` solo se usa dentro de un `WHERE`.",
  },
  {
    id: "sql-between-join",
    tema: "sql",
    tipo: "completar",
    enunciado:
      "Trabajas con dos tablas de un servicio de streaming. `movies` tiene el nombre y la duración de cada película; `viewings` tiene la fecha, el id de película, las visualizaciones y los minutos totales de ese día. Devuelve el promedio de minutos vistos por película entre el 1 y el 5 de julio de 2024.",
    datos: `--movies
| movie_id | movie_name | movie_length |
| M001     | Movie 1    | 120          |
| M002     | Movie 2    | 90           |
| M003     | Movie 3    | 110          |

--viewings
| date       | movie_id | total_views | total_minutes |
| 2024-07-01 | M001     | 100         | 12000         |
| 2024-07-02 | M002     | 150         | 13500         |
| 2024-07-03 | M003     | 200         | 22000         |`,
    codigo: `WITH subquery as (
    SELECT
        movie_id
        ,avg(total_minutes) avg_minutes
    FROM viewings
    WHERE date {{0}}
    GROUP BY movie_id
)

SELECT
    a.movie_name
    ,b.avg_minutes
FROM movies a
{{1}} b
ON a.movie_id=b.movie_id`,
    huecos: [
      {
        respuestas: [
          "BETWEEN '2024-07-01' AND '2024-07-05'",
          ">= '2024-07-01' AND date <= '2024-07-05'",
        ],
        ancho: 38,
      },
      {
        respuestas: ["INNER JOIN subquery", "JOIN subquery"],
        ancho: 24,
      },
    ],
    salida: `movie_name   avg_minutes
Movie 1      18000.000000000000
Movie 2      24400.000000000000
Movie 3      26883.333333333333`,
    pista:
      "Para un rango de fechas hay un operador dedicado. Y al segundo hueco le sigue el alias `b`, así que ahí va la unión con la subconsulta.",
    explicacion:
      "`BETWEEN a AND b` incluye los dos extremos. La subconsulta se trata como cualquier tabla: `INNER JOIN subquery b ON …`.",
  },
  {
    id: "sql-extract-dow",
    tema: "sql",
    tipo: "completar",
    enunciado:
      "La columna `date` de la tabla `sales` tiene formato de tipo DATE `DD/MM/YY`. Completa la sentencia para extraer el día de la semana de cada fila.",
    codigo: `SELECT EXTRACT({{0}} FROM date) as day
FROM sales
LIMIT 5;`,
    huecos: [{ respuestas: ["DOW", "ISODOW"], ancho: 12 }],
    salida: `day
3
3
1
3
3`,
    pista: "El campo se llama por sus siglas en inglés: «day of week».",
    explicacion:
      "`EXTRACT(DOW FROM fecha)` devuelve el día de la semana (0 = domingo en PostgreSQL). `DAY` habría devuelto el día del mes.",
  },
  {
    id: "sql-alter-type",
    tema: "sql",
    tipo: "completar",
    enunciado:
      "Tienes la tabla `sales`. La columna `amount` puede tener decimales y quieres redondearlos. ¿Cómo cambias el tipo de la columna `amount` a entero?",
    codigo: `ALTER TABLE sales
ALTER COLUMN amount {{0}} ROUND(amount);

SELECT * FROM sales;`,
    huecos: [
      {
        respuestas: [
          "TYPE INT USING",
          "TYPE INTEGER USING",
          "SET DATA TYPE INT USING",
        ],
        ancho: 22,
      },
    ],
    salida: `Id   amount
1    101
2    201`,
    pista:
      "Hay que decir a qué tipo se cambia y, además, con qué expresión se convierten los valores que ya existen.",
    explicacion:
      "`ALTER COLUMN col TYPE nuevo_tipo USING expresión`: la cláusula `USING` indica cómo transformar los datos actuales, aquí redondeándolos.",
  },
  {
    id: "sql-date-trunc",
    tema: "sql",
    tipo: "completar",
    enunciado: "Completa la sentencia para truncar la columna `delivery_date` a precisión de minuto.",
    codigo: `SELECT {{0}}('min', delivery_date) as new_delivery_date, delivery_date
FROM orders
LIMIT 3;`,
    huecos: [{ respuestas: ["DATE_TRUNC"], ancho: 16 }],
    salida: `new_delivery_date     delivery_date
2022-10-14 10:28:00   2022-10-14 10:28:43
2022-10-12 08:20:00   2022-10-12 08:20:55
2022-10-15 10:53:00   2022-10-15 10:53:45`,
    pista: "Truncar no es redondear: los segundos simplemente se van a cero.",
    explicacion:
      "`DATE_TRUNC(unidad, timestamp)` recorta todo lo más fino que la unidad indicada. Con `'min'` los segundos quedan en 00.",
  },
  {
    id: "sql-sum-groupby",
    tema: "sql",
    tipo: "completar",
    enunciado:
      "Trabajas en una agencia de viajes con la tabla `holiday_clients`, donde se guardan el id del cliente, su tipo de vacaciones preferido, el número de viajes previos y la fecha del último. Crea una consulta que muestre el total de viajes por tipo de vacaciones preferido.",
    datos: `| client_id | preference | num_trips | last_holiday |
|      1031 | Active     |         3 | 2022-03-02   |
|      1032 | Beach      |         3 | 2022-03-06   |
|       ... | ...        |       ... | ...          |`,
    codigo: `SELECT
  preference,
  {{0}} AS total_trips
FROM holiday_clients
{{1}} preference
ORDER BY total_trips;`,
    huecos: [
      { respuestas: ["SUM(num_trips)"], ancho: 20 },
      { respuestas: ["GROUP BY"], ancho: 14 },
    ],
    salida: `preference   total_trips
Active       20
Other        21
Beach        51`,
    pista: "«Total de viajes» es una suma, y para calcularla por categoría hay que agrupar.",
    explicacion:
      "`SUM` es la función de agregación y `GROUP BY preference` define los grupos sobre los que se aplica.",
  },
  {
    id: "sql-cast-text",
    tema: "sql",
    tipo: "completar",
    enunciado:
      "Tienes la tabla `employees` y quieres detectar las filas cuya fecha no sigue un patrón concreto. ¿Cómo te aseguras primero de que la columna se convierte a tipo texto?",
    codigo: `SELECT *
FROM employees
WHERE hire_date{{0}}TEXT !~ '^\\d{4}-\\d{2}-\\d{2}$';`,
    huecos: [{ respuestas: ["::"], ancho: 10 }],
    pista: "PostgreSQL tiene un operador corto de conversión de tipos, de dos caracteres.",
    explicacion:
      "`valor::TIPO` es la conversión abreviada de PostgreSQL, equivalente a `CAST(valor AS TIPO)`. Los operadores de regex necesitan texto, no fechas.",
  },
  {
    id: "sql-alias",
    tema: "sql",
    tipo: "completar",
    enunciado: "Obtén la lista de todos los `customers` que tienen registros en la tabla de ventas.",
    codigo: `SELECT *
FROM customers {{0}}
WHERE EXISTS (SELECT * from sales WHERE customer_id = C.customer_id)`,
    huecos: [{ respuestas: ["C", "AS C"], ancho: 10 }],
    salida: `customer_id   customer_name   city_id   ordered_items
GGH414        Green House     BUE       10
UIA116        UI Art          BUE       20`,
    pista: "La subconsulta ya usa un nombre corto para referirse a la tabla externa.",
    explicacion:
      "La subconsulta correlacionada llama `C.customer_id` a la tabla de fuera, así que `customers` necesita ese alias. `AS` es opcional en las tablas.",
  },
  {
    id: "sql-union",
    tema: "sql",
    tipo: "completar",
    enunciado:
      "La tabla `users` guarda las cuentas del sitio y `new_users` las creadas en las últimas 24 horas, algunas de las cuales ya pueden estar en `users`. Crea una consulta que muestre las entradas de ambas tablas juntas, sin repetir las que aparezcan en las dos.",
    datos: `-- users
| user_id | username | first_name | last_name |
|    1000 | kramos9  | Frank      | Kramos    |
|    1001 | 83quincy | John       | Quincy    |
|     ... | ...      | ...        | ...       |`,
    codigo: `SELECT user_id, last_name FROM users
{{0}}
SELECT user_id, last_name FROM new_users
ORDER BY user_id DESC
LIMIT 5;`,
    huecos: [{ respuestas: ["UNION"], ancho: 14 }],
    salida: `user_id   last_name
2323      Smith
2322      Hofmann
2321      Svoboda
2320      Haskell
2319      Raskal`,
    pista: "Hay dos variantes de este operador; una conserva los duplicados y la otra no.",
    explicacion:
      "`UNION` elimina las filas repetidas; `UNION ALL` las habría conservado todas, que es justo lo que aquí no queremos.",
  },
  {
    id: "sql-avg-groupby",
    tema: "sql",
    tipo: "completar",
    enunciado:
      "Trabajas en una empresa de juegos en línea. La tabla `accounts` guarda el nombre de usuario, los créditos restantes y la fecha de creación de la cuenta. Crea una consulta que muestre el promedio de créditos de las cuentas creadas en cada año.",
    datos: `| username | credits | created    |
| corin    |   74.26 | 2022-07-31 |
| brant    |   48.71 | 2022-07-24 |
| ...      |     ... | ...        |`,
    codigo: `SELECT
  TO_CHAR(created, 'YYYY') AS year,
  {{0}} :: DECIMAL (4,2) AS mean_credit
FROM accounts
GROUP BY {{1}}
ORDER BY year;`,
    huecos: [
      { respuestas: ["AVG(credits)"], ancho: 18 },
      { respuestas: ["year", "TO_CHAR(created, 'YYYY')"], ancho: 14 },
    ],
    salida: `year   mean_credit
2021   52.96
2022   54.59`,
    pista: "PostgreSQL sí acepta agrupar por el alias definido en el SELECT.",
    explicacion:
      "`AVG` promedia dentro de cada grupo y el `GROUP BY year` reutiliza el alias del `TO_CHAR`. El `::DECIMAL(4,2)` solo recorta los decimales del resultado.",
  },

  {
    id: "ing-git",
    tema: "ingenieria",
    tipo: "opcion",
    enunciado: "¿Qué significan `checkout` y `commit` en el control de versiones con git?",
    opciones: [
      "Un checkout es la copia personal del código del usuario donde se pueden hacer cambios afectando al código principal. Una vez terminado, se puede hacer commit de los cambios al repositorio.",
      "Un commit es la copia personal del código del usuario donde se pueden hacer cambios afectando al código principal. Una vez terminado, se puede hacer checkout de los cambios al repositorio.",
      "Un checkout es la copia personal del código del usuario donde se pueden hacer cambios sin afectar al código principal. Una vez terminado, se puede hacer commit de los cambios al repositorio.",
      "Un commit es la copia personal del código del usuario donde se pueden hacer cambios sin afectar al código principal. Una vez terminado, se puede hacer checkout de los cambios al repositorio.",
    ],
    correcta: 2,
    pista: "Fíjate en dos cosas: cuál de los dos verbos es la copia y si esa copia afecta o no al código principal.",
    explicacion:
      "El checkout te sitúa en tu propia copia de trabajo, aislada del código principal; el commit es el que registra los cambios en el repositorio.",
  },
  {
    id: "ing-docstrings",
    tema: "ingenieria",
    tipo: "opcion",
    enunciado: "¿Cuál es la forma estándar de documentar funciones y clases en Python?",
    opciones: [
      "Documentación XML",
      "Docstrings",
      "Comentarios en línea",
      "Ficheros de documentación aparte",
    ],
    correcta: 1,
    pista: "Es la única opción que el propio intérprete guarda y expone en tiempo de ejecución.",
    explicacion:
      "Las docstrings van entre triples comillas justo debajo del `def` o del `class`, y quedan accesibles en `__doc__` y desde `help()`.",
  },
  {
    id: "ing-requirements",
    tema: "ingenieria",
    tipo: "opcion",
    enunciado:
      "¿Dónde deberías guardar la información de versiones al construir un paquete de Python que necesita versiones concretas de paquetes externos?",
    opciones: ["controlling.txt", "versions.text", "packages.txt", "requirements.txt"],
    correcta: 3,
    pista: "Es el fichero que `pip install -r` sabe leer.",
    explicacion:
      "`requirements.txt` es la convención: una dependencia por línea, con su versión fijada si hace falta.",
  },
  {
    id: "ing-import-unittest",
    tema: "ingenieria",
    tipo: "completar",
    enunciado:
      "Completa el código para importar el framework de tests unitarios que viene incluido en Python.",
    codigo: `import {{0}}

class TestScoring({{1}}.TestCase):

    def test_scoring(self):
        self.assertEqual(scoring(1,1,3,3), 8)`,
    huecos: [
      { respuestas: ["unittest"], ancho: 14 },
      { respuestas: ["unittest"], ancho: 14 },
    ],
    pista: "Viene en la librería estándar, no hace falta instalarlo.",
    explicacion:
      "`unittest` es el módulo de tests de la librería estándar. Las clases de prueba heredan de `unittest.TestCase`.",
  },
  {
    id: "ing-setup",
    tema: "ingenieria",
    tipo: "opcion",
    enunciado:
      "Completa el test unitario para probar el método `isupper()`, de forma que la variable `var` no tenga que crearse repetidamente en cada caso de prueba.",
    codigo: `import unittest

class TestSampleMethod(unittest.TestCase):

  {{?}}:
    self.var = 'Name'

  def test_isupper(self):
    self.assertFalse(self.var.isupper())`,
    opciones: [
      "def Initilize(self)",
      "def test_load(self)",
      "def setUp(self)",
      "def Load(self)",
    ],
    correcta: 2,
    pista: "El nombre tiene que ser exactamente el que `unittest` busca antes de cada test.",
    explicacion:
      "`setUp` es un método especial que `unittest` ejecuta automáticamente antes de cada test del caso. Con otro nombre, nunca se llamaría.",
  },
  {
    id: "ing-assert-equal",
    tema: "ingenieria",
    tipo: "opcion",
    enunciado: "Completa el test unitario para probar la función `sum` en Python.",
    codigo: `import unittest

class TestSampleMethod(unittest.TestCase):

    def test_sum(self):
        {{?}}(sum(2,2), 4)`,
    opciones: ["self.assertEqual", "self.assertRaises", "assertRaises", "assertEqual"],
    correcta: 0,
    pista: "Estamos comparando un resultado con un valor esperado, y el método pertenece a la instancia.",
    explicacion:
      "`self.assertEqual(a, b)` falla si los dos valores difieren. Sin `self.` no existe el nombre, y `assertRaises` sirve para comprobar excepciones.",
  },
  {
    id: "ing-if-stock",
    tema: "ingenieria",
    tipo: "opcion",
    enunciado:
      "En un sistema de gestión de inventario, ¿cómo escribirías un `if` que lance una alerta si el nivel de stock está por debajo de cierto umbral?",
    opciones: [
      "if stock_level < threshold: notifyLowStock()",
      "if stock_level < threshold then: notifyLowStock()",
      "if stock_level < threshold: execute notifyLowStock()",
      "if stock_level < threshold: run notifyLowStock()",
    ],
    correcta: 0,
    pista: "Python no tiene `then` ni palabras clave para invocar una función.",
    explicacion:
      "La sintaxis de Python es `if condición:` seguido del cuerpo. Una función se llama escribiendo su nombre con paréntesis, sin verbos delante.",
  },

  {
    id: "ml-poly",
    tema: "ml",
    tipo: "completar",
    enunciado:
      "Dados los arrays `x` e `y`, donde `y` tiene una relación no lineal con `x`, ajusta un modelo de regresión polinómica de grado 3 para predecir `y` a partir de `x`.",
    codigo: `from sklearn.preprocessing import PolynomialFeatures
from sklearn import linear_model

poly = PolynomialFeatures(degree=3)
X_poly = poly.{{0}}(x.reshape(-1, 1))

model = linear_model.{{1}}()
model.{{2}}(X_poly, y)

print(f"Coefficients: {model.coef_}")`,
    huecos: [
      { respuestas: ["fit_transform"], ancho: 18 },
      { respuestas: ["LinearRegression"], ancho: 20 },
      { respuestas: ["fit"], ancho: 10 },
    ],
    salida: "Coefficients: [ 0.         -3.19672619  0.43166652  1.00872543]",
    pista:
      "La regresión polinómica es una regresión lineal sobre variables transformadas: primero se generan las potencias, luego se ajusta.",
    explicacion:
      "`fit_transform` aprende y aplica la expansión polinómica de una vez. Sobre esas columnas nuevas, una `LinearRegression` normal captura la relación no lineal.",
  },
  {
    id: "ml-feature-scaling",
    tema: "ml",
    tipo: "opcion",
    enunciado: "¿En cuál de los siguientes algoritmos podemos usar escalado de variables durante el preprocesamiento?",
    opciones: ["Naive Bayes", "Gradient Descent", "Árboles de decisión", "Análisis discriminante lineal"],
    correcta: 1,
    pista: "Piensa en cuál de ellos depende de la magnitud de las variables para converger.",
    explicacion:
      "El descenso de gradiente converge mucho más rápido con variables en escalas parecidas. Los árboles parten por umbrales y son indiferentes a la escala.",
  },
  {
    id: "ml-r2-cero",
    tema: "ml",
    tipo: "opcion",
    enunciado: "Un R² de 0 indica:",
    opciones: [
      "Que el puntaje es perfecto",
      "Que lo predijimos todo mal",
      "Que no hay diferencia entre la línea del modelo y la línea de la media",
      "Que la línea del modelo y la de la media son completamente distintas",
    ],
    correcta: 2,
    pista: "El R² compara tu modelo contra un modelo trivial: predecir siempre la media.",
    explicacion:
      "R² = 0 significa que el modelo explica tanta varianza como predecir siempre la media, es decir, ninguna. No implica que las predicciones sean disparatadas: para eso el R² sería negativo.",
  },
  {
    id: "ml-inertia",
    figura: "ml-inertia.svg",
    tema: "ml",
    tipo: "completar",
    enunciado:
      "La inercia mide cómo de bien agrupó los datos el modelo K-Means. Usa el método del codo para calcular el mejor número de clusters.",
    codigo: `from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import pandas as pd

df = pd.DataFrame(dataset, columns=['trait_a', 'trait_b'])

K = range(1,10)
distortions = []

for k in K:
    model = KMeans(n_clusters=k)
    model.fit(df)
    distortions.append(model.{{0}})

plt.plot(K, distortions, 'bx-')
plt.xlabel('k')
plt.ylabel('Distortion')
plt.show()`,
    huecos: [{ respuestas: ["inertia_"], ancho: 14 }],
    pista: "Es un atributo que scikit-learn deja tras entrenar; por convención acaba en guion bajo.",
    explicacion:
      "`inertia_` es la suma de distancias al cuadrado de cada punto a su centroide. El «codo» de la curva marca el punto donde añadir clusters deja de compensar.",
  },
  {
    id: "ml-kmeans-plot",
    figura: "ml-kmeans-plot.svg",
    tema: "ml",
    tipo: "completar",
    enunciado: "Completa las gráficas para visualizar los resultados del modelo K-Means.",
    codigo: `from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.DataFrame(dataset, columns=['trait_a', 'trait_b'])

# model
model = KMeans(n_clusters=3, random_state=10).fit(df)
labels = model.labels_
centers = model.cluster_centers_

# plot
sns.{{0}}(data=df, x="trait_a", y="trait_b", hue=model.labels_)
plt.xlabel('Personality trait a')
plt.ylabel('Personality trait b')
plt.{{1}}(model.cluster_centers_[:,0], model.cluster_centers_[:,1], marker="o", s=80, label="centr")
plt.legend()
plt.show()`,
    huecos: [
      { respuestas: ["scatterplot"], ancho: 16 },
      { respuestas: ["scatter"], ancho: 14 },
    ],
    pista: "Seaborn y matplotlib no llaman igual a la misma gráfica de dispersión.",
    explicacion:
      "En seaborn es `scatterplot` (acepta `data=` y `hue=`); en matplotlib, `plt.scatter`, que aquí dibuja los centroides encima.",
  },
  {
    id: "ml-normalizar",
    tema: "ml",
    tipo: "opcion",
    enunciado:
      "Los datasets del mundo real contienen variables con magnitudes y rangos muy distintos. ¿Cuándo deberíamos normalizarlas para preparar los datos del modelo?",
    opciones: [
      "Cuando el algoritmo del modelo usa la distancia euclidiana como medida, y regularización como función de pérdida.",
      "Cuando la escala de la variable es significativa y aporta información sobre el dataset.",
      "Cuando el algoritmo del modelo no usa la distancia euclidiana como medida ni el modelo usa regularización como función de pérdida.",
    ],
    correcta: 0,
    pista: "¿Qué le pasa a una distancia si una variable va de 0 a 1 y otra de 0 a 100000?",
    explicacion:
      "Si el algoritmo mide distancias o penaliza coeficientes, la variable de mayor magnitud domina el resultado. Normalizar pone a todas en pie de igualdad.",
  },
  {
    id: "ml-isomap",
    tema: "ml",
    tipo: "completar",
    enunciado:
      "Completa la sentencia usando la función de reducción de dimensionalidad no lineal de scikit-learn Isometric Mapping.",
    codigo: `model = {{0}}(n_components=2)
result = model.fit_transform(df)

print(result.shape)`,
    huecos: [{ respuestas: ["Isomap"], ancho: 14 }],
    salida: "(1000, 2)",
    pista: "El nombre de la clase es la contracción de «Isometric Mapping».",
    explicacion:
      "`Isomap` (en `sklearn.manifold`) conserva las distancias geodésicas sobre la variedad, a diferencia de PCA, que solo hace proyecciones lineales.",
  },
  {
    id: "ml-silhouette",
    tema: "ml",
    tipo: "completar",
    enunciado:
      "Completa los argumentos para calcular el coeficiente de silueta y evaluar la calidad del modelo K-Means.",
    codigo: `from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn import metrics
import pandas as pd

df = pd.DataFrame(dataset, columns=['price', 'sales'])

model = KMeans(n_clusters=3, random_state=10).fit(df)
labels = model.labels_
centers = model.cluster_centers_

model_performance = metrics.silhouette_score({{0}}, {{1}})
print(model_performance)`,
    huecos: [
      { respuestas: ["df", "X"], ancho: 12 },
      { respuestas: ["labels", "model.labels_"], ancho: 16 },
    ],
    salida: "0.8547241290990003",
    pista: "La función necesita los datos originales y a qué cluster fue a parar cada punto.",
    explicacion:
      "`silhouette_score(X, labels)` compara, para cada punto, su distancia media dentro del cluster con la del cluster más cercano. Cerca de 1 es una separación limpia.",
  },
  {
    id: "ml-pca",
    tema: "ml",
    tipo: "completar",
    enunciado:
      "Tienes un dataset con medidas de flores iris: largo y ancho del sépalo, largo y ancho del pétalo. Reduce la dimensionalidad de 4 a 2 dimensiones usando PCA, preservando la mayor varianza posible.",
    codigo: `import numpy as np
from sklearn.decomposition import {{0}}

# Original data
X = X

# Initialize PCA
pca = {{1}}(n_components=2)

# Fit PCA on data
X_reduced = pca.{{2}}(X)

print(f"Reduced shape: {X_reduced.shape}")`,
    huecos: [
      { respuestas: ["PCA"], ancho: 10 },
      { respuestas: ["PCA"], ancho: 10 },
      { respuestas: ["fit_transform"], ancho: 18 },
    ],
    salida: "Reduced shape: (150, 2)",
    pista: "El tercer hueco tiene que ajustar y transformar en un solo paso, porque `X_reduced` recibe los datos ya proyectados.",
    explicacion:
      "`fit_transform` calcula las componentes principales y proyecta los datos sobre ellas. Con solo `fit` no habría nada que asignar a `X_reduced`.",
  },
  {
    id: "ml-logit",
    tema: "ml",
    tipo: "completar",
    enunciado:
      "Completa la sentencia para ejecutar un modelo de regresión logística que clasifique el comportamiento de los usuarios.",
    codigo: `import statsmodels.api as sm

y_train = df[['behavior']]

results = sm.{{0}}(y_train, X_train).fit()

print(results.params)`,
    huecos: [{ respuestas: ["Logit"], ancho: 12 }],
    salida: `Optimization terminated successfully.
        Current function value: 0.686701
        Iterations 4
A    0.157
B   -0.076
C    0.101
dtype: float64`,
    pista: "En statsmodels la clase no se llama LogisticRegression; ese es el nombre de scikit-learn.",
    explicacion:
      "`sm.Logit(y, X)` construye el modelo logístico de statsmodels; `.fit()` lo estima por máxima verosimilitud, de ahí el mensaje de optimización.",
  },
  {
    id: "ml-ols",
    tema: "ml",
    tipo: "completar",
    enunciado:
      "El array `sizes` contiene el tamaño (en pies cuadrados) de 50 casas y `prices` sus precios (en miles de dólares). Ajusta un modelo de mínimos cuadrados ordinarios para predecir `prices` a partir de `sizes`.",
    codigo: `import numpy as np
from sklearn import linear_model

model = linear_model.{{0}}()
model.{{1}}(sizes.reshape(-1,1), prices)

coef = model.coef_[0]
intercept = model.intercept_

print(f"Model: price = {intercept:.2f} + {coef:.4f} * size")`,
    huecos: [
      { respuestas: ["LinearRegression"], ancho: 20 },
      { respuestas: ["fit"], ancho: 10 },
    ],
    salida: "Model: price = 31.92 + 0.1104 * size",
    pista: "En scikit-learn todos los modelos se entrenan con el mismo método.",
    explicacion:
      "`LinearRegression` de scikit-learn resuelve mínimos cuadrados ordinarios, y `.fit(X, y)` es el método de entrenamiento común a toda la librería.",
  },
  {
    id: "ml-rsquared-adj",
    tema: "ml",
    tipo: "opcion",
    enunciado:
      "Tienes valores numéricos para un dataset x, y. Quieres calcular el coeficiente de determinación ajustado entre x e y después de ajustar una regresión por mínimos cuadrados ordinarios. Completa el código para hacer ese cálculo.",
    codigo: `import statsmodels.api as sm
x = [53 129, 180, 431]
y = [30, 48, 79, 102]
model = sm.OLS(y,x).fit()`,
    opciones: [
      "model.rsquared_adj",
      "model.adj_coef_det",
      "model.coef_det2_adj",
      "model.adj_rsquared",
    ],
    correcta: 0,
    pista: "statsmodels pone primero el nombre de la métrica y después el sufijo del ajuste.",
    explicacion:
      "El atributo es `rsquared_adj`. El R² ajustado penaliza añadir variables que no aportan, a diferencia del R² normal, que nunca baja al sumar predictores.",
  },

  {
    id: "est-norm-cdf",
    tema: "probabilidad",
    tipo: "completar",
    enunciado:
      "Tienes un conjunto de alturas con distribución normal de media 5,5 pies y desviación típica 2. Si eliges a una persona al azar, ¿cuál es la probabilidad de que mida menos de 4,2 pies?",
    codigo: `from scipy.stats import norm

probability = norm(loc = 5.5 , scale = 2 ).{{0}}(4.2)

print(probability)`,
    huecos: [{ respuestas: ["cdf"], ancho: 12 }],
    salida: "0.2578461108058647",
    pista: "«Menos que» es acumular toda la cola izquierda hasta ese punto.",
    explicacion:
      "`cdf(x)` da la probabilidad acumulada hasta x, es decir P(X ≤ x). Para «mayor que» habría que restarla de 1.",
  },
  {
    id: "est-norm-cola-derecha",
    tema: "probabilidad",
    tipo: "completar",
    enunciado:
      "Tienes un conjunto de pesos con distribución normal de media 70 kg y desviación típica 15 kg. ¿Cuál es la probabilidad de que una persona elegida al azar pese más de 90 kg?",
    codigo: `from scipy.stats import norm

probability = 1 - norm(loc = 70 , scale = 15 ).cdf({{0}})

print(probability)`,
    huecos: [{ respuestas: ["90"], ancho: 10 }],
    salida: "0.09121121972586788",
    pista: "El `1 -` de delante ya se encarga de darle la vuelta a la cola.",
    explicacion:
      "P(X > 90) = 1 − P(X ≤ 90) = 1 − cdf(90). La `cdf` siempre acumula por la izquierda, así que la cola derecha se obtiene restando.",
  },
  {
    id: "est-binom-pmf",
    tema: "probabilidad",
    tipo: "completar",
    enunciado:
      "En un país, el 35 % de la población tiene mala visión. En una muestra aleatoria de 10 personas, ¿cuál es la probabilidad de que 5 la tengan?",
    codigo: `from scipy.stats import binom

prob = binom.{{0}}(5, n=10, p=0.35)

print(f"Probability of 5 people having eyesight out of 10 people is {prob}")`,
    huecos: [{ respuestas: ["pmf"], ancho: 12 }],
    salida:
      "Probability of 5 people having eyesight out of 10 people is 0.15357041070820307",
    pista: "Se pregunta por un valor exacto, no por un acumulado.",
    explicacion:
      "`pmf` (función de masa de probabilidad) da P(X = k) exactamente. `cdf` habría dado P(X ≤ 5).",
  },
  {
    id: "est-binom-al-menos-una",
    tema: "probabilidad",
    tipo: "completar",
    enunciado:
      "En cada una de 4 competiciones distintas, un atleta tiene un 80 % de opciones de ganar. Suponiendo que son independientes, ¿cuál es la probabilidad de que gane al menos una carrera?",
    codigo: `from scipy.stats import binom

probability = 1 - binom.pmf(k={{0}}, n=4, p={{1}})

print(probability)`,
    huecos: [
      { respuestas: ["0"], ancho: 8 },
      { respuestas: ["0.8", ".8"], ancho: 8 },
    ],
    salida: "0.9984",
    pista: "«Al menos una» es lo contrario de «ninguna».",
    explicacion:
      "P(al menos 1) = 1 − P(0 victorias). Contar el complementario evita sumar los casos de 1, 2, 3 y 4 victorias.",
  },
  {
    id: "est-poisson-cdf",
    tema: "probabilidad",
    tipo: "opcion",
    enunciado:
      "Una tienda de juguetes en línea tiene unas ventas que siguen una distribución de Poisson con media de 15 ventas al día. Halla la probabilidad de conseguir al menos 12 ventas el primer día.",
    codigo: `from scipy.stats import poisson

prob = {{?}}
prob_percent = prob*100

print(f"Probability of at least 12 sales in first day is {prob_percent}%")`,
    opciones: [
      "poisson.cdf(k=12, mu=15)",
      "1 - poisson.cdf(k=12, mu=15)",
      "1 - poisson.cdf(k=11, mu=15)",
      "poisson.cdf(k=11, mu=15)",
    ],
    correcta: 2,
    salida: "Probability of at least 12 sales in first day is 81.52482009760685%",
    pista:
      "«Al menos 12» incluye el 12. La `cdf` acumula hasta k inclusive, así que hay que restar hasta el 11.",
    explicacion:
      "P(X ≥ 12) = 1 − P(X ≤ 11) = 1 − cdf(11). Usar cdf(12) dejaría fuera el propio 12, que sí cuenta.",
  },
  {
    id: "est-expon-rvs",
    tema: "probabilidad",
    tipo: "completar",
    enunciado:
      "Genera una muestra aleatoria de una distribución exponencial usando el módulo `scipy.stats`.",
    codigo: `import scipy.stats as stats

sample_dist = stats.{{0}}(size=10, random_state=25)
print('Values:',sample_dist)`,
    huecos: [{ respuestas: ["expon.rvs"], ancho: 16 }],
    salida: `Values: [2.04117618 0.87293657 0.32689278 0.20568587 0.52949911 0.12485548
 1.15508342 0.5755616  0.81244735 0.45741176]`,
    pista: "En scipy, el método que saca muestras al azar de una distribución acaba en `rvs`.",
    explicacion:
      "`rvs` es *random variates*: devuelve valores simulados de la distribución. Con `random_state` la muestra es reproducible.",
  },
  {
    id: "est-binom-rvs",
    tema: "probabilidad",
    tipo: "completar",
    enunciado:
      "Genera una muestra aleatoria de una distribución binomial usando el módulo `scipy.stats`.",
    codigo: `import scipy.stats as stats

sample_dist = stats.{{0}}(n=10, p=0.4, size=12, random_state=5)
print(sample_dist)`,
    huecos: [{ respuestas: ["binom.rvs"], ancho: 16 }],
    salida: "[3 6 3 6 4 4 5 4 3 3 2 5]",
    pista: "Misma familia de métodos que en la exponencial.",
    explicacion:
      "`binom.rvs(n, p, size)` simula `size` experimentos binomiales de `n` intentos con probabilidad `p`.",
  },
  {
    id: "est-numpy-binomial",
    figura: "est-numpy-binomial.svg",
    tema: "estadistica",
    tipo: "completar",
    enunciado:
      "Las distribuciones binomiales se usan cuando los sucesos tienen dos resultados posibles. Usa la función de NumPy para extraer una muestra de una binomial.",
    codigo: `from numpy.random import default_rng
import seaborn as sns
import matplotlib.pyplot as plt

rng = default_rng(4)
dist = {{0}}.{{1}}(6, 0.4, 3000)

sns.displot(dist)
plt.show()`,
    huecos: [
      { respuestas: ["rng"], ancho: 10 },
      { respuestas: ["binomial"], ancho: 14 },
    ],
    pista: "El generador ya está creado en la línea de arriba; el método lleva el nombre de la distribución.",
    explicacion:
      "Con el generador moderno de NumPy, las muestras salen del propio objeto: `rng.binomial(n, p, size)`.",
  },

  {
    id: "est-chisquare",
    tema: "estadistica",
    tipo: "completar",
    enunciado:
      "Usa la prueba chi-cuadrado para contrastar la hipótesis de que el número observado de visitantes por día de la semana (`obs`) coincide con la frecuencia esperada (`exp`).",
    codigo: `from scipy import stats

obs =[10,10,10,20,50,10,15]
exp = [5,15,10,15,15,10,55]

result = {{0}}(obs,exp)

print(result)`,
    huecos: [{ respuestas: ["stats.chisquare"], ancho: 20 }],
    salida:
      "Power_divergenceResult(statistic=119.0909090909091, pvalue=2.5292352048026007e-23)",
    pista: "La función lleva el nombre de la propia prueba.",
    explicacion:
      "`stats.chisquare(obs, exp)` es la prueba de bondad de ajuste: compara lo observado con lo esperado y devuelve el estadístico y su p-valor.",
  },
  {
    id: "est-ttest-ind",
    tema: "estadistica",
    tipo: "completar",
    enunciado:
      "Tienes un dataframe `df` con las columnas `Country_A` y `Country_B`, con la lluvia diaria en mm de dos países. Ejecuta un t-test independiente para las medias de ambas columnas.",
    datos: `|   Country_A |    Country_B |
|------------:|-------------:|
|    21.2435  |    20.2435   |
|     1.11756 |     2.11756  |
|     0.281718|     1.28172  |
|     5.72969 |     6.72969  |`,
    codigo: `import pandas as pd
from scipy import stats

statistic,pvalue = stats.{{0}}(df['Country_A'], df['Country_B'])

print(statistic,pvalue)`,
    huecos: [{ respuestas: ["ttest_ind"], ancho: 16 }],
    salida: "0.477579556215368 0.633054059857348",
    pista: "«Independiente» está en el propio nombre de la función.",
    explicacion:
      "`ttest_ind` compara las medias de dos muestras independientes. Para datos emparejados se usaría `ttest_rel`.",
  },
  {
    id: "est-pingouin-chi2",
    tema: "estadistica",
    tipo: "completar",
    enunciado:
      "Un servicio de atención al cliente investiga si el estado de resolución de las quejas depende del canal por el que llegan (Phone, Email, App). Usa el paquete `pingouin` para comprobar si hay relación entre las dos variables.",
    codigo: `import pingouin as pg

expected, observed, stats = pg.{{0}}(data=df,
                                     x="channel",
                                     y="status")
print(stats)`,
    huecos: [{ respuestas: ["chi2_independence"], ancho: 22 }],
    salida: `              test  lambda     chi2  dof         pval  cramer  power
0          pearson   1.000  180.000  4.0  7.457e-38   1.000    1.0
1    cressie-read   0.667  174.974  4.0  8.951e-37   0.986    1.0
2  log-likelihood   0.000  197.750  4.0  1.144e-41   1.048    1.0`,
    pista: "Dos variables categóricas y la pregunta es si son independientes.",
    explicacion:
      "`pg.chi2_independence` es la prueba chi-cuadrado de independencia entre dos variables categóricas; devuelve los esperados, los observados y la tabla de estadísticos.",
  },
  {
    id: "est-pearson-conclusion",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Dados estos resultados de una correlación de Pearson y un nivel de significación de 0,05 —`r: 0.7111856948395034`, `p-value: 0.06901938475917284`—, ¿qué conclusión se puede sacar?",
    opciones: [
      "Hay una relación lineal fuerte y estadísticamente significativa",
      "Hay una relación lineal débil y estadísticamente significativa",
      "No hay relación lineal significativa entre las variables",
      "No hay información suficiente sobre su relación",
    ],
    correcta: 2,
    pista: "Compara el p-valor con el nivel de significación antes de mirar la r.",
    explicacion:
      "El p-valor (0,069) es mayor que 0,05, así que no se rechaza la hipótesis nula: la correlación no es significativa. Que la r sea alta no basta si el p-valor no acompaña.",
  },
  {
    id: "est-shapiro",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Según estos resultados de la prueba de Shapiro-Wilk: `ShapiroResult(statistic=0.9844282269477844, pvalue=0.024980217218399048)`.",
    opciones: [
      "La variable sigue una distribución normal",
      "La variable no sigue una distribución normal",
      "No podemos rechazar la hipótesis nula",
      "Los resultados no son estadísticamente significativos",
    ],
    correcta: 1,
    pista: "En Shapiro-Wilk la hipótesis nula es que los datos SÍ son normales.",
    explicacion:
      "El p-valor (0,025) es menor que 0,05, así que se rechaza la hipótesis nula de normalidad: los datos no son normales.",
  },
  {
    id: "est-chi2-region",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Una cadena minorista analiza si el éxito de sus campañas depende de la región. La prueba chi-cuadrado da `chi2 = 1.98851`, `dof = 6.0`, `pval = 0.92163`. Con un nivel de significación de 0,05, ¿qué conclusión sacar?",
    opciones: [
      "No hay asociación significativa entre región y tipo de promoción",
      "Hay una asociación significativa entre región y tipo de promoción",
      "El tipo de promoción varía significativamente entre regiones",
      "Los factores regionales influyen en la eficacia de la promoción",
    ],
    correcta: 0,
    pista: "Un p-valor de 0,92 está muy lejos de 0,05.",
    explicacion:
      "Con p = 0,92 no se rechaza la hipótesis nula de independencia: no hay evidencia de asociación entre región y tipo de promoción.",
  },
  {
    id: "est-chi2-dependencia",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Para seleccionar variables en un modelo de Machine Learning ejecutaste una prueba chi-cuadrado entre una variable independiente y la variable objetivo categórica. Obtuviste `chi2 value: 134.54869375910293` y `p-value: 1.510066805092378e-136`. ¿Qué se concluye?",
    opciones: [
      "La variable dependiente es irrelevante para el modelo",
      "Las dos variables son independientes entre sí",
      "Los datos sugieren que las variables son dependientes",
      "Las variables seleccionadas no están correlacionadas estadísticamente",
    ],
    correcta: 2,
    pista: "1,5 × 10⁻¹³⁶ es un p-valor extremadamente pequeño.",
    explicacion:
      "Un p-valor tan bajo rechaza con holgura la independencia: las variables están relacionadas, así que esa variable aporta información al modelo.",
  },
  {
    id: "est-chi2-distribucion",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "¿Qué distribución estadística se define por un único parámetro —los grados de libertad— y se usa para obtener el p-valor al contrastar datos categóricos con recuentos observados y esperados?",
    opciones: [
      "Distribución F",
      "Distribución binomial",
      "Distribución normal",
      "Distribución chi-cuadrado",
    ],
    correcta: 3,
    pista: "Es la que da nombre a la propia prueba de recuentos.",
    explicacion:
      "La chi-cuadrado depende solo de los grados de libertad y es la distribución de referencia de las pruebas de bondad de ajuste y de independencia.",
  },
  {
    id: "est-hipotesis-nula",
    tema: "estadistica",
    tipo: "opcion",
    enunciado: "¿Por qué le interesaría a un analista contrastar la hipótesis nula?",
    opciones: [
      "Quiere demostrar que la hipótesis nula y la alternativa son la misma",
      "La hipótesis nula demostrará que la alternativa es cierta",
      "Hay una duda sobre el statu quo que el analista quiere poner a prueba",
      "Quiere aumentar el intervalo de confianza del estudio",
    ],
    correcta: 2,
    pista: "La hipótesis nula representa «lo que se da por supuesto».",
    explicacion:
      "La nula recoge el statu quo. Se contrasta porque hay una sospecha de que no se sostiene; nunca se «demuestra» una hipótesis, solo se rechaza o no la nula.",
  },
  {
    id: "est-cola",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Una agencia de selección encuestó a más de 300 médicos para calcular su salario medio. La hipótesis alternativa es que los médicos ganan menos de 200.000. ¿Qué tipo de contraste hay que usar para el p-valor?",
    opciones: [
      "Contraste de dos colas",
      "Contraste de cola izquierda",
      "Contraste de cola derecha",
      "Contraste sin colas",
    ],
    correcta: 1,
    pista: "Fíjate hacia qué lado apunta el «menos que» de la alternativa.",
    explicacion:
      "La alternativa es «menor que», así que la región de rechazo está toda en la cola izquierda de la distribución.",
  },
  {
    id: "est-intervalo-confianza",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Se construye un intervalo de confianza del 95 % para la diferencia entre dos diseños web en tiempo medio en el sitio. Si el intervalo resultante es (−1,3 · 2,1), ¿qué se puede inferir sobre la diferencia?",
    opciones: [
      "Hay diferencia significativa porque el intervalo contiene el cero",
      "No hay diferencia significativa porque el intervalo contiene el cero",
      "Hay diferencia significativa porque el intervalo no contiene el cero",
      "No hay diferencia significativa porque el intervalo no contiene el cero",
    ],
    correcta: 1,
    pista: "¿Está el 0 dentro del intervalo? ¿Qué significaría una diferencia de 0?",
    explicacion:
      "El intervalo va de −1,3 a 2,1, así que incluye el 0: «ninguna diferencia» es un valor plausible y no se puede afirmar que los diseños difieran.",
  },
  {
    id: "est-z-rango",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Un z-test es un contraste de hipótesis que se usa cuando la muestra es grande y las varianzas son conocidas. Su resultado se llama estadístico z o z-score. ¿Cuál es el rango del estadístico z?",
    opciones: ["0 a 1", "−1 a 1", "0 a ∞", "−∞ a +∞"],
    correcta: 3,
    pista: "El z-score cuenta desviaciones típicas respecto de la media, y no hay tope.",
    explicacion:
      "z = (x − μ)/σ puede tomar cualquier valor real: no está acotado por arriba ni por abajo.",
  },
  {
    id: "est-f-test",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Un t-test se usa para ver si hay diferencia entre las medias de dos grupos. Uno de sus supuestos es que las dos poblaciones tienen varianzas iguales. ¿Qué prueba se puede hacer antes para comprobarlo?",
    opciones: ["F-test", "Prueba chi-cuadrado", "Z-test"],
    correcta: 0,
    pista: "Es la prueba que compara varianzas mediante su cociente.",
    explicacion:
      "El F-test contrasta la igualdad de varianzas comparando su cociente con la distribución F. Es el paso previo habitual al t-test.",
  },
  {
    id: "est-maxima-verosimilitud",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Has observado datos de una muestra de 15 participantes sobre su peso (kg) y supones que siguen una distribución normal. ¿Qué método puedes usar para estimar los parámetros de esa distribución a partir de tus observaciones?",
    opciones: [
      "Estimación por máxima verosimilitud",
      "Bondad de ajuste chi-cuadrado",
      "Coeficiente de correlación de Pearson",
    ],
    correcta: 0,
    pista: "Se busca el parámetro que hace más probables los datos que ya viste.",
    explicacion:
      "La máxima verosimilitud elige los parámetros que maximizan la probabilidad de haber observado esos datos. Las otras dos opciones no estiman parámetros.",
  },
  {
    id: "est-geometrica",
    tema: "probabilidad",
    tipo: "opcion",
    enunciado:
      "Un jugador de baloncesto tiene un 60 % de acierto en tiros libres. ¿Qué distribución usarías para modelar la probabilidad de que enceste su primer tiro libre en el segundo intento?",
    opciones: [
      "Distribución binomial",
      "Distribución exponencial",
      "Distribución de Poisson",
      "Distribución geométrica",
    ],
    correcta: 3,
    pista: "La pregunta es «cuántos intentos hasta el primer éxito».",
    explicacion:
      "La geométrica modela el número de intentos hasta el primer éxito. La binomial contaría éxitos en un número fijo de intentos.",
  },
  {
    id: "est-poisson-microchips",
    tema: "probabilidad",
    tipo: "opcion",
    enunciado:
      "Eres analista en una fábrica de microchips. Sabes que de media salen 10 chips defectuosos al día. ¿Qué distribución usarías para la probabilidad de que 3 de los chips fabricados en el próximo turno de 8 horas sean defectuosos, suponiendo ritmo de producción constante?",
    opciones: [
      "Distribución de Poisson",
      "Distribución binomial",
      "Distribución normal",
      "Distribución t",
    ],
    correcta: 0,
    pista: "Hay una tasa media de sucesos por unidad de tiempo, no un número fijo de intentos.",
    explicacion:
      "Poisson modela el número de sucesos en un intervalo cuando se conoce la tasa media. La binomial necesitaría un número fijo de ensayos con probabilidad individual.",
  },
  {
    id: "est-poisson-lluvia",
    tema: "probabilidad",
    tipo: "opcion",
    enunciado:
      "¿Qué distribución usarías para la probabilidad de que haya menos de cinco días de lluvia el mes que viene, sabiendo que de media hay 50 días de lluvia al año sin diferencias entre estaciones?",
    opciones: [
      "Distribución de Poisson",
      "Distribución binomial",
      "Distribución normal",
      "Distribución chi-cuadrado",
    ],
    correcta: 0,
    pista: "Otra vez: sucesos contados en un intervalo, con tasa media conocida.",
    explicacion:
      "Igual que con los microchips: una tasa media por unidad de tiempo y un recuento de sucesos en un intervalo es el caso típico de Poisson.",
  },

  {
    id: "est-validez-interna",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Asignar los participantes al azar al grupo de tratamiento o al de control mejora ¿qué cosa en un experimento?",
    opciones: ["Confianza estadística", "Frecuencia relativa", "Validez interna"],
    correcta: 2,
    pista: "Se trata de poder atribuir el efecto al tratamiento y no a otra cosa.",
    explicacion:
      "La aleatorización reparte las variables de confusión entre los grupos, lo que refuerza la validez interna: la confianza en que el efecto observado se debe al tratamiento.",
  },
  {
    id: "est-diseno-experimental",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Si quieres establecer el efecto que un factor, o variable independiente, tiene sobre una variable dependiente, tu diseño de investigación debe ser:",
    opciones: ["Explicativo", "Experimental", "Correlacional", "Descriptivo"],
    correcta: 1,
    pista: "Solo un tipo de diseño permite hablar de causa y efecto.",
    explicacion:
      "Solo el diseño experimental —manipulando el factor y controlando el resto— permite atribuir causalidad. El correlacional solo detecta asociación.",
  },
  {
    id: "est-solomon",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "¿Cuál de estos diseños experimentales permite determinar si los cambios en la variable dependiente se deben a un efecto de interacción entre el pretest y el tratamiento?",
    opciones: [
      "Pretest-postest aleatorizado de dos grupos",
      "Solo postest aleatorizado de dos grupos",
      "Diseño de cuatro grupos de Solomon",
      "Diseño factorial",
    ],
    correcta: 2,
    pista: "Hace falta un diseño que tenga grupos con pretest y grupos sin él.",
    explicacion:
      "El diseño de Solomon combina cuatro grupos —con y sin pretest, con y sin tratamiento—, que es justo lo que permite aislar el efecto del propio pretest.",
  },
  {
    id: "est-bloques",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Una cadena hotelera va a hacer un experimento sobre el impacto de distintas estrategias promocionales en las reservas. Tiene hoteles en varias ubicaciones y quiere tener en cuenta las variaciones por ubicación. ¿Qué diseño experimental debería usar?",
    opciones: [
      "Diseño aleatorio estratificado",
      "Diseño por bloques aleatorizado",
      "Diseño completamente aleatorio",
      "Diseño factorial",
    ],
    correcta: 1,
    pista: "La ubicación es una fuente de variación conocida que conviene agrupar antes de aleatorizar.",
    explicacion:
      "En el diseño por bloques se agrupa por la variable molesta —aquí la ubicación— y se aleatoriza dentro de cada bloque, para que esa variación no se confunda con el efecto de la promoción.",
  },
  {
    id: "est-matching",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Diseñas un experimento sobre el efecto de fumar puros en la diabetes. Para controlar variables de confusión has identificado dos grupos de personas iguales en sexo, peso, clase social, estudios y ejercicio, salvo que uno fuma y el otro no. ¿Qué estrategia de control has usado?",
    opciones: ["Doble ciego", "Estratificación", "Estudio de cohortes", "Emparejamiento"],
    correcta: 3,
    pista: "Los dos grupos se han hecho coincidir uno a uno en todo lo demás.",
    explicacion:
      "El emparejamiento (*matching*) consiste en construir grupos equivalentes en las variables de confusión, de forma que la única diferencia sea la que se estudia.",
  },

  {
    id: "viz-xticks",
    figura: "viz-xticks.svg",
    tema: "viz",
    tipo: "completar",
    enunciado:
      "Usando el módulo `matplotlib.pyplot`, completa el código para fijar nuevas posiciones y etiquetas de las marcas del eje x.",
    codigo: `import matplotlib.pyplot as plt

plt.scatter(trait_a, trait_b,s=size, alpha=.5, cmap='CMRmap')
plt.{{0}}([10,20,30,40,50],['very low','low','moderate','high','very high'])
plt.show()`,
    huecos: [{ respuestas: ["xticks"], ancho: 12 }],
    pista: "La función recibe dos listas: dónde van las marcas y qué pone en cada una.",
    explicacion:
      "`plt.xticks(posiciones, etiquetas)` sustituye los números del eje x por el texto que le pases. Para el eje y sería `yticks`.",
  },
  {
    id: "viz-plot-lineas",
    figura: "viz-plot-lineas.svg",
    tema: "viz",
    tipo: "completar",
    enunciado:
      "Tienes un dataset `df` con las ventas de cinco años de una empresa. Crea un gráfico de líneas para ver la tendencia de las ventas con `matplotlib`.",
    datos: `   year   sales
0  2016   80000
1  2017  120000
2  2018  150000
3  2019  180000
4  2020  210000`,
    codigo: `import pandas as pd
import matplotlib.pyplot as plt

# create line plot for df
plt.{{0}}({{1}}, {{2}}, marker='o')

plt.xlabel('Year')
plt.xticks(df['year'])
plt.ylabel('Sales')

plt.show()`,
    huecos: [
      { respuestas: ["plot"], ancho: 10 },
      { respuestas: ["df['year']", 'df["year"]'], ancho: 14 },
      { respuestas: ["df['sales']", 'df["sales"]'], ancho: 14 },
    ],
    pista: "Primero el eje x, después el eje y.",
    explicacion:
      "`plt.plot(x, y)` une los puntos con líneas. `marker='o'` además marca cada observación.",
  },
  {
    id: "viz-boxplot",
    figura: "viz-boxplot.svg",
    tema: "viz",
    tipo: "completar",
    enunciado:
      "Una universidad analiza el rendimiento de los alumnos de cuatro clases. El dataframe `df` tiene el nombre de la clase, las notas y el tiempo de estudio. ¿Cómo creas un diagrama de caja para comparar la distribución de `Study Time` en cada clase?",
    datos: `  Class  Score  Study Time
0     A     85          10
1     A     90          15
2     A     78          12
3     A     92           8
4     B     76          14`,
    codigo: `import pandas as pd
import matplotlib.pyplot as plt

df.{{0}}({{1}}='Class', {{2}}='Study Time')
plt.show()`,
    huecos: [
      { respuestas: ["boxplot"], ancho: 12 },
      { respuestas: ["by"], ancho: 8 },
      { respuestas: ["column"], ancho: 10 },
    ],
    pista: "`by` dice cómo agrupar; `column` dice qué variable se dibuja.",
    explicacion:
      "`df.boxplot(by='Class', column='Study Time')` genera una caja por clase. Es el atajo de pandas sobre matplotlib.",
  },
  {
    id: "viz-countplot",
    figura: "viz-countplot.svg",
    tema: "viz",
    tipo: "completar",
    enunciado:
      "El dataset `df` recoge las horas de estudio, el dispositivo usado y las notas de unos alumnos. Usa `seaborn` para crear un gráfico con el número de observaciones de cada dispositivo.",
    codigo: `import matplotlib.pyplot as plt
import seaborn as sns

# create plot
sns.{{0}}(x='study_device', data=df,
             order=df['study_device'].value_counts().sort_values().index)

plt.xlabel('Study Device')
plt.ylabel('Number of Students')
plt.title('Number of Students by Study Device')

plt.show()`,
    huecos: [{ respuestas: ["countplot"], ancho: 14 }],
    pista: "Cuenta cuántas filas hay de cada categoría, sin que le pases tú los totales.",
    explicacion:
      "`sns.countplot` hace el recuento por categoría y lo dibuja. Con `barplot` habrías tenido que calcular los totales antes.",
  },
  {
    id: "viz-heatmap",
    figura: "viz-heatmap.svg",
    tema: "viz",
    tipo: "completar",
    enunciado:
      "Dada una tabla de pandas `df`, haz un mapa de calor anclando los colores a los valores máximo y mínimo de la tabla.",
    datos: `    A   B   C   D
1  35  57  75  48
2  75  89  27  83
3  57  33  31  43
4   8   3  93  56`,
    codigo: `import seaborn as sns
import matplotlib.pyplot as plt

min_val = df.min().min()
max_val = df.max().max()

sns.heatmap(data=df, {{0}}=min_val, {{1}}=max_val)
plt.show()`,
    huecos: [
      { respuestas: ["vmin"], ancho: 10 },
      { respuestas: ["vmax"], ancho: 10 },
    ],
    pista: "Los dos argumentos empiezan igual: fijan los extremos de la escala de color.",
    explicacion:
      "`vmin` y `vmax` fijan los límites de la escala de color. Sin ellos, seaborn los deduce de los datos y dos mapas distintos no serían comparables.",
  },

  {
    id: "pd-nunique",
    tema: "pandas",
    tipo: "completar",
    enunciado:
      "En el dataframe `df`, cuenta el número de valores distintos de `Column 2`.",
    datos: `   Column 1 Column 2
0         0        A
1         1        A
2         1        B
3         1        A`,
    codigo: `import pandas as pd

unique_count = df['Column 2'].{{0}}
print(unique_count)`,
    huecos: [{ respuestas: ["nunique()"], ancho: 14 }],
    salida: "2",
    pista: "`unique()` devolvería la lista de valores; aquí se pide cuántos son.",
    explicacion:
      "`nunique()` cuenta los valores distintos y devuelve un número. `unique()` habría devuelto `array(['A', 'B'])`.",
  },
  {
    id: "pd-select-dtypes",
    tema: "pandas",
    tipo: "completar",
    enunciado:
      "Selecciona solo las columnas que NO son de tipo `int` en el dataframe de abajo.",
    codigo: `import pandas as pd
import numpy as np

selected_values = df.{{0}}(exclude='int')
print(selected_values)`,
    huecos: [{ respuestas: ["select_dtypes"], ancho: 18 }],
    salida: `  transportation  daily_temp
0            Car      31.240
1            Bus      26.156
2            Car      28.173
3          Train      29.148`,
    pista: "El método filtra columnas por su tipo, no por su nombre.",
    explicacion:
      "`select_dtypes` acepta `include=` o `exclude=` y devuelve solo las columnas cuyo dtype encaja.",
  },
  {
    id: "pd-pivot-values",
    tema: "pandas",
    tipo: "completar",
    enunciado:
      "El dataframe `store_sales` tiene muchas columnas. Usa una tabla dinámica para mostrar solo los datos de tienda de las columnas `daily_customers` y `sales`.",
    codigo: `import pandas as pd

sales = pd.pivot_table(product_sales, index='store_id', {{0}}=['daily_customers', 'sales'])

print(sales)`,
    huecos: [{ respuestas: ["values"], ancho: 10 }],
    salida: `          daily_customers  sales
store_id
1                     530  66490
2                     210  39820
3                     720  54010`,
    pista: "`index` ya dice por qué se agrupa; falta decir qué columnas se resumen.",
    explicacion:
      "`values` es la lista de columnas que se agregan. Sin él, pandas resumiría todas las numéricas del dataframe.",
  },
  {
    id: "pd-pivot-fillvalue",
    tema: "pandas",
    tipo: "completar",
    enunciado:
      "Usamos la tabla dinámica de abajo para resumir el dataframe. Pasa el argumento correcto para sustituir por 0 todos los posibles valores *NaN*.",
    codigo: `import pandas as pd

store_products = pd.pivot_table(df, values=['price', 'promo', 'quantity'], index=['store', 'product'],
{{0}}=0)

print(store_products)`,
    huecos: [{ respuestas: ["fill_value"], ancho: 14 }],
    salida: `               price  promo  quantity
store product
1     BIS-677   1.50      0         3
      COF-433   2.30      1         2
      COL-912   1.05      1         0
      MIL-124   0.89      0         0`,
    pista: "No es `fillna`: es un argumento de la propia tabla dinámica.",
    explicacion:
      "`fill_value` sustituye los huecos que aparecen al cruzar categorías sin datos. Hacerlo dentro del pivot evita un `fillna` posterior.",
  },
  {
    id: "pd-isna-any",
    tema: "pandas",
    tipo: "completar",
    enunciado:
      "Comprueba si cada columna del dataset `df` tiene valores faltantes.",
    datos: `student_id  test_anxiety  social_support  exam_score
         1          high             yes          70
         2          high             yes          82
         3           low              no
         4           low              no          95`,
    codigo: `import pandas as pd

# Calculate missingness
print(df.{{0}})`,
    huecos: [
      { respuestas: ["isna().any()", "isnull().any()"], ancho: 18 },
    ],
    salida: `student_id        False
test_anxiety      False
social_support     True
exam_score         True
dtype: bool`,
    pista: "Primero marca cada celda como nula o no, y luego resume por columna.",
    explicacion:
      "`isna()` da una tabla de booleanos y `any()` la colapsa por columna: True si hay al menos un nulo. Con `sum()` saldría cuántos.",
  },
  {
    id: "pd-json-normalize",
    tema: "pandas",
    tipo: "opcion",
    enunciado:
      "El siguiente fichero JSON tiene datos anidados en varios niveles. Usa Pandas para separar los datos del campo anidado en columnas distintas.",
    codigo: `import pandas as pd

result = pd.{{?}}(data, max_level=1)
print(result)`,
    opciones: ["json_split", "json_flat", "normalize", "json_normalize"],
    correcta: 3,
    salida: `    id       name  measurements.height  measurements.weight
0  131        Mia                  157                   52
1  132  Sebastian                  165                   63
2  133     Andrew                  179                   72`,
    pista: "El nombre junta el formato de origen con la operación que hace.",
    explicacion:
      "`pd.json_normalize` aplana el JSON anidado creando columnas con notación de punto, como `measurements.height`.",
  },
  {
    id: "pd-strptime",
    tema: "pandas",
    tipo: "completar",
    enunciado:
      "Dada una cadena de Python `datetime_str`, conviértela de texto a tipo datetime.",
    codigo: `from datetime import datetime

datetime_str = '28/04/15 04:54:14'

converted_datetime = datetime.{{0}}(datetime_str, '%d/%m/%y %H:%M:%S')

print ("The type of the date is now",  type(converted_datetime))
print ("The date is", converted_datetime)`,
    huecos: [{ respuestas: ["strptime"], ancho: 14 }],
    salida: `The type of the date is now <class 'datetime.datetime'>
The date is 2015-04-28 04:54:14`,
    pista: "La `p` es de *parse*: lee texto y devuelve fecha. La otra, `strftime`, hace lo contrario.",
    explicacion:
      "`strptime(cadena, formato)` interpreta el texto según la plantilla. `strftime` es la inversa: de fecha a texto.",
  },
  {
    id: "pd-log10",
    tema: "pandas",
    tipo: "completar",
    enunciado:
      "El dataframe `df` contiene precios de casas en miles de dólares. La distribución está muy sesgada a la derecha y quieres aplicar una transformación logarítmica. Crea una columna nueva con el logaritmo en base 10 de los precios.",
    codigo: `import pandas as pd
import numpy as np

df['Log_House_Price'] = df['House_Price'].apply({{0}})

df.head()`,
    huecos: [{ respuestas: ["np.log10"], ancho: 14 }],
    salida: `   House_Price  Log_House_Price
0          100            2.000
1          200            2.301
2          300            2.477
3          400            2.602
4          500            2.699`,
    pista: "Ojo con la base: `np.log` es logaritmo natural.",
    explicacion:
      "`np.log10` es el logaritmo en base 10, que es el que da 2.000 para 100. `np.log` habría dado 4.605.",
  },
  {
    id: "pd-corr-spearman",
    tema: "pandas",
    tipo: "opcion",
    enunciado:
      "El dataframe `df` contiene la altura (cm) y la edad de unos niños. Calcula el coeficiente de correlación de Spearman con pandas.",
    datos: `   height  age
0      85   12
1     100   14
2      55    9
3      90    5
4      98   19
5     112   11`,
    codigo: `import pandas as pd

corr = df['height'].corr({{?}})
print(corr)`,
    opciones: [
      "df['age'],method='spearman'",
      "df['age']",
      "method='spearman'",
    ],
    correcta: 0,
    salida: "0.3714285714285715",
    pista: "`corr` necesita saber contra qué serie compara y con qué método.",
    explicacion:
      "`Series.corr(otra, method=...)` necesita las dos cosas: la serie con la que comparar y el método. Sin `method`, usaría Pearson por defecto.",
  },

  {
    id: "ml-imputer-constante",
    tema: "ml",
    tipo: "opcion",
    enunciado:
      "Tienes un dataset `df` con valores faltantes en la columna `payment_method`. Sustitúyelos por `'Card'` usando la librería `sklearn`.",
    codigo: `from sklearn.impute import SimpleImputer

imp = SimpleImputer({{?}})
df['payment_method'] = imp.fit_transform(df[['payment_method']])`,
    opciones: [
      "strategy = 'constant', fill_value = 'Card'",
      "strategy = 'values', fill_value = 'Card'",
      "strategy = 'values', fill = 'Card'",
      "strategy = 'constant', fill = 'Card'",
    ],
    correcta: 0,
    pista: "Una estrategia dice «usa siempre el mismo valor» y otro argumento dice cuál.",
    explicacion:
      "`strategy='constant'` indica que se rellena con un valor fijo, y `fill_value` es ese valor. `fill` no existe como argumento.",
  },
  {
    id: "ml-imputer-frecuente",
    tema: "ml",
    tipo: "opcion",
    enunciado:
      "Tienes un dataset `df` con valores faltantes en la columna `number_of_clients`. Sustitúyelos por el valor más común usando la librería `sklearn`.",
    codigo: `from sklearn.impute import SimpleImputer

imputer = SimpleImputer(strategy='{{?}}')
df['number_of_clients'] = imputer.fit_transform(df[['number_of_clients']])`,
    opciones: ["median", "mean", "most_frequent", "mode"],
    correcta: 2,
    pista: "El nombre que usa scikit-learn no es el término estadístico.",
    explicacion:
      "En `SimpleImputer` la estrategia de la moda se llama `most_frequent`; `mode` no es un valor válido y lanzaría un error.",
  },
  {
    id: "ml-missingness",
    tema: "ml",
    tipo: "opcion",
    enunciado:
      "Una empresa de transporte ha recogido datos de las horas de llegada de sus autobuses. Por atascos y fallos del sistema de seguimiento, se perdió el 5 % de los datos. La empresa no encuentra ningún patrón ni motivo. ¿Qué tipo de ausencia hay aquí?",
    opciones: [
      "Missing at Random (MAR)",
      "Missing Completely at Random (MCAR)",
      "Missing Not at Random (MNAR)",
    ],
    correcta: 1,
    pista: "La clave está en que no hay ningún patrón, ni relacionado con otras variables ni con el propio valor.",
    explicacion:
      "MCAR es cuando la ausencia no depende de nada. En MAR dependería de otras variables observadas, y en MNAR del propio valor que falta.",
  },
  {
    id: "ml-sin-transformacion",
    tema: "ml",
    tipo: "opcion",
    enunciado:
      "Si tienes un dataset donde la variable dependiente tiene varianza constante en los distintos niveles de las variables independientes, ¿qué tipo de transformación deberías usar?",
    opciones: [
      "Transformación raíz cuadrada",
      "Transformación logarítmica",
      "Transformación Box-Cox",
      "Ninguna transformación",
    ],
    correcta: 3,
    pista: "Varianza constante es justo lo que se busca conseguir transformando.",
    explicacion:
      "La homocedasticidad —varianza constante— ya es el supuesto que se quiere cumplir. Si se cumple, transformar no arregla nada y solo complica la interpretación.",
  },

  {
    id: "py-comprension",
    tema: "python",
    tipo: "completar",
    enunciado:
      "Filtra la lista de Python usando una *list comprehension* de forma que solo se devuelvan los valores mayores o iguales a 15.",
    codigo: `my_list = [15, 18, 17, 12, 11, 7, 8]
filterd_list = [{{0}}]
print(filterd_list)`,
    huecos: [{ respuestas: ["x for x in my_list if x >= 15"], ancho: 30 }],
    salida: "[15, 18, 17]",
    pista: "La estructura es: qué devuelves, de dónde lo sacas y con qué condición.",
    explicacion:
      "Una list comprehension es `[expresión for elemento in iterable if condición]`. Hace lo mismo que `filter` con una lambda, pero se lee de corrido.",
  },

  {
    id: "sql-sqlalchemy",
    tema: "sql",
    tipo: "completar",
    enunciado:
      "Consulta la tabla `movies` de la base de datos `movies.sqlite` para devolver las películas cuyo `director_id` es 4762.",
    codigo: `from sqlalchemy import create_engine
import pandas as pd

engine = create_engine("sqlite:///movies.sqlite")
conn = engine.connect()

query = conn.{{0}}("SELECT * FROM movies WHERE director_id = 4762")
df = pd.DataFrame(query.fetchall())

conn.close()
print(df[1].head(4))`,
    huecos: [{ respuestas: ["execute"], ancho: 12 }],
    salida: `0                   Avatar
1                  Titanic
2  Terminator 2: Judgment Day
3                True Lies
Name: 1, dtype: object`,
    pista: "Sobre la conexión se lanza la sentencia; luego `fetchall` recoge las filas.",
    explicacion:
      "`conn.execute(sql)` manda la consulta y devuelve un cursor; `fetchall()` trae todas las filas para construir el DataFrame.",
  },

  {
    id: "py-prueba-escritorio-conteo",
    tema: "python",
    tipo: "opcion",
    enunciado:
      "Haz una prueba de escritorio y marca el valor que tomaría la variable `resultado`. Ten en cuenta que la indexación empieza en 1 y no en 0.",
    codigo: `conteo = [1, 2, 2, 3, 3]
m = 5

conteo2 = conteo
n = longitud(conteo)   # es cinco

i = 1
mientras (i <= n) {
    conteo_i = conteo2[i]
    j = 1

    mientras (j <= m) {
        si (j == conteo_i) {
            conteo = conteo[-1]   # elimina el primer elemento del vector "conteo"
            m = m - j
            break
        } por lo contrario {
            j = j + 1
        }
    }
    i = i + 1
}

resultado = longitud(conteo)
imprimir(resultado)`,
    opciones: ["1", "2", "3", "4", "5"],
    correcta: 1,
    pista:
      "`conteo2` no cambia nunca: se recorre entero. El que se va acortando es `conteo`, y `m` se hace más pequeño en cada vuelta.",
    explicacion:
      "i=1 → conteo_i=1, j=1 coincide: conteo=[2,2,3,3] y m=4. i=2 → conteo_i=2, j llega a 2: conteo=[2,3,3] y m=2. i=3 → conteo_i=2, j llega a 2: conteo=[3,3] y m=0. En i=4 e i=5 el bucle interno ya no entra, porque j=1 no cumple j<=0. Quedan dos elementos.",
  },
  {
    id: "py-bucle-anidado-c",
    tema: "python",
    tipo: "opcion",
    enunciado: "¿Cuál es la salida del objeto `c`?",
    codigo: `c = [0 for i in range(5)]
p = 0

for i in range(3):
    for j in range(i):
        print(i)
        if i >= j:
            c[p] = j * i + 2
            p = p + 1
            print(p)

print(c)`,
    opciones: ["[0, 2, 4, 0, 0]", "[2, 2, 2, 4, 0]", "[2, 2, 4, 0, 0]", "[2, 4, 0, 0, 0]"],
    correcta: 2,
    salida: "[2, 2, 4, 0, 0]",
    pista: "`range(i)` no da ninguna vuelta cuando `i` vale 0. Y dentro, `i >= j` se cumple siempre.",
    explicacion:
      "Con i=0, `range(0)` no itera. Con i=1, j=0: c[0]=0*1+2=2. Con i=2, j=0: c[1]=0*2+2=2, y j=1: c[2]=1*2+2=4. `p` solo avanza tres veces, así que las dos últimas posiciones se quedan en 0.",
  },

  {
    id: "sql-case-migracion-exitosa",
    tema: "sql",
    tipo: "opcion",
    enunciado:
      "La tabla `eco_mov_recomendacion_car` tiene 235407 registros y `resultados.reporte_coordinador_productizar` es la de abajo. ¿Qué valor devuelve la columna `migracion_exitosa`?",
    datos: `table_name                 end_status  migrated_records
eco_mov_recomendacion_car  OK          2
eco_mov_recomendacion_car  OK          2
eco_mov_recomendacion_car  OK          74
eco_mov_recomendacion_car  OK          15
eco_mov_recomendacion_car  OK          2`,
    codigo: `with aux as (
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
left join aux t2 on (t1.key = t2.key);`,
    opciones: ["1", "2", "3", "Error"],
    correcta: 1,
    pista:
      "`aux` se queda con una sola fila. Mira por qué columna ordena y en qué sentido antes de aplicar el `limit 1`.",
    explicacion:
      "`aux` ordena por `migrated_records` ascendente y toma la primera fila, así que trae el valor más pequeño. `aux2` cuenta los 235407 registros de la otra tabla. Como 235407 es mayor, se cumple el primer WHEN y la consulta devuelve 2.",
  },
  {
    id: "sql-create-table-fail",
    tema: "sql",
    tipo: "opcion",
    enunciado:
      "Sobre `resultados.reporte_coordinador_productizar`, crea una tabla con las columnas `table_name`, `migrated_records` y `end_status`, quedándote con los registros de `end_status` igual a 'FAIL' y `start_date` de los últimos 3 meses. Añade dos variables: `ejecucion_tarde`, que vale 1 si `end_date` cae por la tarde, y `Fail_registros_cero`, que vale 1 si `end_status` es 'FAIL' y `migrated_records` es 0. ¿Cuál de las cuatro opciones lo cumple?",
    codigo: `-- opcion_A
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
where end_status = "FAIL" and start_date >= (now() - interval 3 month);`,
    opciones: ["jcd_opcion_A", "jcd_opcion_B", "jcd_opcion_C", "jcd_opcion_D"],
    correcta: 3,
    pista:
      "Revisa tres cosas en cada una: qué columnas selecciona, qué devuelve cuando la condición NO se cumple, y si el 1 y el 0 están en ese orden.",
    explicacion:
      "La A deja los CASE sin ELSE, así que da NULL en vez de 0. La B selecciona `*` en lugar de las tres columnas pedidas. La C invierte los valores: pone 0 cuando la condición se cumple. La D selecciona las columnas correctas y sus `if` devuelven 1 al cumplirse y 0 si no; el `end_status` de la segunda variable ya lo garantiza el WHERE.",
  },

  {
    id: "est-media-vs-desviacion",
    tema: "estadistica",
    tipo: "opcion",
    enunciado: "¿Cuál es la diferencia entre la media y la desviación estándar?",
    opciones: [
      "La media es la mediana de los datos, mientras que la desviación estándar mide la variabilidad.",
      "La media mide la variabilidad de los datos, mientras que la desviación estándar mide la moda.",
      "La media mide la variabilidad de los datos, mientras que la desviación estándar mide el valor central.",
      "La media es el promedio de los datos, mientras que la desviación estándar mide la dispersión de los datos alrededor de la media.",
    ],
    correcta: 3,
    pista: "Una responde «¿por dónde está el centro?» y la otra «¿qué tan lejos del centro caen los datos?».",
    explicacion:
      "La media es una medida de posición: el promedio. La desviación estándar es una medida de dispersión, la raíz de la varianza, y dice cuánto se separan los datos de esa media.",
  },
  {
    id: "est-t-student",
    tema: "estadistica",
    tipo: "opcion",
    enunciado: "¿En qué caso se utiliza una prueba t de Student?",
    opciones: [
      "Para comparar la media de dos grupos independientes.",
      "Para evaluar la relación no lineal entre dos variables.",
      "Para comparar la media de más de dos grupos independientes.",
      "Para medir la correlación entre dos variables.",
    ],
    correcta: 0,
    pista: "Fíjate en cuántos grupos admite. Con más de esos, la prueba se queda corta.",
    explicacion:
      "La t de Student contrasta las medias de dos grupos. Con tres o más se usa ANOVA, porque repetir pruebas t por parejas infla el error de tipo I.",
  },
  {
    id: "est-intervalo-90-95",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Si el intervalo de confianza al 90 % para la media de una población es (44; 75), ¿cuál podría ser el intervalo al 95 % de confianza?",
    opciones: ["(44; 79)", "(40; 79)", "(40; 75)", "(44; 75)"],
    correcta: 1,
    pista: "Más confianza pide más margen, y el intervalo sigue centrado en la misma media.",
    explicacion:
      "Al subir del 90 % al 95 % el valor crítico crece, así que el intervalo se ensancha por los dos lados sin moverse de su centro. (44; 75) está centrado en 59,5 y solo (40; 79) mantiene ese centro siendo más ancho; las otras dos lo desplazan.",
  },
  {
    id: "est-significancia-lm",
    tema: "estadistica",
    tipo: "opcion",
    enunciado:
      "Según el ajuste de este modelo de regresión lineal múltiple, ¿cuáles son las variables más significativas?",
    datos: `Coefficients:
                 Estimate Std. Error t value Pr(>|t|)
(Intercept)     6.995e+01  1.843e+00  37.956  < 2e-16 ***
habitantes      6.480e-05  3.001e-05   2.159   0.0367 *
ingresos        2.701e-04  3.087e-04   0.875   0.3867
analfabetismo   3.029e-01  4.024e-01   0.753   0.4559
asesinatos     -3.286e-01  4.941e-02  -6.652 5.12e-08 ***
universitarios  4.291e-02  2.332e-02   1.840   0.0730 .
heladas        -4.580e-03  3.189e-03  -1.436   0.1585
area           -1.558e-06  1.914e-06  -0.814   0.4205
densidad_pobl  -1.105e-03  7.312e-04  -1.511   0.1385`,
    opciones: ["Analfabetismo, Area", "Asesinatos, Habitantes", "Habitantes, Heladas", "Intercepto"],
    correcta: 1,
    pista: "Mira la columna `Pr(>|t|)` y las estrellas del final: marcan los p-valores por debajo de 0,05.",
    explicacion:
      "Solo `asesinatos` (5.12e-08) y `habitantes` (0.0367) bajan de 0,05. El intercepto es significativo pero no es una variable explicativa, y `universitarios` (0.0730) se queda en el 10 %, no en el 5 %.",
  },

  {
    id: "ml-matriz-confusion",
    tema: "ml",
    tipo: "opcion",
    enunciado: "¿Qué información proporciona una matriz de confusión?",
    opciones: [
      "La dispersión de los datos alrededor de la media.",
      "La relación entre dos variables.",
      "La cantidad de verdaderos positivos, verdaderos negativos, falsos positivos y falsos negativos.",
      "La media y la mediana de los datos.",
    ],
    correcta: 2,
    pista: "Cruza lo que el modelo predijo contra lo que la clase realmente era.",
    explicacion:
      "De esas cuatro casillas salen todas las métricas de clasificación: exactitud, precisión, recall y F1. Por eso importa mirarla y no solo el porcentaje de aciertos.",
  },
  {
    id: "ml-validacion-cruzada",
    tema: "ml",
    tipo: "opcion",
    enunciado:
      "¿Cuál es el objetivo de realizar validación cruzada durante el entrenamiento de un modelo analítico?",
    opciones: [
      "Encontrar los mejores hiperparámetros que obtienen el mejor performance del modelo analítico.",
      "Evaluar el desempeño del modelo analítico cruzando los resultados de los modelos analíticos.",
      "Encontrar los mejores hiperparámetros que obtienen el mejor resultado de ajuste del modelo analítico evitando el sobreentrenamiento.",
      "Imponer restricciones a los hiperparámetros para evitar el riesgo de sobreajuste.",
    ],
    correcta: 2,
    pista: "Hay dos opciones parecidas sobre hiperparámetros: quédate con la que añade algo más que «el mejor rendimiento».",
    explicacion:
      "Al partir los datos en pliegues y rotar cuál valida, el modelo se mide sobre datos que no vio al entrenar. Así se eligen hiperparámetros que generalizan, en vez de los que memorizan el conjunto de entrenamiento.",
  },
  {
    id: "ml-rf-vs-gbt",
    tema: "ml",
    tipo: "opcion",
    enunciado:
      "Elige la definición más acertada de un modelo de Random Forest (RF) y uno de Gradient Boosting Tree (GBT).",
    opciones: [
      "Todos son modelos basados en árboles, funcionan igual solo que el RF tiene mejor rendimiento casi siempre.",
      "El RF es un conjunto de árboles entrenados paralelamente, mientras que el GBT se entrena de manera serializada (el resultado de un árbol es insumo del otro).",
      "En esencia todos son un conjunto de árboles de decisión ensamblados de una u otra forma.",
      "El GBT es un conjunto de árboles entrenados paralelamente, mientras que el RF se entrena de manera serializada (el resultado de un árbol es insumo del otro).",
    ],
    correcta: 1,
    pista: "Uno hace bagging y el otro boosting. ¿Cuál necesita el error del árbol anterior para construir el siguiente?",
    explicacion:
      "Random Forest entrena árboles independientes sobre muestras distintas y promedia, así que se puede paralelizar. Gradient Boosting construye cada árbol para corregir el error del anterior, lo que obliga a ir en serie.",
  },

  {
    id: "ia-rag",
    tema: "ia",
    tipo: "opcion",
    enunciado: "¿Qué es RAG (Retrieval-Augmented Generation)?",
    opciones: [
      "Un modelo que solo genera texto sin consultar fuentes externas.",
      "Una técnica que combina recuperación de información con generación de texto para mejorar las respuestas de modelos de lenguaje.",
      "Un tipo de red neuronal convolucional para procesamiento de imágenes.",
      "Un método de compresión de datos para almacenamiento eficiente.",
    ],
    correcta: 1,
    pista: "El nombre lo dice en orden: primero se recupera, después se genera.",
    explicacion:
      "En RAG se buscan primero los fragmentos relevantes en una base de documentos y se le pasan al modelo como contexto. Así responde con información que no estaba en su entrenamiento y se apoya en fuentes citables.",
  },
  {
    id: "ia-tf-idf",
    tema: "ia",
    tipo: "opcion",
    enunciado: "¿Cuál es la diferencia entre TF (Term Frequency) e IDF (Inverse Document Frequency)?",
    opciones: [
      "TF mide la frecuencia de un término en todo el corpus, mientras que IDF mide su frecuencia en un documento específico.",
      "TF e IDF son lo mismo, solo que se calculan de manera diferente.",
      "TF mide la importancia semántica de las palabras, mientras que IDF mide la longitud de los documentos.",
      "TF mide cuántas veces aparece un término en un documento, mientras que IDF mide qué tan raro o común es ese término en todo el corpus.",
    ],
    correcta: 3,
    pista: "Una mira dentro de un solo documento; la otra mira el corpus entero. Ojo, que hay una opción con los papeles cambiados.",
    explicacion:
      "TF cuenta las apariciones del término en un documento. IDF baja el peso de los términos que salen en muchos documentos, porque no sirven para distinguirlos. El producto TF-IDF resalta lo que es frecuente aquí y raro en general.",
  },
  {
    id: "ia-agente-vs-workflow",
    tema: "ia",
    tipo: "opcion",
    enunciado: "¿Cuál es la diferencia entre un agente de IA y un flujo de trabajo (workflow) basado en un LLM?",
    opciones: [
      "Ambos son exactamente lo mismo, solo cambia el nombre según el proveedor de tecnología.",
      "Un agente puede tomar decisiones autónomas y ejecutar acciones de forma dinámica, mientras que un workflow sigue una secuencia de pasos predefinida.",
      "Un workflow es más inteligente que un agente porque puede aprender en tiempo real.",
      "Un agente solo responde preguntas, mientras que un workflow puede conectarse a bases de datos.",
    ],
    correcta: 1,
    pista: "Piensa en quién decide cuál es el siguiente paso: ¿quien programó el sistema, o el modelo mientras se ejecuta?",
    explicacion:
      "En un workflow los pasos y su orden están escritos de antemano. Un agente decide en cada vuelta qué herramienta usar y cuándo parar, según lo que va observando. Los dos pueden llamar a bases de datos.",
  },
];
