<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 9:48 AM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Entity\EntityInterface;
use App\Http\Recopro\Entity\EntityTrait;
use App\Http\Requests\EntityRequest;
use Illuminate\Http\Request;

class EntityController extends Controller
{
    use EntityTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, EntityInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['IdEntidad as id', 'NombreEntidad as nombre_entidad', 'DireccionLegal as direccion_legal',
            'ApellidoPaterno as apellido_paterno', 'ApellidoMaterno as apellido_materno', 'Nombres', 'RazonSocial',
            'IdTipoPersona as tipo_persona', 'IdTipoDocumentoIdentidad as tipo_documento_identidad', 'Documento',
            'is_client', 'is_provider', 'contact', 'contact_phone'];
        return parseList($repo->search($s), $request, 'IdEntidad', $params);
    }

    public function providers(Request $request, EntityInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['IdEntidad as id', 'NombreEntidad', 'DireccionLegal', 'Documento', 'contact', 'contact_phone'];
        return parseList($repo->providers($s), $request, 'IdEntidad', $params);
    }

    public function clients(Request $request, EntityInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['IdEntidad as id', 'NombreEntidad', 'DireccionLegal', 'Documento'];
        return parseList($repo->clients($s), $request, 'IdEntidad', $params);
    }

    public function create(EntityInterface $repo, EntityRequest $request)
    {
        try {
            $data = $request->all();
            if ((int)$data['tipo_documento_identidad'] != 0) {
                $entity = $repo->findByDocument($data['tipo_documento_identidad'],  $data['Documento']);
                if (isset($entity)) {
                    throw new \Exception('Ya existe una entidad con este número de documento. Por favor ingrese otro número.');
                }
            }
            $name_entity = ($data['tipo_persona'] == 2) ? $data['RazonSocial'] :
                $data['apellido_paterno'] . ' ' . $data['apellido_materno'] . ' ' . $data['Nombres'];
            $data['NombreEntidad'] = $name_entity;
            $data['DireccionLegal'] = $data['direccion_legal'];
            $data['ApellidoPaterno'] = $data['apellido_paterno'];
            $data['ApellidoMaterno'] = $data['apellido_materno'];
            $data['IdTipoPersona'] = str_pad($data['tipo_persona'], 2, '0', STR_PAD_LEFT);
            $data['IdTipoDocumentoIdentidad'] = $data['tipo_documento_identidad'];
            $data['is_client'] = (isset($data['is_client'])) ? 1 : 0;
            $data['is_provider'] = (isset($data['is_provider'])) ? 1 : 0;
            $data['Tipo'] = 'A';

            $last_id = (int)$repo->last() + 1;
            $data['IdEntidad'] = str_pad($last_id, 10, "0", STR_PAD_LEFT);

            $repo->create($data);

            return response()->json([
                'Result' => 'OK',
                'Record' => []
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'Result' => 'ERROR',
                'Message' => [$e->getMessage()]
            ]);
        }
    }

    public function update(EntityInterface $repo, EntityRequest $request)
    {
        try {
            $data = $request->all();
            $id = $data['id'];
            if ((int)$data['tipo_documento_identidad'] != 0) {
                $entity_ = $repo->findByDocument($data['tipo_documento_identidad'],  $data['Documento']);
                if (isset($entity_) && $entity_->IdEntidad != $id) {
                    throw new \Exception('Ya existe una entidad con este número de documento. Por favor ingrese otro número.');
                }
            }
            $name_entity = ($data['tipo_persona'] == 2) ? $data['RazonSocial'] :
                $data['apellido_paterno'] . ' ' . $data['apellido_materno'] . ' ' . $data['Nombres'];
            $data['NombreEntidad'] = $name_entity;
            $data['DireccionLegal'] = $data['direccion_legal'];
            $data['ApellidoPaterno'] = $data['apellido_paterno'];
            $data['ApellidoMaterno'] = $data['apellido_materno'];
            $data['IdTipoDocumentoIdentidad'] = $data['tipo_documento_identidad'];
            $data['is_client'] = (isset($data['is_client'])) ? 1 : 0;
            $data['is_provider'] = (isset($data['is_provider'])) ? 1 : 0;
            $repo->update($id, $data);

            return response()->json([
                'Result' => 'OK'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'Result' => 'ERROR',
                'Message' => [$e->getMessage()]
            ]);
        }
    }

    public function destroy(EntityInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy(str_pad($id, 10, "0", STR_PAD_LEFT));
        return response()->json(['Result' => 'OK']);
    }

    public function excel(EntityInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE ENTIDADES', 'Entidades');
    }

    public function pdf(EntityInterface $repo)
    {
        $data = $this->generateDataExcel($repo->all());
        return generateDataPDF($data, 'landscape', 'logo.png');
    } 
}