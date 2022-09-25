<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuotationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_CotizacionEstados', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
            $table->timestamps();
        });
        Artisan::call('db:seed', ['--class'=> 'QuotationStateSeeder']);

        Schema::create('ERP_Cotizaciones', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code')->nullable();
            $table->string('description');
            $table->string('requested_by');
            $table->integer('quotation_state_id')->unsigned();
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
        Schema::dropIfExists('ERP_Cotizaciones');
        Schema::dropIfExists('ERP_CotizacionEstados');
    }
}
