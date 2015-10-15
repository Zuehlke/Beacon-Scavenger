angular.module('app').factory("NumberService", function(){
	return {
		getRandomInteger : function(treshold) {
			return Math.floor(Math.random() * treshold);
		}
	}
});