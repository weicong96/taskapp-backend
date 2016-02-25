angular.module('starter.controllers')
.controller("AddTaskCtrl", function($scope,$rootScope, $state,$stateParams,$reactive, Geocode,$ionicModal, $ionicHistory){
  $reactive(this).attach($scope);
  console.log("Hello");
  var vm = this;
  vm.openModal = function(){
    $state.go("app.chooseLocation");
  }
  vm.zoom = 18;
  vm.center = {};
  vm.markers = [];
  $rootScope.$on( "$locationChangeSuccess", function() {
    if(states.stateName == "app.addTask" && $stateParams['lat'] != "-1" && $stateParams["address"]) {
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
