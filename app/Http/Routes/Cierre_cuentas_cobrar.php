<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('cierre_cuentas_cobrar/list', ['as' => 'cierre_cuentas_cobrar.list', 'uses' => 'CierreCuentasCobrarController@all']);
Route::post('cierre_cuentas_cobrar/list_movimientosCerrados', ['as' => 'cierre_cuentas_cobrar.list_movimientosCerrados', 'uses' => 'CierreCuentasCobrarController@list_movimientosCerrados']);
Route::post('cierre_cuentas_cobrar/create', ['as' => 'cierre_cuentas_cobrar.create', 'uses' => 'CierreCuentasCobrarController@create']);
Route::post('cierre_cuentas_cobrar/delete', ['as' => 'cierre_cuentas_cobrar.delete', 'uses' => 'CierreCuentasCobrarController@destroy']);
Route::post('cierre_cuentas_cobrar/update', ['as' => 'cierre_cuentas_cobrar.update', 'uses' => 'CierreCuentasCobrarController@update']);
Route::get('cierre_cuentas_cobrar/excel', ['as' => 'cierre_cuentas_cobrar.excel', 'uses' => 'CierreCuentasCobrarController@excel']);

Route::get('cierre_cuentas_cobrar/excelPerido', ['as' => 'cierre_cuentas_cobrar.excelPerido', 'uses' => 'VW_CierreInventarioPeriodoController@excelPerido']);

Route::post('cierre_cuentas_cobrar/getAllOperationMovCier', 'OperationController@getAll');  

Route::post('cierre_cuentas_cobrar/getAllUserRegMov', 'UserController@getAll');

Route::get('cierre_cuentas_cobrar/data_formMoviCierre', ['as' => 'cierre_cuentas_cobrar.data_formMoviCierre', 'uses' => 'CierreCuentasCobrarController@data_form']); 

Route::get('cierre_cuentas_cobrar/getMovimientos/{id}', ['as' => 'cierre_cuentas_cobrar.getMovimientos', 'uses' => 'CierreCuentasCobrarController@getMovimientos']);

Route::put('cierre_cuentas_cobrar/saveMovimientArticuloCierre/{id}', ['as' => 'cierre_cuentas_cobrar.saveMovimientArticuloCierre', 'uses' => 'CierreCuentasCobrarController@createUpdate']);

Route::put('cierre_cuentas_cobrar/saveMovimientArticuloPreCierre/{id}', ['as' => 'cierre_cuentas_cobrar.saveMovimientArticuloPreCierre', 'uses' => 'CierreCuentasCobrarController@createUpdatePreCierre']);


Route::get('cierre_cuentas_cobrar/findMov/{id}', ['as' => 'cierre_cuentas_cobrar.findMov', 'uses' => 'CierreCuentasCobrarController@findMov']);

Route::get('cierre_cuentas_cobrar/reversarCierre/{id}', ['as' => 'cierre_cuentas_cobrar.reversarCierre', 'uses' => 'CierreCuentasCobrarController@reversarCierre']);  

Route::get('cierre_cuentas_cobrar/pdf', ['as' => 'cierre_cuentas_cobrar.pdf', 'uses' => 'CierreCuentasCobrarController@pdf']);