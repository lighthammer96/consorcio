<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 14/07/2017
 * Time: 03:50 PM
 */
Route::post('consumer_returns/list', ['as' => 'consumer_returns.list', 'uses' => 'ConsumerReturnController@all']);
Route::post('consumer_returns/listFront', ['as' => 'consumer_returns/listFront', 'uses' => 'FrontController@all']);
Route::post('consumer_returns/getProjects', 'ProjectController@all');
Route::post('consumer_returns/getArticlesWithWithoutProject', 'ProductController@getArticlesWithWithoutProject');
Route::get('consumer_returns/data_form', 'ConsumerReturnController@data_form')->name('consumer_returns.data_form');
Route::put('consumer_returns/saveConsumerReturn/{id}', ['as' => 'consumer_returns.saveConsumerReturn', 'uses' => 'ConsumerReturnController@createUpdate']);
Route::get('consumer_returns/find/{id}', ['as' => 'consumer_returns.find', 'uses' => 'ConsumerReturnController@find']);
Route::get('consumer_returns/excel', ['as' => 'consumer_returns.excel', 'uses' => 'ConsumerReturnController@excel']);


Route::post('consumer_returns/getRequirement', ['as' => 'consumer_returns/getRequirement', 'uses' => 'RequirementController@getRequirement']);