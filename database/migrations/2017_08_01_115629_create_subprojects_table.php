<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubprojectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_SubProyectos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id')->unsigned();
            $table->string('description');
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('ERP_SubProyectoNiveles', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sub_project_id')->unsigned();
            $table->integer('parent_id')->unsigned()->nullable()->default(null);
            $table->integer('level_id')->unsigned()->nullable()->default(null);
            $table->string('code')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('ERP_SubProyectoFrentes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sub_project_id')->unsigned();
            $table->integer('front_id')->unsigned();
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ERP_SubProyectoFrentes');
        Schema::dropIfExists('ERP_SubProyectoNiveles');
        Schema::dropIfExists('ERP_SubProyectos');
    }
}
