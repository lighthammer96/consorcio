<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('receptions/list', ['as' => 'receptions.list', 'uses' => 'ReceptionController@all']);
Route::post('receptions/create', ['as' => 'receptions.create', 'uses' => 'ReceptionController@create']);
Route::post('receptions/delete', ['as' => 'receptions.delete', 'uses' => 'ReceptionController@destroy']);
Route::post('receptions/update', ['as' => 'receptions.update', 'uses' => 'ReceptionController@update']);
Route::get('receptions/excel', ['as' => 'receptions.excel', 'uses' => 'ReceptionController@excel']);
