<?php namespace App\Http\Recopro\Level;

use App\Http\Recopro\Product\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/3/2017
 * Time: 5:58 PM
 */

class Level extends Model
{
    protected $table = 'ERP_Niveles';

    public $incrementing = false;

    protected $primaryKey = 'code';

    protected $keyType = 'string';

    protected $fillable = ['code', 'description', 'parent_id', 'type', 'type_apu', 'type_gt'];

    protected $hidden = ['created_at', 'updated_at'];

    public function products()
    {
        return $this->hasMany(Product::class, 'matrix')->orderBy('code_matrix');
    }

    public function parent()
    {
        return $this->belongsTo(Level::class, 'parent_id', 'code');
    }

    public function children()
    {
        return $this->hasMany(Level::class, 'parent_id');
    }

}