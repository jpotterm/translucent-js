var tlc = {};

tlc.instances = [];

tlc.toArray = function (xs) {
	return Array.prototype.slice.call(xs);
};

tlc.extendDestructive = function(a, b) {
	for(var i in b) {
		a[i] = b[i];
	}
};

tlc.extend = function(a, b) {
	var result = {};

	tlc.extendDestructive(result, a);
	tlc.extendDestructive(result, b);

	return result;
};

tlc.addInstance = function(type, implementation) {
	var instance = tlc.getInstance(type);

	if (instance === undefined) {
		tlc.instances.push({type: type, implementation: implementation});
	} else {
		instance.implementation = tlc.extend(instance.implementation, implementation);
	}
};

tlc.getInstance = function(type) {
	for (var i = 0; i < tlc.instances.length; ++i) {
		var instance = tlc.instances[i];

		if (instance.type === type) {
			return instance;
		}
	}

	return undefined;
};

tlc.callFunction = function(type, fname, params) {
	var instance = tlc.getInstance(type);
	return instance.implementation[fname].apply(null, params);
};

module.exports = tlc;
