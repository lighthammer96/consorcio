<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDatesToRequirementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_Requerimientos', function (Blueprint $table) {
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ERP_Requerimientos', function (Blueprint $table) {
            $table->dropColumn(['user_created', 'user_updated', 'user_deleted']);
        });
    }
}
