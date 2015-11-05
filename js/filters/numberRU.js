app.filter('numberRU',['$filter', function ($filter) {
    return function (input) {
        return $filter('number')(input).split(',').join(' ');
    }
}]);