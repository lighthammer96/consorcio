<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 21/09/2017
 * Time: 04:16 PM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\Currency\CurrencyInterface;
use App\Http\Recopro\Param\ParamInterface;
use App\Http\Recopro\PaymentCondition\PaymentConditionInterface;
use App\Http\Recopro\PurchaseOrder\PurchaseOrderInterface;
use App\Http\Recopro\PurchaseOrderDetail\PurchaseOrderDetailInterface;
use App\Http\Recopro\PurchaseOrderState\PurchaseOrderState;
use App\Http\Recopro\TypeChange\TypeChangeInterface;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;

class PurchaseOrderController
{
    public function all(Request $request, PurchaseOrderInterface $repo)
    {
        try {
            $s = $request->input('search', '');
            $params = ['id', 'number_oc', 'project_id', 'contest_provider_id', 'oc_state_id', 'date_emission', 'provider_id'];
            $data = $repo->search($s);
            $info = parseDataList($data, $request, 'id', $params);
            $data = $info[1];

            foreach ($data as $d) {
                $d->date_emission = Carbon::parse($d->date_emission)->format('d/m/Y');
                $d->project_description = ($d->project) ? $d->project->description : '';
                $d->state_description = ($d->state) ? $d->state->description : '';
                if ($d->provider_id !== null) {
                    $d->provider_name = $d->provider->NombreEntidad;
                } else {
                    $d->provider_name = ($d->contest_provider) ? $d->contest_provider->provider->NombreEntidad : '';
                }
            }

            return response()->json([
                'Result' => 'OK',
                'TotalRecordCount' => $info[0],
                'Records' => $data
            ]);
        } catch (\Exception $e) {
            throw new  \Exception($e);
        }
    }

    public function createUpdate($id, Request $request, PurchaseOrderInterface $repo, PurchaseOrderDetailInterface $detailRepo,
                                 TypeChangeInterface $typeChangeRepo, ParamInterface $paramRepo)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['delivery_date'] = ($data['delivery_date'] == '') ? null : Carbon::createFromFormat('d/m/Y', $data['delivery_date']);
            $code = explode('-', $request->input('item_code'));
            $quantity = explode('-', $request->input('item_quantity'));
            $price = explode('-', $request->input('item_price'));
            $item_percentage = explode('-', $request->input('item_percentage'));
            $item_discount = explode('-', $request->input('item_discount'));
            $currency = (int)$data['currency_id'];
            $is_igv = ($data['is_igv'] == 1);
            if ($id != 0) {
                $oc = $repo->update($id, $data);
                $type = $oc->type_oc;
            } else {
                $data['oc_state_id'] = 1;
                $data['type_oc'] = 'MANUAL';
                $oc = $repo->create($data);
                $id = $oc->id;
                $type = $oc->type_oc;
            }
//            dd($type);
            if ($type == 'MANUAL') {
                $subtotal = 0;
                $now = Carbon::now('America/Lima')->toDateString();
                $change = (float)$typeChangeRepo->getByDate($now)->Compra;
                $detailRepo->deleteByOC($id, $code);
                foreach ($code as $item => $k) {
                    $total = (float)$quantity[$item] * (float)$price[$item] - (float)$item_discount[$item];
                    $subtotal += $total;
                    $total_local = ($currency == 1) ? $total : $total * $change;
                    $total_dollar = $total;
                    if ($currency == 1) {
                        $total_dollar = ($total == 0) ? 0 : $total / $change;
                    }
                    $detailRepo->createUpdate([
                        'product_id' => $code[$item], //////falta va product o de consolidated
                        'order_purchase_id' => $id,
                        'quantity' => $quantity[$item],
                        'price' => $price[$item],
                        'discount_percentage' => $item_percentage[$item],
                        'discount' => $item_discount[$item],
                        'total' => $total,
                        'total_local' => $total_local,
                        'total_dollar' => $total_dollar,
                    ]);
                }
                $igv = ($is_igv) ? $paramRepo->getByDescription('IGV', 19) : 0;
                $igv = ($subtotal == 0) ? 0 : ($igv / 100) * $subtotal;
                $subtotal_local = ($currency == 1) ? $subtotal : $subtotal * $change;
                $subtotal_dollar = $subtotal;
                $igv_local = ($currency == 1) ? $igv : $igv * $change;
                $igv_dollar = $igv;
                if ($currency == 1) {
                    $subtotal_dollar = ($subtotal == 0) ? 0 : $subtotal / $change;
                    $igv_dollar = ($igv == 0) ? 0 : $igv / $change;
                }
                $repo->update($id, [
                    'subtotal' => $subtotal,
                    'igv' => $igv,
                    'total' => $subtotal + $igv,
                    'subtotal_local' => $subtotal_local,
                    'igv_local' => $igv_local,
                    'total_local' => $subtotal_local + $igv_local,
                    'subtotal_dollar' => $subtotal_dollar,
                    'igv_dollar' => $igv_dollar,
                    'total_dollar' => $subtotal_dollar + $igv_dollar,
                ]);

            } //dd

            DB::commit();
            return response()->json([
                'status' => true]);

        } catch (\Exception $e) {
            DB::rollBack();
//            dd($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function data_form(PaymentConditionInterface $pay, WarehouseInterface $ware, ParamInterface $paramRepo,
                              PurchaseOrderState $ocState, CurrencyInterface $currencyRepo)
    {
        $states = parseSelectOnly($ocState->all(), 'id', 'description');
        $payment_conditions = parseSelectOnly($pay->all(), 'id', 'description');
        $currency = parseSelectOnly($currencyRepo->all(), 'IdMoneda', 'Descripcion');
        $warehouse = parseSelectAndCodeOnly($ware->all(), 'id', 'description', 'code_internal', 'address', 'local');
        array_unshift($states, ['DisplayText' => 'Todos', 'Value' => '']);
        return response()->json([
            'status' => true,
            'payment_conditions' => $payment_conditions,
            'warehouse' => $warehouse,
            'states' => $states,
            'igv' => $paramRepo->getByDescription('IGV', 19),
            'currency' => $currency
        ]);

    }

    public function find($id, PurchaseOrderInterface $repo)
    {
        try {


            $data = $repo->find($id);
            $data['state_description'] = $data->state->description;
            if ($data['type_oc'] === 'MANUAL') {
                $data['provider_name'] = $data->provider->NombreEntidad;
                $data['provider_contact'] = $data->provider->contact;
                $data['provider_telephone'] = $data->provider->contact_phone;
                $data['address'] = $data->provider->DireccionLegal;
                $data['provider_document'] = $data->provider->Documento;
            } else {
                $data['quote_provider'] = $data->contest_provider->number;
                $data['document'] = $data->contest_provider->file;
                $data['provider_name'] = $data->contest_provider->provider->NombreEntidad;
                $data['provider_contact'] = $data->contest_provider->provider->contact;
                $data['provider_telephone'] = $data->contest_provider->provider->contact_phone;
                $data['address'] = $data->contest_provider->provider->DireccionLegal;
                $data['provider_document'] = $data->contest_provider->provider->Documento;
            }
            $data['project_code'] = $data->project->code;
            $data['project_description'] = $data->project->description;
            $data['date_emission'] = Carbon::parse($data->date_emission)->format('d/m/Y');
            $data['delivery_date'] = Carbon::parse($data->delivery_date)->format('d/m/Y');
            $prod = [];
            unset($data->contest_provider, $data->state, $data->project);
            foreach ($data->purchase_order_detail as $bp) {
                $prod[] = [
                    'id' => ($data['type_oc'] === 'MANUAL') ? $bp->product_id : $bp->detail_provider->contest_consolidated->article_id,
//                    'detail_provider_id' => $bp->detail_provider_id,
                    'description_detail' => ($data['type_oc'] === 'MANUAL') ? $bp->product->description_detail : $bp->detail_provider->description,
                    'quantity' => $bp->quantity,
                    'price' => $bp->price,
                    'discount_percentage' => $bp->discount_percentage,
                    'discount' => $bp->discount,
                    'total' => $bp->total,
                    'total_local' => $bp->total_local,
                    'total_dollar' => $bp->total_dollar
                ];
            }
            unset($data->purchase_order_detail);
            $data['product'] = $prod;
            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            throw new \Exception($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}