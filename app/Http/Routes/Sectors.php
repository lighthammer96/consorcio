<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('sectors/list', ['as' => 'sectors.list', 'uses' => 'SectorController@all']);
Route::post('sectors/create', ['as' => 'sectors.create', 'uses' => 'SectorController@create']);
Route::post('sectors/delete', ['as' => 'sectors.delete', 'uses' => 'SectorController@destroy']);
Route::post('sectors/update', ['as' => 'sectors.update', 'uses' => 'SectorController@update']);
Route::get('sectors/excel', ['as' => 'sectors.excel', 'uses' => 'SectorController@excel']); 
Route::post('sectors/getUbigeo', 'UbigeoController@getAll'); 
Route::post('sectors/getDepartamento', 'UbigeoController@getDepartamento'); 
Route::post('sectors/getProvincia', 'UbigeoController@getProvincia'); 
Route::post('sectors/getDistrito', 'UbigeoController@getDistrito'); 
Route::get('sectors/TraerDepartamentos/{id}', ['as' => 'sectors.TraerDepartamentos', 'uses' => 'UbigeoController@TraerDepartamentos']);
Route::get('sectors/TraerProvincias/{id}', ['as' => 'sectors.TraerProvincias', 'uses' => 'UbigeoController@TraerProvincias']);
Route::get('sectors/TraerDistritos/{id}', ['as' => 'sectors.TraerDistritos', 'uses' => 'UbigeoController@TraerDistritos']);
Route::put('sectors/createTienda/{id}', ['as' => 'sectors.createTienda', 'uses' => 'SectorController@createUpdate']);

Route::get('sectors/find/{id}', ['as' => 'sectors.find', 'uses' => 'SectorController@find']);