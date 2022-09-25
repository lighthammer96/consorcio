<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 14/06/2017
 * Time: 09:37 AM
 */
Route::post('assignment_requirements/list', 'RequirementController@all');
Route::post('assignment_requirements/listBuyer', 'BuyerController@all');
Route::put('assignment_requirements/assign/{id}', 'AssignmentRequirementController@assign');
Route::put('assignment_requirements/reject/{id}', 'AssignmentRequirementController@reject');