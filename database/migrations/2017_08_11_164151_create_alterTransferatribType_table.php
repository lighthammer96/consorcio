<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlterTransferatribTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_Transferencia', function (Blueprint $table) {
            $table->string('code_transfer')->nullable()->default('');
            $table->string('type_description')->nullable()->default('');
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
        Schema::table('ERP_Transferencia', function (Blueprint $table) {
            $table->dropColumn(['code_transfer']);
            $table->dropColumn(['type_description']);
            $table->dropColumn(['state_description']);
        });
    }
}
