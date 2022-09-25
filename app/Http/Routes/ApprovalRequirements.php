<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 14/06/2017
 * Time: 05:07 PM
 */
Route::post('approval_requirements/list', 'RequirementController@all');
Route::get('approval_requirements/find/{id}', 'RequirementController@find');
Route::put('approval_requirements/approveRequirement/{id}', 'ApprovalRequirementController@approveRequirement');
Route::put('approval_requirements/rejectRequirement/{id}', 'ApprovalRequirementController@rejectRequirement');
Route::get('approval_requirements/excel', 'ApprovpalRequirementController@excel');