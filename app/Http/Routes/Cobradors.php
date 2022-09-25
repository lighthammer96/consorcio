<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('cobradors/list', ['as' => 'cobradors.list', 'uses' => 'CobradorController@all']);
Route::post('cobradors/create', ['as' => 'cobradors.create', 'uses' => 'CobradorController@create']);
Route::post('cobradors/delete', ['as' => 'cobradors.delete', 'uses' => 'CobradorController@destroy']);
Route::post('cobradors/update', ['as' => 'cobradors.update', 'uses' => 'CobradorController@update']);
Route::get('cobradors/excel', ['as' => 'cobradors.excel', 'uses' => 'CobradorController@excel']);