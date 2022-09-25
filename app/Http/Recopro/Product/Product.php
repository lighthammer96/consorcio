<?php namespace App\Http\Recopro\Product;

use App\Http\Recopro\Level\Level;
use App\Http\Recopro\PlanAccount\PlanAccount;
use App\Http\Recopro\ProductBrand\ProductBrand;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidated;
use App\Http\Recopro\Stock\Stock;
use App\Http\Recopro\Type\Type;
use App\Http\Recopro\TypeRetention\TypeRetention;
use App\Http\Recopro\Unity\Unity;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Http\Recopro\Modelo\Modelo;
use App\Http\Recopro\Category\Category;
use App\Http\Recopro\Brand\Brand;
use App\Http\Recopro\Family\Family;
use App\Http\Recopro\SubFamily\SubFamily;
use App\Http\Recopro\HeadAccountan\HeadAccountan;
use App\Http\Recopro\Articulo_Kit\Articulo_Kit;
/**
 * Created by PhpStorm.
 * User: Ever
 * Date: 4/4/2017
 * Time: 10:10 PM
 */
class Product extends Model
{
    

    protected $table = 'ERP_Productos';

    protected $fillable = ['description', 'description_detail', 'state', 'type_id', 'um_id', 'um_quantity', 'model',
        'year_enter', 'cc_debe_id', 'cc_haber_id', 'retention_id', 'sale_blocked', 'serie', 'lote', 'kit', 'code_matrix',
        'price_service_reference', 'commission_sale', 'sale', 'sale_description', 'maker', 'image', 'matrix', 'code_article',
        'average_cost',
        'user_created', 'user_updated', 'user_deleted','idModelo','idCategoria','idFamilia','idSubFamilia','idGrupoContableCabecera','impuesto','motor','chasis','anio_modelo','anio_fabricacion','idMarca','color','disponible_venta','costo','idCatVeh', 'idcarroceria'];

 

    public function modelo()
    {
        return $this->belongsTo(Modelo::class,'idModelo');
    }

    public function categoria()
    {
        return $this->belongsTo(Category::class, 'idCategoria');
    }

    public function familia()
    {
        return $this->belongsTo(Family::class,'idFamilia');
    }

    public function subfamilia()
    {
        return $this->belongsTo(SubFamily::class, 'idSubFamilia');
    } 

    public function marca()
    {
        return $this->belongsTo(Brand::class,'idMarca');
    }


    public function grupoContable()
    {
        return $this->belongsTo(HeadAccountan::class, 'idGrupoContableCabecera');
    }








    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    public function unity()
    {
        return $this->belongsTo(Unity::class, 'um_id', 'IdUnidadMedida');
    }

    public function retention()
    {
        return $this->belongsTo(TypeRetention::class, 'retention_id', 'IdTipoRetencion');
    }

    public function level()
    {
        return $this->belongsTo(Level::class, 'matrix');
    }

    public function brandsProduct()
    {
        return $this->hasMany(ProductBrand::class);
    }

    public function cc_debe()
    {
        return $this->belongsTo(PlanAccount::class, 'cc_debe_id');
    }

    public function cc_haber()
    {
        return $this->belongsTo(PlanAccount::class, 'cc_haber_id');
    }

    public function stock_available()
    {
        return $this->hasOne(Stock::class);
    }

     public function Articulo_Kit()
    {
        return $this->hasMany(Articulo_Kit::class,'idArticulo', 'id');
    }

    public function projectConsolidated()
    {
        return $this->hasMany(ProjectConsolidated::class, 'article_id', 'id');
    }
}
