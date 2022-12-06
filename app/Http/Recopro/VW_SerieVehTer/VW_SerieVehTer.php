<?php namespace App\Http\Recopro\VW_SerieVehTer;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class VW_SerieVehTer extends Model
{
  
    protected $table = 'ST_VWSerieVehTer';

    public $timestamps = true;

    protected $primaryKey = 'serie';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['serie','chasis','motor','color','aniofabriacion','placa','marca','modelo'];
    
     

}