<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\TablaSunat;
use Illuminate\Support\Facades\DB;

class TablaSunatRepository implements TablaSunatInterface
{
    protected $model;
    
    public function __construct(TablaSunat $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    }
    
    public function allActive()
    {
       return $this->model->where('estado', self::$_ACTIVE)->get();
    }
     public function allTipoDocumento()
    {
       return $this->model->where('cnombretabla','TIPO_DOCUMENTO')->get();
    }
     public function allTipoPersona()
    {
       return $this->model->where('cnombretabla','TIPO_PERSONA')->get();
    }
    

}