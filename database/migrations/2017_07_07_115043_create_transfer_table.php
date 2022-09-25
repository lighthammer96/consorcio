<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransferTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_Transferencia', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('transfer_date');
            $table->integer('warehouse_origin_id');
            $table->integer('warehouse_destination_id');
            $table->integer('user_id');
            $table->integer('type_id');
            $table->boolean('state')->default(true);
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('ERP_TransferenciaProducto', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('transfer_id')->unsigned();
            $table->integer('product_id')->unsigned();
            $table->integer('transferred')->unsigned()->nullable();
            $table->decimal('available', 18, 2)->nullable();
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
        Schema::dropIfExists('ERP_TransferenciaProducto');
        Schema::dropIfExists('ERP_Transferencia');
    }
}
