<?php

Route::put('report_purchase_order/all/{id}', 'ReportPurchaseOrderController@generate');
Route::get('report_purchase_order/excel', 'ReportPurchaseOrderController@excel');

Route::post('report_purchase_order/listProv', 'ProveedorController@all');
Route::post('report_purchase_order/listBuyer', 'BuyerController@all');
Route::post('report_purchase_order/listCat', 'CategoryController@all');
Route::post('report_purchase_order/listProd', 'ProductController@all');