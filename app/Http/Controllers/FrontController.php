<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/6/2017
 * Time: 10:22 AM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Front\FrontInterface;
use App\Http\Recopro\Front\FrontTrait;
use Illuminate\Http\Request;
use App\Http\Requests\FrontRequest;

class FrontController extends Controller
{
    use FrontTrait;

    public function all(Request $request, FrontInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'code', 'description', 'entity_id'];
        $data = $repo->search($s);
        $info = parseDataList($data, $request, 'id', $params);
        $data = $info[1];

        foreach ($data as $d) {
            $d->NombreEntidad = ($d->entity) ? $d->entity->NombreEntidad : '';
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function createUpdate($id, FrontInterface $repo, Request $request)
    {
        try {
            $data = $request->all();
            unset($data['id']);
            $f = $repo->findByCode($data['code']);
            if ($id != 0) {
                if ($f && $f->id != $id) {
                    throw new \Exception('Ya existe frente con este código. Por favor ingrese otro código.');
                }
                $repo->update($id, $data);
            } else {
                if ($f) {
                    throw new \Exception('Ya existe frente con este código. Por favor ingrese otro código.');
                }
                $repo->create($data);
            }
            return response()->json(['status' => true]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function find($id, FrontInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $data['entity'] = $data->entity;
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

    public function destroy(FrontInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function excel(FrontInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE FRENTES', 'Frentes');
    }

    public function search(Request $request, FrontInterface $repo)
    {
        $q = $request->input('q');

        $info = $repo->search($q)->take(5)->get();
        $data = [];
        foreach ($info as $i) {
            $entity = $i->entity;
            $e = '';
            if (count($entity) > 0) {
                $e = (is_null($entity->NombreEntidad)) ? $entity->RazonSocial : $entity->NombreEntidad;
            }
            $data[] = [
                'id' => $i->id,
                'text' => $i->code.' - '.$i->description,
                'code' => $i->code,
                'description' => $i->description,
                'entity' => $e
            ];
        }

        return response()->json([
            'status' => true,
            'items' => $data
        ]);
    }

}