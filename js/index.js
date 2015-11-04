var app = angular.module('testApp', ['ngResource','ngRoute', 'ngMaterial', 'ngAnimate', 'md.data.table','ngMdIcons']);
    
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/',
                  {
                      templateUrl: 'pages/login.html'
                  })
            .when('/Main',
                  {
                      templateUrl: 'pages/startpage.html'
                  })
            .when('/ProjectsOrderers',
                  {
                      controller: 'ProjectsOrderersController',
                      templateUrl: 'pages/projects_listing.html'
                  })
            .when('/ProjectsCoExecutors',
                  {
                      controller: 'ProjectsCoExecutorsController',
                      templateUrl: 'pages/projects_listing.html'
                  })
             .when('/ContractCard',
                  {
                      controller: 'ContractCardController',
                      templateUrl: 'pages/contract_card.html'
                  })
             .otherwise({redirectTo:'/Main'});
    });



