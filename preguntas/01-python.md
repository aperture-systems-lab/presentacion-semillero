# Python

Fundamentos: funciones, bucles y lambdas

9 pregunta(s). Las pistas y las respuestas van plegadas: despliégalas solo cuando lo hayas intentado.

[← volver al índice](README.md)

---

## 1. py-lambda-filter

Filtra la lista de abajo con una función `lambda` de forma que solo se devuelvan los valores mayores o iguales a 15.

**Completa el código**

````python
my_list = [15, 18, 17, 12, 11, 7, 8]
filter_list = filter(____________________, my_list)
print(list(filter_list))
````

**Salida esperada**

````
[15, 18, 17]
````

<details>
<summary>Pista</summary>

`filter` espera primero una función que devuelva True o False para cada elemento.

</details>

<details>
<summary>Respuesta</summary>

````
lambda x: x >= 15
````

`filter(f, iterable)` conserva los elementos para los que `f` devuelve True. La lambda recibe cada valor y responde si pasa el corte.

</details>

---

## 2. py-continue

Completa la sentencia para que, después de avisar del error, el bucle salte directo a la siguiente vuelta sin ejecutar el resto del cuerpo.

**Completa el código**

````python
test_result = ['Success', 'Success', 'Success', 'Success', 'Success', 'Error', 'Success', 'Success']
cnt = 0

for a in test_result:
    cnt += 1
    if a == 'Error':
        print('Error found in execution number:', cnt)
        ____________
    print('Execution number', cnt, a)
````

**Salida esperada**

````
Execution number 1 Success
Execution number 2 Success
Execution number 3 Success
Execution number 4 Success
Execution number 5 Success
Error found in execution number: 6
Execution number 7 Success
Execution number 8 Success
````

<details>
<summary>Pista</summary>

No queremos cortar el bucle entero, solo esta vuelta.

</details>

<details>
<summary>Respuesta</summary>

````
continue
````

`continue` salta a la siguiente iteración; `break` habría abortado el bucle y las ejecuciones 7 y 8 no se imprimirían.

</details>

---

## 3. py-default-arg

Crea una función que devuelva el doble del número que recibe y `0` si no recibe nada.

**Completa el código**

````python
def doubled(________________):
  return 2*input_num

print(doubled())
````

**Salida esperada**

````
0
````

<details>
<summary>Pista</summary>

Un argumento puede traer su propio valor por defecto.

</details>

<details>
<summary>Respuesta</summary>

````
input_num=0
````

Con `input_num=0` el argumento pasa a ser opcional: si nadie lo pasa, Python usa el valor por defecto.

</details>

---

## 4. py-args

Completa la función `first_name`, que recibe el nombre completo de una persona como varios argumentos e imprime solo el primero.

**Completa el código**

````python
def first_name(______________):
  print("The first name is " + name[0])

first_name("Sagar","Ilyas","Jacky")
````

**Salida esperada**

````
The first name is Sagar
````

<details>
<summary>Pista</summary>

El cuerpo usa `name[0]`: dentro, `name` tiene que ser una secuencia.

</details>

<details>
<summary>Respuesta</summary>

````
*name
````

`*name` recoge todos los argumentos posicionales en una tupla, así que `name[0]` es el primero.

</details>

---

## 5. py-for-in

Completa la sentencia para recorrer los puntajes y listar los que superaron la prueba.

**Completa el código**

````python
________ x ________ df['score']:
    if x > 65:
        print('Test passed with', x, 'points')
````

**Salida esperada**

````
Test passed with 69 points
Test passed with 82 points
````

<details>
<summary>Pista</summary>

Es la forma más básica de recorrer una secuencia en Python.

</details>

<details>
<summary>Respuesta</summary>

````
for   ·   in
````

`for x in secuencia:` va asignando a `x` cada elemento; el `if` de dentro decide cuáles se imprimen.

</details>

---

## 6. py-while

Completa el código para que imprima todos los números naturales hasta `n`.

**Completa el código**

````python
# Set value of n
n = 10

# initialize counter
i = 1

__________ i <= n:
  print(i)
  i = i+1    # update counter
````

**Salida esperada**

````
1
2
3
4
5
6
7
8
9
10
````

<details>
<summary>Pista</summary>

La condición se comprueba antes de cada vuelta y el contador se actualiza a mano.

</details>

<details>
<summary>Respuesta</summary>

````
while
````

`while` repite mientras la condición sea verdadera. Como el contador se incrementa dentro, el bucle termina al llegar a 11.

</details>

---

## 7. py-comprension

Filtra la lista de Python usando una *list comprehension* de forma que solo se devuelvan los valores mayores o iguales a 15.

**Completa el código**

````python
my_list = [15, 18, 17, 12, 11, 7, 8]
filterd_list = [____________________]
print(filterd_list)
````

**Salida esperada**

````
[15, 18, 17]
````

<details>
<summary>Pista</summary>

La estructura es: qué devuelves, de dónde lo sacas y con qué condición.

</details>

<details>
<summary>Respuesta</summary>

````
x for x in my_list if x >= 15
````

Una list comprehension es `[expresión for elemento in iterable if condición]`. Hace lo mismo que `filter` con una lambda, pero se lee de corrido.

</details>

---

## 8. py-prueba-escritorio-conteo

Haz una prueba de escritorio y marca el valor que tomaría la variable `resultado`. Ten en cuenta que la indexación empieza en 1 y no en 0.

**Elige el código que da la salida**

````python
conteo = [1, 2, 2, 3, 3]
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
imprimir(resultado)
````

**Opciones**

1. `1`
2. `2`
3. `3`
4. `4`
5. `5`

<details>
<summary>Pista</summary>

`conteo2` no cambia nunca: se recorre entero. El que se va acortando es `conteo`, y `m` se hace más pequeño en cada vuelta.

</details>

<details>
<summary>Respuesta</summary>

````
2
````

i=1 → conteo_i=1, j=1 coincide: conteo=[2,2,3,3] y m=4. i=2 → conteo_i=2, j llega a 2: conteo=[2,3,3] y m=2. i=3 → conteo_i=2, j llega a 2: conteo=[3,3] y m=0. En i=4 e i=5 el bucle interno ya no entra, porque j=1 no cumple j<=0. Quedan dos elementos.

</details>

---

## 9. py-bucle-anidado-c

¿Cuál es la salida del objeto `c`?

**Elige el código que da la salida**

````python
c = [0 for i in range(5)]
p = 0

for i in range(3):
    for j in range(i):
        print(i)
        if i >= j:
            c[p] = j * i + 2
            p = p + 1
            print(p)

print(c)
````

**Opciones**

1. `[0, 2, 4, 0, 0]`
2. `[2, 2, 2, 4, 0]`
3. `[2, 2, 4, 0, 0]`
4. `[2, 4, 0, 0, 0]`

**Salida esperada**

````
[2, 2, 4, 0, 0]
````

<details>
<summary>Pista</summary>

`range(i)` no da ninguna vuelta cuando `i` vale 0. Y dentro, `i >= j` se cumple siempre.

</details>

<details>
<summary>Respuesta</summary>

````
[2, 2, 4, 0, 0]
````

Con i=0, `range(0)` no itera. Con i=1, j=0: c[0]=0*1+2=2. Con i=2, j=0: c[1]=0*2+2=2, y j=1: c[2]=1*2+2=4. `p` solo avanza tres veces, así que las dos últimas posiciones se quedan en 0.

</details>

---
