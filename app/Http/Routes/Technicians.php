<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('technicians/list', ['as' => 'technicians.list', 'uses' => 'TechnicianController@all']);
Route::post('technicians/create', ['as' => 'technicians.create', 'uses' => 'TechnicianController@create']);
Route::post('technicians/delete', ['as' => 'technicians.delete', 'uses' => 'TechnicianController@destroy']);
Route::post('technicians/update', ['as' => 'technicians.update', 'uses' => 'TechnicianController@update']);
Route::get('technicians/excel', ['as' => 'technicians.excel', 'uses' => 'TechnicianController@excel']);