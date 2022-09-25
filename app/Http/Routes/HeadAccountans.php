<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('head_accountans/list', ['as' => 'head_accountans.list', 'uses' => 'HeadAccountanController@all']);
Route::post('head_accountans/create', ['as' => 'head_accountans.create', 'uses' => 'HeadAccountanController@create']);
Route::post('head_accountans/delete', ['as' => 'head_accountans.delete', 'uses' => 'HeadAccountanController@destroy']);
Route::post('head_accountans/update', ['as' => 'head_accountans.update', 'uses' => 'HeadAccountanController@update']);
Route::get('head_accountans/excel', ['as' => 'head_accountans.excel', 'uses' => 'HeadAccountanController@excel']);
Route::get('head_accountans/data_form', ['as' => 'head_accountans.data_form', 'uses' => 'OperationController@data_form']);
Route::put('head_accountans/saveGrupoContable/{id}', ['as' => 'warehouses.saveGrupoContable', 'uses' => 'HeadAccountanController@createUpdate']);
Route::get('head_accountans/find/{id}', ['as' => 'head_accountans.find', 'uses' => 'HeadAccountanController@find']);
