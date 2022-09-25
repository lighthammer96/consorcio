<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterReferralGuideTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_GuiaRemision', function (Blueprint $table) {
            $table->string('code_guide')->nullable()->default('');
            $table->string('origin_guide')->nullable()->default('');
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
        Schema::table('ERP_GuiaRemision', function (Blueprint $table) {
            $table->dropColumn(['code_guide']);
            $table->dropColumn(['origin_guide']);
            $table->dropColumn(['state_description']);
        });
    }
}
