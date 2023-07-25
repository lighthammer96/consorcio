<?php

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Solicitud_Asignacion_cierre;

use Illuminate\Support\Facades\DB;

class Solicitud_Asignacion_cierreRepository implements Solicitud_Asignacion_cierreInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(Solicitud_Asignacion_cierre $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->orWhere(function ($q) use ($s) {
            $q->where('cCodConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('nConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('fecha_solicitud', 'LIKE', '%' . $s . '%')
                ->where('tipo_solicitud', 'LIKE', '%' . $s . '%');
        });
    }
    public function get_compania()
    {
        $mostrar=DB::select("select * from ERP_Compania where Estado='1'");
        return $mostrar;
    }
    public function get_cuentas_caber($solitud,$periodo)
    {
        $sql = "select cob.descripcion as cobrador,cli.direccion,v.idventa as idventa, ub.cDepartamento,ub.cProvincia,ub.cDistrito,cli.documento as documento_cliente,cli.razonsocial_cliente as cliente ,vend.descripcion as vendedor,C.valor_cuota as monto_total,C.saldo_cuota as monto_pendiente ,m.Descripcion as moneda,m.Simbolo,v.idmoneda,v.serie_comprobante,v.numero_comprobante,concat(v.serie_comprobante,'-',RIGHT('00000' + CAST(FLOOR(v.numero_comprobante) AS VARCHAR), 5),'-',RIGHT('00000' + CAST(FLOOR(c.nrocuota) AS VARCHAR), 5) ) as documento_ven,v.fecha_emision,c.cCodConsecutivo,c.nConsecutivo,c.nrocuota,c.fecha_vencimiento,
        (select max(VTA.fecha_emision) Fecha
        from ERP_Venta VTA
        inner join ERP_VentaDetalle VTAD on VTAD.idventa = VTA.idventa and VTAD.nrocuota is not null
        where VTA.tipo_comprobante = 0 and VTA.IdTipoDocumento in ('12') 
        and cCodConsecutivo_solicitud = c.cCodConsecutivo and  nConsecutivo_solicitud = c.nConsecutivo and  VTAD.nrocuota = c.nrocuota
        ) fecultpago
from ERP_SolicitudCronograma_cierre C
INNER JOIN ERP_Venta AS v on(v.cCodConsecutivo_solicitud=c.cCodConsecutivo and v.nConsecutivo_solicitud=c.nConsecutivo and v.tipo_comprobante = 0 and v.IdTipoDocumento in ('03','01')  and v.saldo > 0 and isnull(v.anulado,'N') = 'N')

INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda)
left join ERP_Solicitud_cierre as so on(so.cCodConsecutivo=c.cCodConsecutivo and so.nConsecutivo=c.nConsecutivo AND c.periodo=so.periodo)
left join ERP_Cobrador as cob on (cob.id=so.idCobrador)
INNER JOIN ERP_Clientes AS cli ON(so.idcliente=cli.id)
left join ERP_Ubigeo as ub on (cli.ubigeo=ub.cCodUbigeo)
left join ERP_Vendedores as vend on(vend.idvendedor=so.idvendedor)
where C.saldo_cuota>0 and  v.idventa IN ($solitud) AND c.periodo='{$periodo}' ORDER BY cli.razonsocial_cliente ASC";
// echo $sql; exit;
        $mostrar=DB::select($sql);
        return $mostrar;
    }
    public function get_cuentas_cuerp($solitud)
    {
        $mostrar=DB::select("select mo.Descripcion as moneda ,concat(ve.serie_comprobante,'-',RIGHT('00000' + CAST(FLOOR(ve.numero_comprobante) AS VARCHAR), 5),'-',RIGHT('00000' + CAST(FLOOR(sc.nrocuota) AS VARCHAR), 5) ) as documento_ven, * from ERP_SolicitudCronograma as sc INNER JOIN ERP_Venta as ve on (sc.cCodConsecutivo=ve.cCodConsecutivo_solicitud and sc.nConsecutivo=ve.nConsecutivo_solicitud)
            inner join ERP_Moneda as mo on (mo.IdMoneda=ve.IdMoneda)
            inner join ERP_Venta as tiket on(tiket.idventa_comprobante=ve.idventa) where sc.saldo_cuota>0 and  sc.nConsecutivo IN ($solitud)c order BY ve.idmoneda");
        return $mostrar;
    }

    public function get_tarjeta_cliente($cCodConsecutivo,$nConsecutivo)
    {   $mostrar=DB::select("SELECT usv.descripcion as vendedor,usc.descripcion as cobrador,vent.fecha_emision as fecha_venta,cli.cReferencia,mone.Simbolo as simbolo, mo.descripcion as Modelo,ser.color as Color,ser.cPlacaVeh as Placa, ser.motor as Motor, ser.chasis as Chasis ,s.monto_venta as precio_lista,s.cuota_inicial as inicial,cli.cNumerodocumento AS documento_cliente,cli.cApePat+' '+cli.cApeMat as Apellidos_cliente,cli.cNombres as nombres_cliente,cli.cCelular as celular_cliente,cli.cDireccion as direccion_cliente, f.cNumerodocumento AS documento_fiador,f.cApePat+' '+f.cApeMat as Apellidos_fiador,f.cNombres as nombres_fiador,f.cCelular as celular_fiador,f.cDireccion as direccion_fiador, cy.cNumerodocumento AS documento_conyugue,cy.cApePat+' '+cy.cApeMat as Apellidos_conyugue,cy.cNombres as nombres_conyugue,cy.cCelular as celular_conyugue,cy.cDireccion as direccion_conyugue,fc.cNumerodocumento AS documento_fiadorconyugue,fc.cApePat+' '+fc.cApeMat as Apellidos_fiadorconyugue,fc.cNombres as nombres_fiadorconyugue,fc.cCelular as celular_fiadorconyugue,fc.cDireccion as direccion_fiadorconyugue,s.tipo_vivienda as tipo_vivienda   FROM ERP_Solicitud as so inner join ERP_SolicitudCredito  AS s on  (so.cCodConsecutivo=s.cCodConsecutivo and so.nConsecutivo=s.nConsecutivo)
inner join ERP_SolicitudArticulo as sola on (sola.cCodConsecutivo=s.cCodConsecutivo and sola.nConsecutivo=s.nConsecutivo)
inner join ERP_Productos as pro on sola.idarticulo = pro.id
left join ERP_Modelo as mo on pro.idModelo=mo.idModelo
left join ERP_SolicitudDetalle as sold on (sold.cCodConsecutivo=s.cCodConsecutivo and sold.nConsecutivo=s.nConsecutivo)
inner join ERP_Moneda as mone on mone.IdMoneda=so.idmoneda
left join erp_venta as vent on(vent.cCodConsecutivo_solicitud=s.cCodConsecutivo and vent.nConsecutivo_solicitud=s.nConsecutivo)
left join ERP_Serie as ser on ser.idSerie=sold.idSerie
left join ERP_Vendedores as usv on usv.idvendedor=so.idvendedor
left join ERP_Cobrador as usc on usc.id=so.idCobrador
        LEFT JOIN ERP_Persona AS f ON(f.idPersona=s.idfiador)
        LEFT JOIN ERP_Persona AS cy ON(cy.idPersona=s.idconyugue)
        LEFT JOIN ERP_Persona AS fc ON(fc.idPersona=s.idfiadorconyugue)
        LEFT JOIN ERP_Clientes AS clp ON(clp.id=so.idCliente)
        LEFT JOIN ERP_Persona AS cli ON(cli.idPersona=clp.idPersona)
        where s.cCodConsecutivo='$cCodConsecutivo' and s.nConsecutivo='$nConsecutivo'");
        return $mostrar;
    }
    public function get_tarjeta_Cronograma($cCodConsecutivo,$nConsecutivo)
    {
        $mostrar=DB::select("select * from ERP_SolicitudCronograma where cCodConsecutivo='$cCodConsecutivo' and nConsecutivo='$nConsecutivo'");
        return $mostrar;
    }
    public function searchAsignacionCobrador($s,$filtro_tienda,$idInicio,$idFin,$idClienteFiltro,$idCobradorFiltro,$FechaInicioFiltro,$FechaFinFiltro,$Departamento,$provincia,$distrito,$idsector,$iddistrito)
    {
        $solitud=[];
        $filtroFechaSol=[];
        if($idInicio!='' && $idFin!=''){
            $mostrar3 = DB::select("select *,  DATEDIFF (DAY,fecha_vencimiento, CONVERT(DATE,GETDATE())) as fe from ERP_SolicitudCronograma  where saldo_cuota>0  and DATEDIFF (DAY,fecha_vencimiento, CONVERT(DATE,GETDATE())) BETWEEN '$idInicio' AND '$idFin'");
            foreach ($mostrar3 as $row) {
                array_push($solitud, $row->nConsecutivo);
            }
        }
        if($FechaInicioFiltro!='' && $FechaFinFiltro!=''){
            $mostrar3 = DB::select("select * from ERP_SolicitudCronograma  where convert(date,fecha_vencimiento) >= '$FechaInicioFiltro'  and convert(date,fecha_vencimiento) <='$FechaFinFiltro' and saldo_cuota>0 ");
            foreach ($mostrar3 as $row) {
                array_push($filtroFechaSol, $row->nConsecutivo);
            }
        }
        return $this->model->orWhere(function ($q) use ($s,$filtroFechaSol,$filtro_tienda,$idInicio,$idFin,$solitud,$idClienteFiltro,$idCobradorFiltro,$FechaInicioFiltro,$FechaFinFiltro,$Departamento,$provincia,$distrito,$idsector,$iddistrito) {
            $q->whereIn('IdTipoDocumento', ['03','01'])->where('cCodConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('nConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('fecha_solicitud', 'LIKE', '%' . $s . '%')
                ->where('tipo_solicitud', 'LIKE', '%' . $s . '%');
            if($FechaInicioFiltro!='' && $FechaFinFiltro!=''){
                $q->whereIn('nConsecutivo',$filtroFechaSol);
            }
            if(!empty($filtro_tienda)){
                $q->Where('nCodTienda',$filtro_tienda);
            }
            if($idInicio!='' && $idFin!=''){
                $q->whereIn('nConsecutivo',$solitud);
            }
            if($idCobradorFiltro !='' &&  $idCobradorFiltro !='N'){
                $q->where('idCobrador',$idCobradorFiltro);
            }


            if($idCobradorFiltro =='N'){
                $q->whereNull("idCobrador");
            }
            if($idClienteFiltro !='' ){
                $q->where('idCliente',$idClienteFiltro);
            }

            if(($Departamento!='')){
                $q->Where('cDepartamento',$Departamento);
            }
            if(($provincia!='')){
                $q->Where('cProvincia',$provincia);
            }
            if(($iddistrito!='')){
                $q->Where('cDistrito',$distrito);
            }
            if(($idsector!='')){
                $q->where('idsector',$idsector);
            }

        });
    }
    public function searchAsignacionCobradorxCuentas($s,$filtro_tienda,$idInicio,$idFin,$idClienteFiltro,$idCobradorFiltro,$FechaInicioFiltro,$FechaFinFiltro,$Departamento,$provincia,$distrito,$idsector,$iddistrito,$idTipoSolicitud,$idConvenio, $search_cuentas_cobrar)
    {
        $solitud=[];
        $filtroFechaSol=[];
        if($idInicio!='' && $idFin!=''){
            $mostrar3 = DB::select("select *,  DATEDIFF (DAY,fecha_vencimiento, CONVERT(DATE,GETDATE())) as fe from ERP_SolicitudCronograma  where saldo_cuota>0  and DATEDIFF (DAY,fecha_vencimiento, CONVERT(DATE,GETDATE())) BETWEEN '$idInicio' AND '$idFin'");
            foreach ($mostrar3 as $row) {
                array_push($solitud, $row->nConsecutivo);
            }
        }
        if($FechaInicioFiltro!='' && $FechaFinFiltro!=''){
            $mostrar3 = DB::select("select * from ERP_SolicitudCronograma  where FORMAT(fecha_vencimiento, 'yyyy-MM-dd') BETWEEN '{$FechaInicioFiltro}' AND '{$FechaInicioFiltro}' /* convert(date,fecha_vencimiento) >= '$FechaInicioFiltro'  and convert(date,fecha_vencimiento) <='$FechaFinFiltro'*/ and saldo_cuota>0 ");
            foreach ($mostrar3 as $row) {
                array_push($filtroFechaSol, $row->nConsecutivo);
            }
        }
        return $this->model->orWhere(function ($q) use ($s,$filtroFechaSol,$filtro_tienda,$idInicio,$idFin,$solitud,$idClienteFiltro,$idCobradorFiltro,$FechaInicioFiltro,$FechaFinFiltro,$Departamento,$provincia,$distrito,$idsector,$iddistrito,$idTipoSolicitud,$idConvenio, $search_cuentas_cobrar) {
            $q->whereIn('IdTipoDocumento', ['03','01'])->where('cCodConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('nConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('fecha_solicitud', 'LIKE', '%' . $s . '%')
                ->where('tipo_solicitud', 'LIKE', '%' . $s . '%');



            if($FechaInicioFiltro!='' && $FechaFinFiltro!=''){
                $q->whereIn('nConsecutivo',$filtroFechaSol);
            }
            if(!empty($filtro_tienda)){
                $q->Where('nCodTienda',$filtro_tienda);
            }
            if($idInicio!='' && $idFin!=''){
                $q->whereIn('nConsecutivo',$solitud);
            }
            if($idCobradorFiltro !='' ){
                $q->where('idCobrador',$idCobradorFiltro);
            }
            if($idClienteFiltro !='' ){
                $q->where('idCliente',$idClienteFiltro);
            }


            if(($Departamento!='')){
                $q->Where('cDepartamento',$Departamento);
            }
            if(($provincia!='')){
                $q->Where('cProvincia',$provincia);
            }
            if(($iddistrito!='')){
                $q->Where('cDistrito',$distrito);
            }
            if(($idsector!='')){
                $q->where('idsector',$idsector);
            }
            if($idTipoSolicitud !='' ){
                $q->where('tipo_solicitud',$idTipoSolicitud);
            }
            if($idConvenio !='' ){
                $q->where('idconvenio',$idConvenio);
            }

            // })->where('estado','<','9');
        })->whereIn('estado', ['6','7','8'])->where(function ($q) use ($search_cuentas_cobrar) {
            $q->where('numero_documento', 'LIKE', '%' . $search_cuentas_cobrar. '%')
                ->orWhere('nConsecutivo', 'LIKE', '%' . $search_cuentas_cobrar. '%')
                ->orWhere('cliente', 'LIKE', '%' . $search_cuentas_cobrar. '%');
        });
    }

    public function searchAsignacionCobradorxCuentasGet($periodo)
    {

        return $this->model->whereIn('estado', ['6','7','8'])->where("periodo", $periodo)->get();
    }

    public function searchAsignacionAproba($s,$idCliente)
    {

        return $this->model->orWhere(function ($q) use ($s,$idCliente) {
            $q->where('IdTipoDocumento','!=','12')->where('idcliente',$idCliente)->where('cCodConsecutivo', 'LIKE', '%' . $s . '%');
            $q->orWhere('nConsecutivo', 'LIKE', '%' . $s . '%')->where('IdTipoDocumento','!=','12')->where('idcliente',$idCliente);
            $q->orWhere('fecha_solicitud', 'LIKE', '%' . $s . '%')->where('IdTipoDocumento','!=','12')->where('idcliente',$idCliente);
            $q->orWhere('tipo_solicitud', 'LIKE', '%' . $s . '%')->where('IdTipoDocumento','!=','12')->where('idcliente',$idCliente);
        });
    }

    public function search_ventas($s)
    {
        return $this->model->orWhere(function ($q) use ($s) {

            $q->whereIn('estado', [2, 4])
                ->where('cCodConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('nConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('fecha_solicitud', 'LIKE', '%' . $s . '%')
                ->where('tipo_solicitud', 'LIKE', '%' . $s . '%');
        });
    }

    public function all()
    {
        return $this->model->all();
    }
    public function allFiltro($s,$filtro_tienda,$idInicio,$idFin,$idClienteFiltro,$idCobradorFiltro,$FechaInicioFiltro,$FechaFinFiltro,$idTipoSolicitud,$idConvenio)
    {
        $dato=$this->model;
        $solitud=[];
        $filtroFechaSol=[];
        if($idInicio!='' && $idFin!=''){
            $mostrar3 = DB::select("select *,  DATEDIFF (DAY,fecha_vencimiento, CONVERT(DATE,GETDATE())) as fe from ERP_SolicitudCronograma  where saldo_cuota>0  and DATEDIFF (DAY,fecha_vencimiento, CONVERT(DATE,GETDATE())) BETWEEN '$idInicio' AND '$idFin'");
            foreach ($mostrar3 as $row) {
                array_push($solitud, $row->nConsecutivo);
            }
        }
        if($FechaInicioFiltro!='' && $FechaFinFiltro!=''){
            $mostrar3 = DB::select("select * from ERP_SolicitudCronograma  where convert(date,fecha_vencimiento) >= '$FechaInicioFiltro'  and convert(date,fecha_vencimiento) <='$FechaFinFiltro' and saldo_cuota>0 ");
            foreach ($mostrar3 as $row) {
                array_push($filtroFechaSol, $row->nConsecutivo);
            }
        }
        if($FechaInicioFiltro!='' && $FechaFinFiltro!=''){
            $dato=$dato->whereIn('nConsecutivo',$filtroFechaSol);
        }
        if(!empty($filtro_tienda)){
            $dato=$dato->Where('nCodTienda',$filtro_tienda);
        }
        if($idInicio!='' && $idFin!=''){
            $dato=$dato->whereIn('nConsecutivo',$solitud);
        }

        if($idCobradorFiltro !='' &&  $idCobradorFiltro !='N'){
            $dato=$dato->where('idCobrador',$idCobradorFiltro);
        }
        if($idClienteFiltro !='' ){
            $dato=$dato->where('idCliente',$idClienteFiltro);
        }

        if($idCobradorFiltro =='N'){
            $dato=$dato->whereNull("idCobrador");
        }

        if($idTipoSolicitud !='' ){
            $dato=$dato->where('tipo_solicitud',$idTipoSolicitud);
        }
        if($idConvenio !='' ){
            $dato=$dato->where('idconvenio',$idConvenio);
        }



        return $dato->get();
    }
    public function allFiltro_asignac($s,$filtro_tienda,$idInicio,$idFin,$idClienteFiltro,$idCobradorFiltro,$FechaInicioFiltro,$FechaFinFiltro,$Departamento,$provincia,$distrito,$idsector,$iddistrito)
    {
        $dato=$this->model;
        $solitud=[];
        $filtroFechaSol=[];
        if($idInicio!='' && $idFin!=''){
            $mostrar3 = DB::select("select *,  DATEDIFF (DAY,fecha_vencimiento, CONVERT(DATE,GETDATE())) as fe from ERP_SolicitudCronograma  where saldo_cuota>0  and DATEDIFF (DAY,fecha_vencimiento, CONVERT(DATE,GETDATE())) BETWEEN '$idInicio' AND '$idFin'");
            foreach ($mostrar3 as $row) {
                array_push($solitud, $row->nConsecutivo);
            }
        }
        if($FechaInicioFiltro!='' && $FechaFinFiltro!=''){
            $mostrar3 = DB::select("select * from ERP_SolicitudCronograma  where convert(date,fecha_vencimiento) >= '$FechaInicioFiltro'  and convert(date,fecha_vencimiento) <='$FechaFinFiltro' and saldo_cuota>0 ");
            foreach ($mostrar3 as $row) {
                array_push($filtroFechaSol, $row->nConsecutivo);
            }
        }
        if($FechaInicioFiltro!='' && $FechaFinFiltro!=''){
            $dato=$dato->whereIn('nConsecutivo',$filtroFechaSol);
        }
        if(!empty($filtro_tienda)){
            $dato=$dato->Where('nCodTienda',$filtro_tienda);
        }
        if($idInicio!='' && $idFin!=''){
            $dato=$dato->whereIn('nConsecutivo',$solitud);
        }

        if($idCobradorFiltro !='' ){
            $dato=$dato->where('idCobrador',$idCobradorFiltro);
        }
        if($idClienteFiltro !='' ){
            $dato=$dato->where('idCliente',$idClienteFiltro);
        }
        if(($Departamento!='')){
            $dato=$dato->where('cDepartamento',$Departamento);
        }
        if(($provincia!='')){
            $dato=$dato->where('cProvincia',$provincia);
        }
        if(($iddistrito!='')){
            $dato=$dato->where('cDistrito',$distrito);
        }
        if(($idsector!='')){
            $dato=$dato->where('idsector',$idsector);
        }



        return $dato->get();
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        // print_r($attributes); exit;
        return $this->model->create($attributes);
    }
    public function allActive()
    {

        return $this->model->where('estado', self::$_ACTIVE)->get();
    }

    public function update($id, array $attributes)
    {
        // print_r($attributes); exit;
        $attributes['user_updated'] = auth()->id();
        $model                      = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes                 = [];
        $attributes['user_deleted'] = auth()->id();
        $model                      = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }



}