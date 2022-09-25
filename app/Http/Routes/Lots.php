<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('lots/list', ['as' => 'lots.list', 'uses' => 'LotController@all']);
Route::post('lots/create', ['as' => 'lots.create', 'uses' => 'LotController@create']);
Route::post('lots/delete', ['as' => 'lots.delete', 'uses' => 'LotController@destroy']);
Route::post('lots/update', ['as' => 'lots.update', 'uses' => 'LotController@update']);
Route::get('lots/excel', ['as' => 'lots.excel', 'uses' => 'LotController@excel']);
Route::post('lots/getArticulos', 'ProductController@getAll'); 
Route::post('lots/getArticulosLote', ['as' => 'lots.getArticulosLote', 'uses' => 'ProductController@traeAllLote']);
Route::post('lots/getCC', ['as' => 'lots.getCC', 'uses' => 'PlanAccountController@all']); 
Route::put('lots/createLote/{id}', ['as' => 'lots.createLote', 'uses' => 'LotController@createUpdate']);
Route::get('lots/find/{id}', ['as' => 'lots.find', 'uses' => 'LotController@find']);
 
