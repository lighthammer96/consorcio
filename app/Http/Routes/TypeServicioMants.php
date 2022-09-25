<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('typeServicioMants/list', ['as' => 'typeServicioMants.list', 'uses' => 'TypeServicioMantController@all']);
Route::post('typeServicioMants/create', ['as' => 'typeServicioMants.create', 'uses' => 'TypeServicioMantController@create']);
Route::post('typeServicioMants/delete', ['as' => 'typeServicioMants.delete', 'uses' => 'TypeServicioMantController@destroy']);
Route::post('typeServicioMants/update', ['as' => 'typeServicioMants.update', 'uses' => 'TypeServicioMantController@update']);
Route::get('typeServicioMants/excel', ['as' => 'typeServicioMants.excel', 'uses' => 'TypeServicioMantController@excel']);