<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDepartureTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_Salida', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('departure_date');
            $table->integer('user_id');
            $table->integer('warehouse_id');
            $table->text('observation')->nullable();
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('ERP_SalidaProducto', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('departure_id')->unsigned();
            $table->integer('product_id')->unsigned();
            $table->decimal('price', 18, 4)->nullable();
            $table->integer('quantity')->unsigned()->nullable();
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ERP_SalidaProducto');
        Schema::dropIfExists('ERP_Salida');
    }
}
