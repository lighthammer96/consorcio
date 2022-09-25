<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 22/08/2017
 * Time: 06:04 PM
 */
Route::post('project_approval/list', 'ProjectApprovalController@all');
Route::get('project_approval/getDataProject', 'ProjectApprovalController@getDataProject');
Route::get('project_approval/find/{id}', 'ProjectController@find');
Route::get('project_approval/getSubProject/{id}', 'SubProjectController@find');
Route::get('project_approval/getLevelsSubProject/{id}', 'SubProjectController@getLevels');
Route::get('project_approval/getActivityMaterialSubProject', 'SubProjectController@getActivityMaterialSubProject');
Route::get('project_approval/getInfoActivity/{id}', 'SubProjectController@getInfoActivity');
Route::get('project_approval/getActivity/{id}', 'AnalysisUnitaryPriceController@getActivity');
Route::put('project_approval/approval/{id}', 'ProjectApprovalController@approval');
Route::put('project_approval/reject/{id}', 'ProjectApprovalController@reject');
Route::get('project_approval/consolidatedMaterials/{id}', 'ProjectConsolidatedController@consolidatedMaterials');