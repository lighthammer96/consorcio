<?php namespace App\Http\Recopro\VW_CierreInventarioPeriodo;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class VW_CierreInventarioPeriodo extends Model
{
  
    protected $table = 'ERP_VW_CierreInventarioPeriodo';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['code_article','id','Articulo','Categoria','Unidad','Almacen','Localizacion','Lote','Serie','Disponible','Transito','Remitido','Total','CostoCierre','Periodo'];
    
     

}