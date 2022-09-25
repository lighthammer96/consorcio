<?php
/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 22/06/2017
 * Time: 12:20 AM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\Departure\DepartureInterface;
use App\Http\Recopro\Departure\DepartureTrait;
use App\Http\Recopro\DepartureProduct\DepartureProductInterface;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\Stock\StockInterface;
use App\Http\Recopro\TransferDetail\TransferDetailInterface;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;

class DepartureController extends Controller
{
    use DepartureTrait;

    public function all(Request $request, DepartureInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'departure_date', 'user_id', 'warehouse_id', 'state_departure', 'state_description'];
        $data = $repo->search($s);
        $info = parseDataList($data, $request, 'id', $params);
        $data = $info[1];

        foreach ($data as $d) {
            $d->departure_date = Carbon::parse($d->departure_date)->format('d/m/Y');
            $d->warehouse_d = ($d->warehouse) ? $d->warehouse->description : '';
            $d->name = ($d->user) ? $d->user->name : '';
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function createUpdate($id, DepartureInterface $repo, Request $request, DepartureProductInterface $wuRepo,
                                 TransferDetailInterface $trans, StockInterface $stock, ProductInterface $prod)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['departure_date'] = Carbon::createFromFormat('d/m/Y', $data['departure_date']);
            $data['state_description'] = ($data['state_departure'] === 0) ? 'GUARDADO' : 'PROCESADO';
            $product = explode(',', $request->input('product'));
            $price = explode(',', $request->input('price'));
            $departures = explode(',', $request->input('departures'));
            unset($data['id'], $data['product'], $data['price'], $data['departures']);
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $Departure = $repo->create($data);
                $id = $Departure->id;
            }

            $wuRepo->deleteByDeparture($id, $product);

            $code_transfer = 'S' . $id;
            $data_prod['average_cost'] = '';
            $trans->deleteByTransfer($code_transfer, $product);
            if ($product != '') {
                foreach ($product as $item => $k) {
                    $wuRepo->createUpdate([
                        'departure_id' => $id,
                        'product_id' => $product[$item],
                        'price' => 0.00,
                        'quantity' => $departures[$item]
                    ]);
                    if ($data['state_departure'] === 1) {
                        $data_product = $prod->find($product[$item]);

                        $stock->createUpdate([
                            'product_id' => $product[$item],
                            'warehouse_id' => $data['warehouse_id'],
                            'stock' => $departures[$item],
                            'stock_transit' => 0.00,
                            'stock_available' => $departures[$item],
                            'condition' => 0,
                        ]);

                        $trans->createUpdate([
                            'code_transfer' => $code_transfer,
                            'product_id' => $product[$item],
                            'warehouse_id' => $data['warehouse_id'],
                            'type_transfer_id' => 2,
                            'date_transfer' => $data['departure_date'],
                            'quantity' => $departures[$item],
                            'price' => 0.00,
                            'costs' => $data_product->average_cost,
                            'observation' => $data['observation'],
                            'nature_id' => '1'

                        ]);
                    }
                }
            }

            DB::commit();
            return response()->json(['status' => true]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function find($id, DepartureInterface $repo, StockInterface $stockRepo)
    {
        try {
            $data = $repo->find($id);
            $data['departure_date'] = Carbon::parse($data->departure_date)->format('d/m/Y');

            $prod = [];
            foreach ($data->DepartureProduct as $bp) {
                $stock = $stockRepo->findByWareHouseProduct($bp->product->id, $data->warehouse_id);
                $prod[] = [
                    'id' => $bp->product->id,
                    'code_article' => $bp->product->code_article,
                    'description_detail' => $bp->product->description_detail,
                    'price' => $bp->price,
                    'quantity' => $bp->quantity,
                    'stock_p' => $stock->stock,
                    'average_cost' => $bp->product->average_cost,
                    'state_departure' => $data->state_departure
                ];
            }
            $data['product'] = $prod;

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

    public function data_form(WarehouseInterface $ware)
    {
//        $warehouse = parseSelectOnly($ware->all(), 'id', 'description');
        $warehouse = parseSelectAndCodeOnly($ware->all(), 'id', 'description', 'code_internal', 'address', 'local');

        return response()->json([
            'status' => true,
            'warehouse' => $warehouse
        ]);

    }

    public function excel(DepartureInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE SALIDAS', 'Salidas');
    }

    public function destroy(DepartureInterface $repo, Request $request, DepartureProductInterface $wuRepo,
                            TransferDetailInterface $trans)
    {
        DB::beginTransaction();
        try {
            $id = $request->input('id');
            $repo->destroy($id);

            $wuRepo->deleteByDepartureAll($id);

            $id_transfer = 'S' . $id;
            $trans->deleteByCode($id_transfer);

            DB::commit();
            return response()->json(['Result' => 'OK']);


        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'Result' => 'OK',
                'message' => $e->getMessage()
            ]);
        }
    }
}