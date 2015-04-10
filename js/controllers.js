var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('FirstController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);

demoControllers.controller('SecondController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);


demoControllers.controller('LlamaListController', ['$scope', '$http', 'CommonData', 'Llamas', '$window' , function($scope, $http, CommonData,  Llamas, $window) {

  Llamas.get().success(function(data){
  
    $scope.llamas = data;
  });


}]);

demoControllers.controller('UserListController', ['$scope', '$http', 'CommonData','User', '$window' , function($scope, $http, CommonData, User, $window) {
    $scope.conditions = ""
     User.get($scope.conditions).success(function(data){
      CommonData.setUsers(data.data)
     $scope.users = CommonData.getUsers();
  });

     $scope.delete = User.delete($scope.conditions).success(function(data){
         CommonData.setUsers(data.data)
         $scope.users = CommonData.getUsers();
     }));

     $scope.users = CommonData.getUsers();
  });




}]);

demoControllers.controller('TaskListController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

  Llamas.get().success(function(data){
    $scope.llamas = data;
  });


}]);

demoControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set";

  };

}]);


