<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/7/2017
 * Time: 12:02 PM
 */
Route::get('resources/getLevels', ['as' => 'resources.getLevels', 'uses' => 'LevelController@getLevels']);
Route::get('resources/getProductsLevel/{id}', ['as' => 'resources.getProductsLevel', 'uses' => 'LevelController@getProductsLevel']);
Route::get('resources/getProduct/{id}', ['as' => 'resources.getProduct', 'uses' => 'ProductController@info']);
Route::put('resources/associate/{id}', ['as' => 'resources.associate', 'uses' => 'LevelController@associate']);
Route::put('resources/disassociate/{id}', ['as' => 'resources.disassociate', 'uses' => 'LevelController@disassociate']);
Route::post('resources/getProductsSM', ['as' => 'resources.getProductsSM', 'uses' => 'ProductController@getProductsSM']);
