<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Persona\PersonaTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Persona\PersonaInterface;
use App\Http\Recopro\ViewPersona\ViewPersonaInterface;
use App\Http\Requests\PersonaRequest;
use DB;
class PersonaController extends Controller
{
     use PersonaTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ViewPersonaInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idPersona','cNumerodocumento','cTipodocumento','cRazonsocial','cNombrePersona','cDepartamento','created_at','cProvincia','cDistrito','TipoPersona','cTipopersona','TipoDocumento'];
        return parseList($repo->search($s), $request, 'idPersona', $params);
    }
    public function createUpdate($id, PersonaInterface $repo, Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $table="ERP_Persona";
            $idt='idPersona';
            $data['cTipopersona'] = strtoupper($data['cTipopersona']);
            $data['cDireccion'] = strtoupper($data['cDireccion']);
            $data['cReferencia'] = strtoupper($data['cReferencia']);
            $data['cDigitoVerificador'] = strtoupper($data['cDigitoVerificador']);
            $data['cTipodocumento'] = strtoupper($data['cTipodocumento']);
            $data['cNumerodocumento'] = strtoupper($data['cNumerodocumento']);
            $data['dFechacaducidad'] = $data['dFechacaducidad'];
            $data['cRegion'] =substr($data['cUbigeo'], 0, 2);
            $data['cProvincia'] =substr($data['cUbigeo'], 0, 4);
            $data['cUbigeo'] = strtoupper($data['cUbigeo']);
            $data['cEmail'] = strtoupper($data['cEmail']);
            $data['cCelular'] = strtoupper($data['cCelular']);
            $data['dFechanacimiento'] = $data['dFechanacimiento'];
            $data['cEstadoCivil'] = strtoupper($data['cEstadoCivil']);
            $data['cApepat'] = strtoupper($data['cApepat']);
            $data['cApemat'] = strtoupper($data['cApemat']);
            $data['cNombres'] = strtoupper($data['cNombres']);
            $data['cRazonsocial'] = strtoupper($data['cRazonsocial']);
            $data['cNombrePersona'] = strtoupper($data['cNombrePersona']);
            // if( $data['cTipopersona']=='01'){
            //      $data['cNombrePersona'] = $data['cApepat'].' '.$data['cApemat'].' '.  $data['cNombrePersona'];
            // }
          
            $data['cSexo'] = strtoupper($data['cSexo']);
            $w = $repo->findByCode($data['cNumerodocumento']);
            if ($id != 0) {
                if ($w && $w->idPersona != $id) {
                    throw new \Exception('Ya existe un documento con este código. Por favor ingrese otro código.');
                }
                $repo->update($id, $data);
            } else {
                if ($w) {
                    throw new \Exception('Ya existe un documento con este código. Por favor ingrese otro código.');
                }
                $data['idPersona'] = $repo->get_consecutivo($table,$idt);
                $repo->create($data);
            };
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
     public function find($id, PersonaInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $data['dFechacaducidad2']='';
            $data['dFechanacimiento2']='';
            if($data[0]->dFechacaducidad!=null){
                $data['dFechacaducidad2']=date("Y-m-d", strtotime($data[0]->dFechacaducidad));
            }
            if($data[0]->dFechanacimiento!=null){
                $data['dFechanacimiento2']=date("Y-m-d", strtotime($data[0]->dFechanacimiento));
            }
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
    public function create(PersonaInterface $repo, PersonaRequest $request)
    {
        $data = $request->all();
        $table="ERP_Categoria";
        $id='idCategoria';
        $data['idCategoria'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(PersonaInterface $repo, PersonaRequest $request)
    {
        $data = $request->all();
        $id = $data['idCategoria'];
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(PersonaInterface $repo, Request $request)
    {
        $id = $request->input('idPersona');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(PersonaInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE PERSONAS', 'Personas');
    }


    public function get_persona_documento($id, PersonaInterface $repo)
    {
        try {
            $data = $repo->get_persona_documento($id);
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
