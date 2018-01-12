
// https://scheduler.heroku.com/dashboard
// $ node run-cron rsd
// $ node run-cron pdf
// $ node run-cron podcast


require('./rootAppRequire')
rootAppRequire('mediaServer/cron/launch_cron')
