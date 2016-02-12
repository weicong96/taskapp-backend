angular.module('starter.controllers')
.controller("AddTaskCtrl", function($scope, $state,$stateParams,$reactive, Geocode,$ionicModal, $ionicHistory){
  $scope.openModal = function(){
    $state.go("app.chooseLocation");
  }
  $scope.$on("$ionicView.enter", function(){
    if($stateParams['lat'] && $stateParams['lng']){
      $scope.location = {
        lat : $stateParams.lat,
        lng : $stateParams.lng
      }
    }

  });
  $reactive(this).attach($scope);

})
