<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 17/07/2017
 * Time: 10:27 AM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\Consumption\ConsumptionInterface;
use App\Http\Recopro\Consumption\ConsumptionTrait;
use App\Http\Recopro\ConsumptionProduct\ConsumptionProductInterface;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\Requirement\RequirementInterface;
use App\Http\Recopro\Stock\StockInterface;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;

class ConsumptionController extends controller
{
    use ConsumptionTrait;

    public function all(Request $request, ConsumptionInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'date', 'project_id', 'user_id', 'warehouse_id', 'state_description'];
        $data = $repo->search($s);
        $info = parseDataList($data, $request, 'id', $params);
        $data = $info[1];

        foreach ($data as $d) {
            $d->date = Carbon::parse($d->date)->format('d/m/Y');
            $d->warehouse_o = ($d->warehouse) ? $d->warehouse->description : '';
            $d->description_project = ($d->project) ? $d->project->description : '';
            $d->name = ($d->user) ? $d->user->name : '';
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function getArticles(Request $request, RequirementInterface $repo)
    {
        $inputs = $request->all();

        $params = ['*'];

        $info = parseDataList($repo->search($inputs), $request, 'id', $params);

        $data = $info[1];

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function createUpdate($id, Request $request, ConsumptionInterface $repo, ConsumptionProductInterface $wuRepo,
                                 ProductInterface $prod, StockInterface $stock)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['date'] = Carbon::createFromFormat('d/m/Y', $data['date']);
            $data['state_description'] = ($data['state_consumption'] === 0) ? 'GUARDADO' : 'PROCESADO';
            $product = explode(',', $request->input('product'));
            $toConsume = explode(',', $request->input('toConsume'));
            unset($data['id'], $data['product'], $data['toConsume']);
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $Departure = $repo->create($data);
                $id = $Departure->id;
            }

            $wuRepo->deleteByConsumption($id, $product);

            if ($product != '') {
                foreach ($product as $item => $k) {
                    $data_product = $prod->find($product[$item]);
                    $wuRepo->createUpdate([
                        'consumption_id' => $id,
                        'product_id' => $product[$item],
                        'toConsume' => $toConsume[$item],
                        'code' => $data_product->code_article,
                        'description' => $data_product->description_detail,
                        'unit' => $data_product->um_id,
                        'cost' => $data_product->average_cost,
                        'state' => $data['state_consumption']
                    ]);
                    if ($data['state_consumption'] === 1) {
                        $stock->createUpdate([
                            'product_id' => $product[$item],
                            'warehouse_id' => $data['warehouse_id'],
                            'stock' => $toConsume[$item],
                            'stock_transit' => 0.00,
                            'stock_available' => $toConsume[$item],
                            'condition' => 0,
                        ]);
                    }
                }
            }

            DB::commit();
            return response()->json(['status' => true]);

        } catch (\Exception $e) {
            throw new  \Exception($e);
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function find($id, ConsumptionInterface $repo, StockInterface $stockRepo)
    {
        try {
            $data = $repo->find($id);
            $data['date'] = Carbon::parse($data->date)->format('d/m/Y');
            if (isset($data->project)) {
                $data['project_code'] = $data->project->code;
                $data['project_description'] = $data->project->description;
            } else {
                $data['project_code'] = '';
                $data['project_description'] = '';
            }
            if (isset($data->requirement)) {
                $data['requirement_code'] = $data->requirement->code;
            } else {
                $data['requirement_code'] = '';
            }
            if (isset($data->front)) {
                $data['front_code'] = $data->front->code;
                $data['front_description'] = $data->front->description;
            } else {
                $data['front_code'] = '';
                $data['front_description'] = '';
            }
            unset($data->project, $data->requirement, $data->front);
            $prod = [];
            foreach ($data->consumptionProduct as $bp) {
                $stock = $stockRepo->findByWareHouseProduct($bp->product->id, $data->warehouse_id);
                $u = $bp->product->unity;
                $prod[] = [
                    'id' => $bp->product->id,
                    'code_article' => $bp->code,
                    'description_detail' => $bp->description,
                    'um_id' => $bp->unit,
                    'um' => (is_null($u->symbol)) ? $u->Descripcion : $u->symbol,
                    'stock_p' => $stock->stock,
                    'average_cost' => $bp->cost,
                    'consumption' => $bp->consumption,
                    'toConsume' => $bp->toConsume,
                    'state' => $data['state_description']
                ];
            }
            $data['product'] = $prod;

            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
//            throw new  \Exception($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function excel(ConsumptionInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA CONSUMO', 'CONSUMO');
    }


}