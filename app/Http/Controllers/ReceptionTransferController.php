<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/04/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\ReceptionTransfer\ReceptionTransfer;
use App\Http\Recopro\ReceptionTransfer\ReceptionTransferInterface;
use App\Http\Recopro\ReceptionTransfer\ReceptionTransferTrait;
use App\Http\Recopro\ReceptionTransferProduct\ReceptionTransferProductInterface;
use App\Http\Recopro\Stock\StockInterface;
use App\Http\Recopro\TransferDetail\TransferDetailInterface;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;

class ReceptionTransferController extends Controller
{

    use ReceptionTransferTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ReceptionTransferInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'date', 'user_id', 'warehouse_origin_id', 'warehouse_destination_id', 'state_description'];
        $data = $repo->search($s);
        $info = parseDataList($data, $request, 'id', $params);
        $data = $info[1];

        foreach ($data as $d) {
            $d->transfer_date = Carbon::parse($d->date)->format('d/m/Y');
            $d->warehouse_o = ($d->warehouseOrigin) ? $d->warehouseOrigin->description : '';
            $d->warehouse_d = ($d->warehouseDestination) ? $d->warehouseDestination->description : '';
            $d->name = ($d->user) ? $d->user->name : '';
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function data_form(WarehouseInterface $ware)
    {
        $warehouse = parseSelectAndCodeOnly($ware->all(), 'id', 'description', 'code_internal', 'address', 'local');

        return response()->json([
            'status' => true,
            'warehouse' => $warehouse
        ]);

    }

    public function update($id, Request $request, ReceptionTransferInterface $repo, ReceptionTransferProductInterface $wuRepo,
                           StockInterface $stock, TransferDetailInterface $trans)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['date'] = Carbon::createFromFormat('d/m/Y', $data['transfer_date']);
            $product = explode(',', $request->input('product'));
            $toReceived = explode(',', $request->input('p_toReceived'));
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $receptionTransfer = $repo->create($data);
                $id = $receptionTransfer->id;
            }
            if ($product != '') {
                $code = 'TS' . $data['transfer_id'] . '2';
                foreach ($product as $item => $k) {
                    $wuRepo->update([
                        'reception_transfer_id' => $id,
                        'product_id' => $product[$item],
                        'toReceived' => $toReceived[$item],
                        'state' => $data['state_reception_transfer']
                    ]);
                    if ($data['state_reception_transfer'] === 1) {
                        $stock->createUpdate([
                            'product_id' => $product[$item],
                            'warehouse_id' => $data['warehouse_destination_id'],
                            'stock' => $toReceived[$item],
                            'stock_transit' => 0.00,
                            'stock_available' => $toReceived[$item],
                            'condition' => 1,
                        ]);
                        $data_row = $trans->findByCode($code, $product[$item]);
                        $transferred_before = $data_row->quantity;
                        $trans->createUpdate([
                            'product_id' => $product[$item],
                            'code_transfer' => $code,
                            'warehouse_id' => $data['warehouse_destination_id'],
                            'quantity' => $transferred_before + $toReceived[$item],
                            'transfer_id' => $data['transfer_id'],
                            'type_transfer_id' => 4,
                            'date_transfer' => $data['date'],
                            'price' => 0,
                            'nature_id' => '1'
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


    public function find($id, ReceptionTransferInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $data['transfer_date'] = Carbon::parse($data->transfer_date)->format('d/m/Y');
            $prod = [];
            foreach ($data->ReceptionTransferProduct as $bp) { /// TransferDetail
                $prod[] = [
                    'id' => $bp->product->id,
                    'code_article' => $bp->product->code_article,
                    'description_detail' => $bp->product->description_detail,
                    'um_id' => $bp->product->um_id,
                    'average_cost' => $bp->product->average_cost,
                    'available' => $bp->available,
                    'received' => $bp->received,
                    'toReceived' => $bp->toReceived
                ];
            }
            unset($data->TransferProduct);
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


    public function excel(ReceptionTransferInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA RECEPCIÓN DE TRANSFERENCIA', 'RECEPCIÓN');
    }


    public function pdf(Request $request, ReceptionTransferInterface $Repo)
    {
        $receptionTransfer = $request->input('reception_transfer_id');

        $data = $this->excelReceptionTransfer($receptionTransfer, $Repo);
//        dd($data['data'][0]);
        return generateDataReceptionTransfer($data, 'portrait', 'logo.png', 2);
    }

}
