<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('subfamilies/list', ['as' => 'subfamilies.list', 'uses' => 'SubFamilyController@all']);
Route::post('subfamilies/create', ['as' => 'subfamilies.create', 'uses' => 'SubFamilyController@create']);
Route::post('subfamilies/delete', ['as' => 'subfamilies.delete', 'uses' => 'SubFamilyController@destroy']);
Route::post('subfamilies/update', ['as' => 'subfamilies.update', 'uses' => 'SubFamilyController@update']);
Route::get('subfamilies/excel', ['as' => 'subfamilies.excel', 'uses' => 'SubFamilyController@excel']);
Route::post('subfamilies/getFamilies', 'FamilyController@getAll');