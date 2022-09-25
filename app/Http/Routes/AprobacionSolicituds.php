<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */ 

Route::post('aprobacionSolicituds/list', ['as' => 'aprobacionSolicituds.list', 'uses' => 'AprobacionSolicitudController@all']);
Route::post('aprobacionSolicituds/create', ['as' => 'aprobacionSolicituds.create', 'uses' => 'AprobacionSolicitudController@create']);
Route::post('aprobacionSolicituds/delete', ['as' => 'aprobacionSolicituds.delete', 'uses' => 'AprobacionSolicitudController@destroy']);
Route::post('aprobacionSolicituds/update', ['as' => 'aprobacionSolicituds.update', 'uses' => 'AprobacionSolicitudController@update']);
Route::get('aprobacionSolicituds/excel', ['as' => 'aprobacionSolicituds.excel', 'uses' => 'AprobacionSolicitudController@excel']);
Route::post('aprobacionSolicituds/find', ['as' => 'solicitud.find', 'uses' => 'SolicitudController@find']);
Route::get('aprobacionSolicituds/getVentas/{id}', ['as' => 'aprobacionSolicituds.getVentas', 'uses' => 'AprobacionSolicitudController@getVentas']);
Route::put('aprobacionSolicituds/AprobarRechazar/{id}', ['as' => 'aprobacionSolicituds.AprobarRechazar', 'uses' => 'AprobacionSolicitudController@AprobarRechazarSolicitud']);
Route::get('aprobacionSolicituds/getAprobadores/{id}', ['as' => 'aprobacionSolicituds.getAprobadores', 'uses' => 'AprobacionSolicitudController@getAprobadores']); 

Route::get('aprobacionSolicituds/data_form', ['as' => 'aprobacionSolicituds.data_form', 'uses' => 'SolicitudController@data_form']);
Route::post('aprobacionSolicituds/factor_credito', ['as' => 'aprobacionSolicituds.factor_credito', 'uses' => 'SolicitudController@factor_credito']);
Route::post('aprobacionSolicituds/guardar_solicitud', ['as' => 'aprobacionSolicituds.guardar_solicitud', 'uses' => 'SolicitudController@guardar_solicitud']);
Route::post('aprobacionSolicituds/mostrar_aprobaciones', ['as' => 'aprobacionSolicituds.mostrar_aprobaciones', 'uses' => 'SolicitudController@mostrar_aprobaciones']);
Route::get('aprobacionSolicituds/imprimir_solicitud/{id}', 'SolicitudController@imprimir_solicitud'); 
Route::post('aprobacionSolicituds/enviar_solicitud', ['as' => 'aprobacionSolicituds.enviar_solicitud', 'uses' => 'SolicitudController@enviar_solicitud']);
Route::post('aprobacionSolicituds/find', ['as' => 'aprobacionSolicituds.find', 'uses' => 'SolicitudController@find']);
Route::get('aprobacionSolicituds/findCustomer/{id}', ['as' => 'aprobacionSolicituds.findCustomer', 'uses' => 'CustomerController@find']);
Route::get('aprobacionSolicituds/findPersona/{id}', ['as' => 'aprobacionSolicituds.findPersona', 'uses' => 'PersonaController@find']);
Route::put('aprobacionSolicituds/createClienteAproba/{id}', ['as' => 'aprobacionSolicituds.createClienteAproba', 'uses' => 'CustomerController@createUpdate']);
Route::get('aprobacionSolicituds/data_formCustomer', ['as' => 'aprobacionSolicituds.data_formCustomer', 'uses' => 'CustomerController@data_form']);
Route::get('aprobacionSolicituds/get_clienteAprobaciom/{id}', ['as' => 'aprobacionSolicituds.get_clienteAprobaciom', 'uses' => 'CustomerController@get_cliente_documento']);

Route::get('aprobacionSolicituds/get_persona_documentoAprobac/{id}', ['as' => 'aprobacionSolicituds.get_persona_documentoAprobac', 'uses' => 'PersonaController@get_persona_documento']);
Route::get('aprobacionSolicituds/TraerProvinciasAprob/{id}', ['as' => 'aprobacionSolicituds.TraerProvinciasAprob', 'uses' => 'UbigeoController@TraerProvincias']);
Route::get('aprobacionSolicituds/TraerDepartamentosApro/{id}', ['as' => 'aprobacionSolicituds.TraerDepartamentosApro', 'uses' => 'UbigeoController@TraerDepartamentos']);
Route::get('aprobacionSolicituds/TraerDistritosApro/{id}', ['as' => 'aprobacionSolicituds.TraerDistritosApro', 'uses' => 'UbigeoController@TraerDistritos']);
Route::put('aprobacionSolicituds/createPersonaAprobac/{id}', ['as' => 'aprobacionSolicituds.createPersonaAprobac', 'uses' => 'PersonaController@createUpdate']);
Route::get('shops/TraerDepartamentos/{id}', ['as' => 'shops.TraerDepartamentos', 'uses' => 'UbigeoController@TraerDepartamentos']);


Route::get('aprobacionSolicituds/get_precios_listAproba/{id}', ['as' => 'aprobacionSolicituds.get_precios_listAproba', 'uses' => 'Orden_servicioController@get_precios_list']);


Route::get('aprobacionSolicituds/validateCantSerieAproba/{id}', ['as' => 'aprobacionSolicituds.validateCantSerieAproba', 'uses' => 'Register_movementController@validateCantSerie']);


Route::post('aprobacionSolicituds/getProductoSerieAproba', ['as' => 'aprobacionSolicituds.getProductoSerieAproba', 'uses' => 'SerieController@traerSeries']);
Route::post('aprobacionSolicituds/getProductoSerieStockAproba', ['as' => 'aprobacionSolicituds.getProductoSerieStockAproba', 'uses' => 'SerieController@traerSeriesStock']);

Route::get('aprobacionSolicituds/valida_series_serveAproba/{id}', ['as' => 'aprobacionSolicituds.valida_series_serveAproba', 'uses' => 'Register_movementController@valida_series_serve']);

Route::get('aprobacionSolicituds/getLocaStockAproba/{id}', ['as' => 'aprobacionSolicituds.getLocaStockAproba', 'uses' => 'Register_movementController@getLocaStock']);

Route::post('aprobacionSolicituds/listAsigApro', ['as' => 'aprobacionSolicituds.listAsigApro', 'uses' => 'AsignacioncobradorController@allAproba']);

Route::post('aprobacionSolicituds/totalesAproba', ['as' => 'aprobacionSolicituds.totalesAproba', 'uses' => 'AprobacionSolicitudController@allTotales']);

Route::post('aprobacionSolicituds/listpendientesCobro', ['as' => 'aprobacionSolicituds.listpendientesCobro', 'uses' => 'AprobacionSolicitudController@listpendientesCobro']);

Route::put('aprobacionSolicituds/updateComentarioAprobacion/{id}', ['as' => 'aprobacionSolicituds.updateComentarioAprobacion', 'uses' => 'AprobacionSolicitudController@updateComentarioAprobacion']);


Route::get('aprobacionSolicituds/imprimir_cronograma/{id}', 'MovimientoCajaController@imprimir_cronograma');