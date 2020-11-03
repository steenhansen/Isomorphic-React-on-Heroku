
// https://scheduler.heroku.com/dashboard

require('./server-funcs/rootAppRequire');
process.env.I_AM_TESTING ='NO';

/*
 	DOES NOT WORK:
 		$ node run-cron

 	Cron by type:
    	$ node run-cron rsd
    	$ node run-cron pdf
    	$ node run-cron podcast

	Cron by type with outside credentials:
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
} else {
	console.log(' *** You forgot the cron type : node run-cron rsd ');
    process.exit();
}

config_data.makeConfigData();

rootAppRequire('mediaServer/cron/launch_cron');
