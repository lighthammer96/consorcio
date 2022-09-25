<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 27/06/2017
 * Time: 11:10 AM
 */
Route::post('projects/list', 'ProjectController@all');
Route::put('projects/saveProject/{id}', 'ProjectController@createUpdate');
Route::get('projects/getDataProject', 'ProjectController@getDataProject');
Route::get('projects/find/{id}', 'ProjectController@find');
Route::post('projects/clientsList', 'EntityController@clients');
Route::put('projects/saveSubProject/{id}', 'SubProjectController@createUpdate');
Route::get('projects/subProjects/{id}', 'SubProjectController@getByProject');
Route::get('projects/getSubProject/{id}', 'SubProjectController@find');
Route::delete('projects/deleteSubProject/{id}', 'SubProjectController@delete');
Route::get('projects/searchFront', 'FrontController@search');
Route::get('projects/searchMatrix', 'LevelController@search');
Route::get('projects/getLevelsSubProject/{id}', 'SubProjectController@getLevels');
Route::get('projects/getActivityMaterialSubProject', 'SubProjectController@getActivityMaterialSubProject');
Route::get('projects/getInfoActivity/{id}', 'SubProjectController@getInfoActivity');
Route::get('projects/searchAPU', 'AnalysisUnitaryPriceController@search');
Route::get('projects/getActivity/{id}', 'AnalysisUnitaryPriceController@getActivity');
Route::put('projects/saveAnalysisPriceUnitary/{id}', 'AnalysisUnitaryPriceController@createUpdate');
Route::put('projects/sendApproval/{id}', 'ProjectController@sendApproval');
Route::put('projects/saveMaterialActivityPV/{id}', 'SubProjectController@saveMaterialActivityPV');
Route::delete('projects/deleteMaterialActivityPV/{id}', 'SubProjectController@deleteMaterialActivityPV');
Route::get('projects/consolidatedMaterials/{id}', 'ProjectConsolidatedController@consolidatedMaterials');
Route::get('projects/searchGG', 'ProjectGeneralExpensesController@search');
Route::get('projects/searchTransport', 'ProjectTransportController@search');
Route::put('projects/saveGT/{id}', 'ProjectController@saveGT');
Route::put('projects/deleteGT/{id}', 'ProjectController@deleteGT');
Route::put('projects/saveAPUFront/{id}', 'APUFrontController@createUpdate');
