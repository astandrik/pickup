app.factory('catalogs', function ($http) {
    var usersUrl = 'testData/users.json';

    function getCatalogData(url) {
        $http.get(url).success(function (data) { return data }).error(function (err) { console.log(err); return err });
        };

    return {
        users: getCatalogData(usersUrl)
    };
})