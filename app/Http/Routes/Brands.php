<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('brands/list', ['as' => 'brands.list', 'uses' => 'BrandController@all']);
Route::post('brands/create', ['as' => 'brands.create', 'uses' => 'BrandController@create']);
Route::post('brands/delete', ['as' => 'brands.delete', 'uses' => 'BrandController@destroy']);
Route::post('brands/update', ['as' => 'brands.update', 'uses' => 'BrandController@update']);
Route::get('brands/excel', ['as' => 'brands.excel', 'uses' => 'BrandController@excel']);