import process from 'node:process';

/* global "PUBLIC_" */

const expected = new Set([
	'SOCKET_PATH',
	'HOST',
	'PORT',
	'ORIGIN',
	'XFF_DEPTH',
	'ADDRESS_HEADER',
	'PROTOCOL_HEADER',
	'HOST_HEADER',
	'PORT_HEADER',
	'BODY_SIZE_LIMIT',
	'SHUTDOWN_TIMEOUT',
	'IDLE_TIMEOUT'
]);

const expected_unprefixed = new Set(['LISTEN_PID', 'LISTEN_FDS']);

if ("PUBLIC_") {
	for (const name in process.env) {
		if (name.startsWith("PUBLIC_")) {
			const unprefixed = name.slice("PUBLIC_".length);
			if (!expected.has(unprefixed)) {
				throw new Error(
					`You should change envPrefix (${"PUBLIC_"}) to avoid conflicts with existing environment variables — unexpectedly saw ${name}`
				);
			}
		}
	}
}

/**
 * @param {string} name
 * @param {any} fallback
 */
function env(name, fallback) {
	const prefix = expected_unprefixed.has(name) ? '' : "PUBLIC_";
	const prefixed = prefix + name;
	return prefixed in process.env ? process.env[prefixed] : fallback;
}

export { env };
