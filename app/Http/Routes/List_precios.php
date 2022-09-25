<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('list_precios/list', ['as' => 'list_precios.list', 'uses' => 'List_precioController@all']);
Route::post('list_precios/create', ['as' => 'list_precios.create', 'uses' => 'List_precioController@create']);
// Route::post('list_precios/delete', ['as' => 'list_precios.delete', 'uses' => 'List_precioController@destroy']);
Route::post('list_precios/update', ['as' => 'list_precios.update', 'uses' => 'List_precioController@update']);
Route::get('list_precios/excel', ['as' => 'list_precios.excel', 'uses' => 'List_precioController@excel']);
Route::put('list_precios/savePrecios/{id}', ['as' => 'warehouses.savePrecios', 'uses' => 'List_precioController@createUpdate']);
Route::get('list_precios/find/{id}', ['as' => 'list_precios.find', 'uses' => 'List_precioController@find']);
Route::get('list_precios/aprobarPrecio/{id}', ['as' => 'list_precios.aprobarPrecio', 'uses' => 'List_precioController@aprobarPrecio']);

Route::get('list_precios/DesaprobarPrecio/{id}', ['as' => 'list_precios.DesaprobarPrecio', 'uses' => 'List_precioController@DesaprobarPrecio']);

Route::get('list_precios/data_formCus', ['as' => 'list_precios.data_formCus', 'uses' => 'CustomerController@data_form']);


Route::get('list_precios/delete/{id}', ['as' => 'list_precios.delete', 'uses' => 'List_precioController@destroy']);

Route::get('list_precios/data_formOrde', ['as' => 'list_precios.data_formOrde', 'uses' => 'Orden_servicioController@data_form']);

Route::post('list_precios/getProductosServicio', ['as' => 'list_precios.getProductosServicio', 'uses' => 'ProductController@traeAll_Servicios']);

Route::post('list_precios/getTipoCliente', 'CustomerController@getTipoCliente');

Route::post('list_precios/getMonedas', 'CurrencyController@getAll');