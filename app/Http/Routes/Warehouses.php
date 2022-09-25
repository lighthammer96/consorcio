<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('warehouses/list', ['as' => 'warehouses.list', 'uses' => 'WarehouseController@all']);
Route::post('warehouses/create', ['as' => 'warehouses.create', 'uses' => 'WarehouseController@create']);
Route::put('warehouses/saveWarehouse/{id}', ['as' => 'warehouses.saveWarehouse', 'uses' => 'WarehouseController@createUpdate']);
Route::get('warehouses/find/{id}', ['as' => 'warehouses.find', 'uses' => 'WarehouseController@find']);
Route::post('warehouses/delete', ['as' => 'warehouses.delete', 'uses' => 'WarehouseController@destroy']);
Route::post('warehouses/update', ['as' => 'warehouses.update', 'uses' => 'WarehouseController@update']);
Route::get('warehouses/excel', ['as' => 'warehouses.excel', 'uses' => 'WarehouseController@excel']);
Route::get('warehouses/pdf', ['as' => 'warehouses.pdf', 'uses' => 'EntityController@pdf']);
Route::get('warehouses/data_form', ['as' => 'warehouses.data_form', 'uses' => 'WarehouseController@data_form']);
Route::post('warehouses/listUser', ['as' => 'warehouses.listUser', 'uses' => 'UserController@all']);
Route::post('warehouses/getTiendasSelec', ['as' => 'warehouses.getTiendasSelec', 'uses' => 'ShopController@getall']);
