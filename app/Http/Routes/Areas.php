<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('areas/list', ['as' => 'areas.list', 'uses' => 'AreaController@all']);
Route::post('areas/create', ['as' => 'areas.create', 'uses' => 'AreaController@create']);
Route::post('areas/delete', ['as' => 'areas.delete', 'uses' => 'AreaController@destroy']);
Route::post('areas/update', ['as' => 'areas.update', 'uses' => 'AreaController@update']);
Route::get('areas/excel', ['as' => 'areas.excel', 'uses' => 'AreaController@excel']);