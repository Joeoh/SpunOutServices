//Inputs a number and outputs an array with that length.
//(3 | array) => [0,1,2]
angular.module("spServicesApp.filters", []).filter('array', function() {
    return function(arrayLength) {
        if (arrayLength) {
            arrayLength = Math.ceil(arrayLength);
            var arr = new Array(arrayLength), i = 0;
            for (; i < arrayLength; i++) {
                arr[i] = i;
            }
            return arr;
        }
    };
});