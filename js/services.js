// js/services/todos.js
angular.module('demoServices', [])
        .factory('CommonData', function(){
        var data = "";
        var listData =""
        return{
            getUsers : function(){
                return data;
            },
            setUsers : function(newData){
                data = newData;                
            },
            getLists : function(){
                return listData;
            },
            setLists : function(newData){
                listData = newData;                
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
            },

            getById : function(id) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/users/'+id);
            },

            post : function(data) {
                console.log("post" + data.name + data.email)
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.post(baseUrl+'/api/users', data);
            },

            put : function(id, data) {
                console.log("put" + data.name + data.email)
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.put(baseUrl+'/api/users/'+id, data);
            },

            delete : function(id) {
                var baseUrl = $window.sessionStorage.baseurl;
                console.log("user delete "+baseUrl+'/api/users/'+id)
                return $http.delete(baseUrl+'/api/users/'+id);
            }
        }
    })
    .factory('Task', function($http, $window) {      
        return {
            get : function(conditions) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/tasks'+conditions);
            }
            ,
            getById : function(id) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/tasks/'+id);
            },

            post : function(data) {
                console.log("post" + data.name + data.email)
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.post(baseUrl+'/api/tasks', data);
            },

            put : function(id, data) {
                console.log("put" + data._id + data.name)
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.put(baseUrl+'/api/tasks/'+id, data);
            },

            delete : function(id) {
                var baseUrl = $window.sessionStorage.baseurl;
                console.log("task delete "+baseUrl+'/api/tasks/'+id)
                return $http.delete(baseUrl+'/api/tasks/'+id);
            }
        }
    })
    ;
