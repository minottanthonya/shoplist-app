//this is what elevates our app to an Angular (ng) app
//the array at the end is for dependencies
//Dependency Injection 
var app = angular.module('myApp', ['ngRoute'])

//config portion for angular - this is the first thing that is
//executed.
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
    }).otherwise({
      redirectTo: '/home'
    })
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: "HomeController"
    })
    .when('/shopping-list', {
      templateUrl: 'views/shopping-list.html',
      controller: "ShoppingListController",
      controllerAs: 'shoplist'
    }).otherwise({
      redirectTo: '/home'
    });
}])

.controller('ShoppingListController',['$scope', 'ShoppingListItems', function($scope, ShoppingListItems){
  var shoplist = $scope;
  shoplist.items = ShoppingListItems.getList();

  //add items to the shoplist.items array
  shoplist.addItem = function(newItem) {
    shoplist.items.push({
      name: shoplist.newItem.name,
      qty: shoplist.newItem.qty,
      priority: shoplist.newItem.priority
    });

    shoplist.newItem.name = "";
    shoplist.newItem.qty = "";
    shoplist.newItem.priority = "";
  };

  //the functionality to delete items off list
  shoplist.removeItem = function(item) {
    var removedItem = shoplist.items.indexOf(item);
    shoplist.items.splice(removedItem, 1);
  }

  shoplist.removeAll = function() {
    shoplist.items = [];
  }
}])

//create a factory service where our data "model" will live

.factory('ShoppingListItems', function() {
  var items = [];

  function getList() {
    return items;
  }

  return {
    getList: getList
  };
})

//home controller - we will also use the data from shoppinglistitems service
.controller('HomeController', ['$scope', 'ShoppingListItems', function($scope, ShoppingListItems){
  var home = $scope;
  home.items = ShoppingListItems.getList();
}]);



















































