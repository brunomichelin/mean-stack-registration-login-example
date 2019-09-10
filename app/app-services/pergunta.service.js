(function () {
    'use strict';

    angular
        .module('app')
        .factory('PerguntaService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByPergunta = GetByPergunta;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetCurrent() {
            return $http.get('/api/perguntas/current').then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get('/api/perguntas').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/perguntas/' + _id).then(handleSuccess, handleError);
        }

        function GetByPergunta(pergunta) {
            return $http.get('/api/perguntas/' + pergunta).then(handleSuccess, handleError);
        }

        function Create(pergunta) {
            return $http.post('/api/perguntas', pergunta).then(handleSuccess, handleError);
        }

        function Update(pergunta) {
            return $http.put('/api/perguntas/' + pergunta._id, pergunta).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/perguntas/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
