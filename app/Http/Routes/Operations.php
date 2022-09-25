<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('operations/list', ['as' => 'operations.list', 'uses' => 'OperationController@all']);
Route::post('operations/create', ['as' => 'operations.create', 'uses' => 'OperationController@create']);
Route::post('operations/delete', ['as' => 'operations.delete', 'uses' => 'OperationController@destroy']);
Route::post('operations/update', ['as' => 'operations.update', 'uses' => 'OperationController@update']);
Route::get('operations/excel', ['as' => 'operations.excel', 'uses' => 'OperationController@excel']);

Route::post('operations/getNaturaleza', 'NaturalezaController@getAll'); 
Route::post('operations/getAll', 'OperationController@getAll'); 
Route::post('operations/listUser', ['as' => 'operations.listUser', 'uses' => 'UserController@all']);

Route::get('operations/data_form', ['as' => 'operations.data_form', 'uses' => 'NaturalezaController@data_form']); 

Route::put('operations/saveOperacion/{id}', ['as' => 'operations.saveOperacion', 'uses' => 'OperationController@createUpdate']);

Route::get('operations/find/{id}', ['as' => 'operations.find', 'uses' => 'OperationController@find']);