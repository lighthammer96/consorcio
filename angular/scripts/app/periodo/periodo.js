/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.periodos')
        .config(Config)
        .controller('PeriodoCtrl', PeriodoCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    PeriodoCtrl.$inject = ['$scope', '_', 'RESTService','AlertFactory'];

    function PeriodoCtrl($scope,_, RESTService ,AlertFactory)
    {
        var modalPeriodos=$("#modalPeriodos");
        var titlePeriodos=$("#titlePeriodos");
        var anio=$("#anio");
        var mes=$("#mes");
        var periodo=$("#periodo");
        var p_state=$("#p_state");
        var fechaInico=$("#fechaInico");
        var fechaFin=$("#fechaFin");
        var estado=$("#estado");

         $scope.chkState = function () {
            if(p_state.prop('checked')){
                mes.prop("disabled",true);
                mes.val("");
            }else{
                mes.prop("disabled",false);
            }
              if(p_state.prop('checked')){
               calcularRangoAnual();
            }else{
                calcularRangoMes();
             // fechaInico.val("2019-08-10");
            }
        };
        function findPeriodo(id) {

            titlePeriodos.html('Ver periodo');
            RESTService.get('periodos/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    var aniototal=data_p.periodo;
                    var divisiones = aniototal.split("-");
                    anio.val(divisiones[0]).trigger("change");
                  
                    anio.prop("disabled",true);
                    mes.prop("disabled",true);
                    estado.val(data_p.estado);
                    p_state.prop('checked', false).iCheck('update');
                    p_state.prop("disabled",true);
                      mes.val(divisiones[1]).trigger("change");
                    $("#btn_guardar").prop("disabled",true);
                    fechaInico.val(data_p.fechaInicio);
                    fechaFin.val(data_p.fechaFin);
                     modalPeriodos.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        function cleanPeriodo() {
            cleanRequired();
            p_state.prop('checked', true).iCheck('update');
               anio.prop("disabled",false);
            modalPeriodos.val("");
            titlePeriodos.val("");
            anio.val("");
            mes.val("");
            fechaInico.val("");
            fechaFin.val("");
            estado.val("A");

            mes.prop("disabled",true);
                p_state.prop("disabled",false);
            p_state.prop('checked', true).iCheck('update');
                    $("#btn_guardar").prop("disabled",false);

        }

        modalPeriodos.on('hidden.bs.modal', function (e) {
            cleanPeriodo();

        });

        anio.change(function(){
          //   const fechaInicio = new Date();
          // console.log Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 1);
          if(p_state.prop('checked')){
               calcularRangoAnual();
            }else{
                calcularRangoMes();
             // fechaInico.val("2019-08-10");
            }
        }); 
         mes.change(function(){
          //   const fechaInicio = new Date();
          // console.log Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 1);
          if(p_state.prop('checked')){
               calcularRangoAnual();
            }else{
                calcularRangoMes();
             // fechaInico.val("2019-08-10");
            }
        }); 

        function calcularRangoAnual(){
            if(anio.val()!=''){
                var ini=anio.val()+'-'+'01'+'-'+'01';
                var fin=anio.val()+'-'+'12'+'-'+'31';
                fechaInico.val(ini);
                fechaFin.val(fin);
            }else{
                fechaInico.val("");
                fechaFin.val("");
            }

        }

        function calcularRangoMes(){

            if(anio.val()!=''){
                if(mes.val()!=''){
                        var d = new Date(anio.val(), mes.val(), 0).getDate();
                        console.log(d);
                        var ini=anio.val()+'-'+mes.val()+'-'+'01';
                        var fin=anio.val()+'-'+mes.val()+'-'+d;
                        fechaInico.val(ini);
                        fechaFin.val(fin);
                }
            }else{
                fechaInico.val("");
                fechaFin.val("");
            }

        }
        function newPeriodo()
        {
            titlePeriodos.html('Nuevo Periodo');
            modalPeriodos.modal('show');
        }
         $scope.savePeriodo = function()
        {   
            var bval = true;
            bval = bval && anio.required();
            
            if(p_state.prop('checked')){
             //
            }else{
              bval = bval && mes.required();
             // fechaInico.val("2019-08-10");
            }
            if(bval){
                    var params = {
                  
                    'anio': anio.val(),
                    'estado':estado.val(),
                    'estado_cc':$("#estado_cc").val(),
                    'anual': ((p_state.prop('checked')) ? 'A' : 'I'),
                    'mes': mes.val(),
                    'fechaInicio': fechaInico.val(),
                    'fechaFin': fechaFin.val(),
                   };
              
                var w_id = (periodo.val() === '') ? 0 : grupoContable_id.val();
                RESTService.updated('periodos/savePeriodo', w_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: ' se guardó correctamente.',
                            type: 'success'
                        });
                        modalPeriodos.modal('hide');
                        LoadRecordsButtonPeriodo.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'Hubo un error al guardar el Grupo Contable. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
            }

        }
         $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            $scope.chkState();
        });
        
        var search = getFormSearch('frm-search-Periodo', 'search_b', 'LoadRecordsButtonPeriodo');

        var table_container_Periodo = $("#table_container_Periodo");

        table_container_Periodo.jtable({
            title: "Lista de Periodos",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/periodos/list',
                deleteAction: base_url + '/periodos/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Periodo',
                editRecord: 'Editar Periodo',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('periodos/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Periodo',
                    click: function () {
                        newPeriodo();
                    }
                }]
            },
            fields: {
                periodo: {
                    title: 'Periodo',
                    key: true,
                    create: true,
                    edit: true,
                    list: true
                },
                estado: {
                    title: 'Estado',
                    values: { 'C': 'Cerrado', 'A': 'Abierto' ,'P':'Pre-Cerrado'},
                    type: 'checkbox',
                    defaultValue: 'A',
                   
                },
                estado_cc: {
                    title: 'Estado CC',
                    values: { 'C': 'Cerrado', 'A': 'Abierto' ,'P':'Pre-Cerrado'},
                    type: 'checkbox',
                    defaultValue: 'A',
                   
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Ver" class="edit_cont" data-code="' +
                            data.record.periodo + '"><i class="fa  fa-eye fa-green"></i></a>';
                    }
                }

            }, 
            recordsLoaded: function (event, data) {
                $('.edit_cont').click(function (e) {
                    var id = $(this).attr('data-code');
                    findPeriodo(id);
                    e.preventDefault();
                });
            },
           

            formCreated: function (event, data) {
                data.form.find('input[name="Categoria"]').attr('onkeypress','return soloLetras(event)');
                $('#Edit-estado').parent().addClass('i-checks');
                  data.form.find('input[name="periodo"]').attr('maxlength','7');
                 // $("#ms_num").attr('maxlength','6');
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                     if(e.target.value=='A'){
                        $("#Edit-estado").val("I");
                        $(".i-checks span").text("Inactivo");

                     }else{
                        $("#Edit-estado").val("A");
                        $(".i-checks span").text("Activo");
                     };
                });
                if(data.formType=='edit') {
                $('#Edit-periodo').prop('readonly', true);
                $('#Edit-periodo').addClass('jtable-input-readonly');
            }
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Categoria"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Periodo', 'LoadRecordsButtonPeriodo', function(){
            table_container_Periodo.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('periodos', {
                url: '/periodos',
                templateUrl: base_url + '/templates/periodos/base.html',
                controller: 'PeriodoCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();