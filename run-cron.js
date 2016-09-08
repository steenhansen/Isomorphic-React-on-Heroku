'use strict'

// https://scheduler.heroku.com/dashboard
// $ node run-cron rsd
// $ node run-cron pdf

require('./rootAppRequire')
rootAppRequire('mediaServer/cron/launch_cron')
