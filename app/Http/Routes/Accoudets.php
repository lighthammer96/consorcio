<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('accoudets/list', ['as' => 'accoudets.list', 'uses' => 'AccoudetController@all']);
Route::post('accoudets/create', ['as' => 'accoudets.create', 'uses' => 'AccoudetController@create']);
Route::post('accoudets/delete', ['as' => 'accoudets.delete', 'uses' => 'AccoudetController@destroy']);
Route::post('accoudets/update', ['as' => 'accoudets.update', 'uses' => 'AccoudetController@update']);
Route::get('accoudets/excel', ['as' => 'accoudets.excel', 'uses' => 'AccoudetController@excel']);
Route::post('accoudets/getGrupoContable', 'HeadAccountanController@getAll');
Route::post('accoudets/getTipoOperacion', 'OperationController@getAll');