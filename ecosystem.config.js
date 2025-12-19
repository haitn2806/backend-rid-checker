require('dotenv').config()

/** @type {EcosystemConfig} */
module.exports = {
	apps: [
		{
			name: 'rid-checker-api',
			script: './server.js',
			cwd: __dirname,
			max_memory_restart: '500M',
			exp_backoff_restart_delay: 5000,
			env: {
				NODE_ENV: process.env.NODE_ENV,
				PORT: process.env.PORT,
			
			}
		}
	]
}

/**
 * @typedef AppConfig
 * @property {string} name
 * @property {string} script
 * @property {string} args
 * @property {number} exp_backoff_restart_delay
 * @property {number} instances
 * @property {string} interpreter
 * @property {string} interpreter_args
 * @property {string} node_args
 * @property {string} cwd
 * @property {boolean} autorestart
 * @property {boolean | string | string[]} watch
 * @property {boolean | string | string[]} ignore_watch
 * @property {string} exec_mode
 * @property {string} increment_var
 * @property {string} max_memory_restart
 * @property {string} cron_restart
 * @property {string} error_file
 * @property {'cluster' | 'fork'} exec_mode
 * @property {[key: string]: string} env
 * @property {boolean} appendEnvToName
 * @property {boolean} source_map_support
 *
 */

/**
 * @typedef {Object} DeployConfig
 * @property {string} user
 */

/**
 * @typedef {Object} EcosystemConfig
 * @property {AppConfig[]} apps
 * @property {Object.<string, DeployConfig>} deploy
 */
