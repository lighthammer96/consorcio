<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('maintenances/list', ['as' => 'maintenances.list', 'uses' => 'MaintenanceController@all']);
Route::post('maintenances/create', ['as' => 'maintenances.create', 'uses' => 'MaintenanceController@create']);
Route::post('maintenances/delete', ['as' => 'maintenances.delete', 'uses' => 'MaintenanceController@destroy']);
Route::post('maintenances/update', ['as' => 'maintenances.update', 'uses' => 'MaintenanceController@update']);
Route::get('maintenances/excel', ['as' => 'maintenances.excel', 'uses' => 'MaintenanceController@excel']);