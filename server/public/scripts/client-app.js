var myApp = angular.module('myApp', []);

myApp.controller('OrdersController', ['$scope', '$http', function ($scope, $http) {

  console.log('IndexController loaded')

  $http({
    method: 'GET',
    url: '/orders/names'
  }).then(function (response){
    console.log('response object ', response);
    $scope.customers = response.data;
  });

  $http({
    method: 'GET',
    url: '/orders/orders',
  }).then(function (response) {
    console.log('response object ', response);
    $scope.orders = response.data;
  });

}]);
