<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM 
 */ 

Route::post('solicitud/list', ['as' => 'solicitud.list', 'uses' => 'SolicitudController@all']);
Route::post('solicitud/list_ventas', ['as' => 'solicitud.list_ventas', 'uses' => 'SolicitudController@list_ventas']);
Route::post('solicitud/list_creditos', ['as' => 'solicitud.list_creditos', 'uses' => 'SolicitudController@list_creditos']);
Route::post('solicitud/create', ['as' => 'solicitud.create', 'uses' => 'SolicitudController@create']);
Route::post('solicitud/delete', ['as' => 'solicitud.delete', 'uses' => 'SolicitudController@destroy']);
Route::post('solicitud/update', ['as' => 'solicitud.update', 'uses' => 'SolicitudController@update']);
Route::post('solicitud/guardar_solicitud', ['as' => 'solicitud.guardar_solicitud', 'uses' => 'SolicitudController@guardar_solicitud']);
Route::post('solicitud/factor_credito', ['as' => 'solicitud.factor_credito', 'uses' => 'SolicitudController@factor_credito']);
Route::post('solicitud/enviar_solicitud', ['as' => 'solicitud.enviar_solicitud', 'uses' => 'SolicitudController@enviar_solicitud']);
Route::post('solicitud/eliminar_solicitud', ['as' => 'solicitud.eliminar_solicitud', 'uses' => 'SolicitudController@eliminar_solicitud']);

Route::post('solicitud/find', ['as' => 'solicitud.find', 'uses' => 'SolicitudController@find']);
Route::post('solicitud/mostrar_aprobaciones', ['as' => 'solicitud.mostrar_aprobaciones', 'uses' => 'SolicitudController@mostrar_aprobaciones']);
Route::post('solicitud/anular_solicitud', ['as' => 'solicitud.anular_solicitud', 'uses' => 'SolicitudController@anular_solicitud']);


Route::get('solicitud/excel', ['as' => 'solicitud.excel', 'uses' => 'SolicitudController@excel']);



Route::get('solicitud/traerSectorOrd/{id}', ['as' => 'solicitud.traerSectorOrd', 'uses' => 'UbigeoController@traerSectorli']);

Route::get('solicitud/data_form', ['as' => 'solicitud.data_form', 'uses' => 'SolicitudController@data_form']);
// Route::post('solicitud/getTiendas', 'ShopController@getTiendas');

Route::get('solicitud/imprimir_solicitud/{id}', 'SolicitudController@imprimir_solicitud');
Route::get('solicitud/imprimir_clausula_solicitud/{id}', 'SolicitudController@imprimir_clausula_solicitud');

Route::get('solicitud/get_cliente/{id}', ['as' => 'solicitud.get_cliente', 'uses' => 'SolicitudController@get_cliente_documento']);

Route::get('solicitud/get_cliente_persona/{id}', ['as' => 'solicitud.get_cliente_persona', 'uses' => 'SolicitudController@get_cliente_persona']);

Route::get('solicitud/get_precios_list/{id}', ['as' => 'solicitud.get_precios_list', 'uses' => 'SolicitudController@get_precios_list']);


Route::get('solicitud/TraerDepartamentos/{id}', ['as' => 'solicitud.TraerDepartamentos', 'uses' => 'UbigeoController@TraerDepartamentos']);
Route::get('solicitud/TraerProvincias/{id}', ['as' => 'solicitud.TraerProvincias', 'uses' => 'UbigeoController@TraerProvincias']);
Route::get('solicitud/TraerDistritos/{id}', ['as' => 'solicitud.TraerDistritos', 'uses' => 'UbigeoController@TraerDistritos']);


Route::get('solicitud/getLocaStock/{id}', ['as' => 'solicitud.getLocaStock', 'uses' => 'Register_movementController@getLocaStock']);


Route::post('solicitud/getArticulosSelect', ['as' => 'solicitud.getArticulosSelect', 'uses' => 'ProductController@traeAll']);

Route::get('solicitud/validateCantSerie/{id}', ['as' => 'solicitud.validateCantSerie', 'uses' => 'Register_movementController@validateCantSerie']);

Route::post('solicitud/getProductoSerie', ['as' => 'solicitud.getProductoSerie', 'uses' => 'SerieController@traerSeries']);
Route::post('solicitud/getProductoSerieStock', ['as' => 'solicitud.getProductoSerieStock', 'uses' => 'SerieController@traerSeriesStock']);

Route::get('solicitud/imprimir_cronograma/{id}', 'MovimientoCajaController@imprimir_cronograma');

Route::get('solicitud/find/{id}', ['as' => 'solicitud.find', 'uses' => 'CustomerController@find']);

Route::get('solicitud/data_form_customer', ['as' => 'solicitud.data_form_customer', 'uses' => 'CustomerController@data_form']);
Route::put('solicitud/createCliente/{id}', ['as' => 'solicitud.createCliente', 'uses' => 'CustomerController@createUpdate']);

Route::post('solicitud/validar_parametro_categoria', ['as' => 'solicitud.validar_parametro_categoria', 'uses' => 'SolicitudController@validar_parametro_categoria']);

Route::post('solicitud/validar_serie', ['as' => 'solicitud.validar_serie', 'uses' => 'SolicitudController@validar_serie']);

Route::post('solicitud/copiar_solicitud', ['as' => 'solicitud.copiar_solicitud', 'uses' => 'SolicitudController@copiar_solicitud']);

Route::post('solicitud/guardar_separaciones', ['as' => 'solicitud.guardar_separaciones', 'uses' => 'SolicitudController@guardar_separaciones']);
Route::post('solicitud/obtener_separaciones', ['as' => 'solicitud.obtener_separaciones', 'uses' => 'SolicitudController@obtener_separaciones']);

Route::post('solicitud/obtener_series', ['as' => 'solicitud.obtener_series', 'uses' => 'SolicitudController@obtener_series']);

Route::post('solicitud/validar_cliente', 'CustomerController@validar_cliente'); 