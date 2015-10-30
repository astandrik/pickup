app.controller('ContractCardController', ['$scope', '$http', '$route', '$projects', function ($scope, $http, $route, $projects) {
    $scope.isContentShown = true;
    $scope.has_no_dates = false;
    var id = $route.current.params.id,
        projectType = $route.current.params.type,
        isNew = $route.current.params.new;



    var dogovor = $projects.createNew();
    function setDogovor(proj) {
        Object.keys(proj).forEach(function (key) {
            $scope[key] = proj[key];
        });
        var headDogovor = $scope.contract_date == "" ? '( ' + $scope.contract_number + ' )' : "( " + $scope.contract_number + ' от ' + $scope.contract_date + " )";
        switch (projectType) {
            case 'orderers':
                $scope.setToolBarHeader($scope.contract_code + headDogovor);
                break;
            case 'coExecutors':
                $scope.setToolBarHeader($scope.contract_executor + headDogovor);
                break;
        }
    };
    Object.keys(dogovor).forEach(function (key) {
        $scope[key] = dogovor[key];
    });
    var proj = $projects.proto.getById(id, projectType, setDogovor);
    $scope.showProjectToolbar();


}]);