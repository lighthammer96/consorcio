<?php

Route::post('conformidadServicios/list', 'ConformidadServicioController@all');
Route::get('conformidadServicios/data_form', 'ConformidadServicioController@data_form');
Route::put('conformidadServicios/save/{id}', 'ConformidadServicioController@createUpdate');
Route::get('conformidadServicios/find/{id}', 'ConformidadServicioController@find');
Route::post('conformidadServicios/delete', 'ConformidadServicioController@destroy');
Route::post('conformidadServicios/listOC', 'RegisterOrdenCompraController@all');

Route::get('conformidadServicios/excel', 'ConformidadServicioController@excel');
Route::get('conformidadServicios/pdf', 'Register_movementController@pdf');

//Route::put('conformidadServicios/saveEntrega/{id}', ['as' => 'conformidadServicios.saveEntrega', 'uses' => 'Entrega_servicesTecnicoController@createUpdate']);

//Route::get('conformidadServicios/data_formRegi', ['as' => 'conformidadServicios.data_formRegi', 'uses' => 'Entrega_servicesTecnicoController@data_form']);
//Route::post('conformidadServicios/get_ventas_entrega', ['as' => 'conformidadServicios.get_ventas_entrega', 'uses' => 'Entrega_servicesTecnicoController@get_ventas_entrega']);

//Route::get('conformidadServicios/get_venta_detalle/{id}', ['as' => 'conformidadServicios.get_venta_detalle', 'uses' => 'Entrega_servicesTecnicoController@get_venta_detalle']);

//Route::get('conformidadServicios/data_formOrdenCompra', ['as' => 'conformidadServicios.data_formOrdenCompra', 'uses' => 'RegisterOrdenCompraController@getDataOrdenComprasRecepcion']);

//Route::get('conformidadServicios/deleteDetalleST/{id}', ['as' => 'conformidadServicios.deleteDetalleST', 'uses' => 'Register_movementController@deleteDetalleST']);


//Route::get('conformidadServicios/getDetalle_entradaProf/{id}', ['as' => 'conformidadServicios.getDetalle_entradaProf', 'uses' => 'ProformaController@getDetalle_entrada']);//borrar

//Route::get('conformidadServicios/getDetalle_ordenCompra/{id}', 'RegisterOrdenCompraController@getDetalle_ordenCompra');

//Route::get('conformidadServicios/pdfMovemen', 'Register_movementController@pdf');

//Route::get('conformidadServicios/findMovement/{id}', ['as' => 'conformidadServicios.findMovement', 'uses' => 'Register_movementController@find']);

//Route::get('conformidadServicios/validateLoteMovement/{id}', ['as' => 'conformidadServicios.validateLoteMovement', 'uses' => 'Register_movementController@validateLote']);


//Route::get('conformidadServicios/validaDetalleMovement/{id}', 'Register_movementController@validaDetalle');

//Route::get('conformidadServicios/procesarTransferenciaMovement/{id}', 'Register_movementController@procesarTransferencia');

//Route::get('conformidadServicios/getKitMovement/{id}', ['as' => 'conformidadServicios.getKitMovement', 'uses' => 'Register_movementController@getKit']);

//Route::get('conformidadServicios/getLocalizacionSelecMovement/{id}', ['as' => 'conformidadServicios.getLocalizacionSelecMovement', 'uses' => 'Register_movementController@getLocalizacionSelec']);


//Route::get('conformidadServicios/getLocaStockMovement/{id}', ['as' => 'conformidadServicios.getLocaStockMovement', 'uses' => 'Register_movementController@getLocaStock']);

//Route::get('conformidadServicios/valida_series_serve/{id}', ['as' => 'conformidadServicios.valida_series_serve', 'uses' => 'Register_movementController@valida_series_serve']);

//Route::post('conformidadServicios/getAllOperation', 'OperationController@getAll');

//Route::post('conformidadServicios/getAllUsers', 'UserController@getAll');

//Route::post('conformidadServicios/getArticulosSelect', ['as' => 'conformidadServicios.getArticulosSelect', 'uses' => 'ProductController@traeAll']);

//Route::post('conformidadServicios/getArticulosMinKit', ['as' => 'conformidadServicios.getArticulosMinKit', 'uses' => 'ProductController@traeAllMinKit']);

//Route::post('conformidadServicios/getProductoSerie', ['as' => 'conformidadServicios.getProductoSerie', 'uses' => 'SerieController@traerSeries']);

//Route::post('conformidadServicios/getProductoSerieStock', ['as' => 'conformidadServicios.getProductoSerieStock', 'uses' => 'SerieController@traerSeriesStock']);

//Route::get('conformidadServicios/deleteMovement/{id}', ['as' => 'conformidadServicios.deleteMovement', 'uses' => 'Register_movementController@destroy']);

//Route::get('conformidadServicios/validateCantSerieMovement/{id}', ['as' => 'conformidadServicios.validateCantSerieMovement', 'uses' => 'Register_movementController@validateCantSerie']);

// Route::put('conformidadServicios/saveMovimientoMovement/{id}', ['as' => 'conformidadServicios.saveMovimientoMovement', 'uses' => 'Register_movementController@createUpdate']);