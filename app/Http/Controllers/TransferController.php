<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/04/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\MotiveTransfer\MotiveTransferInterface;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\DocumentType\DocumentTypeInterface;
use App\Http\Recopro\ReceptionTransfer\ReceptionTransferInterface;
use App\Http\Recopro\ReceptionTransferProduct\ReceptionTransferProductInterface;
use App\Http\Recopro\ReferralGuide\ReferralGuideInterface;
use App\Http\Recopro\ReferralGuideProduct\ReferralGuideProductInterface;
use App\Http\Recopro\Stock\StockInterface;
use App\Http\Recopro\Transfer\TransferInterface;
use App\Http\Recopro\Transfer\TransferTrait;
use App\Http\Recopro\TransferDetail\TransferDetailInterface;
use App\Http\Recopro\TransferProduct\TransferProductInterface;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class TransferController extends Controller
{
    use TransferTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, TransferInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'transfer_date', 'user_id', 'warehouse_origin_id', 'warehouse_destination_id', 'state_transfer', 'type_description', 'state_description'];
        $data = $repo->search($s);
        $info = parseDataList($data, $request, 'id', $params);
        $data = $info[1];

        foreach ($data as $d) {
            $d->transfer_date = Carbon::parse($d->transfer_date)->format('d/m/Y');
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

    public function createUpdate($id, TransferInterface $repo, Request $request, TransferProductInterface $wuRepo, StockInterface $stock,
                                 TransferDetailInterface $trans, ProductInterface $prod, ReceptionTransferInterface $repoReception,
                                 ReceptionTransferProductInterface $receptionProduct)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['transfer_date'] = Carbon::createFromFormat('d/m/Y', $data['transfer_date']);
            $data['type_description'] = ($data['type_id'] === "1") ? 'SIMPLE' : 'CON RECEPCIÓN';
            $data['state_description'] = ($data['state_transfer'] === 0) ? 'GUARDADO' : 'PROCESADO';
            $product = explode(',', $request->input('product'));
            $available = explode(',', $request->input('available'));
            $toTransferred = explode(',', $request->input('toTransferred'));


            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $Transfer = $repo->create($data);
                $id = $Transfer->id;
            }

            if ($data['type_id'] === "2" && $data['state_transfer'] === 1) {
                $data_reception = $request->all();
                $data_reception['transfer_id'] = $id;
                $data_reception['state_description'] = 'GUARDADO';
                $data_reception['date'] = Carbon::createFromFormat('d/m/Y', $data_reception['transfer_date']);
                $reception = $repoReception->create($data_reception);
                $reception_id = $reception->id;
            } else {
                $reception_id = 0;
            }

            $wuRepo->deleteByTransfer($id, $product);

            foreach ($product as $item => $k) {

                $trans_prod = $wuRepo->findByTransfer($id, $product[$item]);
                // dd($data_product-);
                if ($data['state_transfer'] === 1) {
                    $suma = $toTransferred[$item];
                    $toTrans = 0;
                } else {
                    $suma = 0;
                    $toTrans = $toTransferred[$item];
                }
                $wuRepo->createUpdate([
                    'transfer_id' => $id,
                    'product_id' => $product[$item],
                    'transferred' => $suma,
                    'available' => $available[$item],
                    'toTransfer' => $toTrans
                ]);
                if ($data['state_transfer'] === 1) {
                    $data_product = $prod->find($product[$item]);
                    for ($i = 1; $i <= 2; $i++) {
                        $code_transfer = 'TS' . $id . $i;
                        if ($i == 1) {
                            $stock->createUpdate([
                                'product_id' => $product[$item],
                                'warehouse_id' => $data['warehouse_origin_id'],
                                'stock' => $toTransferred[$item],
                                'stock_transit' => 0.00,
                                'stock_available' => $toTransferred[$item],
                                'condition' => 0,
                            ]);

                            $trans->createUpdate([
                                'code_transfer' => $code_transfer,
                                'transfer_id' => $id,
                                'product_id' => $product[$item],
                                'warehouse_id' => $data['warehouse_origin_id'],
                                'type_transfer_id' => 4,
                                'date_transfer' => $data['transfer_date'],
                                'quantity' => $toTransferred[$item],
                                'price' => 0,
                                'costs' => $data_product->average_cost,
                                'nature_id' => '0'

                            ]);
                        } else {
                            $valor = ($data['type_id'] === "1") ? $toTransferred[$item] : 0;

//                            dd($valor_stock);
                            $stock->createUpdate([
                                'product_id' => $product[$item],
                                'warehouse_id' => $data['warehouse_destination_id'],
                                'stock' => $valor,
                                'stock_transit' => $toTransferred[$item],
                                'stock_available' => $toTransferred[$item],
                                'condition' => 1,
                            ]);

                            $trans->createUpdate([
                                'code_transfer' => $code_transfer,
                                'transfer_id' => $id,
                                'product_id' => $product[$item],
                                'warehouse_id' => $data['warehouse_destination_id'],
                                'type_transfer_id' => 4,
                                'date_transfer' => $data['transfer_date'],
                                'quantity' => $valor,
                                'price' => 0,
                                'costs' => $data_product->average_cost,
                                'nature_id' => '1'

                            ]);
                        }
                    }
                    if ($data['type_id'] === "2") {
                        $receptionProduct->create([
                            'reception_transfer_id' => $reception_id,
                            'product_id' => $product[$item],
                            'available' => $toTransferred[$item],
                            'received' => 0,
                            'toReceived' => 0,
                            'code' => $data_product->code_article,
                            'description' => $data_product->description_detail,
                            'unit' => $data_product->um_id,
                            'cost' => $data_product->average_cost

                        ]);
                    }
                }
            }

            DB::commit();
            return response()->json([
                'status' => true,
                'transfer_id' => $id
            ]);

        } catch (\Exception $e) {
//            throw new  \Exception($e);
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function createUpdateReferral($id, Request $request, ProductInterface $prod, ReferralGuideInterface $rGuide,
                                         ReferralGuideProductInterface $rGuideProduct)
    {
        DB::beginTransaction();
        try {
            $data_row = [];
            $data = $request->all();
            $data['date'] = Carbon::createFromFormat('d/m/Y', $data['guide_date']);
            $data['date_transfer'] = Carbon::createFromFormat('d/m/Y', $data['date_transfer']);
            $data['origin_guide'] = 'TRANSFERENCIA';
            $product = explode(',', $request->input('product'));
            $toTransferred = explode(',', $request->input('toTransferred'));
            if ($id != 0) {
                $rGuide->update($id, $data);
                $guide_id = $id;
            } else {
                $referralGuide = $rGuide->create($data);
                $guide_id = $referralGuide->id;
            }
            if ($data['state_description'] === 'IMPRESO') {
                $data_guide = $rGuide->find($guide_id);
                $data_row[] = [
                    'id' => $id,
                    'code' => $data_guide->code_guide,
                    'number_guide' => $data_guide->serial . '-' . $data_guide->number
                ];
            }
            //$wuRepo->deleteByTransfer($id, $product);

            foreach ($product as $item => $k) {
                $data_product = $prod->find($product[$item]);
                $rGuideProduct->createUpdate([
                    'referral_guide_id' => $guide_id,
                    'product_id' => $product[$item],
                    'code' => $data_product->code_article,
                    'description' => $data_product->description,
                    'unit' => $data_product->um_id,
                    'cost' => $data_product->average_cost,
                    'quantity' => $toTransferred[$item]
                ]);

            }

            DB::commit();
            return response()->json([
                'status' => true,
                'referral_id' => $guide_id,
                'data_row' => ($data_row != '') ? $data_row : ''
            ]);

        } catch (\Exception $e) {
            throw new  \Exception($e);
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function find($id, TransferInterface $repo, StockInterface $stockRepo)
    {
        try {
            $data = $repo->find($id);
            $data['transfer_date'] = Carbon::parse($data->transfer_date)->format('d/m/Y');
            if (isset($data->project)) {
                $data['project_code'] = $data->project->code;
                $data['project_description'] = $data->project->description;
            } else {
                $data['project_code'] = '';
                $data['project_description'] = '';
            }
            unset($data->project);
            $prod = [];
            foreach ($data->TransferProduct as $bp) {
                $u = $bp->product->unity;
                $stock = $stockRepo->findByWareHouseProduct($bp->product->id, $data['warehouse_origin_id']);
                $prod[] = [
                    'id' => $bp->product->id,
                    'code_article' => $bp->product->code_article,
                    'description_detail' => $bp->product->description_detail,
                    'um_id' => $bp->product->um_id,
                    'um' => (is_null($u->symbol)) ? $u->Descripcion : $u->symbol,
                    'average_cost' => $bp->product->average_cost,
                    'stock_p' => $stock->stock,
                    'transferred' => $bp->transferred,
                    'state_transfer' => $data->state_transfer,
                    'toTransfer' => $bp->toTransfer
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

    public function data_form(WarehouseInterface $ware, DocumentTypeInterface $proof, MotiveTransferInterface $motTrn)
    {
        $DocumentType = parseSelectOnly($proof->all(), 'IdTipoDocumento', 'Descripcion');
        $MotiveTransfer = parseSelectOnly($motTrn->all(), 'id', 'description');
        $warehouse = parseSelectAndCodeOnly($ware->all(), 'id', 'description', 'code_internal', 'address', 'local');

        return response()->json([
            'status' => true,
            'warehouse' => $warehouse,
            'DocumentType' => $DocumentType,
            'MotiveTransfer' => $MotiveTransfer
        ]);

    }


    public function destroy(TransferInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function uploadTransfer(Request $request)
    {
        try {
            $file_data = $request->file_data;
            $fileName = time() . '-' . $file_data->getClientOriginalName();
            $file_data->move(public_path('documents/transfers'), $fileName);

            return response()->json([
                'status' => true,
                'uploaded' => $fileName
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function excel(TransferInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE TRANSFERENCIAS', 'TRANSFERENCIAS');
    }


}
