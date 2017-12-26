const config = require('not-config').readerForModule('pretty'),
	serveStatic = require('serve-static'),
	path = require('path');

let middleware = (req, res, next)=>{
	const list = config.get('list'),
		root = config.get('root');
	if (list.hasOwnProperty(req.path)){
		serveStatic(path.join(root, list[req.path]))(req, res, next);
	}else{
		next();
	}
};

module.exports = middleware;
