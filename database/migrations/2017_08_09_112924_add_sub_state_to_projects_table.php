<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSubStateToProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_ProyectoSubEstados', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
        });
        Artisan::call('db:seed', ['--class'=> 'ProjectSubStateTableSeeder']);

        Schema::table('ERP_Proyectos', function (Blueprint $table) {
            $table->integer('sub_state_id')->unsigned()->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ERP_Proyectos', function (Blueprint $table) {
            $table->dropColumn('sub_state_id');
        });
        Schema::dropIfExists('ERP_ProyectoSubEstados');
    }
}
