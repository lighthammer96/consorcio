<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('categoriaVehiculars/list', ['as' => 'categoriaVehiculars.list', 'uses' => 'CategoriaVehicularController@all']);
Route::post('categoriaVehiculars/create', ['as' => 'categoriaVehiculars.create', 'uses' => 'CategoriaVehicularController@create']);
Route::post('categoriaVehiculars/delete', ['as' => 'categoriaVehiculars.delete', 'uses' => 'CategoriaVehicularController@destroy']);
Route::post('categoriaVehiculars/update', ['as' => 'categoriaVehiculars.update', 'uses' => 'CategoriaVehicularController@update']);
Route::get('categoriaVehiculars/excel', ['as' => 'categoriaVehiculars.excel', 'uses' => 'CategoriaVehicularController@excel']);