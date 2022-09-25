<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('generation_remisions/list', ['as' => 'generation_remisions.list', 'uses' => 'Generation_remisionController@all']);
Route::post('generation_remisions/create', ['as' => 'generation_remisions.create', 'uses' => 'Generation_remisionController@create']);
Route::post('generation_remisions/delete', ['as' => 'generation_remisions.delete', 'uses' => 'Generation_remisionController@destroy']);
Route::post('generation_remisions/update', ['as' => 'generation_remisions.update', 'uses' => 'Generation_remisionController@update']);
Route::get('generation_remisions/excel', ['as' => 'generation_remisions.excel', 'uses' => 'Generation_remisionController@excel']);