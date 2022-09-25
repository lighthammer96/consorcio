<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
class BaseModel extends Model
{
    public function __construct() {

        $this->camposLogInsertar = ['user_created', 'created_at'];
        $this->camposLogModificar = ['user_updated', 'updated_at'];
        $this->camposLogEliminar = ['user_deleted', 'deleted_at'];
       
    }

 
    public function insertar($parametros) {
     
        try {
      
            if(!isset($parametros["datos"])) {
                throw new Exception("NO EXISTE DATOS! ");
            }
            // print_r($parametros["primary_key"]);
            foreach ($parametros["datos"] as $key => $value) {
                if($this->validarLogCampos($parametros["tabla"], "I")) {
                    $value["created_at"] = date("Y-m-d H:i:s").". 000";
                    $value["user_created"] = auth()->id();
                }
                DB::table($parametros["tabla"])->insert($value);

                foreach ($parametros["primary_key"] as $k => $v) {
                    if(empty($v)) {
                        $parametros["primary_key"][$k] = DB::getPdo()->lastInsertId();
                    }
                }
            }

            $parametros["status"] = "i";
            $parametros["type"] = "success";
            $parametros["msg"] = "SE GUARDO CORRECTAMENTE";
            return $parametros;


        } catch (\Illuminate\Database\QueryException $e) {
            $parametros["status"] = "ei";
            $parametros["msg"] = $e->getMessage();
            $parametros["type"] = "error";
            return $parametros;

        }

    }

    public function modificar($parametros) {
       

        try {
           
            foreach ($parametros["datos"] as $key => $value) {
                if($this->validarLogCampos($parametros["tabla"], "M")) {
                    $parametros["datos"][$key]["updated_at"] = date("Y-m-d H:i:s").". 000";
                    $parametros["datos"][$key]["user_updated"] = auth()->id();
                    
                }

                $where = array();
                $where = $parametros["primary_key"];
               
            

                $update = DB::table($parametros["tabla"])
                ->where($where);

                $update->update($parametros["datos"][$key]);
            }
         

            $parametros["status"] = "m";
            // $parametros["id"] = $valorid;
            $parametros["msg"] = "SE MODIFICÓ CORRECTAMENTE!";
            $parametros["type"] = "success";

            return $parametros;

        } catch (\Illuminate\Database\QueryException $e) {
            $parametros["status"] = "em";
            // $parametros["id"] = $valorid;
            $parametros["msg"] = $e->getMessage();
            $parametros["type"] = "error";
            return $parametros;
          
        }

    }


    public function eliminar($parametros) {
        try {
            $where = array();
            $where = $parametros["primary_key"];

            $delete = DB::table($parametros["tabla"])
            ->where($where);

            $estado =  $delete->delete();
            
            // $estado = DB::table($array[0])->where($array[1], $_REQUEST["id"])->delete();
        
            if ($estado) {

                $parametros["status"] = "e";
                // $parametros["id"] = $valorid;
                $parametros["msg"] = "SE ELIMINO CORRECTAMENTE!";
                $parametros["type"] = "success";
    
                return $parametros;

                // return array(
                //     "status" => "e",
                //     "id" => $_REQUEST["id"],
                //     "type" => "success",
                //     "msg" => "SE ELIMINO CORRECTAMENTE!"
                // );
            } else {

                $parametros["status"] = "ee";
                // $parametros["id"] = $valorid;
                $parametros["msg"] = "ERROR AL ELIMINAR!";
                $parametros["type"] = "error";
    
                return $parametros;

                // return array(
                //     "status" => "ee",
                //     "id" => $_REQUEST["id"],
                //     "type" => "error",
                //     "msg" => "ERROR AL ELIMINAR!"
                // );
            }
        
        } catch (\Illuminate\Database\QueryException $e) {
            $parametros["status"] = "ee";
            // $parametros["id"] = $valorid;
            $parametros["msg"] = $e->getMessage();
            $parametros["type"] = "error";
            return $parametros;

            // return array(
            //     "status" => "ee",
            //     "id" => $_REQUEST["id"],
            //     "msg" => $e->getMessage(),
            //     "type" => "error"
            // );
           
        }


    }

    public function anular($array) {

        try {
            $data = array(
                "estado" => 'I'
            );

            if($this->validarLogCampos($array[0], "M")) {
                $data["fecha_ultima_anulacion"] = date("Y-m-d H:i:s");
                $data["usuario_ultima_anulacion"] = session("usuario_user");
               
            }


           

            $estado = DB::table($array[0])
            ->where($array[1], $_REQUEST["id"])
            ->update($data);

         

            if ($estado) {
                return array(
                    "status" => "a",
                    "id" => $_REQUEST["id"],
                    "type" => "success",
                    "msg" => "SE ANULÓ CORRECTAMENTE!"
                );
            } else {
                return array(
                    "status" => "ea",
                    "id" => $_REQUEST["id"],
                    "type" => "error",
                    "msg" => "ERROR AL ANULAR!"
                );
            }

        } catch (\Illuminate\Database\QueryException $e) {

            return array(
                "status" => "ea",
                "id" => $_REQUEST["id"],
                "msg" => $e->getMessage(),
                "type" => "error"
            );

        }




    }

    public function activar($array) {
        try {
            $data = array(
                "estado" => 'A'
            );
            if($this->validarLogCampos($array[0], "A")) {
                $data["fecha_ultima_activacion"] = date("Y-m-d H:i:s");
                $data["usuario_ultima_activacion"] = session("usuario_user");
           
            }


            $estado = DB::table($array[0])
            ->where($array[1], $_REQUEST["id"])
            ->update($data);

            $db_error = $this->db->error();

         
            if ($estado) {
                return array(
                    "status" => "ac",
                    "id" => $_REQUEST["id"],
                    "type" => "success",
                    "msg" => "SE ACTIVO CORRECTAMENTE!"
                );
            } else {
                return array(
                    "status" => "eac",
                    "id" => $_REQUEST["id"],
                    "type" => "error",
                    "msg" => "ERROR AL ACTIVAR!"
                );
            }

        } catch (\Illuminate\Database\QueryException $e) {

            return array(
                "status" => "eac",
                "id" => $_REQUEST["id"],
                "msg" => $e->getMessage(),
                "type" => "error"
            );

        }

    }



    public function validarLogCampos($tabla, $operacion) {
        $camposLOG = array();
        $cont = 0;
        switch ($operacion) {
            case 'I':
                $camposLOG = $this->camposLogInsertar;
                break;
            case 'M':
                $camposLOG = $this->camposLogModificar;
                break;
            case 'E':
                $camposLOG = $this->camposLogEliminar;
                break;
           
        }

    
        $campos = $this->listar_campos($tabla);
        
        for ($i=0; $i < count($campos); $i++) {

            if(in_array($campos[$i], $camposLOG)) {
                $cont++;
            }
        }
       
        if($cont == 2) {
            return true;
        }
        return false;
    }

    public function listar_campos($tabla) {

        $campos = array();
        $tabla = explode(".", $tabla);
        // print_r($tabla);
        $schema = $tabla[0];
        $table = $tabla[1];

        $sql = "SELECT cols.column_name, cols.data_type
        FROM information_schema.columns cols
        WHERE cols.table_schema='{$schema}' AND cols.table_name= '{$table}'";

        $result = DB::select($sql);

        foreach ($result as $key => $value) {
            array_push($campos, $value->column_name);
        }

        return $campos;
    }

   


 

  


}
