<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CrearCampoComentarioFacturacionERPOrdenServicio extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $statement = "ALTER TABLE [dbo].[ERP_OrdenServicio] ADD [comentario_facturacion] text NULL";
        DB::statement($statement);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $statement = "ALTER TABLE [dbo].[ERP_OrdenServicio] DROP COLUMN [comentario_facturacion]";
        DB::statement($statement);
    }
}
