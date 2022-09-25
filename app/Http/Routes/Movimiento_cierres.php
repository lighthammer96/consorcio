<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('movimiento_cierres/list', ['as' => 'movimiento_cierres.list', 'uses' => 'Movimiento_cierreController@all']);
Route::post('movimiento_cierres/list_movimientosCerrados', ['as' => 'movimiento_cierres.list_movimientosCerrados', 'uses' => 'Movimiento_cierreController@list_movimientosCerrados']);
Route::post('movimiento_cierres/create', ['as' => 'movimiento_cierres.create', 'uses' => 'Movimiento_cierreController@create']);
Route::post('movimiento_cierres/delete', ['as' => 'movimiento_cierres.delete', 'uses' => 'Movimiento_cierreController@destroy']);
Route::post('movimiento_cierres/update', ['as' => 'movimiento_cierres.update', 'uses' => 'Movimiento_cierreController@update']);
Route::get('movimiento_cierres/excel', ['as' => 'movimiento_cierres.excel', 'uses' => 'Movimiento_cierreController@excel']);

Route::get('movimiento_cierres/excelPerido', ['as' => 'movimiento_cierres.excelPerido', 'uses' => 'VW_CierreInventarioPeriodoController@excelPerido']);

Route::post('movimiento_cierres/getAllOperationMovCier', 'OperationController@getAll');  

Route::post('movimiento_cierres/getAllUserRegMov', 'UserController@getAll');

Route::get('movimiento_cierres/data_formMoviCierre', ['as' => 'movimiento_cierres.data_formMoviCierre', 'uses' => 'Movimiento_cierreController@data_form']); 

Route::get('movimiento_cierres/getMovimientos/{id}', ['as' => 'movimiento_cierres.getMovimientos', 'uses' => 'Movimiento_cierreController@getMovimientos']);

Route::put('movimiento_cierres/saveMovimientArticuloCierre/{id}', ['as' => 'movimiento_cierres.saveMovimientArticuloCierre', 'uses' => 'Movimiento_cierreController@createUpdate']);

Route::put('movimiento_cierres/saveMovimientArticuloPreCierre/{id}', ['as' => 'movimiento_cierres.saveMovimientArticuloPreCierre', 'uses' => 'Movimiento_cierreController@createUpdatePreCierre']);


Route::get('movimiento_cierres/findMov/{id}', ['as' => 'movimiento_cierres.findMov', 'uses' => 'Movimiento_cierreController@findMov']);

Route::get('movimiento_cierres/reversarCierre/{id}', ['as' => 'movimiento_cierres.reversarCierre', 'uses' => 'Movimiento_cierreController@reversarCierre']);  

Route::get('movimiento_cierres/pdf', ['as' => 'movimiento_cierres.pdf', 'uses' => 'Movimiento_cierreController@pdf']);