<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddApuToSubprojectlevelTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_SubProyectoNiveles', function (Blueprint $table) {
            $table->integer('apu_hours_day')->unsigned()->nullable()->default(null);
            $table->decimal('apu_mo', 4, 2)->unsigned()->nullable()->default(null);
            $table->decimal('apu_eq', 4, 2)->unsigned()->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ERP_SubProyectoNiveles', function (Blueprint $table) {
            $table->dropColumn(['apu_hours_day', 'apu_mo', 'apu_eq']);
        });
    }
}
