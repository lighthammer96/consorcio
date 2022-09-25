<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('configJerarquias/list', ['as' => 'configJerarquias.list', 'uses' => 'ConfigJerarquiaController@all']);
Route::post('configJerarquias/create', ['as' => 'configJerarquias.create', 'uses' => 'ConfigJerarquiaController@create']);
Route::post('configJerarquias/delete', ['as' => 'configJerarquias.delete', 'uses' => 'ConfigJerarquiaController@destroy']);
Route::post('configJerarquias/update', ['as' => 'configJerarquias.update', 'uses' => 'ConfigJerarquiaController@update']);
Route::get('configJerarquias/excel', ['as' => 'configJerarquias.excel', 'uses' => 'ConfigJerarquiaController@excel']);
Route::get('configJerarquias/data_form', ['as' => 'configJerarquias.data_form', 'uses' => 'ConfigJerarquiaController@data_form']);

Route::put('configJerarquias/createConfigJerar/{id}', ['as' => 'configJerarquias.createConfigJerar', 'uses' => 'ConfigJerarquiaController@createUpdate']);

Route::post('shops/getTienda', 'ShopController@getTiendas');

Route::get('configJerarquias/find/{id}', ['as' => 'configJerarquias.find', 'uses' => 'ConfigJerarquiaController@find']);

Route::get('configJerarquias/deleteUsuario/{id}', ['as' => 'configJerarquias.deleteUsuario', 'uses' => 'ConfigJerarquiaController@deleteDetalle']);