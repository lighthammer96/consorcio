<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsConsolidatedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_ProyectosConsolidado', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id')->unsigned();
            $table->integer('article_id')->unsigned();
            $table->decimal('quantity_requested', 10, 2);
            $table->decimal('quantity_served', 10, 2);
            $table->decimal('price', 10, 2)->nullable();
            $table->decimal('project_balance', 10, 2)->nullable();
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->timestamps();
        });
        Artisan::call('db:seed', ['--class'=> 'ProjectConsolidatedTableSeeder']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ERP_ProyectosConsolidado');
    }
}
