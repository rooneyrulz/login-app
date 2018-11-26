const http = require('http');
const App = require('../app');

const server = http.createServer(App);
server.listen(App.get('port'),
   () => console.log(`server started on the port ${App.get('port')}!`));
