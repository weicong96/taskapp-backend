angular.module('starter.controllers')
.controller("AddTaskCtrl", function($scope,$rootScope, $state,$stateParams,$reactive, Geocode , Store,$ionicModal, $ionicHistory){
  $reactive(this).attach($scope);
  var vm = this;
  vm.openModal = function(){
    Store.setData("hello");
    $state.go("app.chooseLocation");
  }
  vm.zoom = 18;
  vm.center = {};
  vm.markers = [];
  $scope.$on("$ionicView.enter", function(scopes, states){
    console.log(states);
    if(states.stateName == "app.addTask" && $stateParams.lng != "-1"){
       vm.zoom = 18;
       vm.center = {lat : $stateParams.lat, lng : $stateParams.lng};
       vm.location = $stateParams.address;
       vm.markers = [new google.maps.Marker({
        position : {
          lat : $stateParams.lat,
          lng : $stateParams.lng
        }
      })];
    }
  });

  vm.addTask = function(){
    Task.insert(vm.task);
  }
})
