<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 16/08/2017
 * Time: 06:14 PM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\ConsumerReturn\ConsumerReturnInterface;
use App\Http\Recopro\ConsumerReturn\ConsumerReturnTrait;
use App\Http\Recopro\ConsumerReturnProduct\ConsumerReturnProductRepository;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\Stock\StockInterface;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;


class ConsumerReturnController extends Controller
{
    use ConsumerReturnTrait;

    public function all(Request $request, ConsumerReturnInterface $repo)
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


    public function createUpdate($id, Request $request, ConsumerReturnInterface $repo, ConsumerReturnProductRepository $wuRepo,
                                 ProductInterface $prod, StockInterface $stock)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['date'] = Carbon::createFromFormat('d/m/Y', $data['date']);
            $data['state_description'] = ($data['state_consumer_return'] === 0) ? 'GUARDADO' : 'PROCESADO';
            $product = explode(',', $request->input('product'));
            $toConsumeReturn = explode(',', $request->input('toConsumeReturn'));
            unset($data['id'], $data['product'], $data['toConsumeReturn']);
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $cReturn = $repo->create($data);
                $id = $cReturn->id;
            }

            $wuRepo->deleteByConsumerReturn($id, $product);

            if ($product != '') {
                foreach ($product as $item => $k) {
                    $data_product = $prod->find($product[$item]);
                    $wuRepo->createUpdate([
                        'consumer_return_id' => $id,
                        'product_id' => $product[$item],
                        'toReturn' => $toConsumeReturn[$item],
                        'code' => $data_product->code_article,
                        'description' => $data_product->description_detail,
                        'unit' => $data_product->um_id,
                        'cost' => $data_product->average_cost,
                        'state' => $data['state_consumer_return']
                    ]);
                    if ($data['state_consumer_return'] === 1) {
                        $stock->createUpdate([
                            'product_id' => $product[$item],
                            'warehouse_id' => $data['warehouse_id'],
                            'stock' => $toConsumeReturn[$item],
                            'stock_transit' => 0.00,
                            'stock_available' => $toConsumeReturn[$item],
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

    public function find($id, ConsumerReturnInterface $repo, StockInterface $stockRepo)
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
            if (isset($data->front)) {
                $data['front_code'] = $data->front->code;
                $data['front_description'] = $data->front->description;
            } else {
                $data['front_code'] = '';
                $data['front_description'] = '';
            }
            unset($data->project, $data->front);
            $prod = [];
            foreach ($data->ConsumerReturnProduct as $bp) {
                $u = $bp->product->unity;
                $stock = $stockRepo->findByWareHouseProduct($bp->product->id, $data->warehouse_id);
                $prod[] = [
                    'id' => $bp->product->id,
                    'code_article' => $bp->code,
                    'description_detail' => $bp->description,
                    'um_id' => $bp->unit,
                    'um' => (is_null($u->symbol)) ? $u->Descripcion : $u->symbol,
                    'stock_p' => $stock->stock,
                    'average_cost' => $bp->cost,
                    'refund_amount' => $bp->refund_amount,
                    'toReturn' => $bp->toReturn,
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


    public function data_form(WarehouseInterface $ware)
    {
        $warehouse = parseSelectAndCodeOnly($ware->all(), 'id', 'description', 'code_internal', 'address', 'local');

        return response()->json([
            'status' => true,
            'warehouse' => $warehouse
        ]);
    }

    public function excel(ConsumerReturnInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DEVOLUCIÓN DE CONSUMO', 'DEVOLUCIÓN DE CONSUMO');
    }
}