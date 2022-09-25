<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApproveProjectDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_ProyectoAprobadoresDetalle', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id')->unsigned();
            $table->integer('approver_project_id')->unsigned();
            $table->integer('sub_state_id')->unsigned();
            $table->timestamps();
        });
        Artisan::call('db:seed', ['--class'=> 'ProjectSubStateTableSeeder']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ERP_ProyectoAprobadoresDetalle');
    }
}
