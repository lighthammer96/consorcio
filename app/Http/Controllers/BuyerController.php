<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/6/2017
 * Time: 10:22 AM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Buyer\BuyerInterface;
use App\Http\Recopro\Buyer\BuyerTrait;
use Illuminate\Http\Request;
use App\Http\Requests\BuyerRequest;

class BuyerController extends Controller
{
    use BuyerTrait;

    public function all(Request $request, BuyerInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'code', 'description', 'user_id', 'state'];
        $data = $repo->search($s);
        $info = parseDataList($data, $request, 'id', $params);
        $data = $info[1];
        foreach ($data as $d) {
            $d->name = $d->user->name;
            $d->username = $d->user->username;
        }
        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function createUpdate($id, BuyerInterface $repo, Request $request)
    {
        try {
            $data = $request->all();
            unset($data['id']);
            $b = $repo->findByCode($data['code']);
            if ($id != 0) {
                if ($b && $b->id != $id) {
                    throw new \Exception('Ya existe un comprador con este código. Por favor ingrese otro código.');
                }
                $repo->update($id, $data);
            } else {
                if ($b) {
                    throw new \Exception('Ya existe un comprador con este código. Por favor ingrese otro código.');
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

    public function find($id, BuyerInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $data['user'] = $data->user;
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

    public function destroy(BuyerInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function excel(BuyerInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE COMPRADORES', 'Compradores');
    }

}