<?php namespace App\Http\Recopro\Proveedor;

use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Recopro\Ubigeo\Ubigeo;
use App\Http\Recopro\DocumentType\DocumentType;
use App\Http\Recopro\TablaSunat\TablaSunat;
use App\Http\Recopro\TypeCostumer\TypeCostumer;
use App\Http\Recopro\TipoProveedor\TipoProveedor;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Proveedor extends Model
{

    protected $table = 'ERP_Proveedor';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    const CREATED_AT = 'dFecCre';
    const UPDATED_AT = 'dFecMod';

    protected $fillable = ['id_tipoProveedor', 'tipodoc', 'id', 'documento', 'razonsocial', 'contacto', 'direccion',
        'correo_electronico', 'celular', 'id_tipocli', 'telefono', 'ubigeo', 'cIdUsuCre', 'cIdUsuMod', 'IdTipoDocumento',
        'idPersona', 'cEstadoCivil', 'impuesto', 'congelado', 'idcCondicionPago', 'activo'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }

    public function tipo_c()
    {
        return $this->belongsTo(TipoProveedor::class, 'id_tipoProveedor');
    }

    public function ubigeo_u()
    {
        return $this->belongsTo(Ubigeo::class, 'ubigeo');
    }

    public function tipo_doc_vent()
    {
        return $this->belongsTo(DocumentType::class, 'IdTipoDocumento', 'IdTipoDocumento');
    }

    public function tipo_u()
    {

        $ft = $this->belongsTo(TablaSunat::class, 'tipodoc', 'cCodigo');
        return $ft->where('cnombretabla', 'TIPO_DOCUMENTO');
    }
}