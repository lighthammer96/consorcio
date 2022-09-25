<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlterTransferdetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_TransferenciasDetalle', function (Blueprint $table) {
            $table->integer('transfer_id')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ERP_TransferenciasDetalle', function (Blueprint $table) {
            $table->dropColumn(['transfer_id']);
        });
    }
}
