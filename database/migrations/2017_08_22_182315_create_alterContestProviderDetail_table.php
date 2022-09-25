<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlterContestProviderDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_ConcursoProveedorDetalle', function (Blueprint $table) {
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->integer('contest_id')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ERP_ConcursoProveedorDetalle', function (Blueprint $table) {
            $table->dropColumn(['user_created']);
            $table->dropColumn(['user_updated']);
            $table->dropColumn(['user_deleted']);
            $table->dropColumn(['contest_id']);
        });
    }
}
