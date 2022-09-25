<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */
 
Route::post('configJerarquiaCompras/list', ['as' => 'configJerarquiaCompras.list', 'uses' => 'ConfigJerarquiaCompraController@all']);
Route::post('configJerarquiaCompras/create', ['as' => 'configJerarquiaCompras.create', 'uses' => 'ConfigJerarquiaCompraController@create']);
Route::post('configJerarquiaCompras/delete', ['as' => 'configJerarquiaCompras.delete', 'uses' => 'ConfigJerarquiaCompraController@destroy']);
Route::post('configJerarquiaCompras/update', ['as' => 'configJerarquiaCompras.update', 'uses' => 'ConfigJerarquiaCompraController@update']);
Route::get('configJerarquiaCompras/excel', ['as' => 'configJerarquiaCompras.excel', 'uses' => 'ConfigJerarquiaCompraController@excel']);
Route::get('configJerarquiaCompras/data_form', ['as' => 'configJerarquiaCompras.data_form', 'uses' => 'ConfigJerarquiaCompraController@data_form']);

Route::put('configJerarquiaCompras/createConfigJerar/{id}', ['as' => 'configJerarquiaCompras.createConfigJerar', 'uses' => 'ConfigJerarquiaCompraController@createUpdate']);

Route::post('configJerarquiaCompras/getAreaComfig', 'ConfigJerarquiaCompraController@getArea');

Route::post('configJerarquiaCompras/getTiendaConfig', 'ShopController@getTiendas');

Route::get('configJerarquiaCompras/find/{id}', ['as' => 'configJerarquiaCompras.find', 'uses' => 'ConfigJerarquiaCompraController@find']);

Route::get('configJerarquiaCompras/deleteUsuario/{id}', ['as' => 'configJerarquiaCompras.deleteUsuario', 'uses' => 'ConfigJerarquiaCompraController@deleteDetalle']);


Route::get('configJerarquiaCompras/data_formDesc', ['as' => 'configJerarquiaCompras.data_formDesc', 'uses' => 'DescuentoController@data_form']);


Route::post('configJerarquiaCompras/getMonedas', 'CurrencyController@getAll');