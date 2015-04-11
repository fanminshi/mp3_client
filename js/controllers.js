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


demoControllers.controller('LlamaListController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

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

    $scope.delete = function(user_id){
      console.log("delete is called" + user_id)

         User.delete(user_id).success(function(data){
            console.log("returned message" + data.message)
                 User.get($scope.conditions).success(function(data){
                 CommonData.setUsers(data.data)
                $scope.users = CommonData.getUsers();
            }); 
         });

    };
         

}]);

demoControllers.controller('addUserController', ['$scope', '$http', 'CommonData','User', '$window' , function($scope, $http, CommonData, User, $window) {
    
     console.log("addUser is called")
    $scope.addUser = function(){
      console.log("addUser is called")
         if($scope.name == undefined || $scope.email == undefined)
            return;
         var data = {
          name : $scope.name,
          email : $scope.email
         }
         User.post(data).success(function(data){
            console.log("returned message" + data.message)
            $scope.returnedMsg = data.message;
        
         }).error(function(data, status, headers, config) {
            $scope.returnedMsg = data.message;
       });

    };
    
    $scope.returnedMsg ="";
         

}]);

demoControllers.controller('addTaskController', ['$scope', '$http', 'CommonData','User', 'Task', '$window' , function($scope, $http, CommonData, User, Task, $window) {
    
     console.log("addTask is called")
     $scope.user = ""
     $scope.users = []
     var cond = {"name":1, "_id":0}
     User.get("?select="+angular.toJson(cond)).success(function(data){
            console.log("returned message" + data.message)
            
            $scope.users = data.data;
        
         }).error(function(data, status, headers, config) {
            $scope.returnedMsg = data.message;
       });

     $scope.addTask = function(){
     
         if($scope.name == undefined || $scope.description == undefined || $scope.date == undefined )
            return;
         var data = {
          "deadline" : $scope.date,
          "name" : $scope.name,
          "assignedUserName" : $scope.user,
          "description" : $scope.description
         }

         Task.post(data).success(function(data){
            console.log("returned message" + data.message)
            $scope.returnedMsg = data.message;
        
         }).error(function(data, status, headers, config) {
            $scope.returnedMsg = data.message;
       });

    };
    
    $scope.returnedMsg ="";
         

}]);

demoControllers.controller('editTaskController', ['$scope', '$http','$routeParams', 'CommonData','User', 'Task', '$window' , function($scope, $http, $routeParams, CommonData, User, Task, $window) {
    
        console.log("editDetailsController is called")


         $scope.users = []
         var cond = {"name":1, "_id":0}

         User.get("?select="+angular.toJson(cond)).success(function(data){
            console.log("returned message" + data.message)
            
            $scope.users = data.data;
        
         }).error(function(data, status, headers, config) {
            $scope.returnedMsg = data.message;
       });

        Task.getById($routeParams.id).success(function(data){
            console.log("returned message" + data.message)
                 
                $scope.task = data.data;
                $scope.name = data.data.name;
                $scope.date = data.data.deadline;
                $scope.description = data.data.description
                $scope.user = data.data.assignedUserName
                $scope.completed = data.data.completed
                console.log($scope.user)
              
         
         }).error(function(data, status, headers, config) {
            console.log("returned message" + data.message)
            $scope.returnedMsg = data.message;
       });

     $scope.editTask = function(){
     
         if($scope.name == undefined || $scope.description == undefined || $scope.date == undefined )
            return;
         var data = {
          "deadline" : $scope.date,
          "name" : $scope.name,
          "assignedUserName" : $scope.user,
          "description" : $scope.description,
          "completed" : $scope.completed
         }

         Task.put( $routeParams.id, data).success(function(data){
            console.log("returned message" + data.message)
            $scope.returnedMsg = data.message;
        
         }).error(function(data, status, headers, config) {
            $scope.returnedMsg = data.message;
       });

    };
    
    $scope.returnedMsg ="";
         

}]);

demoControllers.controller('UserDetailsController', ['$scope', '$http','$routeParams', 'CommonData', 'User','Task', '$window' , function($scope, $http, $routeParams, CommonData, User, Task, $window) {
    
     console.log("UserDetailsController is called")
        $scope.taskNames = [];
        $scope.taskData = [];
     User.getById($routeParams.id).success(function(data){
            console.log("returned message" + data.message)
                 
                $scope.user = data.data;
                $scope.tasks = data.data.pendingTasks
             

                var idx;
                for(idx in $scope.tasks){
                  console.log($scope.tasks[idx])
                  $scope.getTaskByid($scope.tasks[idx])
                }
              
         
         }).error(function(data, status, headers, config) {
            console.log("returned message" + data.message)
            $scope.returnedMsg = data.message;
       });

      $scope.getTaskByid = function(id){
          console.log("getTaskByid is called id is " + id)

          Task.getById(id).success(function(data){
             console.log("task name" + data.data.name)
             $scope.taskData.push(data.data)
             $scope.taskNames.push(data.data.name)
          }).error(function(data, status, headers, config) {
            $scope.returnedMsg = data.message;
         });

        }

      $scope.completeTask = function(name){
        console.log("complete task " ) 
        var idx = $scope.taskNames.indexOf(name)
        console.log("remove " + idx + name) 
        $scope.tasks.splice(idx, 1);
        $scope.taskNames.splice(idx, 1);
        $scope.user.pendingTasks = $scope.tasks;

        User.put($routeParams.id, $scope.user).success(function(data){
          $scope.returnedMsg = data.message;
        }).error(function(data, status, headers, config){
           $scope.returnedMsg = data.message;
        });
        var tmpTask = $scope.taskData[idx] 
        $scope.taskData.splice(idx, 1);
        tmpTask.completed = true;
        Task.put(tmpTask._id, tmpTask).success(function(data){
          $scope.returnedMsg = data.message;
        }).error(function(data, status, headers, config){
           $scope.returnedMsg = data.message;
        });



      }

      $scope.showCompletedTask = function(){
        
        var conditions = {assignedUserName:$scope.user.name, "completed": true}
        var json = angular.toJson(conditions)
        console.log("?where="+json)
        Task.get("?where="+json).success(function(data){
          $scope.completedTasks = data.data
          $scope.returnedMsg = data.message;
        }).error(function(data, status, headers, config){
           $scope.returnedMsg = data.message;
        }); 

      }


    
         

}]);

demoControllers.controller('TaskDetailsController', ['$scope', '$http','$routeParams', 'CommonData', 'User','Task', '$window' , function($scope, $http, $routeParams, CommonData, User, Task, $window) {
    
     console.log("TaskDetailsController is called")
        Task.getById($routeParams.id).success(function(data){
            console.log("returned message" + data.message)
                 
                $scope.task = data.data;
              
         
         }).error(function(data, status, headers, config) {
            console.log("returned message" + data.message)
            $scope.returnedMsg = data.message;
       });



}]);

demoControllers.controller('TaskListController', ['$scope', '$http', 'Task', 'CommonData','$window' , function($scope, $http,  Task, CommonData,$window) {

    $scope.conditions = 'pending'
    $scope.sort = 'name'
    $scope.order = '1'

    var select = {"name" : 1, "_id" : 1, "assignedUserName" : 1 }

    $scope.delete = function(user_id){
      console.log("delete is called" + user_id)

         Task.delete(user_id).success(function(data){
            console.log("returned message" + data.message)
            var key = String($scope.sort)
            var value = parseInt($scope.order)
            var cond2 = {key : value}//{String($scope.sort) : String($scope.order)}
           Task.get("?sort="+"{"+key+":"+value+"}"+"&select="+angular.toJson(select)).success(function(data){
              console.log(data.message)
              CommonData.setLists(data.data)
             $scope.tasks = CommonData.getLists();
          });
       
         });

    };

    $scope.$watchGroup(['conditions', 'sort', 'order'], function(newVals, oldVals){
        console.log("newVal "+ newVals +" oldVal " +oldVals)
        if($scope.conditions == 'all'){
          var key = $scope.sort
          var value = parseInt($scope.order)

          var cond = {key : value}

          Task.get("?sort="+"{"+key+":"+value+"}"+"&"+"select="+angular.toJson(select)).success(function(data){
              console.log(data.message)
              CommonData.setLists(data.data)
             $scope.tasks = CommonData.getLists();
          });

        }else if($scope.conditions == 'completed'){
           var cond1 = {"completed": true};
           var key = $scope.sort
           var value = parseInt($scope.order)
       

           Task.get("?where="+angular.toJson(cond1)+"&"+"sort="+"{"+key+":"+value+"}"+"&select="+angular.toJson(select)).success(function(data){
              console.log(data.message)
              CommonData.setLists(data.data)
             $scope.tasks = CommonData.getLists();
          });
        }else{
            var cond = {"completed": false}
            var key = String($scope.sort)
            var value = parseInt($scope.order)
            var cond2 = {key : value}//{String($scope.sort) : String($scope.order)}
     Task.get("?where="+angular.toJson(cond)+"&"+"sort="+"{"+key+":"+value+"}"+"&select="+angular.toJson(select)).success(function(data){
        console.log(data.message)
        CommonData.setLists(data.data)
       $scope.tasks = CommonData.getLists();
    });

        }
    }, true)


}]);

demoControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set";

  };

}]);


