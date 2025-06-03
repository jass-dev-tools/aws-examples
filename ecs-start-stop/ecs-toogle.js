import { ECSClient, UpdateServiceCommand } from "@aws-sdk/client-ecs";

const ecs = new ECSClient({});

export const handler = async (event) => {
	const cluster = event.cluster;

	if (!cluster) {
		throw new Error(`Debes especificar el nombre del cluster`);
	}

	const services = event.services || [];

	if (!Array.isArray(services) || services.length === 0) {
		throw new Error(`No se han especificado servicios en la petición`);
	}

	const updatePromises = services.map(({ name, taskCount }) => {
		if (typeof name !== 'string' || typeof taskCount !== 'number') {
			throw new Error(`Formato incorrecto en uno de los servicios: ${JSON.stringify({ name, taskCount })}`);
		}

		console.log(`Actualizando ${name} a ${taskCount} tareas en cluster ${cluster}`);

		return ecs.send(new UpdateServiceCommand({
			cluster,
			service: name,
			desiredCount: taskCount,
		}));
	});

	await Promise.all(updatePromises);

	console.log(`Actualización completada para cluster: ${cluster}`);
};