<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('Proforma_detalles/list', ['as' => 'Proforma_detalles.list', 'uses' => 'Proforma_detalleController@all']);
Route::post('Proforma_detalles/create', ['as' => 'Proforma_detalles.create', 'uses' => 'Proforma_detalleController@create']);
Route::post('Proforma_detalles/delete', ['as' => 'Proforma_detalles.delete', 'uses' => 'Proforma_detalleController@destroy']);
Route::post('Proforma_detalles/update', ['as' => 'Proforma_detalles.update', 'uses' => 'Proforma_detalleController@update']);
Route::get('Proforma_detalles/excel', ['as' => 'Proforma_detalles.excel', 'uses' => 'Proforma_detalleController@excel']);