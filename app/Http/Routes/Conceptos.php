<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('conceptos/list', ['as' => 'conceptos.list', 'uses' => 'ConceptosController@all']);
Route::post('conceptos/create', ['as' => 'conceptos.create', 'uses' => 'ConceptosController@create']);
Route::post('conceptos/delete', ['as' => 'conceptos.delete', 'uses' => 'ConceptosController@destroy']);
Route::post('conceptos/update', ['as' => 'conceptos.update', 'uses' => 'ConceptosController@update']);
Route::get('conceptos/excel', ['as' => 'conceptos.excel', 'uses' => 'ConceptosController@excel']);