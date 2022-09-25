<?php namespace App\Http\Recopro\Revision_ca;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Group_ca\Group_ca;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Revision_ca extends Model
{
  
    protected $table = 'ERP_RevisionCA';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    const CREATED_AT = 'dFecCre';
    const UPDATED_AT = 'dFecMod';
    
    protected $fillable = ['id', 'nombre','idgrupo','cIdUsuCre','cIdUsuMod','estado'];
    
     public function grupo_c_EXCEL()
    {
        return $this->belongsTo(Group_ca::class, 'idgrupo');
    }
     public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }

   

}