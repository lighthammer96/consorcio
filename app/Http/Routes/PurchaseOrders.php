<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 21/09/2017
 * Time: 04:13 PM
 */

Route::post('purchase_orders/list', ['as' => 'purchase_orders.list', 'uses' => 'PurchaseOrderController@all']);
Route::get('purchase_orders/data_form', ['as' => 'purchase_orders.data_form', 'uses' => 'PurchaseOrderController@data_form']);
Route::post('purchase_orders/getArticles', 'ProductController@getArticles');
Route::get('purchase_orders/find/{id}', 'PurchaseOrderController@find');
Route::put('purchase_orders/savePurchaseOrder/{id}', ['as' => 'purchase_orders.savePurchaseOrder', 'uses' => 'PurchaseOrderController@createUpdate']);
