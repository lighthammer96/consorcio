<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM 
 */ 

Route::post('reasignacion_vendedor/list', ['as' => 'reasignacion_vendedor.list', 'uses' => 'ReasignacionVendedorController@all']);
Route::post('reasignacion_vendedor/list_ventas', ['as' => 'reasignacion_vendedor.list_ventas', 'uses' => 'ReasignacionVendedorController@list_ventas']);
Route::post('reasignacion_vendedor/list_creditos', ['as' => 'reasignacion_vendedor.list_creditos', 'uses' => 'ReasignacionVendedorController@list_creditos']);
Route::post('reasignacion_vendedor/create', ['as' => 'reasignacion_vendedor.create', 'uses' => 'ReasignacionVendedorController@create']);
Route::post('reasignacion_vendedor/delete', ['as' => 'reasignacion_vendedor.delete', 'uses' => 'ReasignacionVendedorController@destroy']);
Route::post('reasignacion_vendedor/update', ['as' => 'reasignacion_vendedor.update', 'uses' => 'ReasignacionVendedorController@update']);
Route::post('reasignacion_vendedor/guardar_solicitud', ['as' => 'reasignacion_vendedor.guardar_solicitud', 'uses' => 'ReasignacionVendedorController@guardar_solicitud']);
Route::post('reasignacion_vendedor/factor_credito', ['as' => 'reasignacion_vendedor.factor_credito', 'uses' => 'ReasignacionVendedorController@factor_credito']);
Route::post('reasignacion_vendedor/enviar_solicitud', ['as' => 'reasignacion_vendedor.enviar_solicitud', 'uses' => 'ReasignacionVendedorController@enviar_solicitud']);
Route::post('reasignacion_vendedor/eliminar_solicitud', ['as' => 'reasignacion_vendedor.eliminar_solicitud', 'uses' => 'ReasignacionVendedorController@eliminar_solicitud']);

Route::post('reasignacion_vendedor/find', ['as' => 'reasignacion_vendedor.find', 'uses' => 'ReasignacionVendedorController@find']);
Route::post('reasignacion_vendedor/mostrar_aprobaciones', ['as' => 'reasignacion_vendedor.mostrar_aprobaciones', 'uses' => 'ReasignacionVendedorController@mostrar_aprobaciones']);
Route::post('reasignacion_vendedor/anular_solicitud', ['as' => 'reasignacion_vendedor.anular_solicitud', 'uses' => 'ReasignacionVendedorController@anular_solicitud']);


Route::get('reasignacion_vendedor/excel', ['as' => 'reasignacion_vendedor.excel', 'uses' => 'ReasignacionVendedorController@excel']);



Route::get('reasignacion_vendedor/traerSectorOrd/{id}', ['as' => 'reasignacion_vendedor.traerSectorOrd', 'uses' => 'UbigeoController@traerSectorli']);

Route::get('reasignacion_vendedor/data_form', ['as' => 'reasignacion_vendedor.data_form', 'uses' => 'ReasignacionVendedorController@data_form']);
// Route::post('reasignacion_vendedor/getTiendas', 'ShopController@getTiendas');

Route::get('reasignacion_vendedor/imprimir_solicitud/{id}', 'ReasignacionVendedorController@imprimir_solicitud');
Route::get('reasignacion_vendedor/imprimir_clausula_solicitud/{id}', 'ReasignacionVendedorController@imprimir_clausula_solicitud');

Route::get('reasignacion_vendedor/get_cliente/{id}', ['as' => 'reasignacion_vendedor.get_cliente', 'uses' => 'ReasignacionVendedorController@get_cliente_documento']);

Route::get('reasignacion_vendedor/get_cliente_persona/{id}', ['as' => 'reasignacion_vendedor.get_cliente_persona', 'uses' => 'ReasignacionVendedorController@get_cliente_persona']);

Route::get('reasignacion_vendedor/get_precios_list/{id}', ['as' => 'reasignacion_vendedor.get_precios_list', 'uses' => 'ReasignacionVendedorController@get_precios_list']);


Route::get('reasignacion_vendedor/TraerDepartamentos/{id}', ['as' => 'reasignacion_vendedor.TraerDepartamentos', 'uses' => 'UbigeoController@TraerDepartamentos']);
Route::get('reasignacion_vendedor/TraerProvincias/{id}', ['as' => 'reasignacion_vendedor.TraerProvincias', 'uses' => 'UbigeoController@TraerProvincias']);
Route::get('reasignacion_vendedor/TraerDistritos/{id}', ['as' => 'reasignacion_vendedor.TraerDistritos', 'uses' => 'UbigeoController@TraerDistritos']);


Route::get('reasignacion_vendedor/getLocaStock/{id}', ['as' => 'reasignacion_vendedor.getLocaStock', 'uses' => 'Register_movementController@getLocaStock']);


Route::post('reasignacion_vendedor/getArticulosSelect', ['as' => 'reasignacion_vendedor.getArticulosSelect', 'uses' => 'ProductController@traeAll']);

Route::get('reasignacion_vendedor/validateCantSerie/{id}', ['as' => 'reasignacion_vendedor.validateCantSerie', 'uses' => 'Register_movementController@validateCantSerie']);

Route::post('reasignacion_vendedor/getProductoSerie', ['as' => 'reasignacion_vendedor.getProductoSerie', 'uses' => 'SerieController@traerSeries']);
Route::post('reasignacion_vendedor/getProductoSerieStock', ['as' => 'reasignacion_vendedor.getProductoSerieStock', 'uses' => 'SerieController@traerSeriesStock']);

Route::get('reasignacion_vendedor/imprimir_cronograma/{id}', 'MovimientoCajaController@imprimir_cronograma');

Route::get('reasignacion_vendedor/find/{id}', ['as' => 'reasignacion_vendedor.find', 'uses' => 'CustomerController@find']);

Route::get('reasignacion_vendedor/data_form_customer', ['as' => 'reasignacion_vendedor.data_form_customer', 'uses' => 'CustomerController@data_form']);
Route::put('reasignacion_vendedor/createCliente/{id}', ['as' => 'reasignacion_vendedor.createCliente', 'uses' => 'CustomerController@createUpdate']);

Route::post('reasignacion_vendedor/validar_parametro_categoria', ['as' => 'reasignacion_vendedor.validar_parametro_categoria', 'uses' => 'ReasignacionVendedorController@validar_parametro_categoria']);

Route::post('reasignacion_vendedor/validar_serie', ['as' => 'reasignacion_vendedor.validar_serie', 'uses' => 'ReasignacionVendedorController@validar_serie']);

Route::post('reasignacion_vendedor/copiar_solicitud', ['as' => 'reasignacion_vendedor.copiar_solicitud', 'uses' => 'ReasignacionVendedorController@copiar_solicitud']);

Route::post('reasignacion_vendedor/guardar_separaciones', ['as' => 'reasignacion_vendedor.guardar_separaciones', 'uses' => 'ReasignacionVendedorController@guardar_separaciones']);
Route::post('reasignacion_vendedor/obtener_separaciones', ['as' => 'reasignacion_vendedor.obtener_separaciones', 'uses' => 'ReasignacionVendedorController@obtener_separaciones']);

Route::post('reasignacion_vendedor/obtener_series', ['as' => 'reasignacion_vendedor.obtener_series', 'uses' => 'ReasignacionVendedorController@obtener_series']);