<?php

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 21/08/2017
 * Time: 04:49 PM
 */
Route::post('approvers_projects/list', 'ProjectController@all');
Route::get('approvers_projects/getDataProject', 'ApproverProjectController@getDataProject');
Route::get('approvers_projects/project/{id}', 'ApproverProjectController@project');
Route::put('approvers_projects/save/{id}', 'ApproverProjectController@createUpdate');