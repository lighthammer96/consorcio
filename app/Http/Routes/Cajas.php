<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM 
 */

Route::post('cajas/list', ['as' => 'cajas.list', 'uses' => 'CajasController@all']);
Route::post('cajas/create', ['as' => 'cajas.create', 'uses' => 'CajasController@create']);
Route::post('cajas/delete', ['as' => 'cajas.delete', 'uses' => 'CajasController@destroy']);
Route::post('cajas/update', ['as' => 'cajas.update', 'uses' => 'CajasController@update']);
Route::get('cajas/excel', ['as' => 'cajas.excel', 'uses' => 'CajasController@excel']);

Route::get('cajas/data_formDes', ['as' => 'cajas.data_formDes', 'uses' => 'DescuentoController@data_form']);


Route::get('cajas/data_formConfig', ['as' => 'cajas.data_formConfig', 'uses' => 'ConfigJerarquiaCompraController@data_form']);

Route::post('cajas/getTiendas', 'ShopController@getTiendas');

Route::put('cajas/saveCaja/{id}', ['as' => 'cajas.saveCaja', 'uses' => 'CajasController@createUpdate']);
Route::get('cajas/find/{id}', ['as' => 'cajas.find', 'uses' => 'CajasController@find']);

Route::get('cajas/data_formDes', ['as' => 'cajas.data_formDes', 'uses' => 'DescuentoController@data_form']);

Route::get('cajas/data_formConfig', ['as' => 'cajas.data_formConfig', 'uses' => 'ConfigJerarquiaCompraController@data_form']);



Route::get('cajas/deleteUsuario/{id}', ['as' => 'cajas.deleteUsuario', 'uses' => 'CajasController@deleteDetalle']);

Route::post('cajas/getAll', 'CajasController@getAll');