<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRequirementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_RequerimientoEstados', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
            $table->timestamps();
        });
        Artisan::call('db:seed', ['--class'=> 'RequirementStateSeeder']);

        Schema::create('ERP_RequerimientoLineaEstados', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
            $table->timestamps();
        });
        Artisan::call('db:seed', ['--class'=> 'RequirementLineStateSeeder']);

        Schema::create('ERP_Requerimientos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code');
            $table->dateTime('date_registration');
            $table->dateTime('date_required')->nullable()->default(null);
            $table->integer('project_id')->unsigned();
            $table->integer('requirement_state_id')->unsigned();
            $table->integer('requirement_line_state_id')->unsigned();
            $table->string('requested_by');
            $table->integer('approved_by')->unsigned();
            $table->text('observation');
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
        Schema::dropIfExists('ERP_Requerimientos');
        Schema::dropIfExists('ERP_RequerimientoLineaEstados');
        Schema::dropIfExists('ERP_RequerimientoEstados');
    }
}
