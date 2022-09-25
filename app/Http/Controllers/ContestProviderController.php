<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 11/07/2017
 * Time: 11:15 AM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ContestConsolidated\ContestConsolidatedInterface;
use App\Http\Recopro\ContestProvider\ContestProviderInterface;
use App\Http\Recopro\ContestProviderDetail\ContestProviderDetailInterface;
use App\Http\Recopro\Param\ParamInterface;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\Quotation\QuotationInterface;
use App\Http\Recopro\TypeChange\TypeChangeInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB;

class ContestProviderController extends Controller
{
    public function uploadProvider(Request $request)
    {
        try {
            $file_data = $request->file_data;
            $fileName = time() . '-' . $file_data->getClientOriginalName();
            $file_data->move(public_path('documents/contests'), $fileName);

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

    public function createUpdate($id, Request $request, ContestProviderInterface $repo, ParamInterface $paramRepo,
                                 ContestConsolidatedInterface $consolidatedRepo, ProductInterface $articleRepo,
                                 ContestProviderDetailInterface $detailRepo, TypeChangeInterface $typeChangeRepo)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['shipping_date'] = ($data['shipping_date'] == '') ? null : Carbon::createFromFormat('d/m/Y', $data['shipping_date']);
            $data['delivery_date'] = ($data['delivery_date'] == '') ? null : Carbon::createFromFormat('d/m/Y', $data['delivery_date']);
//            $data['type_change_id'] = ($data['type_change_id'] == '') ? null : Carbon::createFromFormat('d/m/Y', $data['type_change_id']);
            $contest_id = $data['contest_id'];
            $is_igv = ($data['is_igv'] == 1);
            $currency = (int)$data['currency_id'];
            $item_code = explode('-', $data['item_code']);
            $item_description = (trim($data['item_description']) == '') ? [] : explode('_/-/_', $data['item_description']);
            $item_quantity = explode('-', $data['item_quantity']);
            $item_price = explode('-', $data['item_price']);
            $item_percentage = explode('-', $data['item_percentage']);
            $item_discount = explode('-', $data['item_discount']);
            unset($data['item_code'], $data['item_description'], $data['item_quantity'], $data['item_price'],
                $data['item_percentage'], $data['item_discount']);
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $model = $repo->create($data);
                $id = $model->id;
            }
            $subtotal = 0;
            $detailRepo->deleteExcept($item_code, $id);
            $now = Carbon::now('America/Lima')->toDateString();
            $change = (float)$typeChangeRepo->getByDate($now)->Compra;
            foreach ($item_description as $item => $description) {
                $consolidated = $consolidatedRepo->findByContestArticle($contest_id, $item_code[$item]);
                if (!$consolidated) {
                    $article = $articleRepo->find($item_code[$item]);
                    throw new \Exception('El artículo ' . $article->description . ' no esta consolidado en el concurso');
                }
                $total = (float)$item_quantity[$item] * (float)$item_price[$item] - (float)$item_discount[$item];
                $subtotal += $total;
                $total_local = ($currency == 1) ? $total : $total * $change;
                $total_dollar = $total;
                if ($currency == 1) {
                    $total_dollar = ($total == 0) ? 0 : $total / $change;
                }
                $detailRepo->createUpdate([
                    'contest_provider_id' => $id,
                    'contest_id' => $contest_id,
                    'contest_consolidated_id' => $consolidated->id,
                    'description' => $description,
                    'quantity' => $item_quantity[$item],
                    'price' => $item_price[$item],
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
            DB::commit();
            return response()->json([
                'status' => true,
                'id' => $id
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
//            throw new \Exception($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }


    public function find($id, ContestProviderInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $data['delivery_date'] = Carbon::parse($data->delivery_date)->format('d/m/Y');
            $data['shipping_date'] = Carbon::parse($data->shipping_date)->format('d/m/Y');
            $provider = $data->provider;
            $data->provider_id = $provider->IdEntidad;
            $data->bussiness_name = $provider->NombreEntidad;
            $data->ruc = $provider->Documento;
            $data->adrress_provider = $provider->DireccionLegal;
            $data->contact = $provider->contact;
            $data->contact_phone = $provider->contact_phone;
            $data->item_product = $data->contests_provider_detail;
            foreach ($data->item_product as $d) {
                $article = $d->contest_consolidated->article;
                $d->product = $d->description;
                $d->article_id = $article->id;
                $d->code = $article->code_matrix;
                $d->model = $article->model;
                $d->um = ($article->unity) ? $article->unity->Descripcion : '';
                $d->average_price = (is_null($article->average_cost)) ?
                    '' : number_format($article->average_cost, 2, '.', '');
            }
            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
//            throw new \Exception($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function findDocument($id, ContestProviderInterface $repo)
    {
        try {
            $data = $repo->find($id);
            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
//            throw new \Exception($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function findDetail($id, ContestProviderInterface $repo)
    {
        try {
            $data = $repo->findOrContest($id);
            foreach ($data as $dat) {
                $dat->item_product = $dat->contests_provider_detail;
                foreach ($dat->item_product as $d) {
                    $article = $d->contest_consolidated->article;
                    $d->product = $d->description;
                }
                unset($dat->contests_provider_detail);
            }
            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
//            throw new \Exception($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }


    public function quotationsProviders($contest_id, QuotationInterface $contestRepo)
    {
        try {
            $contest = $contestRepo->find($contest_id);
            $type_change = isset($contest->type_change->Compra) ? $contest->type_change->Compra : 0.00;
            $data = [];
            foreach ($contest->contest_providers as $cp) {
                $currency = ($cp->currency_id == 1) ? 'S/ ' : '$ ';
                $data[] = [
                    'id' => $cp->id,
                    'number' => $cp->number,
                    'state'=>$contest->state,
                    'description' => $cp->provider->NombreEntidad,
                    'document' => $cp->provider->Documento,
                    'provider_id' => $cp->provider->IdEntidad,
                    'total' => $currency . number_format($cp->total, 2, '.', ''),
                    'total_c' => number_format($cp->total, 2, '.', ''),
                    'total_local' => number_format($cp->total_local, 2, '.', ''),
                    'total_dollar' => number_format($cp->total_dollar, 2, '.', ''),
                    'subtotal' => number_format($cp->subtotal, 2, '.', ''),
                    'subtotal_local' => number_format($cp->subtotal_local, 2, '.', ''),
                    'subtotal_dollar' => number_format($cp->subtotal_dollar, 2, '.', ''),
                    'igv' => $cp->igv,
                    'igv_local' => $cp->igv_local,
                    'igv_dollar' => $cp->igv_dollar,
                    'file' => $cp->file
                ];
            }
            return response()->json([
                'status' => true,
                'data' => $data,
                'type_change_purchase' => $type_change
            ]);
        } catch (\Exception $e) {
//            throw new \Exception($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }

    }
}