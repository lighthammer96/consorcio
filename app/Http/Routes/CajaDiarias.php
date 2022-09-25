<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM 
 */  

Route::post('aperturaCajas/list', ['as' => 'aperturaCajas.list', 'uses' => 'CajaDiariaController@all']);
Route::post('aperturaCajas/create', ['as' => 'aperturaCajas.create', 'uses' => 'CajaDiariaController@create']);
Route::post('aperturaCajas/delete', ['as' => 'aperturaCajas.delete', 'uses' => 'CajaDiariaController@destroy']);
Route::post('aperturaCajas/update', ['as' => 'aperturaCajas.update', 'uses' => 'CajaDiariaController@update']);
Route::get('aperturaCajas/excel', ['as' => 'aperturaCajas.excel', 'uses' => 'CajaDiariaController@excel']);

Route::get('aperturaCajas/getDenominaciones/{id}', ['as' => 'aperturaCajas.getDenominaciones', 'uses' => 'CajaDiariaController@getDenominaciones']);

Route::get('aperturaCajas/getDenominacionesView/{id}', ['as' => 'aperturaCajas.getDenominacionesView', 'uses' => 'CajaDiariaController@getDenominacionesView']);

Route::get('aperturaCajas/data_form', ['as' => 'aperturaCajas.data_form', 'uses' => 'CajaDiariaController@data_form']);

Route::put('aperturaCajas/saveCajasDiarias/{id}', ['as' => 'aperturaCajas.saveCajasDiarias', 'uses' => 'CajaDiariaController@createUpdate']);

Route::get('aperturaCajas/find/{id}', ['as' => 'aperturaCajas.find', 'uses' => 'CajaDiariaController@find']);

Route::get('aperturaCajas/data_formDesc', ['as' => 'aperturaCajas.data_formDesc', 'uses' => 'DescuentoController@data_form']);

Route::get('aperturaCajas/pdf_diarioApert', 'MovimientoCajaController@pdf_diario');

Route::post('aperturaCajas/getAllApert', 'CajasController@getAll');

Route::post('aperturaCajas/getAllApeUser', 'UserController@getAll');

Route::get('aperturaCajas/pdfdiar', 'MovimientoCajaController@pdfdiarioApert');

Route::get('aperturaCajas/Cuadrepdfdiar', 'MovimientoCajaController@pdfCuadreApert');

Route::get('aperturaCajas/EmisionComprpdfdiar', 'MovimientoCajaController@EmisionComprpdfApert');
Route::get('aperturaCajas/reporte_EmisionComprpdf/{id}', 'MovimientoCajaController@reporte_EmisionComprpdf');

// Route::get('aperturaCajas/deleteUsuario/{id}', ['as' => 'aperturaCajas.deleteUsuario', 'uses' => 'CajaDiariaController@deleteDetalle']); 