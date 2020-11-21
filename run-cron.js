
// https://scheduler.heroku.com/dashboard

require('./server-funcs/rootAppRequire');
process.env.I_AM_TESTING ='NO';

/*
 	Cron by day, for Heroku, does not work locally:
 		$ node run-cron             // Heroku cron executions

	Cron by type with outside credentials when executing locally:
		$ node run-cron rsd real-isomorphic-react-credentials.js
*/

const config_data = rootAppRequire('server-funcs/configEnvironment');

const cron_type = process.argv[2];
if (cron_type) {
    process.env.CRON_TYPE =cron_type;             // $ node run-cron rsd
    const hidden_credentials = process.argv[3];
    if (hidden_credentials) {
    	config_data.readConfigFile(hidden_credentials);    // $ node run-cron rsd real-isomorphic-react-credentials.js
    }
}

config_data.makeConfigData();

rootAppRequire('mediaServer/cron/launch_cron');
