<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuotationProviderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_ConcursoProveedor', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('contest_id')->unsigned();
            $table->string('number')->nullable()->default(null);
            $table->integer('delivery_days')->unsigned()->nullable()->default(null);
            $table->date('delivery_date')->nullable()->default(null);
            $table->string('file')->nullable()->default(null);
            $table->integer('provider_id')->unsigned();
            $table->integer('payment_condition_id')->unsigned()->nullable()->default(null);
            $table->decimal('payment_advance', 5, 2)->nullable()->default(null);
            $table->date('shipping_date')->nullable()->default(null);
            $table->integer('currency_id')->unsigned()->nullable()->default(null);
            $table->boolean('is_igv')->default(false);
            $table->decimal('subtotal', 18, 2)->nullable()->default(null);
            $table->decimal('igv', 18, 2)->nullable()->default(null);
            $table->decimal('total', 18, 2)->nullable()->default(null);
            $table->decimal('subtotal_local', 18, 2)->nullable()->default(null);
            $table->decimal('igv_local', 18, 2)->nullable()->default(null);
            $table->decimal('total_local', 18, 2)->nullable()->default(null);
            $table->decimal('subtotal_dollar', 18, 2)->nullable()->default(null);
            $table->decimal('igv_dollar', 18, 2)->nullable()->default(null);
            $table->decimal('total_dollar', 18, 2)->nullable()->default(null);
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('ERP_ConcursoProveedorDetalle', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('contest_provider_id')->unsigned();
            $table->integer('contest_consolidated_id')->unsigned();
            $table->string('description')->nullable()->default(null);
            $table->decimal('quantity', 18, 2);
            $table->decimal('price', 18, 2);
            $table->decimal('discount_percentage', 18, 2);
            $table->decimal('discount', 18, 2);
            $table->decimal('total', 18, 2);
            $table->decimal('total_local', 18, 2);
            $table->decimal('total_dollar', 18, 2);
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
        Schema::dropIfExists('ERP_ConcursoProveedorDetalle');
        Schema::dropIfExists('ERP_ConcursoProveedor');
    }
}
