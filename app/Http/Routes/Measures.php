<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('measures/list', ['as' => 'measures.list', 'uses' => 'MeasureController@all']);
Route::post('measures/create', ['as' => 'measures.create', 'uses' => 'MeasureController@create']);
Route::post('measures/delete', ['as' => 'measures.delete', 'uses' => 'MeasureController@destroy']);
Route::post('measures/update', ['as' => 'measures.update', 'uses' => 'MeasureController@update']);
Route::get('measures/excel', ['as' => 'measures.excel', 'uses' => 'MeasureController@excel']); 