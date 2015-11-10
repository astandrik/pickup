app.controller('ProjectController', ['$scope', '$http', '$route', '$projects', '$routeParams', function ($scope, $http, $route, $projects, $params) {
    $scope.finTableTitle = 'dogovorPlan';
    $scope.showProjectToolbar();
    var id = $params.id,
        projectType = $scope.getProjectType(),
        isNew = $params.new,
        locationType = $params.form;    
    switch (locationType) {
        case 'card':
            $scope.activateCardTab();
            break;
        case 'documents':
            $scope.activateDocumentsTab();
            break;
        case 'finance':
            $scope.activateFinanceTab();
            break;
    }
    $scope.setCurrentProject(id, projectType);
    if (window.currentProject) window.currentProject.reCalculateProject();
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
            case 'ProjectsOrderers':
                $scope.setToolBarHeader($scope.contract_code + headDogovor);
                break;
            case 'ProjectsCoExecutors':
                $scope.setToolBarHeader($scope.contract_executor + headDogovor);
                break;
        }
    };
    Object.keys(dogovor).forEach(function (key) {
        $scope[key] = dogovor[key];
    });
    var proj = $projects.proto.getById(id, projectType, setDogovor);


}]);