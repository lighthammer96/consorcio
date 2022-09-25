<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('descuentos/list', ['as' => 'descuentos.list', 'uses' => 'DescuentoController@all']);
Route::post('descuentos/create', ['as' => 'descuentos.create', 'uses' => 'DescuentoController@create']);
Route::post('descuentos/delete', ['as' => 'descuentos.delete', 'uses' => 'DescuentoController@destroy']);
Route::post('descuentos/update', ['as' => 'descuentos.update', 'uses' => 'DescuentoController@update']);
Route::get('descuentos/excel', ['as' => 'descuentos.excel', 'uses' => 'DescuentoController@excel']); 
Route::get('descuentos/data_form', ['as' => 'descuentos.data_form', 'uses' => 'DescuentoController@data_form']);
Route::put('descuentos/createDescuento/{id}', ['as' => 'descuentos.createDescuento', 'uses' => 'DescuentoController@createUpdate']);
Route::get('descuentos/find/{id}', ['as' => 'descuentos.find', 'uses' => 'DescuentoController@find']);

Route::get('descuentos/deleteUsuario/{id}', ['as' => 'descuentos.deleteUsuario', 'uses' => 'DescuentoController@deleteUsuario']);
Route::get('descuentos/deleteProducto/{id}', ['as' => 'descuentos.deleteProducto', 'uses' => 'DescuentoController@deleteProducto']);

Route::get('descuentos/deleteUsuarioTotal/{id}', ['as' => 'descuentos.deleteUsuarioTotal', 'uses' => 'DescuentoController@deleteUsuarioTotal']);

Route::get('descuentos/deleteProductoTotal/{id}', ['as' => 'descuentos.deleteProductoTotal', 'uses' => 'DescuentoController@deleteProductoTotal']);

Route::get('descuentos/data_formOrde', ['as' => 'descuentos.data_formOrde', 'uses' => 'Orden_servicioController@data_form']);