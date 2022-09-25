<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('vehiculos_terceros/list', ['as' => 'vehiculos_terceros.list', 'uses' => 'Vehiculos_terceroController@all']);
Route::post('vehiculos_terceros/create', ['as' => 'vehiculos_terceros.create', 'uses' => 'Vehiculos_terceroController@create']);
Route::post('vehiculos_terceros/delete', ['as' => 'vehiculos_terceros.delete', 'uses' => 'Vehiculos_terceroController@destroy']);
Route::post('vehiculos_terceros/update', ['as' => 'vehiculos_terceros.update', 'uses' => 'Vehiculos_terceroController@update']);
Route::get('vehiculos_terceros/excel', ['as' => 'vehiculos_terceros.excel', 'uses' => 'Vehiculos_terceroController@excel']);
Route::post('vehiculos_terceros/getMarca', 'Vehiculos_terceroController@getMarca');
Route::post('vehiculos_terceros/getTipoVehiculo', 'Vehiculos_terceroController@getTipoVehiculo');
Route::post('vehiculos_terceros/getModelo/{id}', ['as' => 'vehiculos_terceros.getModelo', 'uses' => 'Vehiculos_terceroController@getModelo']);
Route::post('vehiculos_terceros/getModeloEs/{id}', ['as' => 'vehiculos_terceros.getModeloEs', 'uses' => 'Vehiculos_terceroController@getModeloEs']);

Route::put('vehiculos_terceros/createVehi/{id}', ['as' => 'vehiculos_terceros.createVehi', 'uses' => 'Vehiculos_terceroController@createUpdate']);