<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('cancelarCerrarOcs/list', ['as' => 'cancelarCerrarOcs.list', 'uses' => 'CancelarCerrarOcController@all']);
Route::post('cancelarCerrarOcs/create', ['as' => 'cancelarCerrarOcs.create', 'uses' => 'CancelarCerrarOcController@create']);
Route::post('cancelarCerrarOcs/delete', ['as' => 'cancelarCerrarOcs.delete', 'uses' => 'CancelarCerrarOcController@destroy']);
Route::post('cancelarCerrarOcs/update', ['as' => 'cancelarCerrarOcs.update', 'uses' => 'CancelarCerrarOcController@update']);
Route::get('cancelarCerrarOcs/excel', ['as' => 'cancelarCerrarOcs.excel', 'uses' => 'CancelarCerrarOcController@excel']);

Route::put('cancelarCerrarOcs/cambiarEstadoParcial/{id}', ['as' => 'cancelarCerrarOcs.cambiarEstadoParcial', 'uses' => 'RegisterOrdenCompraController@cambiarEstado']);