<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 21/06/2017
 * Time: 05:34 PM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\Entry\EntryInterface;
use App\Http\Recopro\Entry\EntryTrait;
use App\Http\Recopro\EntryProduct\EntryProductInterface;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\Stock\StockInterface;
use App\Http\Recopro\TransferDetail\TransferDetailInterface;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use App\Http\Requests\EntryRequest;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class EntryController extends Controller
{
    use EntryTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, EntryInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'entry_date', 'user_id', 'warehouse_id', 'state_entry', 'state_description'];
        $data = $repo->search($s);
        $info = parseDataList($data, $request, 'id', $params);
        $data = $info[1];

        foreach ($data as $d) {
            $d->entry_date = Carbon::parse($d->entry_date)->format('d/m/Y');
            $d->warehouse_e = ($d->Warehouse) ? $d->Warehouse->description : '';
            $d->name = ($d->user) ? $d->user->name : '';
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function createUpdate($id, EntryInterface $repo, Request $request, EntryProductInterface $wuRepo, TransferDetailInterface $trad,
                                 StockInterface $stock, ProductInterface $prod)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['entry_date'] = Carbon::createFromFormat('d/m/Y', $data['entry_date']);
            $data['state_description'] = ($data['state_entry'] === 0) ? 'GUARDADO' : 'PROCESADO';
            $product = explode(',', $request->input('product'));
            $price = explode(',', $request->input('price'));
            $entries = explode(',', $request->input('entries'));
            $entries_before = explode(',', $request->input('entries_before'));
            unset($data['id'], $data['product'], $data['price'], $data['entries']);
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $Entry = $repo->create($data);
                $id = $Entry->id;
            }

            $wuRepo->deleteByEntry($id, $product);

            $code_transfer = 'I' . $id;
            $data_prod['average_cost'] = '';
            $trad->deleteByTransfer($code_transfer, $product);
            foreach ($product as $item => $k) {
                $wuRepo->createUpdate([
                    'entry_id' => $id,
                    'product_id' => $product[$item],
                    'price' => $price[$item],
                    'quantity' => $entries[$item]
                ]);

                if ($data['state_entry'] === 1) {
                    $data_product = $prod->find($product[$item]);

                    $sum_stock = $stock->findByStock($product[$item]);

                    if ($sum_stock == null) {
                        $sum_stock = 0.00;
                    }
                    if ($data_product->average_cost == null) {
                        $costs_calculated = $price[$item];
                        $data_prod['average_cost'] = $costs_calculated;
                    } else {
                        $t1 = $data_product->average_cost * $sum_stock;
                        $t2 = $price[$item] * $entries[$item];
                        $stock_total = $sum_stock + $entries[$item];
                        //  dd($stock_total);
                        $costs_calculated = ($stock_total === 0 || $stock_total === 0.0) ? 0 : ($t1 + $t2) / $stock_total;
                        $data_prod['average_cost'] = $costs_calculated;
                    }
                    $prod->update($product[$item], $data_prod);


                    $stock->createUpdate([
                        'product_id' => $product[$item],
                        'warehouse_id' => $data['warehouse_id'],
                        'stock' => $entries[$item],
                        'stock_transit' => 0.00,
                        'stock_available' => $entries[$item],
                        'condition' => 1
                    ]);

                    $trad->createUpdate([
                        'code_transfer' => $code_transfer,
                        'product_id' => $product[$item],
                        'warehouse_id' => $data['warehouse_id'],
                        'type_transfer_id' => 1,
                        'date_transfer' => $data['entry_date'],
                        'quantity' => $entries[$item],
                        'price' => $price[$item],
                        'costs' => $costs_calculated,
                        'observation' => $data['observation'],
                        'nature_id' => '0'

                    ]);
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

    public function data_form(WarehouseInterface $ware)
    {
        $warehouse = parseSelectAndCodeOnly($ware->all(), 'id', 'description', 'code_internal', 'address', 'local');

        return response()->json([
            'status' => true,
            'warehouse' => $warehouse
        ]);
    }

    public function find($id, EntryInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $data['entry_date'] = Carbon::parse($data->entry_date)->format('d/m/Y');

            $prod = [];
            foreach ($data->EntryProduct as $bp) {
                $prod[] = [
                    'id' => $bp->product->id,
                    'code_article' => $bp->product->code_article,
                    'description_detail' => $bp->product->description_detail,
                    'price' => $bp->price,
                    'quantity' => $bp->quantity,
                    'state_entry' => $data->state_entry
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

    public function excel(EntryInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE INGRESOS', 'Ingresos');
    }

    public function destroy(EntryInterface $repo, Request $request, EntryProductInterface $wuRepo, TransferDetailInterface $trand)
    {
        DB::beginTransaction();
        try {
            $id = $request->input('id');
            $repo->destroy($id);

            $wuRepo->deleteByEntryAll($id);

            $id_transfer = 'I' . $id;
            $trand->deleteByCode($id_transfer);

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


