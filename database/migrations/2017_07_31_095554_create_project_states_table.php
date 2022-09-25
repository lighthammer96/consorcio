<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectStatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_ProyectoEstados', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
            $table->timestamps();
        });
        Artisan::call('db:seed', ['--class'=> 'ProjectStateTableSeeder']);

        Schema::table('ERP_Proyectos', function (Blueprint $table) {
            $table->integer('project_state_id')->unsigned()->default(1);
            $table->string('client_id')->nullable()->default(null);
            $table->date('date_start')->nullable()->default(null);
            $table->date('date_end')->nullable()->default(null);
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
            $table->dropColumn(['project_state_id', 'client_id', 'date_start', 'date_end']);
        });
        Schema::dropIfExists('ERP_ProyectoEstados');
    }
}
