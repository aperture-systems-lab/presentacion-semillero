# pandas

Dataframes: limpieza, filtros y grupos

14 pregunta(s). Las pistas y las respuestas van plegadas: despliégalas solo cuando lo hayas intentado.

[← volver al índice](README.md)

---

## 1. pd-fillna

En el dataframe `df`, rellena los valores faltantes de `column one` con el promedio de esa misma columna.

**Datos**

````
   column one  column two
a    0.430473    0.982138
b         nan         nan
c   -0.520513    0.341685
d         nan         nan
e    0.816822     -1.5588
f         nan         nan
````

**Completa el código**

````python
import pandas as pd

df["column one"] = df["column one"].fillna(____________________)

print(df)
````

**Salida esperada**

````
    column one  column two
a     0.430473    0.982138
b     0.242261         NaN
c    -0.520513    0.341685
d     0.242261         NaN
e     0.816822   -1.558805
f     0.242261         NaN
````

<details>
<summary>Pista</summary>

`fillna` recibe el valor con el que rellenar; ese valor lo calcula la propia columna.

</details>

<details>
<summary>Respuesta</summary>

````
df["column one"].mean()
````

`.mean()` ignora los NaN por defecto, así que el promedio sale de los tres valores presentes y se usa para tapar los huecos.

</details>

---

## 2. pd-to-datetime

Tienes un DataFrame `data` con las columnas `date` y `time` como texto. Crea una columna `datetime` de tipo fecha-hora combinando las dos.

**Datos**

````
      date        time
2022-10-11   12:30 PM
2022-09-30   02:15 AM
2022-08-17   04:00 PM
````

**Completa el código**

````python
import pandas as pd

data['datetime'] = ____________________(data['date'] + ' ' + data['time'])

data['datetime']
````

**Salida esperada**

````
0   2022-10-11 12:30:00
1   2022-09-30 02:15:00
2   2022-08-17 16:00:00
Name: datetime, dtype: datetime64[ns]
````

<details>
<summary>Pista</summary>

La función vive en el propio pandas, no en el DataFrame.

</details>

<details>
<summary>Respuesta</summary>

````
pd.to_datetime
````

`pd.to_datetime` interpreta la cadena y devuelve una serie `datetime64[ns]`, que ya permite ordenar, restar y extraer partes de la fecha.

</details>

---

## 3. pd-isin

Tienes un dataset de ventas `df` de varios restaurantes. Filtra los datos para quedarte solo con las tiendas `ABC01` y `GHI03`.

**Datos**

````
 store   number_of_clients   date         bill_total
 MNO05   4                   2022-06-24   127.39
 ABC01   8                   2023-05-16   179.88
 MNO05   4                   2022-05-11   197.12
 GHI03   8                   2023-08-08   193.94
 ...     ...                 ...          ...
````

**Completa el código**

````python
import numpy as np
import pandas as pd

filtered_df = df[df['store'].____________(['ABC01', 'GHI03'])]
filtered_df.head()
````

**Salida esperada**

````
    store  number_of_clients        date  bill_total
1   ABC01                  8  2023-05-16      179.88
3   GHI03                  8  2023-08-08      193.94
8   ABC01                  1  2023-06-22      223.06
11  GHI03                  6  2022-08-27       36.65
12  GHI03                  7  2022-10-05      136.90
````

<details>
<summary>Pista</summary>

Para varios valores no sirve `==`: hace falta preguntar «¿está en esta lista?».

</details>

<details>
<summary>Respuesta</summary>

````
isin
````

`.isin(lista)` devuelve una serie booleana con True donde el valor pertenece a la lista, y esa máscara filtra el DataFrame.

</details>

---

## 4. pd-groupby-count

Dado un dataframe `df` con nombres, país y salario, calcula cuántas personas hay por país.

**Datos**

````
Country   Name      Salary
USA       Alex      120000
Canada    Jon        90000
UK        Will       75000
USA       Dominic   150000
Canada    Rachel     80000
UK        Sara       95000
````

**Completa el código**

````python
import pandas as pd

grouped_df = df.groupby("Country")["Name"].______________
grouped_df
````

**Salida esperada**

````
Country
Canada    2
UK        2
USA       2
Name: Name, dtype: int64
````

<details>
<summary>Pista</summary>

No queremos sumar ni promediar salarios: queremos contar filas por grupo.

</details>

<details>
<summary>Respuesta</summary>

````
count()
````

Tras `groupby`, `.count()` cuenta los valores no nulos de la columna dentro de cada grupo.

</details>

---

## 5. pd-regex-findall

Dado el dataset `df`, filtra con expresiones regulares las frases que empiezan por 'The' y terminan con la letra 'n'.

**Datos**

````
   Sentence                Author
0  The sun in Spain        Tom F.
1  The walk to the moon    Malik P.
2  Holding on to dear life John W.
3  A cold winters night    Lilli C.
````

**Elige el código que da la salida**

````python
import pandas as pd

filtered = df['Sentence'].str.findall('____')
print(filtered)
````

**Opciones**

1. `^The.n$`
2. `^The*n$`
3. `^The.*n$`

**Salida esperada**

````
0       [The sun in Spain]
1    [The walk to the moon]
2                       []
3                       []
Name: Sentence, dtype: object
````

<details>
<summary>Pista</summary>

Hay que permitir cualquier cantidad de cualquier carácter entre 'The' y la 'n' final.

</details>

<details>
<summary>Respuesta</summary>

````
^The.*n$
````

`^` ancla al principio y `$` al final. `.` es «cualquier carácter» y `*` es «cero o más veces», así que `.*` cubre todo lo que haya en medio. En `^The*n$` el `*` afectaría solo a la 'e'.

</details>

---

## 6. pd-nunique

En el dataframe `df`, cuenta el número de valores distintos de `Column 2`.

**Datos**

````
   Column 1 Column 2
0         0        A
1         1        A
2         1        B
3         1        A
````

**Completa el código**

````python
import pandas as pd

unique_count = df['Column 2'].______________
print(unique_count)
````

**Salida esperada**

````
2
````

<details>
<summary>Pista</summary>

`unique()` devolvería la lista de valores; aquí se pide cuántos son.

</details>

<details>
<summary>Respuesta</summary>

````
nunique()
````

`nunique()` cuenta los valores distintos y devuelve un número. `unique()` habría devuelto `array(['A', 'B'])`.

</details>

---

## 7. pd-select-dtypes

Selecciona solo las columnas que NO son de tipo `int` en el dataframe de abajo.

**Completa el código**

````python
import pandas as pd
import numpy as np

selected_values = df.__________________(exclude='int')
print(selected_values)
````

**Salida esperada**

````
  transportation  daily_temp
0            Car      31.240
1            Bus      26.156
2            Car      28.173
3          Train      29.148
````

<details>
<summary>Pista</summary>

El método filtra columnas por su tipo, no por su nombre.

</details>

<details>
<summary>Respuesta</summary>

````
select_dtypes
````

`select_dtypes` acepta `include=` o `exclude=` y devuelve solo las columnas cuyo dtype encaja.

</details>

---

## 8. pd-pivot-values

El dataframe `store_sales` tiene muchas columnas. Usa una tabla dinámica para mostrar solo los datos de tienda de las columnas `daily_customers` y `sales`.

**Completa el código**

````python
import pandas as pd

sales = pd.pivot_table(product_sales, index='store_id', __________=['daily_customers', 'sales'])

print(sales)
````

**Salida esperada**

````
          daily_customers  sales
store_id
1                     530  66490
2                     210  39820
3                     720  54010
````

<details>
<summary>Pista</summary>

`index` ya dice por qué se agrupa; falta decir qué columnas se resumen.

</details>

<details>
<summary>Respuesta</summary>

````
values
````

`values` es la lista de columnas que se agregan. Sin él, pandas resumiría todas las numéricas del dataframe.

</details>

---

## 9. pd-pivot-fillvalue

Usamos la tabla dinámica de abajo para resumir el dataframe. Pasa el argumento correcto para sustituir por 0 todos los posibles valores *NaN*.

**Completa el código**

````python
import pandas as pd

store_products = pd.pivot_table(df, values=['price', 'promo', 'quantity'], index=['store', 'product'],
______________=0)

print(store_products)
````

**Salida esperada**

````
               price  promo  quantity
store product
1     BIS-677   1.50      0         3
      COF-433   2.30      1         2
      COL-912   1.05      1         0
      MIL-124   0.89      0         0
````

<details>
<summary>Pista</summary>

No es `fillna`: es un argumento de la propia tabla dinámica.

</details>

<details>
<summary>Respuesta</summary>

````
fill_value
````

`fill_value` sustituye los huecos que aparecen al cruzar categorías sin datos. Hacerlo dentro del pivot evita un `fillna` posterior.

</details>

---

## 10. pd-isna-any

Comprueba si cada columna del dataset `df` tiene valores faltantes.

**Datos**

````
student_id  test_anxiety  social_support  exam_score
         1          high             yes          70
         2          high             yes          82
         3           low              no
         4           low              no          95
````

**Completa el código**

````python
import pandas as pd

# Calculate missingness
print(df.__________________)
````

**Salida esperada**

````
student_id        False
test_anxiety      False
social_support     True
exam_score         True
dtype: bool
````

<details>
<summary>Pista</summary>

Primero marca cada celda como nula o no, y luego resume por columna.

</details>

<details>
<summary>Respuesta</summary>

````
isna().any()
````

`isna()` da una tabla de booleanos y `any()` la colapsa por columna: True si hay al menos un nulo. Con `sum()` saldría cuántos.

</details>

---

## 11. pd-json-normalize

El siguiente fichero JSON tiene datos anidados en varios niveles. Usa Pandas para separar los datos del campo anidado en columnas distintas.

**Elige el código que da la salida**

````python
import pandas as pd

result = pd.____(data, max_level=1)
print(result)
````

**Opciones**

1. `json_split`
2. `json_flat`
3. `normalize`
4. `json_normalize`

**Salida esperada**

````
    id       name  measurements.height  measurements.weight
0  131        Mia                  157                   52
1  132  Sebastian                  165                   63
2  133     Andrew                  179                   72
````

<details>
<summary>Pista</summary>

El nombre junta el formato de origen con la operación que hace.

</details>

<details>
<summary>Respuesta</summary>

````
json_normalize
````

`pd.json_normalize` aplana el JSON anidado creando columnas con notación de punto, como `measurements.height`.

</details>

---

## 12. pd-strptime

Dada una cadena de Python `datetime_str`, conviértela de texto a tipo datetime.

**Completa el código**

````python
from datetime import datetime

datetime_str = '28/04/15 04:54:14'

converted_datetime = datetime.______________(datetime_str, '%d/%m/%y %H:%M:%S')

print ("The type of the date is now",  type(converted_datetime))
print ("The date is", converted_datetime)
````

**Salida esperada**

````
The type of the date is now <class 'datetime.datetime'>
The date is 2015-04-28 04:54:14
````

<details>
<summary>Pista</summary>

La `p` es de *parse*: lee texto y devuelve fecha. La otra, `strftime`, hace lo contrario.

</details>

<details>
<summary>Respuesta</summary>

````
strptime
````

`strptime(cadena, formato)` interpreta el texto según la plantilla. `strftime` es la inversa: de fecha a texto.

</details>

---

## 13. pd-log10

El dataframe `df` contiene precios de casas en miles de dólares. La distribución está muy sesgada a la derecha y quieres aplicar una transformación logarítmica. Crea una columna nueva con el logaritmo en base 10 de los precios.

**Completa el código**

````python
import pandas as pd
import numpy as np

df['Log_House_Price'] = df['House_Price'].apply(______________)

df.head()
````

**Salida esperada**

````
   House_Price  Log_House_Price
0          100            2.000
1          200            2.301
2          300            2.477
3          400            2.602
4          500            2.699
````

<details>
<summary>Pista</summary>

Ojo con la base: `np.log` es logaritmo natural.

</details>

<details>
<summary>Respuesta</summary>

````
np.log10
````

`np.log10` es el logaritmo en base 10, que es el que da 2.000 para 100. `np.log` habría dado 4.605.

</details>

---

## 14. pd-corr-spearman

El dataframe `df` contiene la altura (cm) y la edad de unos niños. Calcula el coeficiente de correlación de Spearman con pandas.

**Datos**

````
   height  age
0      85   12
1     100   14
2      55    9
3      90    5
4      98   19
5     112   11
````

**Elige el código que da la salida**

````python
import pandas as pd

corr = df['height'].corr(____)
print(corr)
````

**Opciones**

1. `df['age'],method='spearman'`
2. `df['age']`
3. `method='spearman'`

**Salida esperada**

````
0.3714285714285715
````

<details>
<summary>Pista</summary>

`corr` necesita saber contra qué serie compara y con qué método.

</details>

<details>
<summary>Respuesta</summary>

````
df['age'],method='spearman'
````

`Series.corr(otra, method=...)` necesita las dos cosas: la serie con la que comparar y el método. Sin `method`, usaría Pearson por defecto.

</details>

---
