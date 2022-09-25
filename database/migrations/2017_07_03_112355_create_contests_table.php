<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('ERP_CotizacionEstados', 'ERP_ConcursoEstados');
        Schema::rename('ERP_Cotizaciones', 'ERP_Concursos');

        Schema::create('ERP_ConcursoRequerimiento', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('contest_id')->unsigned();
            $table->integer('requirement_id')->unsigned();
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
        Schema::dropIfExists('ERP_ConcursoRequerimiento');

        Schema::rename('ERP_ConcursoEstados', 'ERP_CotizacionEstados');
        Schema::rename('ERP_Concursos', 'ERP_Cotizaciones');
    }
}
