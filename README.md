# Directions for Installing

This example server uses [Node](http://nodejs.org) and requires [connect](https://github.com/senchalabs/connect) to be installed. The best and easiest way to do that is to install [NPM](http://npmjs.org/) on to your system and the run:

    npm install connect

Now with connect installed, either [download](https://github.com/remy/testyoursockets/archives/master) this repository, or clone it using git:

    git clone https://github.com/remy/testyoursockets.git

You now need to get the [node-websocket-server](https://github.com/miksago/node-websocket-server) submodule. Run the following command in the newly cloned directory (probably called `testyoursockets`):

    git submodule init
    git submodule update

And then run the server:

    node server.js

By default the server will run over `localhost` on port `80`. If you want to run it on another port, just add that to the command:

    node server.js 8000
    
Note that the instructions in the index page refer to http://testyoursockets.com - but the socket is actually running and connecting to your `localhost`.