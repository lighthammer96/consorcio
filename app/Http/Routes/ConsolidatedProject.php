<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 21/07/2017
 * Time: 11:36 AM
 */
Route::get('consolidated_projects/getData', 'ProjectConsolidatedController@getData');
Route::get('consolidated_projects/searchProject', 'ProjectController@search');
Route::get('consolidated_projects/generate/{id}', 'ConsolidatedProjectsController@generate');