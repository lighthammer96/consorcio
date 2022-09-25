<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 09/06/2017
 * Time: 03:21 PM
 */
Route::post('approval_autonomy/listUser', ['as' => 'approval_autonomy.listUser', 'uses' => 'UserController@all']);
Route::put('approval_autonomy/saveApproval_autonomy/{id}', ['as' => 'approval_autonomy.saveApproval_autonomy', 'uses' => 'ApprovalAutonomyController@createUpdate']);
Route::get('approval_autonomy/data_grid', ['as' => 'approval_autonomy.data_grid', 'uses' => 'ApprovalAutonomyController@data_grid']);