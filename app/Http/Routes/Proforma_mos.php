<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('proforma_detalles/list', ['as' => 'proforma_detalles.list', 'uses' => 'Proforma_detalleController@all']);
Route::post('proforma_detalles/create', ['as' => 'proforma_detalles.create', 'uses' => 'Proforma_detalleController@create']);
Route::post('proforma_detalles/delete', ['as' => 'proforma_detalles.delete', 'uses' => 'Proforma_detalleController@destroy']);
Route::post('proforma_detalles/update', ['as' => 'proforma_detalles.update', 'uses' => 'Proforma_detalleController@update']);
Route::get('proforma_detalles/excel', ['as' => 'proforma_detalles.excel', 'uses' => 'Proforma_detalleController@excel']);