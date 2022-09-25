<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('families/list', ['as' => 'families.list', 'uses' => 'FamilyController@all']);
Route::post('families/create', ['as' => 'families.create', 'uses' => 'FamilyController@create']);
Route::post('families/delete', ['as' => 'families.delete', 'uses' => 'FamilyController@destroy']);
Route::post('families/update', ['as' => 'families.update', 'uses' => 'FamilyController@update']);
Route::get('families/excel', ['as' => 'families.excel', 'uses' => 'FamilyController@excel']);