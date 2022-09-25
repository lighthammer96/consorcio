<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('type_change/list', ['as' => 'type_change.list', 'uses' => 'TypeChangeController@all']);
Route::post('type_change/create', ['as' => 'type_change.create', 'uses' => 'TypeChangeController@create']);
Route::post('type_change/delete', ['as' => 'type_change.delete', 'uses' => 'TypeChangeController@destroy']);
Route::post('type_change/update', ['as' => 'type_change.update', 'uses' => 'TypeChangeController@update']);
Route::get('type_change/excel', ['as' => 'type_change.excel', 'uses' => 'TypeChangeController@excel']);
Route::post('type_change/getMonedas', 'CurrencyController@getAll');
