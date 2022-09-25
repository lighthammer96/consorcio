/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys.utils.libraries')
        .factory('AlertFactory', AlertFactory);

    AlertFactory.$inject = ['SweetAlert', '_', 'HelperFactory'];

    function AlertFactory(SweetAlert, _, HelperFactory) {
        var alerts = {
            confirm: confirm,
            confirmImg: confirmImg,
            prompt: prompt,
            prompt2: prompt2,
            text: text,
            textType: textType,
            showWarning: showWarning,
            showErrors: showErrors
        };
        return alerts;


        function showWarning(options, confirm) {
            SweetAlert.swal({
                title: options.title,
                text: options.message,
                html: true,
                type: 'warning',
                closeOnConfirm: true,
                customClass: (_.isUndefined(options.customClass)) ? '' : options.customClass,
            }, function (isConfirm) {
                if (typeof confirm === "function") {
                    confirm(isConfirm);
                }
            });
        }

        function showErrors(options, confirm) {
            SweetAlert.swal({
                title: options.title,
                text: options.message,
                html: true,
                type: "error",
                closeOnConfirm: true
            }, function (isConfirm) {
                if (typeof confirm === "function") {
                    confirm(isConfirm);
                }
            });
        }

        function confirmImg(options, confirm, cancel) {
            var status = true;
            options.title = options.title || 'Está seguro?';

            SweetAlert.swal({
                    title: options.title,
                    text: options.message,
                    type: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55", confirmButtonText: options.confirm,
                    cancelButtonText: options.cancel,
                    closeOnConfirm: true,
                    closeOnCancel: true,
                    status: status
                },
                function (isConfirm) {
                    if (isConfirm) {
                        //SweetAlert.swal("Excelente !", "Felicitaciones la acción se ejecuto correctamente :)", "success");
                        if (typeof confirm === "function") {
                            confirm(options);
                        }
                    }
                });
        }

        function confirm(options, confirm, cancel) {
            SweetAlert.swal({
                    title: options.title,
                    text: options.message,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: options.confirm,
                    cancelButtonText: options.cancel,
                    closeOnConfirm: (_.isUndefined(options.closeOnConfirm)) ? true : options.closeOnConfirm,
                    showLoaderOnConfirm: (_.isUndefined(options.showLoaderOnConfirm)) ?
                        false : options.showLoaderOnConfirm,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        //SweetAlert.swal("Excelente !", "Felicitaciones la acción se ejecuto correctamente :)", "success");
                        if (typeof confirm === "function") {
                            confirm(options);
                        }
                    } else {
                        //SweetAlert.swal("Cancelado", "Acción cancelada", "error");
                        if (typeof cancel === "function") {
                            cancel();
                        }
                    }
                });
        }

        function prompt(options, confirm, cancel) {
            SweetAlert.swal({
                title: options.title,
                text: options.message,
                type: (_.isUndefined(options.type)) ? 'input' : options.type,
                inputType: (_.isUndefined(options.inputType)) ? 'text' : options.inputType,
                showCancelButton: true,
                closeOnConfirm: (_.isUndefined(options.closeOnConfirm)) ? true : options.closeOnConfirm,
                animation: "slide-from-top",
                inputPlaceholder: (_.isUndefined(options.placeholder)) ? '' : options.placeholder,
                inputValue: (_.isUndefined(options.inputValue)) ? '' : options.inputValue,
                confirmButtonText: (_.isUndefined(options.confirmButtonText)) ? 'Ok' : options.confirmButtonText,
                cancelButtonText: (_.isUndefined(options.cancelButtonText)) ? 'Cancelar' : options.cancelButtonText,
                showLoaderOnConfirm: (_.isUndefined(options.showLoaderOnConfirm)) ? false : options.showLoaderOnConfirm
            }, function (inputValue) {
                if (inputValue === false) {
                    if (typeof cancel === "function") {
                        cancel();
                    }
                    return false;
                }

                if (inputValue == "" || _.isNull(inputValue) || _.isUndefined(inputValue) || _.isNaN(inputValue)) {
                    swal.showInputError(options.error_message);
                    return false
                }

                if (!_.isUndefined(options.success_message)) {
                    SweetAlert.swal(options.success_message, "success");
                }

                if (typeof confirm === "function") {
                    confirm(inputValue);
                }
            });
        }

        function prompt2(options, confirm, cancel) {
            SweetAlert.swal({
                title: options.title,
                text: options.message,
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: options.placeholder,
                inputValue: options.inputValue
            }, function (inputValue) {
                if (inputValue === false) {
                    if (typeof cancel === "function") {
                        cancel();
                    }
                    return false;
                }

                if (inputValue == "" || _.isNull(inputValue) || _.isUndefined(inputValue) || _.isNaN(inputValue)) {
                    swal.showInputError(options.error_message);
                    return false
                }

                // SweetAlert.swal("Bien echo!", "Usted ingreso el numero de serie " + inputValue, "success");

                if (typeof confirm === "function") {
                    confirm(inputValue);
                }
            });
        }

        function text(options) {
            SweetAlert.swal(options.title, options.message)
        }

        function textType(options) {
            SweetAlert.swal(options.title, options.message, options.type)
        }
    }
})();
