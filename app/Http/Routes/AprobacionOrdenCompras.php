<?php
 
Route::post('aprobacionOrdenCompras/list', 'AprobacionOrdenCompraController@all');
Route::get('aprobacionOrdenCompras/find/{id}', 'RegisterOrdenCompraController@find');
Route::put('aprobacionOrdenCompras/updateCommentApproval/{id}', 'AprobacionOrdenCompraController@updateCommentApproval');
Route::get('aprobacionOrdenCompras/getApprovers/{id}', 'AprobacionOrdenCompraController@getApprovers');
Route::put('aprobacionOrdenCompras/approvalReject/{id}', 'AprobacionOrdenCompraController@approvalReject');
