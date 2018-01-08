const config = require('not-config').readerForModule('pretty'),
	path = require('path'),
	log = require('not-log')(module);

let middleware = (req, res, next)=>{
	const files = config.get('files'),
		templates = config.get('templates'),
		filesDir = config.get('root'),
		requestPath = decodeURI(req.path);
	if (files.hasOwnProperty(requestPath)){
		res.sendFile(files[requestPath], { root: filesDir, dotfiles: 'deny'}, (err)=>{
			if(err){
				log.error(err);
			}else{
				log.info('Pretty file served ', requestPath, ' -> ', path.join(filesDir, files[requestPath]));
			}
		});
	}else if(templates.hasOwnProperty(requestPath)){
		res.render(templates[requestPath]);
	}else{
		next();
	}
};

module.exports = middleware;
