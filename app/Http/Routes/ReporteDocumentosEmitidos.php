<?php


Route::post('reporteDocumentosEmitidos/list', ['as' => 'reporteDocumentosEmitidos.list', 'uses' => 'ReporteDocumentosEmitidosController@all']);
Route::post('reporteDocumentosEmitidos/create', ['as' => 'reporteDocumentosEmitidos.create', 'uses' => 'ReporteDocumentosEmitidosController@create']);
Route::post('reporteDocumentosEmitidos/delete', ['as' => 'reporteDocumentosEmitidos.delete', 'uses' => 'ReporteDocumentosEmitidosController@destroy']);
Route::post('reporteDocumentosEmitidos/update', ['as' => 'reporteDocumentosEmitidos.update', 'uses' => 'ReporteDocumentosEmitidosController@update']);
Route::get('reporteDocumentosEmitidos/excel', ['as' => 'reporteDocumentosEmitidos.excel', 'uses' => 'ReporteDocumentosEmitidosController@excel']);


Route::post('reporteDocumentosEmitidos/find', ['as' => 'reporteDocumentosEmitidos.find', 'uses' => 'ReporteDocumentosEmitidosController@find']);
Route::post('reporteDocumentosEmitidos/find_documento', ['as' => 'reporteDocumentosEmitidos.find_documento', 'uses' => 'ReporteDocumentosEmitidosController@find_documento']);
Route::get('reporteDocumentosEmitidos/data_form', ['as' => 'reporteDocumentosEmitidos.data_form', 'uses' => 'ReporteDocumentosEmitidosController@data_form']);

Route::post('reporteDocumentosEmitidos/guardar_venta', ['as' => 'reporteDocumentosEmitidos.guardar_venta', 'uses' => 'ReporteDocumentosEmitidosController@guardar_venta']);
Route::post('reporteDocumentosEmitidos/get_notas_devolucion', ['as' => 'reporteDocumentosEmitidos.get_notas_devolucion', 'uses' => 'ReporteDocumentosEmitidosController@get_notas_devolucion']);

Route::get('reporteDocumentosEmitidos/get_venta_detalle/{id}', ['as' => 'reporteDocumentosEmitidos.get_venta_detalle', 'uses' => 'ReporteDocumentosEmitidosController@get_venta_detalle']);

Route::get('reporteDocumentosEmitidos/anularventa/{id}', ['as' => 'reporteDocumentosEmitidos.anularventa', 'uses' => 'ReporteDocumentosEmitidosController@anularventa']);

Route::get('reporteDocumentosEmitidos/get_venta_detalle_devolucion/{id}', ['as' => 'reporteDocumentosEmitidos.get_venta_detalle_devolucion', 'uses' => 'ReporteDocumentosEmitidosController@get_venta_detalle_devolucion']);

Route::post('reporteDocumentosEmitidos/get_venta_separacion', ['as' => 'reporteDocumentosEmitidos.get_venta_separacion', 'uses' => 'ReporteDocumentosEmitidosController@get_venta_separacion']);
Route::post('reporteDocumentosEmitidos/get_venta_nota', ['as' => 'reporteDocumentosEmitidos.get_venta_nota', 'uses' => 'ReporteDocumentosEmitidosController@get_venta_nota']);
Route::post('reporteDocumentosEmitidos/validar_venta_anticipo', ['as' => 'reporteDocumentosEmitidos.validar_venta_anticipo', 'uses' => 'ReporteDocumentosEmitidosController@validar_venta_anticipo']);

Route::post('reporteDocumentosEmitidos/obtener_consecutivo_comprobante', 'ConsecutivosComprobantesController@obtener_consecutivo_comprobante');
Route::post('reporteDocumentosEmitidos/validar_ticket_pago_cuota', 'ReporteDocumentosEmitidosController@validar_ticket_pago_cuota');



Route::get('reporteDocumentosEmitidos/imprimir_ticket/{id}', 'MovimientoCajaController@imprimir_ticket');
Route::get('reporteDocumentosEmitidos/imprimir_ticket_movimiento_caja/{id}', 'MovimientoCajaController@imprimir_ticket_movimiento_caja');
Route::get('reporteDocumentosEmitidos/imprimir_ticket_pago_cuota/{id}', 'MovimientoCajaController@imprimir_ticket_pago_cuota');
Route::get('reporteDocumentosEmitidos/imprimir_ticket_pago_documento_pendiente/{id}', 'MovimientoCajaController@imprimir_ticket_pago_documento_pendiente');
Route::get('reporteDocumentosEmitidos/imprimir_comprobante/{id}', 'MovimientoCajaController@imprimir_comprobante');

Route::post('reporteDocumentosEmitidos/get_caja_diaria', 'MovimientoCajaController@get_caja_diaria');
