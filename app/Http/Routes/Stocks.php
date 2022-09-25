<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 18/08/2017
 * Time: 11:37 AM
 */
Route::post('stocks/list', ['as' => 'stocks.list', 'uses' => 'StockController@all']);
Route::get('stocks/excel', ['as' => 'stocks.excel', 'uses' => 'StockController@excel']);
Route::post('stocks/listWarehouse', ['as' => 'stocks.listWarehouse', 'uses' => 'WarehouseController@all']);

Route::post('stocks/create', ['as' => 'warehouses.create', 'uses' => 'WarehouseController@create']);
Route::put('stocks/saveWarehouse/{id}', ['as' => 'warehouses.saveWarehouse', 'uses' => 'WarehouseController@createUpdate']);
Route::get('stocks/find/{id}', ['as' => 'warehouses.find', 'uses' => 'WarehouseController@find']);
Route::post('stocks/delete', ['as' => 'warehouses.delete', 'uses' => 'WarehouseController@destroy']);
Route::post('stocks/update', ['as' => 'warehouses.update', 'uses' => 'WarehouseController@update']);
Route::get('stocks/pdf', ['as' => 'warehouses.pdf', 'uses' => 'EntityController@pdf']);
Route::get('stocks/data_form', ['as' => 'warehouses.data_form', 'uses' => 'WarehouseController@data_form']);

