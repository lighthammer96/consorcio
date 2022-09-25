<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 12:59 PM
 */

Route::post('articles/list', ['as' => 'articles.list', 'uses' => 'ProductController@all']);
Route::put('articles/saveProduct/{id}', ['as' => 'articles.saveProduct', 'uses' => 'ProductController@createUpdate']);
Route::get('articles/find/{id}', ['as' => 'articles.find', 'uses' => 'ProductController@find']);
Route::post('articles/delete', ['as' => 'articles.delete', 'uses' => 'ProductController@destroy']);
Route::get('articles/data_form', ['as' => 'articles.data_form', 'uses' => 'ProductController@data_form']);
Route::post('articles/getCC', ['as' => 'articles.getCC', 'uses' => 'PlanAccountController@all']);
Route::post('articles/getType', ['as' => 'articles.getType', 'uses' => 'TypeController@getAll']);
Route::post('articles/getLevel', ['as' => 'articles.getLevel', 'uses' => 'LevelController@getAll']);
Route::post('articles/getBrands', ['as' => 'articles.getBrands', 'uses' => 'BrandController@all']);
Route::get('articles/excel', ['as' => 'articles.excel', 'uses' => 'ProductController@excel']);
Route::post('articles/upload', ['as' => 'articles.upload', 'uses' => 'ProductController@upload']);
Route::get('articles/TraerModelos/{id}', ['as' => 'articles.TraerModelos', 'uses' => 'ModeloController@TraerModelos']);
Route::get('articles/TraerSubFamilia/{id}', ['as' => 'articles.TraerSubFamilia', 'uses' => 'SubFamilyController@TraerSubFamilia']);
Route::post('articles/getArticulosSelect', ['as' => 'articles.getArticulosSelect', 'uses' => 'ProductController@traeAll_kit']);

Route::post('articles/get_articles_precios', ['as' => 'articles.get_articles_precios', 'uses' => 'ProductController@getProductoPrecios']);

Route::post('articles/getProductosServicio', ['as' => 'articles.getProductosServicio', 'uses' => 'ProductController@traeAll_Servicios']);

Route::post('articles/obtener_precio', ['as' => 'articles.obtener_precio', 'uses' => 'ProductController@obtener_precio']);
