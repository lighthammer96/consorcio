<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 05/07/2017
 * Time: 10:58 AM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\PaymentCondition\PaymentConditionInterface;
use App\Http\Recopro\PaymentCondition\PaymentConditionTrait;
use Illuminate\Http\Request;

class PaymentConditionController extends controller
{
    use PaymentConditionTrait;

    public function all(Request $request, PaymentConditionInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'code', 'days', 'description'];
        $data = $repo->search($s);
        $info = parseDataList($data, $request, 'id', $params);
        $data = $info[1];
        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function create(PaymentConditionInterface $repo, Request $request)
    {
        try {
            $data = $request->all();
            $pc = $repo->findByCode($data['code']);
            if ($pc) {
                throw new \Exception('Ya existe una condición de pago con este código. Por favor ingrese otro código.');
            }
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


    public function update(PaymentConditionInterface $repo, Request $request)
    {
        try {
            $data = $request->all();
            $id = $data['id'];
            $pc = $repo->findByCode($data['code']);
            if ($pc && $pc->id != $id) {
                throw new \Exception('Ya existe una condición de pago con este código. Por favor ingrese otro código.');
            }
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

    public function destroy(PaymentConditionInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function excel(PaymentConditionInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CONDICIONES DE PAGO', 'Condiciones de Pago');
    }
}