<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProjectToTransferTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_Transferencia', function (Blueprint $table) {
            $table->integer('project_id')->nullable()->default(null);
            $table->string('archive')->nullable()->default('');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ERP_Transferencia', function (Blueprint $table) {
            $table->dropColumn(['project_id']);
            $table->dropColumn(['archive']);
        });
    }
}
