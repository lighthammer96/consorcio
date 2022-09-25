<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('advisers/list', ['as' => 'advisers.list', 'uses' => 'AdviserController@all']);
Route::post('advisers/create', ['as' => 'advisers.create', 'uses' => 'AdviserController@create']);
Route::post('advisers/delete', ['as' => 'advisers.delete', 'uses' => 'AdviserController@destroy']);
Route::post('advisers/update', ['as' => 'advisers.update', 'uses' => 'AdviserController@update']);
Route::get('advisers/excel', ['as' => 'advisers.excel', 'uses' => 'AdviserController@excel']);