app.controller('ContractCardController', ['$scope', '$http', '$route', '$projects', function ($scope, $http, $route, $projects) {
    $scope.isContentShown = true;
    $scope.has_no_dates = false;

    var id = $route.current.params.id,
        projectType = $route.current.params.type;
    var dogovor = $projects.createNew();
    function setDogovor(proj) {
        Object.keys(proj).forEach(function (key) {
            $scope[key] = proj[key];
        });
    };
    var proj = $projects.proto.getById(id, projectType, setDogovor);


}]);