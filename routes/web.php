<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::auth();
Route::post('login', 'Auth\LoginController@login')->middleware('csrf');

Route::get('logout', 'Auth\LoginController@logout');

Route::get('/', 'HomeController@index')->name('admin.index');

Route::get('verify_login', 'Auth\SecurityController@verify_login')->name('verify_login');
Route::get('change_password', 'Auth\SecurityController@change_password_get')->name('change_password');
Route::post('change_password', 'Auth\SecurityController@change_password_post')->name('change_password_post');

Route::get('validate', 'HomeController@validateURL')->name('admin.validate');

Route::get('php_version', function () {
    echo phpinfo();
});

Route::group(['middleware' => ['auth', 'permission']], function () {

    // Routes Security

    require app_path() . '\Http\Routes\Profiles.php';

    require app_path() . '\Http\Routes\Modules.php';

    require app_path() . '\Http\Routes\Users.php';

    require app_path() . '\Http\Routes\Permissions.php';

    require app_path() . '\Http\Routes\Configs.php';

    require app_path() . '\Http\Routes\Params.php';

    require app_path() . '\Http\Routes\Areas.php';

    require app_path() . '\Http\Routes\Sectors.php';

     require app_path() . '\Http\Routes\Proveedors.php';

    require app_path() . '\Http\Routes\ApproversProjects.php';

    require app_path() . '\Http\Routes\ConformidadServicios.php';

    require app_path() . '\Http\Routes\ReporteRepuestos.php';

    require app_path() . '\Http\Routes\ResumenMensualActividads.php';

    require app_path() . '\Http\Routes\Empresas.php';

    require app_path() . '\Http\Routes\DevolucionOrdenCompras.php';

    require app_path() . '\Http\Routes\TipoProveedors.php';

     require app_path() . '\Http\Routes\ConfigJerarquiaCompras.php';
     // Routes Masters

    require app_path() . '\Http\Routes\ReporteOrdenDiarios.php';

    require app_path() . '\Http\Routes\Brands.php';

    require app_path() . '\Http\Routes\AnulacionOrdenCompras.php';

    require app_path() . '\Http\Routes\RecepcionOrdenCompras.php';

    require app_path() . '\Http\Routes\Entities.php';

    require app_path() . '\Http\Routes\Products.php';

    require app_path() . '\Http\Routes\TypeChanges.php';

    require app_path() . '\Http\Routes\Resources.php';

    require app_path() . '\Http\Routes\Warehouses.php';

    require app_path() . '\Http\Routes\Receptions.php';

    require app_path() . '\Http\Routes\Transfers.php';

    require app_path() . '\Http\Routes\Cuentasxcobrars.php';

     require app_path() . '\Http\Routes\GuiaRemisions.php';

     require app_path() . '\Http\Routes\TipoTraslados.php';

    require app_path() . '\Http\Routes\ReceptionTransfers.php';

    require app_path() . '\Http\Routes\ReporteMetas.php';

    require app_path() . '\Http\Routes\Buyers.php';

    require app_path() . '\Http\Routes\Fronts.php';

    require app_path() . '\Http\Routes\AprobacionOrdenCompras.php';

    require app_path() . '\Http\Routes\PettyCashs.php';

    require app_path() . '\Http\Routes\PaymentConditions.php';

    require app_path() . '\Http\Routes\Measures.php';

    require app_path() . '\Http\Routes\Currencys.php';

     require app_path() . '\Http\Routes\Periodos.php';

    require app_path() . '\Http\Routes\Shops.php';

    require app_path() . '\Http\Routes\ResetearContrasenias.php';

    require app_path() . '\Http\Routes\Categories.php';

    require app_path() . '\Http\Routes\Conceptos.php';

    require app_path() . '\Http\Routes\Operations.php';

    require app_path() . '\Http\Routes\HeadAccountans.php';

    require app_path() . '\Http\Routes\Families.php';

    require app_path() . '\Http\Routes\ReporteCreditosAprobados.php';

    require app_path() . '\Http\Routes\SubFamilies.php';

    require app_path() . '\Http\Routes\Lots.php';

    require app_path() . '\Http\Routes\Companias.php';

    require app_path() . '\Http\Routes\ConfigJerarquias.php';

    require app_path() . '\Http\Routes\Modelos.php';

    require app_path() . '\Http\Routes\Cobradors.php';

    require app_path() . '\Http\Routes\Accoudets.php';

    require app_path() . '\Http\Routes\Series.php';

    require app_path() . '\Http\Routes\Register_movements.php';

    require app_path() . '\Http\Routes\RegisterOrdenCompras.php';

    require app_path() . '\Http\Routes\SolicitudCompras.php';

    require app_path() . '\Http\Routes\Register_transfers.php';

    require app_path() . '\Http\Routes\Generation_remisions.php';

    require app_path() . '\Http\Routes\Query_Stock.php';

    require app_path() . '\Http\Routes\Query_movements.php';

    require app_path() . '\Http\Routes\Report_stocks.php';

    require app_path() . '\Http\Routes\Report_movements.php';

    require app_path() . '\Http\Routes\ReporteVentaClientes.php';

    require app_path() . '\Http\Routes\ReporteComisiones.php';

    require app_path() . '\Http\Routes\Technicians.php';

    require app_path() . '\Http\Routes\CancelarCerrarOcs.php';

    require app_path() . '\Http\Routes\Advisers.php';

    require app_path() . '\Http\Routes\Consecutives.php';

    require app_path() . '\Http\Routes\Personas.php';

    require app_path() . '\Http\Routes\Maintenances.php';

    require app_path() . '\Http\Routes\Customers.php';

    require app_path() . '\Http\Routes\Group_ca.php';

    require app_path() . '\Http\Routes\Revision_ca.php';

    require app_path() . '\Http\Routes\Vehiculos_terceros.php';

    require app_path() . '\Http\Routes\Descuentos.php';

    require app_path() . '\Http\Routes\Devolucion_servicesTecnicos.php';

    require app_path() . '\Http\Routes\Entrega_servicesTecnicos.php';

    require app_path() . '\Http\Routes\Bancos.php';

    require app_path() . '\Http\Routes\TiposMovimiento.php';

    require app_path() . '\Http\Routes\FormasPago.php';

    require app_path() . '\Http\Routes\Denominaciones.php';

    require app_path() . '\Http\Routes\Convenios.php';

    require app_path() . '\Http\Routes\MovimientoCajas.php';

    require app_path() . '\Http\Routes\CuentasBancarias.php';

    require app_path() . '\Http\Routes\Aprobacion.php';

    require app_path() . '\Http\Routes\Cajas.php';

    require app_path() . '\Http\Routes\ConsecutivosComprobantes.php';

    require app_path() . '\Http\Routes\Movimiento_cierres.php'; 

    require app_path() . '\Http\Routes\Cierre_cuentas_cobrar.php'; 

    require app_path() . '\Http\Routes\CajaDiarias.php';

    require app_path() . '\Http\Routes\Vendedores.php';


    require app_path() . '\Http\Routes\FactorCredito.php';

    require app_path() . '\Http\Routes\CategoriaVehiculars.php';

    require app_path() . '\Http\Routes\AprobacionSolicituds.php';

    require app_path() . '\Http\Routes\Motivos.php';
    require app_path() . '\Http\Routes\Carroceria.php';

    // Routes Ventas

    require app_path() . '\Http\Routes\Solicitud.php';

    require app_path() . '\Http\Routes\ReasignacionVendedor.php';

    require app_path() . '\Http\Routes\Asignacioncobradors.php';

    require app_path() . '\Http\Routes\Ventas.php';


    // Creditos y Cobranzas
    require app_path() . '\Http\Routes\RenegociacionMora.php';
    require app_path() . '\Http\Routes\ReprogramacionFechas.php';

    require app_path() . '\Http\Routes\Refinanciamientos.php';
    require app_path() . '\Http\Routes\VisitaCliente.php';
    require app_path() . '\Http\Routes\ListaCobranzaCuotas.php';
    require app_path() . '\Http\Routes\AvanceMorosidad.php';

    require app_path() . '\Http\Routes\ReporteDocumentosEmitidos.php';

    // Route Purchases

    require app_path() . '\Http\Routes\Requirements.php';

    require app_path() . '\Http\Routes\ApprovalRequirements.php';

    require app_path() . '\Http\Routes\ApprovalAutonomys.php';

    require app_path() . '\Http\Routes\AssignmentRequirements.php';

    require app_path() . '\Http\Routes\Quotations.php';

    require app_path() . '\Http\Routes\RequirementContest.php';

    require app_path() . '\Http\Routes\ApprovalContests.php';

    require app_path() . '\Http\Routes\PurchaseOrders.php';

    require app_path() . '\Http\Routes\TypeServicioMants.php';

    require app_path() . '\Http\Routes\Orden_servicios.php';

    require app_path() . '\Http\Routes\List_precios.php';

    require app_path() . '\Http\Routes\TypeCustomers.php';

    require app_path() . '\Http\Routes\TypeObjets.php';

    require app_path() . '\Http\Routes\Objetivos.php';

    require app_path() . '\Http\Routes\ObjetivosDetalles.php';

    require app_path() . '\Http\Routes\Proformas.php';

    require app_path() . '\Http\Routes\Proforma_detalles.php';

    require app_path() . '\Http\Routes\Proforma_mos.php';

    require app_path() . '\Http\Routes\Quality_controls.php';
    // Route Warehouse

    require app_path() . '\Http\Routes\Entrys.php';

    require app_path() . '\Http\Routes\Departures.php';

    require app_path() . '\Http\Routes\Transfers.php';

    // require app_path() . '\Http\Routes\ReferralGuides.php';

    require app_path() . '\Http\Routes\consumptions.php';

    //require app_path() . '\Http\Routes\ReferralGuides.php';

    require app_path() . '\Http\Routes\ReceptionTransfers.php';

    require app_path() . '\Http\Routes\ConsumerReturns.php';

    // Report
    require app_path() . '\Http\Routes\Stocks.php';

    // Route Projects

    require app_path() . '\Http\Routes\Projects.php';

    require app_path() . '\Http\Routes\ConsolidatedProject.php';

    require app_path() . '\Http\Routes\ProjectApproval.php';


    require app_path() . '\Http\Routes\ReplenishmentCash.php';

    require app_path() . '\Http\Routes\PettyCashExpense.php';

    require app_path() . '\Http\Routes\ReportPurchaseOrder.php';

    require app_path() . '\Http\Routes\ReturnConformanceServices.php';

});

Route::get('migrate_excel', 'MigrationController@index');

Route::get('reset_table', 'ResetController@index'); // reset de de las tablas almacém

Route::get('error_conexion', 'HomeController@sql_error')->name('sql_error');

Route::get('pass/{pass}', function ($pass) {
    $user = \App\Http\Recopro\User\User::find(5);
    $user->password = bcrypt($pass);
    $user->save();

    return 'OK';
});

Route::get('generate_type_gt', function () {
    \App\Http\Recopro\Level\Level::where('code', '<>', '')->update(['type_gt' => 0]);
    foreach (\App\Http\Recopro\Level\Level::all() as $l) {
        if (($l->parent && $l->parent->type_gt == 1) || $l->code == 10 || $l->code == 11) {
            $l->type_gt = 1;
            $l->save();
        } elseif (($l->parent && $l->parent->type_gt == 2) || $l->code == 13) {
            $l->type_gt = 2;
            $l->save();}
    }

    return 'OK';
});
