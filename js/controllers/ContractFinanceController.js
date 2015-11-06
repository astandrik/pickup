app.controller('ContractFinanceController', ['$scope', '$http', '$route', '$projects', '$routeParams', function ($scope, $http, $route, $projects, $params) {
    $scope.isContentShown = true;
    $scope.has_no_dates = false;
    $scope.finTableTitle = 'dogovorPlan';
    $scope.showProjectToolbar();
    var id = $params.id,
        projectType = $params.type,
        isNew = $params.new;
    $scope.setCurrentProject(id, projectType);
    $scope.activateFinanceTab();
    if(window.currentProject) window.currentProject.reCalculateProject();
    var dogovor = $projects.createNew();
    function setDogovor(proj) {
        Object.keys(proj).forEach(function (key) {
            $scope[key] = proj[key];
        });
        $scope.data = proj;
        var headDogovor = $scope.contract_date == "" ||
            $scope.contract_date == null  ||
            $scope.contract_date.toString() == "Invalid Date"
            ? '(' + $scope.contract_number + ')' : " (" + $scope.contract_number + ' от ' + getDateFromJSDate(parseDate($scope.contract_date)) + ")";
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

}]);