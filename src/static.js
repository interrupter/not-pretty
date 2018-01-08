const config = require('not-config').readerForModule('pretty'),
	serveStatic = require('serve-static'),
	path = require('path');

let middleware = (req, res, next)=>{
	const list = config.get('list'),
		root = config.get('root'),
		requestPath = decodeURI(req.path);
	if (list.hasOwnProperty(requestPath)){
		serveStatic(root)(req, res, next);
	}else{
		next();
	}
};

module.exports = middleware;
