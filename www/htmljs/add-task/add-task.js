angular.module('starter.controllers')
.controller("AddTaskCtrl", function($scope,$rootScope, $state,$stateParams,$reactive, Geocode , Store,$ionicModal, $ionicHistory){
  $reactive(this).attach($scope);
  var vm = this;
  vm.task = {};

  vm.openModal = function(){
    console.log(vm);
    Store.setData(vm.task);
    $state.go("app.chooseLocation");
  }
  vm.zoom = 18;
  vm.center = {};
  vm.markers = [];
  $scope.$on("$ionicView.enter", function(scopes, states){
    if(states.stateName == "app.addTask" && $stateParams.lng != "-1"){
       vm.task = Store.getData();
       vm.zoom = 18;
       vm.center = {lat : $stateParams.lat, lng : $stateParams.lng};
       vm.location = $stateParams.address;
       vm.task.location =  {
        address : vm.location,
        coordinates : vm.center 
       };

       vm.markers = [new google.maps.Marker({
        position : {
          lat : $stateParams.lat,
          lng : $stateParams.lng
        }
      })];
    }
  });

  vm.addTask = function(){
    Meteor.call("addTask", vm.task, function(error, result){
      if(!error){
        console.log(result);
      }
    });
  }
})
