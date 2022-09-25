<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('motivos/list', ['as' => 'motivos.list', 'uses' => 'MotivosController@all']);
Route::post('motivos/create', ['as' => 'motivos.create', 'uses' => 'MotivosController@create']);
Route::post('motivos/delete', ['as' => 'motivos.delete', 'uses' => 'MotivosController@destroy']);
Route::post('motivos/update', ['as' => 'motivos.update', 'uses' => 'MotivosController@update']);
Route::get('motivos/excel', ['as' => 'motivos.excel', 'uses' => 'MotivosController@excel']);