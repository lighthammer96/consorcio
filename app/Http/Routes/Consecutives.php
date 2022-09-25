<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('consecutives/list', ['as' => 'consecutives.list', 'uses' => 'ConsecutiveController@all']);
Route::post('consecutives/create', ['as' => 'consecutives.create', 'uses' => 'ConsecutiveController@create']);
Route::post('consecutives/delete', ['as' => 'consecutives.delete', 'uses' => 'ConsecutiveController@destroy']);
Route::post('consecutives/update', ['as' => 'consecutives.update', 'uses' => 'ConsecutiveController@update']);
Route::get('consecutives/excel', ['as' => 'consecutives.excel', 'uses' => 'ConsecutiveController@excel']);
Route::post('consecutives/getTipoConsecutivo', 'ConsecutiveController@getTipoConsecutivo');
Route::post('consecutives/getTienda', 'ConsecutiveController@getTienda');