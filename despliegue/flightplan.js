const plan = require('flightplan');

plan.target('azure', {
    host: 'duckpiler.westeurope.cloudapp.azure.com',
    username: 'vagrant',
    agent: process.env.SSH_AUTH_SOCK
});

plan.remote(
    'deployTo',
    remote => {
        remote.log('Let\'s run Duckpiler');
        
        // Cloning repository
        remote.exec('git clone https://github.com/jojelupipa/Duckpiler.git');

        // Installing dependencies
        remote.exec('npm install --prefix Duckpiler');

        // Launching service
        remote.exec('sudo npm start --prefix Duckpiler');
    });

plan.remote(
    'run',
    remote => {
        // Launching service
        remote.exec('sudo npm start --prefix Duckpiler');
    });

plan.remote(
    'stop',
    remote => {
        remote.exec('sudo npm stop --prefix Duckpiler');
    });

plan.remote(
    'deleteAll',
    remote => {
        remote.rm('-rf Duckpiler');
    });
