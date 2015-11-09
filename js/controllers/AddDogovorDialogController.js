app.controller('AddDogovorDialogController', ['$scope', '$modalInstance', '$projects', function ($scope, $modalInstance, $projects) {
    var dogovor = $projects.createNew();
    window.currentProject = dogovor;
    dogovor.id = 123456;
    $scope.cancel = function () {
        $modalInstance.dismiss('Canceled');
    };
    $scope.save = function () {
        if (!dogovor.contract_order || !dogovor.contract_type || !dogovor.contract_status) {
            alert('Не все обязательные поля заполнены!');
        } else {
            location.href = '#/ProjectsOrderers/123456/ContractCard';
            $modalInstance.dismiss('Saved');
        }
    }
    $scope.dogovor = dogovor;

}]);