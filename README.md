# Funciones Útiles en AWS

Este repositorio contiene ejemplos prácticos y reutilizables de **funciones en AWS**, implementadas mediante AWS Lambda, e integradas con otros servicios como Amazon ECS, S3, EventBridge, CloudWatch, entre otros.

## 📚 ¿Qué encontrarás aquí?

Una colección de funciones Lambda diseñadas para resolver tareas comunes en entornos cloud. Algunas de las funciones incluidas son:

- 🔁 Arranque y parada de contenedores en ECS.
- 🗓️ Ejecución programada con EventBridge Scheduler.
- 📦 Subida y gestión de archivos en S3.
- 📥 Consumo de mensajes desde colas SQS.
- 🔐 Gestión de secretos desde AWS Secrets Manager.

Cada función está escrita en **JavaScript (Node.js)** o **Python**, y pensada para desplegarse fácilmente usando la consola de AWS o herramientas como el AWS CLI o SAM.

## 🚀 Despliegue rápido

Puedes desplegar cualquiera de las funciones siguiendo estos pasos:

1. **Clona este repositorio:**

```bash
git clone git@personal:tu_usuario/aws-utils.git
cd aws-utils
```

2. **Accede a la carpeta de la función que te interese.**

   Por ejemplo:

```bash
cd start-stop-ecs-task
```

3. **Sube la función como un archivo ZIP o usa AWS Lambda Console.**

O bien usa la AWS CLI:

```bash
zip function.zip index.js
aws lambda create-function --function-name startEcsTask \
  --runtime nodejs18.x --handler index.handler \
  --role arn:aws:iam::<tu-id>:role/<rol-con-permisos> \
  --zip-file fileb://function.zip
```

4. **Opcional:** configura una regla de ejecución periódica con EventBridge.

## 🧩 Dependencias

Algunas funciones requieren configuración previa de:

- Roles de IAM con permisos adecuados
- Clústeres ECS y definiciones de tarea
- Buckets S3 o colas SQS configuradas

Cada función incluye un archivo `README.md` adicional dentro de su carpeta, explicando su propósito y configuración.

## 📄 Licencia

Este proyecto está disponible bajo la licencia MIT.
