<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsToProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_Proyectos', function (Blueprint $table) {
            $table->integer('cost_load')->unsigned()->default(1);
            $table->decimal('gg_direct', 5, 2)->nullable()->default(null);
            $table->decimal('gg_indirect', 5, 2)->nullable()->default(null);
            $table->decimal('transport', 5, 2)->nullable()->default(null);
            $table->decimal('utils', 5, 2)->nullable()->default(null);
            $table->integer('days')->unsigned()->nullable()->default(null);
            $table->decimal('total', 18, 2)->nullable()->default(null);
            $table->string('code')->nullable()->default(null)->change();
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
            $table->dropColumn(['cost_load', 'gg_direct', 'gg_indirect', 'transport', 'utils', 'days', 'total']);
        });
    }
}
