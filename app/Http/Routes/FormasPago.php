<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('formas_pago/list', ['as' => 'formas_pago.list', 'uses' => 'FormasPagoController@all']);
Route::post('formas_pago/create', ['as' => 'formas_pago.create', 'uses' => 'FormasPagoController@create']);
Route::post('formas_pago/delete', ['as' => 'formas_pago.delete', 'uses' => 'FormasPagoController@destroy']);
Route::post('formas_pago/update', ['as' => 'formas_pago.update', 'uses' => 'FormasPagoController@update']);
Route::get('formas_pago/excel', ['as' => 'formas_pago.excel', 'uses' => 'FormasPagoController@excel']);