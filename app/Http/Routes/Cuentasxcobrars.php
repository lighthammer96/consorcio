<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('cuentasxcobrars/list', ['as' => 'cuentasxcobrars.list', 'uses' => 'AsignacioncobradorController@all']);

Route::post('cuentasxcobrars/listClient', 'CustomerController@all');

Route::post('cuentasxcobrars/listcuentas', ['as' => 'cuentasxcobrars.listcuentas', 'uses' => 'AsignacioncobradorController@allCuentasxcobrar']);

Route::post('cuentasxcobrars/create', ['as' => 'cuentasxcobrars.create', 'uses' => 'AsignacioncobradorController@create']);
Route::post('cuentasxcobrars/delete', ['as' => 'cuentasxcobrars.delete', 'uses' => 'AsignacioncobradorController@destroy']);
Route::post('cuentasxcobrars/update', ['as' => 'cuentasxcobrars.update', 'uses' => 'AsignacioncobradorController@update']);
Route::get('cuentasxcobrars/excel', ['as' => 'cuentasxcobrars.excel', 'uses' => 'AsignacioncobradorController@excel']);

// Route::get('cuentasxcobrars/excelCuentasxCobrar', ['as' => 'cuentasxcobrars.excelCuentasxCobrar', 'uses' => 'AsignacioncobradorController@excelCuentasxCobrar']);

Route::get('cuentasxcobrars/excelCuentasxCobrar/{id}', 'AsignacioncobradorController@excelCuentasxCobrar');

Route::post('cuentasxcobrars/listCronogramaCuentasxCobrar', ['as' => 'cuentasxcobrars.listCronogramaCuentasxCobrar', 'uses' => 'AsignacioncobradorController@listCronogramaCuentasxCobrar']);

Route::get('cuentasxcobrars/data_form', 'CuentasCobrarController@data_form');
Route::put('cuentasxcobrars/saveCobrador/{id}', ['as' => 'cuentasxcobrars.saveCobrador', 'uses' => 'AsignacioncobradorController@createUpdate']);

Route::get('cuentasxcobrars/tarjetaCobranza', ['as' => 'cuentasxcobrars.tarjetaCobranza', 'uses' => 'AsignacioncobradorController@tarjetaCobranza']);

Route::get('cuentasxcobrars/cuentasporcobrar', ['as' => 'cuentasxcobrars.cuentasporcobrar', 'uses' => 'AsignacioncobradorController@pdf_cuentasxcobrar']);

Route::get('cuentasxcobrars/cuentasporcobrar_cierre', ['as' => 'cuentasxcobrars.cuentasporcobrar_cierre', 'uses' => 'AsignacioncobradorController@pdf_cuentasxcobrar_cierre']);

Route::get('cuentasxcobrars/TraerDepartamentosOrde/{id}', ['as' => 'cuentasxcobrars.TraerDepartamentosOrde', 'uses' => 'UbigeoController@TraerDepartamentos']);

Route::get('cuentasxcobrars/TraerProvinciasOrde/{id}', ['as' => 'cuentasxcobrars.TraerProvinciasOrde', 'uses' => 'UbigeoController@TraerProvincias']);

Route::get('cuentasxcobrars/TraerDistritosOrde/{id}', ['as' => 'cuentasxcobrars.TraerDistritosOrde', 'uses' => 'UbigeoController@TraerDistritos']);

Route::get('cuentasxcobrars/traerSectorOrd/{id}', ['as' => 'cuentasxcobrars.traerSectorOrd', 'uses' => 'UbigeoController@traerSectorli']);


Route::get('cuentasxcobrars/traerConvenios/{id}', ['as' => 'cuentasxcobrars.traerConvenios', 'uses' => 'ReporteCreditosAprobadoController@traerConvenios']);

Route::get('cuentasxcobrars/TraerDepartamentosOrde/{id}', ['as' => 'cuentasxcobrars.TraerDepartamentosOrde', 'uses' => 'UbigeoController@TraerDepartamentos']);

Route::get('cuentasxcobrars/TraerProvinciasOrde/{id}', ['as' => 'cuentasxcobrars.TraerProvinciasOrde', 'uses' => 'UbigeoController@TraerProvincias']);

Route::get('cuentasxcobrars/TraerDistritosOrde/{id}', ['as' => 'cuentasxcobrars.TraerDistritosOrde', 'uses' => 'UbigeoController@TraerDistritos']);


Route::get('cuentasxcobrars/imprimir_cronograma/{id}', 'MovimientoCajaController@imprimir_cronograma');