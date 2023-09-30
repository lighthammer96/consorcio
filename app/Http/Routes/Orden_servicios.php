<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('orden_servicios/list', 'Orden_servicioController@all');

Route::post('orden_servicios/list_vehiculos', ['as' => 'orden_servicios.list_vehiculos', 'uses' => 'Orden_servicioController@list_vehiculos']);

Route::post('orden_servicios/create', ['as' => 'orden_servicios.create', 'uses' => 'Orden_servicioController@create']);

Route::post('orden_servicios/update', ['as' => 'orden_servicios.update', 'uses' => 'Orden_servicioController@update']);
Route::get('orden_servicios/excel', ['as' => 'orden_servicios.excel', 'uses' => 'Orden_servicioController@excel']);
Route::get('orden_servicios/data_form', 'Orden_servicioController@data_form');
Route::get('orden_servicios/get_cliente/{id}', ['as' => 'orden_servicios.get_cliente', 'uses' => 'CustomerController@get_cliente_documento']);

Route::get('orden_servicios/get_Placa/{id}', 'Vehiculos_terceroController@get_Placa_documento');

Route::get('orden_servicios/get_vehiculo/{id}', ['as' => 'orden_servicios.get_vehiculo', 'uses' => 'Vehiculos_terceroController@get_vehiculo']);

Route::get('orden_servicios/get_Modelo/{id}', ['as' => 'orden_servicios.get_Modelo', 'uses' => 'Vehiculos_terceroController@get_Modelo_documento']);
Route::put('orden_servicios/createOrden/{id}', ['as' => 'orden_servicios.createOrden', 'uses' => 'Orden_servicioController@createUpdate']);


Route::put('orden_servicios/deleteDetalle/{id}', ['as' => 'orden_servicios.deleteDetalle', 'uses' => 'Orden_servicioController@deleteDetalleChangue']);

Route::get('orden_servicios/delete/{id}', ['as' => 'orden_servicios.delete', 'uses' => 'Orden_servicioController@destroy']);

Route::get('orden_servicios/deleteMovimiento/{id}', ['as' => 'orden_servicios.deleteMovimiento', 'uses' => 'Orden_servicioController@delete_movimiento']);

Route::get('orden_servicios/deleteDetalle/{id}', ['as' => 'orden_servicios.deleteDetalle', 'uses' => 'Orden_servicioController@deleteDetalle']);

Route::get('orden_servicios/find/{id}', ['as' => 'orden_servicios.find', 'uses' => 'Orden_servicioController@find']);

Route::post('orden_servicios/getCliente', 'Orden_servicioController@getCliente');

Route::put('orden_servicios/cambiar_estado/{id}', ['as' => 'orden_servicios.cambiar_estado', 'uses' => 'Orden_servicioController@cambiar_estado']);

Route::get('orden_servicios/pdf', 'Orden_servicioController@pdf');

Route::get('orden_servicios/get_precios_list/{id}', ['as' => 'orden_servicios.get_precios_list', 'uses' => 'Orden_servicioController@get_precios_list']);

Route::get('orden_servicios/findCliOrde/{id}', ['as' => 'orden_servicios.findCliOrde', 'uses' => 'CustomerController@find']);

Route::get('orden_servicios/TraerDepartamentosOrde/{id}', ['as' => 'orden_servicios.TraerDepartamentosOrde', 'uses' => 'UbigeoController@TraerDepartamentos']);

Route::get('orden_servicios/TraerProvinciasOrde/{id}', ['as' => 'orden_servicios.TraerProvinciasOrde', 'uses' => 'UbigeoController@TraerProvincias']);

Route::get('orden_servicios/TraerDistritosOrde/{id}', ['as' => 'orden_servicios.TraerDistritosOrde', 'uses' => 'UbigeoController@TraerDistritos']);

Route::put('orden_servicios/createVehiOrden/{id}', ['as' => 'orden_servicios.createVehiOrden', 'uses' => 'Vehiculos_terceroController@createUpdate']);

Route::put('orden_servicios/createClienteOrden/{id}', ['as' => 'orden_servicios.createClienteOrden', 'uses' => 'CustomerController@createUpdate']);

Route::get('orden_servicios/get_cliente_persona/{id}', ['as' => 'orden_servicios.get_cliente_persona', 'uses' => 'Orden_servicioController@get_cliente_persona']);

Route::get('orden_servicios/traerSectorOrd/{id}', ['as' => 'orden_servicios.traerSectorOrd', 'uses' => 'UbigeoController@traerSectorli']);


Route::post('orden_servicios/update_articulo', ['as' => 'orden_servicios.update_articulo', 'uses' => 'Orden_servicioController@update_articulo']);

Route::get('orden_servicios/TraerModelos/{id}', ['as' => 'orden_servicios.TraerModelos', 'uses' => 'ModeloController@TraerModelos']);

Route::post('orden_servicios/validar_cliente', 'CustomerController@validar_cliente');