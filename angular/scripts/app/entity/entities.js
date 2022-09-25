/**
 * Created by JAIR on 4/6/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.entities')
        .config(Config)
        .controller('EntityCtrl', EntityCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    EntityCtrl.$inject = ['$scope'];

    function EntityCtrl($scope)
    {
        var search = getFormSearch('frm-search-entity', 'search_e', 'LoadRecordsButtonEntity');

        var table_container_entity = $("#table_container_entity");

        table_container_entity.jtable({
            title: "Lista de Entidades",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/entities/list',
                createAction: base_url + '/entities/create',
                updateAction: base_url + '/entities/update',
                deleteAction: base_url + '/entities/delete'
            },
            messages: {
                addNewRecord: 'Nueva Entidad',
                editRecord: 'Editar Entidad'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('entities/excel', {});
                    }
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Documento: {
                    title: 'Documento',
                    width: '2%',
                    listClass: 'text-center'
                },
                nombre_entidad: {
                    title: 'Nombre/Razón Social',
                    create: false,
                    edit: false
                },
                apellido_paterno: {
                    title: 'Apellido Paterno',
                    list: false
                },
                apellido_materno: {
                    title: 'Apellido Materno',
                    list: false
                },
                Nombres: {
                    title: 'Nombre',
                    list: false
                },
                RazonSocial: {
                    title: 'Razón Social',
                    list: false
                },
                direccion_legal: {
                    title: 'Dirección Legal',
                    list: show_list_
                },
                tipo_documento_identidad: {
                    title: 'Tipo Doc. Ident.',
                    options: base_url + '/entities/getTypeDocumentIdentity',
                    list: show_list_
                },
                tipo_persona: {
                    title: 'Tipo Persona',
                    options: base_url + '/entities/getTypePerson',
                    width: '5%',
                    list: show_list_
                },
                is_client: {
                    title: 'Cliente',
                    type: 'checkbox',
                    values: { 0: '', 1: '' },
                    defaultValue: 1,
                    list: false
                },
                is_provider: {
                    title: 'Proveedor',
                    type: 'checkbox',
                    values: { 0: '', 1: '' },
                    defaultValue: 1,
                    list: false
                },
                contact: {
                    title: 'Contacto',
                    list: false
                },
                contact_phone: {
                    title: 'Teléfono de Contacto',
                    list: false
                }
            },
            recordUpdated: function (event, data) {
                LoadRecordsButtonEntity.click();
            },
            formCreated: function (event, data) {
                $('#div_tipo_persona').remove();
                $('#div_tipo_documento_identidad').remove();
                $('.jtable-dialog-form').find('.mensajes_validador').addClass('messages_validator');
                $('#Edit-tipo_documento_identidad').parent().parent().attr('id', 'div_tipo_documento_identidad').insertAfter('.messages_validator');
                $('#Edit-tipo_persona').parent().parent().attr('id', 'div_tipo_persona').insertAfter('.messages_validator');
                data.form.find('select[name="tipo_persona"]').change(function(){
                    typeEntityForm();
                });
                $('#Edit-is_client').parent().addClass('i-checks');
                $('#Edit-is_provider').parent().addClass('i-checks');
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (event) {
                    $(event.target).click();
                    verifyContactEntity();
                });

                data.form.find('input[name="Nombres"]').attr('onkeypress','return soloLetras(event)');
                data.form.find('input[name="apellido_paterno"]').attr('onkeypress','return soloLetras(event)');
                data.form.find('input[name="apellido_materno"]').attr('onkeypress','return soloLetras(event)');
                data.form.find('input[name="RazonSocial"]').attr('onkeypress','return soloLetras(event)');
                data.form.find('input[name="Documento"]').attr('onkeypress','return soloNumeros(event)');
                typeEntityForm(); validEntityForm(); verifyContactEntity();
            },
            formClosed: function () {
                setTimeout(function () {
                    $('#div_tipo_persona').remove();
                    $('#div_tipo_documento_identidad').remove();
                });
            },
            formSubmitting: function (event, data) {
                var EditTypeEntity = $("#Edit-tipo_persona").val();
                var bval = true;
                if (EditTypeEntity == 1) {
                    bval = bval && data.form.find('input[name="Nombres"]').required();
                } else {
                    bval = bval && data.form.find('input[name="Documento"]').required();
                    bval = bval && data.form.find('input[name="RazonSocial"]').required();
                    bval = bval && data.form.find('input[name="direccion_legal"]').required();
                }
                return bval;
            }
        });

        generateSearchForm('frm-search-entity', 'LoadRecordsButtonEntity', function(){
            table_container_entity.jtable('load', {
                search: $('#search_e').val()
            });
        }, true);

        function verifyContactEntity() {
            var is_check_provider = $('#Edit-is_provider').prop('checked');
            var contact_provider = $('#Edit-contact');
            var contact_phone_provider = $('#Edit-contact_phone');
            contact_provider.parent().parent().removeClass('hide');
            contact_phone_provider.parent().parent().removeClass('hide');
            if (!is_check_provider) {
                contact_provider.val('').parent().parent().addClass('hide');
                contact_phone_provider.val('').parent().parent().addClass('hide');
            }
        }

        function typeEntityForm()
        {
            var EditTypeEntity = $("#Edit-tipo_persona");
            var EditRazonSocial = $("#Edit-RazonSocial");
            var EditNombres = $("#Edit-Nombres");
            var EditApellidosP = $("#Edit-apellido_paterno");
            var EditApellidosM = $("#Edit-apellido_materno");
            var EditDocumento = $("#Edit-Documento");
            var te = EditTypeEntity.val();
            if (te == 1) {
                EditRazonSocial.parent().parent().hide();
                EditNombres.parent().parent().show();
                EditApellidosP.parent().parent().show();
                EditApellidosM.parent().parent().show();
                EditDocumento.attr('maxlength', '8');
            }
            else {
                EditRazonSocial.parent().parent().show();
                EditNombres.parent().parent().hide();
                EditApellidosP.parent().parent().hide();
                EditApellidosM.parent().parent().hide();
                EditDocumento.attr('maxlength', '11');
            }
        }

        function validEntityForm()
        {
            var EditTypeEntity = $("#Edit-tipo_persona");
            var EditRazonSocial = $("#Edit-RazonSocial");
            var EditNombres = $("#Edit-Nombres");
            if(EditRazonSocial.val() != '' || EditNombres.val() != '')
                EditTypeEntity.prop('readonly', true);
        }
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('entities', {
                url: '/entities',
                templateUrl: base_url + '/templates/entities/base.html',
                controller: 'EntityCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();