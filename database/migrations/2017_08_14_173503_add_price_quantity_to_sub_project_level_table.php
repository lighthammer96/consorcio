<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPriceQuantityToSubProjectLevelTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_SubProyectoNiveles', function (Blueprint $table) {
            $table->integer('type')->unsigned()->nullable()->default(null);
            $table->decimal('lb_price', 18, 2)->nullable()->default(null);
            $table->decimal('lb_quantity', 18, 2)->nullable()->default(null);
            $table->decimal('lb_total', 18, 2)->nullable()->default(null);
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
            $table->dropColumn(['type', 'lb_price', 'lb_quantity', 'lb_total']);
        });
    }
}
