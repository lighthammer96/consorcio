<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('categories/list', ['as' => 'categories.list', 'uses' => 'CategoryController@all']);
Route::post('categories/create', ['as' => 'categories.create', 'uses' => 'CategoryController@create']);
Route::post('categories/delete', ['as' => 'categories.delete', 'uses' => 'CategoryController@destroy']);
Route::post('categories/update', ['as' => 'categories.update', 'uses' => 'CategoryController@update']);
Route::get('categories/excel', ['as' => 'categories.excel', 'uses' => 'CategoryController@excel']);