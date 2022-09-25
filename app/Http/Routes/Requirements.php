<?php
/**
 * Created by PhpStorm.
 * User: Jair
 * Date: 08/06/2017
 * Time: 11:50 AM
 */
Route::post('requirements/list', 'RequirementController@all');
Route::put('requirements/saveRequirement/{id}', 'RequirementController@createUpdate');
Route::get('requirements/find/{id}', 'RequirementController@find');
Route::post('requirements/delete', 'RequirementController@destroy');
Route::get('requirements/data_form', 'RequirementController@data_form');
Route::post('requirements/getProjects', 'ProjectController@all');
Route::post('requirements/getArticlesProject', 'ProjectConsolidatedController@getArticlesProject');
Route::get('requirements/getMatrix/{id}', 'ProjectConsolidatedController@getMatrix');
Route::put('requirements/sendApproval/{id}', 'RequirementController@sendApproval');
Route::put('requirements/cancelRequirement/{id}', 'RequirementController@cancelRequirement');
Route::get('requirements/excel', 'RequirementController@excel');