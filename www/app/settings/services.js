
(function(){
    'use strict'


    function Settings($http,$log,API){

        
        var service = {};
        service.settings = [];

        service.get = function () {
            $log.debug('Get  settings : ');
            return $http.get(API.URL+'setting/31',{
                params:{
                    //api_key: key
                },
            })
            .success(function(data) {
                $log.debug('Get  settings (factory) ', data);
                service.settings = data
            })
            .error(function(error) {
                $log.error('Error', error);
            })

        };
        
        return service;

    }
        angular.module('next.settings.services', [])
        .factory('Settings', Settings);


})()




