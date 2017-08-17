'use strict'

function start(){
	return toBeCalled();
}

function toBeCalled(){
	return 'from to be called';
}

console.log('This is a test');
console.log(start());