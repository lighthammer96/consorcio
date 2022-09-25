<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConsumerReturnTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_DevolucionConsumo', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('date');
            $table->string('code')->nullable()->default(null);
            $table->integer('user_id');
            $table->integer('warehouse_id');
            $table->text('observation')->nullable();
            $table->integer('project_id')->nullable()->default(null);
            $table->integer('front_id')->nullable()->default(null);
            $table->string('state_description')->nullable()->default('');
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('ERP_DevolucionConsumoProducto', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('consumer_return_id')->unsigned();
            $table->integer('product_id')->unsigned();
            $table->integer('available')->unsigned()->nullable();
            $table->integer('refund_amount')->unsigned()->nullable();
            $table->integer('toReturn')->unsigned()->nullable();
            $table->string('code');
            $table->string('description');
            $table->string('unit');
            $table->decimal('cost', 18, 4)->nullable();
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
        Schema::dropIfExists('ERP_DevolucionConsumoProducto');
        Schema::dropIfExists('ERP_DevolucionConsumo');
    }
}
