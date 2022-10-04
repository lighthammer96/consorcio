<?php

namespace App\Http\Recopro\ReporteDocumentosEmitidos;
use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class ReporteDocumentosEmitidos extends Model
{
   

    // protected $table = 'ERP_view_venta';
    protected $table = 'VTA_ReporteComprobantesEmitidos';

    protected $fillable = ['TipoDoc', 'TipoDocumento',  'Documento', 'FechaEmision', 'NumeroDoc', 'Cliente', 'Moneda', 'Total', 'Solarizado', 'Glosa', 'Anulado', 'EstadoSunat', 'TipoDocRef', 'DocumentoRef', "FechaEmisionRef"];
    protected $primaryKey = 'Documento';
    // protected $keyType = 'string';
    public $incrementing = false;



    
    protected $hidden = ['deleted_at'];
}
