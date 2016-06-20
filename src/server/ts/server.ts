import * as express from 'express';
import * as http from 'http';
import * as livereload from 'connect-livereload';

const port = 8080;

const app = express();

app
.use(livereload({
	port: 5000
}))
.use(express.static('www'));

const httpServer = (<any>http).Server(app);

httpServer.listen(port, () => {
	console.log(`Listening on port ${port}`);
});