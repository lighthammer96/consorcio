<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('modelos/list', ['as' => 'modelos.list', 'uses' => 'ModeloController@all']);
Route::post('modelos/create', ['as' => 'modelos.create', 'uses' => 'ModeloController@create']);
Route::post('modelos/delete', ['as' => 'modelos.delete', 'uses' => 'ModeloController@destroy']);
Route::post('modelos/update', ['as' => 'modelos.update', 'uses' => 'ModeloController@update']);
Route::get('modelos/excel', ['as' => 'modelos.excel', 'uses' => 'ModeloController@excel']);
Route::post('modelos/getMarca', 'BrandController@getAll');