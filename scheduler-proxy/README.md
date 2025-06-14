# Lambda Proxy para llamadas HTTP

Esta función Lambda actúa como un proxy que permite ejecutar llamadas HTTP/HTTPS desde AWS a cualquier endpoint, sin necesidad de montar un API Gateway ni complicar la infraestructura.

---

## 🧾 Payload de entrada

```json
{
  "url": "https://miapi.com/users",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer TOKEN",
    "Content-Type": "application/json"
  },
  "body": {
    "name": "Nuevo usuario"
  }
}
```

- `url`: URL completa a la que se debe hacer la llamada.
- `method`: Método HTTP (GET, POST, etc.)
- `headers`: Cabeceras HTTP.
- `body`: Cuerpo del mensaje (opcional, solo para métodos como POST o PUT).

---

## 🚀 Casos de uso

- Llamadas internas a APIs desde otros servicios AWS (EventBridge, Step Functions…).
- Automatizaciones simples que no justifican montar un API Gateway.
- Testing y mockeo de endpoints en entornos controlados.

---

## ⚙️ Cómo usar esta Lambda

1. Crea una nueva función Lambda en AWS.
2. Usa Node.js 18 como runtime.
3. Copia el código de `index.js` dentro del editor de Lambda.
4. Asegúrate de que el rol asociado tenga permisos básicos para ejecutar logs y, si corresponde, acceso a VPC o recursos protegidos.

---

## 🔐 Seguridad

Recomendado usar esta Lambda solo en entornos internos o controlados, ya que reenvía llamadas a URLs externas.

---

## ✍️ Autor

Esta función fue desarrollada por josé Antonio Sánchez (darthplaguesi@gmail.com) como solución rápida para automatizaciones internas en AWS sin necesidad de configurar gateways complejos.