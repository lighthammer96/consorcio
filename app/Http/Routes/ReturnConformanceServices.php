<?php

Route::post('return_conformance_services/list', 'ReturnConformanceServicesController@all');
Route::get('return_conformance_services/data_form', 'ReturnConformanceServicesController@data_form');
Route::put('return_conformance_services/save/{id}', 'ReturnConformanceServicesController@createUpdate');
Route::get('return_conformance_services/find/{id}', 'ReturnConformanceServicesController@find');
Route::post('return_conformance_services/listC', 'ConformidadServicioController@all');
Route::post('return_conformance_services/delete', 'ReturnConformanceServicesController@destroy');
Route::get('return_conformance_services/pdf', 'Register_movementController@pdf');