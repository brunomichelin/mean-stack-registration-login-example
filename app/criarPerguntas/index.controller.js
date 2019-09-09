(function () {
    'use strict';

    angular
        .module('app')
        .controller('CriarPerguntas.IndexController', Controller);

    function Controller($window, PerguntaService, FlashService) {
        var vm = this;

        vm.pergunta = null;
        vm.savePergunta = savePergunta;
        vm.cancelarPergunta = cancelarPergunta;

        initController();

        function initController() {
            // get current pergunta
            PerguntaService.GetCurrent().then(function (pergunta) {
                vm.pergunta = pergunta;
            });
        }

        function savePergunta() {
            PerguntaService.Create(vm.pergunta)
                .then(function () {
                    FlashService.Success('Pergunta salva');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function cancelarPergunta() {
            $window.location = '/home';
        }
    }

})();