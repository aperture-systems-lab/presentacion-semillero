# Ingeniería de software

Tests, git, docs y empaquetado

7 pregunta(s). Las pistas y las respuestas van plegadas: despliégalas solo cuando lo hayas intentado.

[← volver al índice](README.md)

---

## 1. ing-git

¿Qué significan `checkout` y `commit` en el control de versiones con git?

**Opciones**

1. `Un checkout es la copia personal del código del usuario donde se pueden hacer cambios afectando al código principal. Una vez terminado, se puede hacer commit de los cambios al repositorio.`
2. `Un commit es la copia personal del código del usuario donde se pueden hacer cambios afectando al código principal. Una vez terminado, se puede hacer checkout de los cambios al repositorio.`
3. `Un checkout es la copia personal del código del usuario donde se pueden hacer cambios sin afectar al código principal. Una vez terminado, se puede hacer commit de los cambios al repositorio.`
4. `Un commit es la copia personal del código del usuario donde se pueden hacer cambios sin afectar al código principal. Una vez terminado, se puede hacer checkout de los cambios al repositorio.`

<details>
<summary>Pista</summary>

Fíjate en dos cosas: cuál de los dos verbos es la copia y si esa copia afecta o no al código principal.

</details>

<details>
<summary>Respuesta</summary>

````
Un checkout es la copia personal del código del usuario donde se pueden hacer cambios sin afectar al código principal. Una vez terminado, se puede hacer commit de los cambios al repositorio.
````

El checkout te sitúa en tu propia copia de trabajo, aislada del código principal; el commit es el que registra los cambios en el repositorio.

</details>

---

## 2. ing-docstrings

¿Cuál es la forma estándar de documentar funciones y clases en Python?

**Opciones**

1. `Documentación XML`
2. `Docstrings`
3. `Comentarios en línea`
4. `Ficheros de documentación aparte`

<details>
<summary>Pista</summary>

Es la única opción que el propio intérprete guarda y expone en tiempo de ejecución.

</details>

<details>
<summary>Respuesta</summary>

````
Docstrings
````

Las docstrings van entre triples comillas justo debajo del `def` o del `class`, y quedan accesibles en `__doc__` y desde `help()`.

</details>

---

## 3. ing-requirements

¿Dónde deberías guardar la información de versiones al construir un paquete de Python que necesita versiones concretas de paquetes externos?

**Opciones**

1. `controlling.txt`
2. `versions.text`
3. `packages.txt`
4. `requirements.txt`

<details>
<summary>Pista</summary>

Es el fichero que `pip install -r` sabe leer.

</details>

<details>
<summary>Respuesta</summary>

````
requirements.txt
````

`requirements.txt` es la convención: una dependencia por línea, con su versión fijada si hace falta.

</details>

---

## 4. ing-import-unittest

Completa el código para importar el framework de tests unitarios que viene incluido en Python.

**Completa el código**

````python
import ______________

class TestScoring(______________.TestCase):

    def test_scoring(self):
        self.assertEqual(scoring(1,1,3,3), 8)
````

<details>
<summary>Pista</summary>

Viene en la librería estándar, no hace falta instalarlo.

</details>

<details>
<summary>Respuesta</summary>

````
unittest   ·   unittest
````

`unittest` es el módulo de tests de la librería estándar. Las clases de prueba heredan de `unittest.TestCase`.

</details>

---

## 5. ing-setup

Completa el test unitario para probar el método `isupper()`, de forma que la variable `var` no tenga que crearse repetidamente en cada caso de prueba.

**Elige el código que da la salida**

````python
import unittest

class TestSampleMethod(unittest.TestCase):

  ____:
    self.var = 'Name'

  def test_isupper(self):
    self.assertFalse(self.var.isupper())
````

**Opciones**

1. `def Initilize(self)`
2. `def test_load(self)`
3. `def setUp(self)`
4. `def Load(self)`

<details>
<summary>Pista</summary>

El nombre tiene que ser exactamente el que `unittest` busca antes de cada test.

</details>

<details>
<summary>Respuesta</summary>

````
def setUp(self)
````

`setUp` es un método especial que `unittest` ejecuta automáticamente antes de cada test del caso. Con otro nombre, nunca se llamaría.

</details>

---

## 6. ing-assert-equal

Completa el test unitario para probar la función `sum` en Python.

**Elige el código que da la salida**

````python
import unittest

class TestSampleMethod(unittest.TestCase):

    def test_sum(self):
        ____(sum(2,2), 4)
````

**Opciones**

1. `self.assertEqual`
2. `self.assertRaises`
3. `assertRaises`
4. `assertEqual`

<details>
<summary>Pista</summary>

Estamos comparando un resultado con un valor esperado, y el método pertenece a la instancia.

</details>

<details>
<summary>Respuesta</summary>

````
self.assertEqual
````

`self.assertEqual(a, b)` falla si los dos valores difieren. Sin `self.` no existe el nombre, y `assertRaises` sirve para comprobar excepciones.

</details>

---

## 7. ing-if-stock

En un sistema de gestión de inventario, ¿cómo escribirías un `if` que lance una alerta si el nivel de stock está por debajo de cierto umbral?

**Opciones**

1. `if stock_level < threshold: notifyLowStock()`
2. `if stock_level < threshold then: notifyLowStock()`
3. `if stock_level < threshold: execute notifyLowStock()`
4. `if stock_level < threshold: run notifyLowStock()`

<details>
<summary>Pista</summary>

Python no tiene `then` ni palabras clave para invocar una función.

</details>

<details>
<summary>Respuesta</summary>

````
if stock_level < threshold: notifyLowStock()
````

La sintaxis de Python es `if condición:` seguido del cuerpo. Una función se llama escribiendo su nombre con paréntesis, sin verbos delante.

</details>

---
