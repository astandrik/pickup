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
    $scope.setDisplayedDogovorsType = function (type) {
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

    $scope.showGridToolbar = function () {
        $scope.isGridShown = true;
        $scope.isProjectShown = false;
    }

    $scope.showProjectToolbar = function () {
        $scope.isGridShown = false;
        $scope.isProjectShown = true;
    }
    $scope.setToolBarHeader = function (title) {
        $scope.toolBarHeader = title;
        $scope.projectName = title;
    }
    $scope.openProject = function (id, type) {
        location.href = "#/ContractCard?id=" + id + "&type=" + type;
    };
}]);