<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterObservationsToRequirementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_Requerimientos', function (Blueprint $table) {
            $table->string('code')->nullable()->change();
            $table->integer('approved_by')->unsigned()->nullable()->change();
            $table->text('observation')->nullable()->change();
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
            //
        });
    }
}
