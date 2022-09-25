<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEntriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_Ingreso', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('entry_date');
            $table->integer('user_id');
            $table->integer('warehouse_id');
            $table->text('observation')->nullable();
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('ERP_IngresoProducto', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('entry_id')->unsigned();
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
        Schema::dropIfExists('ERP_IngresoProducto');
        Schema::dropIfExists('ERP_Ingreso');
    }
}
