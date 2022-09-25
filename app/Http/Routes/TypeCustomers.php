<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('typeCustomers/list', ['as' => 'typeCustomers.list', 'uses' => 'TypeCostumerController@all']);
Route::post('typeCustomers/create', ['as' => 'typeCustomers.create', 'uses' => 'TypeCostumerController@create']);
Route::post('typeCustomers/delete', ['as' => 'typeCustomers.delete', 'uses' => 'TypeCostumerController@destroy']);
Route::post('typeCustomers/update', ['as' => 'typeCustomers.update', 'uses' => 'TypeCostumerController@update']);
Route::get('typeCustomers/excel', ['as' => 'typeCustomers.excel', 'uses' => 'TypeCostumerController@excel']);