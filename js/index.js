var app = angular.module('testApp', ['ngResource', 'ngRoute', 'ngMaterial',
    'ngAnimate', 'md.data.table', 'ngMdIcons', 'ui.bootstrap', 'dialogs.main',
    'pascalprecht.translate', 'flow']);
    
    app.config(function ($routeProvider) {
        $routeProvider
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

            .when('/ProjectsCoExecutors/:id/ContractCard',
                  {
                      controller: 'ContractCardController',
                      templateUrl: 'pages/contract_card.html'
                  })
            .when('/ProjectsOrderers/:id/ContractCard',
                  {
                      controller: 'ContractCardController',
                      templateUrl: 'pages/contract_card.html'
                  })

            .when('/ProjectsCoExecutors/:id/ContractDocuments',
                  {
                      controller: 'ContractDocumentsController',
                      templateUrl: 'pages/contract_documents.html'
                  })
            .when('/ProjectsOrderers/:id/ContractDocuments',
                  {
                      controller: 'ContractDocumentsController',
                      templateUrl: 'pages/contract_documents.html'
                  })

            .when('/ProjectsCoExecutors/:id/ContractFinance',
                  {
                      controller: 'ContractFinanceController',
                      templateUrl: 'pages/contract_finance.html'
                  })
            .when('/ProjectsOrderers/:id/ContractFinance',
                  {
                      controller: 'ContractFinanceController',
                      templateUrl: 'pages/contract_finance.html'
                  })
             .otherwise({ redirectTo: '/ProjectsOrderers' });
    });



