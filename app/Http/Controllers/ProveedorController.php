<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Proveedor\ProveedorTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Proveedor\ProveedorInterface;
use App\Http\Requests\ProveedorRequest;
use App\Http\Recopro\TablaSunat\TablaSunatInterface;
use App\Http\Recopro\TypeCostumer\TypeCostumerInterface;
use App\Http\Recopro\TipoProveedor\TipoProveedorInterface;
use App\Http\Recopro\DocumentType\DocumentTypeInterface;
use App\Http\Recopro\Persona\PersonaInterface;
use App\Http\Recopro\ProveedorCuentaBanco\ProveedorCuentaBancoInterface;

use Carbon\Carbon;
use DB;
class ProveedorController extends Controller
{
     use ProveedorTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ProveedorInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'tipodoc','documento','razonsocial','contacto','direccion','correo_electronico','celular','ubigeo','id_tipoProveedor','IdTipoDocumento'];
        return parseList($repo->search($s), $request, 'id', $params);
    }
    public function createUpdate($id, ProveedorInterface $repo,PersonaInterface $rePer,ProveedorCuentaBancoInterface $cub, Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $table1="ERP_Persona"; 
            $idt1='idPersona';
            $dato=[];
            $dato['cDireccion'] = strtoupper($data['direccion']);
            $dato['cTipodocumento'] = strtoupper($data['tipodoc']);
            $dato['cNumerodocumento'] = strtoupper($data['documento']);
            $dato['cRegion'] =substr($data['distrito'], 0, 2);
            $dato['cProvincia'] =substr($data['distrito'], 0, 4);
            $dato['cUbigeo'] = strtoupper($data['distrito']);
            $dato['cEmail'] = strtoupper($data['correo_electronico']);
            $dato['cCelular'] = strtoupper($data['celular']);
            $dato['cEstadoCivil'] = strtoupper($data['cEstadoCivil']);
            $dato['cNombres'] = strtoupper($data['nombresP']);
            $dato['cApepat'] = strtoupper($data['apellidopP']);
            $dato['cApemat'] = strtoupper($data['apellidomP']);   
            $tip='06';
            $raz=strtoupper($data['razonsocial']);
            if($data['tipodoc']=='01'){
                 $tip='01';
                 $dato['cNombrePersona'] = strtoupper($data['razonsocial']);
                 $raz=null;
            }

            $idPersonacl='';
            $dato['cTipopersona'] = $tip;
            $dato['cRazonsocial'] = strtoupper($raz);
            $w = $rePer->findByCode($data['documento']);
            $val = $repo->findByCode($data['documento']);

            if ($id != 0) {
                if ($val && $val->id != $id) {
                    throw new \Exception('Ya existe un documento con este código. Por favor ingrese otro código.');
                }
                // $repo->update($id, $data);
            } else {
                if ($val) {
                    throw new \Exception('Ya existe un documento con este código. Por favor ingrese otro código.');
                }
                // $data['id'] = $repo->get_consecutivo($table,$idt);
                // $repo->create($data);
            };
            if ($id != 0 && $w) {
                $datos_cliente = $repo->find($id);
                if ($w && $w->idPersona != $datos_cliente[0]->idPersona) {

                    // throw new \Exception('Ya existe un documento con este código. Por favor ingrese otro código. dddd');
                }
                $dataper=$rePer->update($w->idPersona, $dato);
                $idPersonacl=$w->idPersona;
            } else {
                if ($w) {
                     // $datos_cliente = $repo->find($id);
                     $dataper=$rePer->update($w->idPersona, $dato);
                     $idPersonacl=$w->idPersona;
                    // throw new \Exception('Ya existe un documento con este código. Por favor ingrese otro código.');

                }else{
                    $dato['idPersona'] = $repo->get_consecutivo($table1,$idt1);
                    $dataper=$rePer->create($dato);
                    $idPersonacl=$dataper->idPersona;
                }
                

            };

          

            $table="ERP_Proveedor";
            $idt='id';
            $data['tipodoc'] = strtoupper($data['tipodoc']);
            $data['documento'] = strtoupper($data['documento']);
            $data['razonsocial'] = strtoupper($data['razonsocial']);
            $data['contacto'] = strtoupper($data['contacto']);
            $data['direccion'] = strtoupper($data['direccion']);
            $data['correo_electronico'] = strtoupper($data['correo_electronico']);
            $data['celular'] = strtoupper($data['celular']);
            $data['telefono'] = strtoupper($data['telefono']);
            $data['ubigeo'] = $data['distrito'];
            $data['cEstadoCivil'] = strtoupper($data['cEstadoCivil']);
            $data['idPersona']= $idPersonacl;

            $w = $repo->findByCode($data['documento']);
            if ($id != 0) {
              
                if ($w && $w->id != $id) {
                    throw new \Exception('Ya existe un documento con este código. Por favor ingrese otro código.');
                }
                
                $dataper=$repo->update($id,$data);
                $idProve=$id;
               

            } else {
                
                if ($w) {
                    throw new \Exception('Ya existe un documento con este código. Por favor ingrese otro código.');
                }
                $data['id'] = $repo->get_consecutivo($table,$idt);
               
                $dataper=$repo->create($data);
                $idProve=$dataper->id;
            };
             


            $idarray = $data['idarray'];
            $idarray = explode(',', $idarray);

            $idBanco_array = $data['idBanco_array'];
            $idBanco_array = explode(',', $idBanco_array);

            $idBancoDescripcion_array = $data['idBancoDescripcion_array'];
            $idBancoDescripcion_array = explode(',', $idBancoDescripcion_array);

            $idMoneda_array = $data['idMoneda_array'];
            $idMoneda_array = explode(',', $idMoneda_array);


            $nrocuenta_array = $data['nrocuenta_array'];
            $nrocuenta_array = explode(',', $nrocuenta_array);
            $tablelMd='ERP_ProveedorCuentaBanco';
            $idtMd='Id';
            
            if(count($data['idarray'])>0){
               for ($i=0; $i < count($idarray) ; $i++) { 
                if($idarray[$i]==0){
                     $cub->create([
                                'idProveedor' => $idProve,
                                'IdBanco' => $idBanco_array[$i],
                                'IdMoneda' => $idMoneda_array[$i],
                                'Descripcion' => $idBancoDescripcion_array[$i],
                                'Nrocuenta'=> $nrocuenta_array[$i],
                                'Id'=> $cub->get_consecutivo($tablelMd,$idtMd),
                      ]);
                      
                }
                } 
            }

            DB::commit();
            return response()->json([
                'status' => true,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function create(ProveedorInterface $repo,PersonaInterface $rePer, Request $request)
    {
        

        $data = $request->all();

        $table="ERP_Proveedor";
        $id='id';
        $data['id'] = $repo->get_consecutivo($table,$id);
        $data['tipodoc'] = strtoupper($data['tipodoc']);
        $data['documento'] = strtoupper($data['documento']);
        $data['razonsocial'] = strtoupper($data['razonsocial']);
        $data['contacto'] = strtoupper($data['contacto']);
        $data['direccion'] = strtoupper($data['direccion']);
        $data['correo_electronico'] = strtoupper($data['correo_electronico']);
        $data['celular'] = strtoupper($data['celular']);
        
        $repo->create($data);
        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }
    public function data_form (ProveedorInterface $tipodoc)
    {
       
        $tipo_doc = $tipodoc->gte_tipo_doc();
        $tipo_clie = $tipodoc->tipo_clie();
        $tipo_prove = $tipodoc->tipo_proveedor();
        $tipoc_doc_venta = $tipodoc->tipoc_doc_venta();
        $tipo_persona=$tipodoc->getPersona();
        $moneda=$tipodoc->getMoneda();
        $idBanco=$tipodoc->getBanco();
        return response()->json([
            'status' => true,
            'tipoc_doc' => $tipo_doc,
            'tipo_clie' => $tipo_clie,
            'tipoc_doc_venta'=>$tipoc_doc_venta,
            'tipo_persona'=>$tipo_persona,
            'tipo_prove'=>$tipo_prove,
            'moneda'=>$moneda,
            'idBanco'=>$idBanco,
        ]);
    }
    public function update(ProveedorInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['id'];
        $data['tipodoc'] = strtoupper($data['tipodoc']);
        $data['documento'] = strtoupper($data['documento']);
        $data['razonsocial'] = strtoupper($data['razonsocial']);
        $data['contacto'] = strtoupper($data['contacto']);
        $data['direccion'] = strtoupper($data['direccion']);
        $data['correo_electronico'] = strtoupper($data['correo_electronico']);
        $data['celular'] = strtoupper($data['celular']);
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(ProveedorInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $data = $repo->find($id);
        $repo->destroy($id,$data[0]->idPersona);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }
     public function getTipoDocumento(TablaSunatInterface $repo)
    {
        return parseSelect($repo->allTipoDocumento(), 'cCodigo', 'cDescripcion');
    }
    public function getTipoPersona(TablaSunatInterface $repo)
    {
        return parseSelect($repo->allTipoPersona(), 'cCodigo', 'cDescripcion');
    }
     public function getTipoCliente(TipoProveedorInterface $repo)
    { 
        return parseSelect($repo->allActive(), 'id', 'descripcion');
    }
      public function getTipoDocumentoVenta(DocumentTypeInterface $repo)
    {
        return parseSelect($repo->all(), 'IdTipoDocumento', 'Descripcion');
    }
    public function deleteDetalleBanco($id, ProveedorCuentaBancoInterface $repo, Request $request)
    {   try {
            $val=$repo->destroy($id);
            return response()->json([
                'status' => true,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function excel(ProveedorInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE PROVEEDORES', 'Proveedores');
    }
    public function find($id, ProveedorInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $dataDetalle = $repo->findDetalle($id);
            return response()->json([
                'status' => true,
                'data' => $data,
                'dataDetalle'=>$dataDetalle,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 
    public function get_cliente_documento($id, ProveedorInterface $repo)
    {
        try {
            $data = $repo->get_cliente_document($id);
            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 
}
