<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterConfiguracionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_Configuracion', function (Blueprint $table) {
            $table->boolean('check')->default(true);
        });
        Schema::table('ERP_Usuarios', function (Blueprint $table) {
            $table->boolean('expiration_password')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ERP_Usuarios', function (Blueprint $table) {
            $table->dropColumn(['expiration_password']);
        });
        Schema::table('ERP_Configuracion', function (Blueprint $table) {
            $table->dropColumn(['check']);
        });
    }
}
