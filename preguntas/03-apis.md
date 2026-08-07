# APIs y requests

Consumir y alimentar APIs con requests

3 pregunta(s). Las pistas y las respuestas van plegadas: despliégalas solo cuando lo hayas intentado.

[← volver al índice](README.md)

---

## 1. api-json

Completa la sentencia para recibir un objeto JSON desde la API correspondiente.

**Completa el código**

````python
import requests

url = 'https://jsonplaceholder.typicode.com/posts/1'
response = requests.get(url)

data = response.______________
print(data)
````

**Salida esperada**

````
{'userId': 1, 'id': 1, 'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', 'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'}
````

<details>
<summary>Pista</summary>

`response.text` daría una cadena; queremos un diccionario de Python.

</details>

<details>
<summary>Respuesta</summary>

````
json()
````

`.json()` es un método: parsea el cuerpo de la respuesta y devuelve el objeto de Python equivalente.

</details>

---

## 2. api-post

Has recopilado los datos de un producto nuevo y quieres darlo de alta en la API.

**Completa el código**

````python
import requests

BASE_URL = 'https://fakestoreapi.com'

add_product = {
    "title": 'test new product',
    "price": 14.5,
    "description": 'lorem ipsum set',
    "image": 'https://i.pravatar.cc',
    "category": 'toys'
}

response = requests.____________(f"{BASE_URL}/products", json=add_product)
print(response.json())
````

**Salida esperada**

````
{'id': 21, 'title': 'test new product', 'price': 14.5, 'description': 'lorem ipsum set', 'image': 'https://i.pravatar.cc', 'category': 'toys'}
````

<details>
<summary>Pista</summary>

Crear un recurso nuevo tiene su propio verbo HTTP.

</details>

<details>
<summary>Respuesta</summary>

````
post
````

`POST` se usa para crear recursos. La respuesta trae el `id` que asignó el servidor.

</details>

---

## 3. api-put

Actualiza el producto existente con id `21` y envía el cambio a la API.

**Completa el código**

````python
import requests

BASE_URL = 'https://fakestoreapi.com'

product_update = {
    "title": 'updating test product',
    "category": 'appliances'
}

response = requests.____________(f"{BASE_URL}/products/21", json=product_update)
print(response.json())
````

**Salida esperada**

````
{'id': 21, 'title': 'updating test product', 'category': 'appliances'}
````

<details>
<summary>Pista</summary>

El recurso ya existe y la URL apunta a él: no lo estamos creando.

</details>

<details>
<summary>Respuesta</summary>

````
put
````

`PUT` actualiza un recurso concreto. `POST` habría creado otro producto en vez de modificar el 21.

</details>

---
