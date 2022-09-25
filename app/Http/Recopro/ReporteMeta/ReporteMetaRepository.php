<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\ReporteMeta;
use Illuminate\Support\Facades\DB; 

class ReporteMetaRepository implements ReporteMetaInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(ReporteMeta $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    }
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('descripcion', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%');
        });

    }
    public function allActive()
    {
       return $this->model->where('estado', self::$_ACTIVE)->get();
    }
     public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        return $this->model->create($attributes);
    }
    public function get_consecutivo($table,$id)
    {     $mostrar=DB::select("select top 1 * from $table order by CONVERT(INT, $id) DESC");
         $actu=0;
         if(!$mostrar){
            $actu=0;
         }else{
            $actu=intval($mostrar[0]->$id);
         };
        $new=$actu+1;
        return $new; 
    }
    public function allReporteMensual($Anio,$mes)
    {
        $mostra=DB::select("select oser.id_tipoveh,prog.IdMoneda,oser.id_tipomant,tdra.REPUESTO,TDRA.ACEITE,prog.cCodConsecutivo,prog.nConsecutivo,tSpr.MontoSerPro from ERP_Proforma as prog  left join (select sum( prMo.nTotal) as MontoSerPro,pro.cCodConsecutivo,pro.nConsecutivo from ERP_Proforma as pro inner join ERP_ProformaMO as prMo on (pro.cCodConsecutivo=prMo.cCodConsecutivo and pro.nConsecutivo=prMo.nConsecutivo) where pro.iEstado=5 GROUP BY prMo.nCant, pro.cCodConsecutivo,pro.nConsecutivo) as tSpr on (tspr.cCodConsecutivo=prog.cCodConsecutivo and tspr.nConsecutivo=prog.nConsecutivo) left join (select prf.cCodConsecutivo, prf.nConsecutivo,sum(CASE  
             WHEN p.idCategoria =3 THEN prf.nTotal 
              ELSE 0 
           END) as REPUESTO, sum(CASE  
             WHEN p.idCategoria =4 THEN prf.nTotal 
              ELSE 0 
           END) as ACEITE
from ERP_ProformaDetalle as prf inner join ERP_Productos as p on (p.id=prf.idProducto) 
where  p.idCategoria IN (3,4) GROUP BY prf.cCodConsecutivo, prf.nConsecutivo) as tdra on (tdra.cCodConsecutivo=prog.cCodConsecutivo and tdra.nConsecutivo=prog.nConsecutivo) INNER JOIN ERP_OrdenServicio AS oser on(oser.cCodConsecutivo=prog.cCodConsecutivoOS and oser.nConsecutivo=prog.nConsecutivoOS) where prog.iEstado=5 AND MONTH(oser.dFecRec) = $mes AND YEAR(oser.dFecRec) = $Anio");
        return $mostra;
    }
    public function getDataAnio($Anio)
    {
        $mostra=DB::select("select  Day(oser.dFecRec) AS dia,month(oser.dFecRec) AS mes,* from ERP_OrdenServicio as oser where iEstado='3' and  YEAR(oser.dFecRec) =$Anio ORDER BY   month(oser.dFecRec)");
        return $mostra;
    }
    public function getTecnico()
    {
        $mostra=DB::select("select * from ERP_Tecnico where estado='A'");
        return $mostra;
    }
    public function getTiposMantenimiento()
    {
        $mostra=DB::select("select * from ERP_TipoMantenimiento where estado='A'");
        return $mostra;
    }
    public function getTecnico_metas($Anio)
    {
        $mostra=DB::select("select obd.nCant,obd.nMonto,obd.nPeriodo as Mes,obd.id_Persona as id_Persona from ERP_Tecnico as tec left join ERP_ObjetivosDetalle as obd on (obd.id_Persona=tec.id and obd.id_TipoPers=2) inner join ERP_Objetivos as ob on (ob.id=obd.id_obj) where ob.iEstado='1' and IdMoneda=1  and nAno=$Anio");
        return $mostra;
    }
    public function getDataAnioMeses($Anio)
    {
        $mostra=DB::select("select DISTINCT (month(oser.dFecRec)) AS mes from ERP_OrdenServicio as oser where iEstado='3' and  YEAR(oser.dFecRec) = $Anio ORDER BY  month(oser.dFecRec)");
        return $mostra;
    }
    public function getTiposObjetivos()
    {
        $mostra=DB::select("select * from ERP_TipoObjetivos where estado='A'");
        return $mostra;
    }
    public function getUsuario($idusurio){
          $mostrar2=DB::select("select * from ERP_Usuarios where id='$idusurio'");
          return $mostrar2;
    }
    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }
    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
     
    }

    public function reporte_objetivos($tipo_objetivo, $fecha) {
        $date = explode("-", $fecha);
        $anio = intval($date[0]);
        $mes = intval($date[1]);
        $dia = intval($date[2]);

        $data = array();
        $sql = "select IdTec, Tecnico, AvanceUnd, MetaCant, PorcAvanceCant, AvanceSoles, MetaMonto, PorcAvanceMonto from STVW_Reporte_Objetivos
        where Ano = {$anio} and Mes = {$mes} and TipoObj = {$tipo_objetivo}";
        // echo $sql;
        $data["data_1"] = DB::select($sql);
        $data["mes_int"] = $mes;

        $sql = "select Detalle, FORMAT(Fecha, 'dd/MM/yyyy') AS Fecha, Cantidad from STVW_Reporte_Objetivos_D
        where Ano = {$anio} and Mes = {$mes} and Dia = {$dia}";

        $data["data_2"] = DB::select($sql);
        return $data;

        // print_r($data);
    }

}