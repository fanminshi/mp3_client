// js/services/todos.js
angular.module('demoServices', [])
        .factory('CommonData', function(){
        var data = "";
        return{
            getUsers : function(){
                return data;
            },
            setUsers : function(newData){
                data = newData;                
            }
        }
    })
    .factory('Llamas', function($http, $window) {      
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/llamas');
            }
        }
    })
    .factory('User', function($http, $window) {      
        return {
            get : function(conditions) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/users'+conditions);
            }

            post : function(conditions) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/users'+conditions);
            }

            delete : function(id) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/users/'+id);
            }
        }
    })
    .factory('Task', function($http, $window) {      
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/tasks');
            }
        }
    })
    ;
