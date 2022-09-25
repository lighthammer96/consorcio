<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/6/2017
 * Time: 9:54 AM
 */

Route::post('fronts/list', ['as' => 'fronts.list', 'uses' => 'FrontController@all']);
Route::put('fronts/saveFront/{id}', ['as' => 'fronts.saveFront', 'uses' => 'FrontController@createUpdate']);
Route::get('fronts/find/{id}', ['as' => 'fronts.find', 'uses' => 'FrontController@find']);
Route::post('fronts/delete', ['as' => 'fronts.delete', 'uses' => 'FrontController@destroy']);
Route::post('fronts/update', ['as' => 'fronts.update', 'uses' => 'FrontController@update']);
Route::post('fronts/listClient', ['as' => 'fronts/listClient', 'uses' => 'EntityController@all']);
Route::get('fronts/excel', ['as' => 'fronts.excel', 'uses' => 'FrontController@excel']);


