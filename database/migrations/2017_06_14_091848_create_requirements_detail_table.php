<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRequirementsDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_RequerimientosDetalle', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('requirement_id')->unsigned();
            $table->integer('project_consolidated_id')->unsigned();
            $table->decimal('quantity_requested', 10, 2);
            $table->decimal('quantity_served', 10, 2);
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
        Schema::dropIfExists('ERP_RequerimientosDetalle');
    }
}
