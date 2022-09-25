<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_Productos', function (Blueprint $table) {
            $table->string('code_article')->nullable()->default('');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ERP_Productos', function (Blueprint $table) {
            $table->dropColumn(['code_article']);
        });
    }
}
