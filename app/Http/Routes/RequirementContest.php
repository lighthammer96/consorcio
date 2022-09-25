<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 13/07/2017
 * Time: 04:33 PM
 */
Route::post('requirements_contests/list', 'RequirementController@all');
Route::get('requirements_contests/data_form', 'RequirementController@data_form');
//Route::get('requirements_contests/getContests/{id}', 'RequirementController@getContests');
Route::get('requirements_contests/getQuotations/{id}', 'RequirementController@getQuotations');