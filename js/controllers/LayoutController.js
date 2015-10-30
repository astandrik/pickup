app.controller('LayoutController', ['$scope', function ($scope) {
    $scope.isSideBarOpen = false;
    $scope.isMaskShown = false;
    $scope.showMask = function () {
        $scope.isMaskShown = true;
    };
    
    $scope.hideMask = function () {
        $scope.isMaskShown = false;
    }; 
    $scope.openSideBar = function () {
        $scope.isSideBarOpen = true;
        $scope.showMask();
    };
    $scope.closeSideBar = function () {
        $scope.isSideBarOpen = false;
        $scope.hideMask();
    };
    $scope.displaySelection = function (type) {
        $scope.dogovorType = type;
    }

    $scope.onProjectTypeChange = function () {
        switch ($scope.dogovorType) {
            case 'ProjectsOrderers':
                location.href = '#/ProjectsOrderers';
                break;
            case 'ProjectsCoExecutors':
                location.href = '#/ProjectsCoExecutors';
                break;
        }
    }

    $scope.openProject = function (id, type) {
        location.href = "#/ContractCard?id=" + id + "&type=" + type;
    };
}]);