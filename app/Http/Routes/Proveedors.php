<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */
 
Route::post('proveedors/list', ['as' => 'proveedors.list', 'uses' => 'ProveedorController@all']);
Route::post('proveedors/create', ['as' => 'proveedors.create', 'uses' => 'ProveedorController@create']);
Route::post('proveedors/delete', ['as' => 'proveedors.delete', 'uses' => 'ProveedorController@destroy']);
Route::post('proveedors/update', ['as' => 'proveedors.update', 'uses' => 'ProveedorController@update']);
Route::get('proveedors/excel', ['as' => 'proveedors.excel', 'uses' => 'ProveedorController@excel']);
Route::get('proveedors/data_form', ['as' => 'proveedors.data_form', 'uses' => 'ProveedorController@data_form']);

Route::put('proveedors/createCliente/{id}', ['as' => 'proveedors.createCliente', 'uses' => 'ProveedorController@createUpdate']);


Route::get('proveedors/deleteDetalleBanco/{id}', ['as' => 'proveedors.deleteDetalleBanco', 'uses' => 'ProveedorController@deleteDetalleBanco']);


Route::post('proveedors/getTipoDocumento', 'ProveedorController@getTipoDocumento');
Route::post('proveedors/getTipoPersona', 'ProveedorController@getTipoPersona');
Route::post('proveedors/getTipoCliente', 'ProveedorController@getTipoCliente');
Route::post('proveedors/getTipoDocumentoVenta', 'ProveedorController@getTipoDocumentoVenta');
Route::get('proveedors/find/{id}', ['as' => 'proveedors.find', 'uses' => 'ProveedorController@find']);

Route::get('proveedors/get_cliente_personaCus/{id}', ['as' => 'proveedors.get_cliente_personaCus', 'uses' => 'Orden_servicioController@get_cliente_persona']);


Route::get('proveedors/TraerDepartamentos/{id}', ['as' => 'proveedors.TraerDepartamentos', 'uses' => 'UbigeoController@TraerDepartamentos']);
Route::get('proveedors/TraerProvincias/{id}', ['as' => 'proveedors.TraerProvincias', 'uses' => 'UbigeoController@TraerProvincias']);
Route::get('proveedors/TraerDistritos/{id}', ['as' => 'proveedors.TraerDistritos', 'uses' => 'UbigeoController@TraerDistritos']);

Route::post('proveedors/getDistrito', 'UbigeoController@getDistrito'); 