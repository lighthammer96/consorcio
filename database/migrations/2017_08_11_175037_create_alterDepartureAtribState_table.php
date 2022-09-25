<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlterDepartureAtribStateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_Salida', function (Blueprint $table) {
            $table->string('code_departure')->nullable()->default('');
            $table->string('state_description')->nullable()->default('');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ERP_Salida', function (Blueprint $table) {
            $table->dropColumn(['code_departure']);
            $table->dropColumn(['state_description']);
        });
    }
}
