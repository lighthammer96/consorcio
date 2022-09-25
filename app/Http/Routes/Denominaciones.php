<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('denominaciones/list', ['as' => 'denominaciones.list', 'uses' => 'DenominacionesController@all']);
Route::post('denominaciones/create', ['as' => 'denominaciones.create', 'uses' => 'DenominacionesController@create']);
Route::post('denominaciones/delete', ['as' => 'denominaciones.delete', 'uses' => 'DenominacionesController@destroy']);
Route::post('denominaciones/update', ['as' => 'denominaciones.update', 'uses' => 'DenominacionesController@update']);
Route::get('denominaciones/excel', ['as' => 'denominaciones.excel', 'uses' => 'DenominacionesController@excel']);