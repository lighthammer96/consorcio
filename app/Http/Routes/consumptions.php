<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 14/07/2017
 * Time: 03:50 PM
 */
Route::post('consumptions/list', ['as' => 'consumptions.list', 'uses' => 'ConsumptionController@all']);
Route::post('consumptions/listFront', ['as' => 'consumptions/listFront', 'uses' => 'FrontController@all']);
Route::post('consumptions/getProjects', 'ProjectController@all');
Route::get('consumptions/data_form', 'ReceptionTransferController@data_form')->name('consumptions.data_form');
Route::put('consumptions/saveConsumption/{id}', ['as' => 'consumptions.saveConsumption', 'uses' => 'ConsumptionController@createUpdate']);
Route::post('consumptions/getRequirement', ['as' => 'consumptions/getRequirement', 'uses' => 'RequirementController@getRequirement']);
Route::get('consumptions/find/{id}', ['as' => 'consumptions.find', 'uses' => 'ConsumptionController@find']);
Route::get('consumptions/excel', ['as' => 'consumptions.excel', 'uses' => 'ConsumptionController@excel']);