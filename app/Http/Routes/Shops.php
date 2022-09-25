<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('shops/list', ['as' => 'shops.list', 'uses' => 'ShopController@all']);
Route::post('shops/create', ['as' => 'shops.create', 'uses' => 'ShopController@create']);
Route::post('shops/delete', ['as' => 'shops.delete', 'uses' => 'ShopController@destroy']);
Route::post('shops/update', ['as' => 'shops.update', 'uses' => 'ShopController@update']);
Route::get('shops/excel', ['as' => 'shops.excel', 'uses' => 'ShopController@excel']); 
Route::post('shops/getUbigeo', 'UbigeoController@getAll'); 
Route::post('shops/getDepartamento', 'UbigeoController@getDepartamento'); 
Route::post('shops/getProvincia', 'UbigeoController@getProvincia'); 
Route::post('shops/getDistrito', 'UbigeoController@getDistrito'); 
Route::get('shops/TraerDepartamentos/{id}', ['as' => 'shops.TraerDepartamentos', 'uses' => 'UbigeoController@TraerDepartamentos']);
Route::get('shops/TraerProvincias/{id}', ['as' => 'shops.TraerProvincias', 'uses' => 'UbigeoController@TraerProvincias']);
Route::get('shops/TraerDistritos/{id}', ['as' => 'shops.TraerDistritos', 'uses' => 'UbigeoController@TraerDistritos']);
Route::put('shops/createTienda/{id}', ['as' => 'shops.createTienda', 'uses' => 'ShopController@createUpdate']);
Route::get('shops/find/{id}', ['as' => 'shops.find', 'uses' => 'ShopController@find']);