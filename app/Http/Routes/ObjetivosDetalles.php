<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('objetivosDetalles/list', ['as' => 'objetivosDetalles.list', 'uses' => 'ObjetivosDetalleController@all']);
Route::post('objetivosDetalles/create', ['as' => 'objetivosDetalles.create', 'uses' => 'ObjetivosDetalleController@create']);
Route::post('objetivosDetalles/delete', ['as' => 'objetivosDetalles.delete', 'uses' => 'ObjetivosDetalleController@destroy']);
Route::post('objetivosDetalles/update', ['as' => 'objetivosDetalles.update', 'uses' => 'ObjetivosDetalleController@update']);
Route::get('objetivosDetalles/excel', ['as' => 'objetivosDetalles.excel', 'uses' => 'ObjetivosDetalleController@excel']);