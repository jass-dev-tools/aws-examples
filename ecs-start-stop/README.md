# Lambda: Control de Servicios ECS (Start/Stop)

Esta función Lambda permite iniciar o detener múltiples servicios en un clúster de ECS especificando su nombre y el número de tareas deseadas (`desiredCount`). Es útil para ahorrar costes apagando entornos fuera de horario o activarlos bajo demanda.

---

## 📦 Código fuente

Puedes ver el código fuente completo en el archivo `ecs-toglle.js` de este repositorio.

---

## 🧾 Payload de entrada

```json
{
  "cluster": "bondy-demo",
  "services": [
    {
      "name": "rest_backend-demo",
      "taskCount": 0
    },
    {
      "name": "metrics-demo",
      "taskCount": 0
    },
    {
      "name": "workflows-demo",
      "taskCount": 0
    }
  ]
}
```

- `cluster`: nombre del ECS Cluster.
- `services`: array de servicios con nombre y número deseado de tareas (`taskCount`).

---

## 🚀 Cómo desplegar esta Lambda

1. **Crear la función Lambda**

   - Entra a la consola de AWS Lambda.
   - Crea una nueva función Lambda desde cero.
   - Usa Node.js 18 como runtime.
   - Copia el contenido del archivo `ecs-toggle.js` en el editor de código.
   - Añade la capa necesaria o empaqueta las dependencias si usas un ZIP.
   - Asigna un rol con permisos mínimos:
     - `ecs:UpdateService`
     - `ecs:DescribeServices`
     - `logs:*` (si quieres que escriba en CloudWatch)

2. **Conceder permisos adicionales (si fuera necesario)**

   Si la Lambda debe actuar sobre otros recursos de ECS que están en otra cuenta o VPC, asegúrate de ajustar los permisos del rol.

---

## 🕒 Crear una ejecución automática con EventBridge Scheduler

1. Ve a **Amazon EventBridge** → **Scheduler**.
2. Crea una nueva regla con la expresión cron deseada, por ejemplo:
   - `cron(0 21 ? * MON-FRI *)` → todos los días laborables a las 21:00 UTC.
3. Configura el destino como la función Lambda creada.
4. Añade el payload directamente en la sección de "Input":
   ```json
   {
     "cluster": "bondy-demo",
     "services": [
       { "name": "rest_backend-demo", "taskCount": 0 },
       { "name": "metrics-demo", "taskCount": 0 },
       { "name": "workflows-demo", "taskCount": 0 }
     ]
   }
   ```

---

## 📌 Casos de uso comunes

- Pausar entornos de desarrollo por la noche.
- Arrancar un entorno solo en horario de oficina.
- Detener servicios no utilizados automáticamente.

---

## ✍️ Autor

Esta función fue desarrollada por josé Antonio Sánchez (darthplaguesi@gmail.com) como parte de una serie de herramientas pequeñas, útiles y directas que normalmente no se comparten, pero son clave para una operación eficiente.