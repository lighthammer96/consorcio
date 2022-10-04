<?php


Route::post('reporteDocumentosEmitidos/list', ['as' => 'reporteDocumentosEmitidos.list', 'uses' => 'ReporteDocumentosEmitidosController@all']);
Route::post('reporteDocumentosEmitidos/create', ['as' => 'reporteDocumentosEmitidos.create', 'uses' => 'ReporteDocumentosEmitidosController@create']);
Route::post('reporteDocumentosEmitidos/delete', ['as' => 'reporteDocumentosEmitidos.delete', 'uses' => 'ReporteDocumentosEmitidosController@destroy']);
Route::post('reporteDocumentosEmitidos/update', ['as' => 'reporteDocumentosEmitidos.update', 'uses' => 'ReporteDocumentosEmitidosController@update']);
Route::get('reporteDocumentosEmitidos/excel', ['as' => 'reporteDocumentosEmitidos.excel', 'uses' => 'ReporteDocumentosEmitidosController@excel']);

Route::get('reporteDocumentosEmitidos/data_form', ['as' => 'reporteDocumentosEmitidos.data_form', 'uses' => 'ReporteDocumentosEmitidosController@data_form']);
