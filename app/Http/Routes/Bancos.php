<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('bancos/list', ['as' => 'bancos.list', 'uses' => 'BancosController@all']);
Route::post('bancos/create', ['as' => 'bancos.create', 'uses' => 'BancosController@create']);
Route::post('bancos/delete', ['as' => 'bancos.delete', 'uses' => 'BancosController@destroy']);
Route::post('bancos/update', ['as' => 'bancos.update', 'uses' => 'BancosController@update']);
Route::get('bancos/excel', ['as' => 'bancos.excel', 'uses' => 'BancosController@excel']);