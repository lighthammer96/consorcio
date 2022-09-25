<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 12/07/2017
 * Time: 06:34 PM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\DocumentType\DocumentTypeInterface;
use App\Http\Recopro\MotiveTransfer\MotiveTransferInterface;
use App\Http\Recopro\ReferralGuide\ReferralGuideTrait;
use App\Http\Recopro\ReferralGuideProduct\ReferralGuideProductInterface;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use App\Http\Recopro\ReferralGuide\ReferralGuideInterface;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;

class ReferralGuideController extends Controller
{
    use ReferralGuideTrait;

    public function all(Request $request, ReferralGuideInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'date', 'serial', 'number', 'project_id', 'entity_id', 'transport_company_id', 'transfer_id', 'code_guide', 'origin_guide', 'motive_id', 'state_description'];
        $data = $repo->search($s);
        $info = parseDataList($data, $request, 'id', $params);
        $data = $info[1];

        foreach ($data as $d) {
            $d->date = Carbon::parse($d->date)->format('d/m/Y');
            $d->number_guide = $d->serial . "-" . $d->number;
            $d->name_provider = ($d->entity) ? $d->entity->NombreEntidad : '';
            $d->name_carrier = ($d->transport_company) ? $d->transport_company->NombreEntidad : '';
            $d->description_project = ($d->project) ? $d->project->description : '';
            $d->description_motive = ($d->motive) ? $d->motive->description : '';
            unset($d->entity);
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }


    public function data_form(WarehouseInterface $ware, DocumentTypeInterface $proof, MotiveTransferInterface $motTrn, ReferralGuideInterface $rGuide)
    {
        $NumberSerial = parseSelectOnly($rGuide->all(), 'id', 'number');
        $DocumentType = parseSelectOnly($proof->all(), 'IdTipoDocumento', 'Descripcion');
        $MotiveTransfer = parseSelectOnly($motTrn->all(), 'id', 'description');
        $warehouse = parseSelectAndCodeOnly($ware->all(), 'id', 'description', 'code_internal', 'address', 'local');

        return response()->json([
            'status' => true,
            'warehouse' => $warehouse,
            'DocumentType' => $DocumentType,
            'MotiveTransfer' => $MotiveTransfer,
            'NumberSerial' => $NumberSerial
        ]);

    }

    public function data_search(ReferralGuideInterface $rGuide)
    {
        $NumberSerial = parseSelectAndSerialOnly($rGuide->all(), 'id', 'number', 'serial');

        return response()->json([
            'status' => true,
            'NumberSerial' => $NumberSerial
        ]);

    }

    public function createUpdate($id, ReferralGuideInterface $repo, Request $request, ReferralGuideProductInterface $wuRepo)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['date'] = Carbon::createFromFormat('d/m/Y', $data['guide_date']);
            $data['date_transfer'] = Carbon::createFromFormat('d/m/Y', $data['date_transfer']);
            $code_article = explode(',', $request->input('code_article'));
            $description_article = explode(',', $request->input('description'));
            $unit = explode(',', $request->input('unit_measure'));
            $average_cost = explode(',', $request->input('average_cost'));
            $quantity = explode(',', $request->input('quantity'));
            $data['origin_guide'] = 'LOCAL';

            unset($data['id'], $data['code_article'], $data['description'], $data['unit_measure'], $data['average_cost'], $data['quantity']);
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $ReferralGuide = $repo->create($data);
                $id = $ReferralGuide->id;
            }
            $wuRepo->deleteByReferralGuide($id, $code_article);
            if ($code_article != '') {
                foreach ($code_article as $item => $k) {
                    $wuRepo->createUpdate([
                        'referral_guide_id' => $id,
                        'code' => $code_article[$item],
                        'description' => $description_article[$item],
                        'unit' => $unit[$item],
                        'cost' => $average_cost[$item],
                        'quantity' => $quantity[$item]
                    ]);
                }
            }


            DB::commit();
            return response()->json([
                'status' => true,
                'referral_id' => $id
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function createUpdateSerial($id, Request $request, ReferralGuideInterface $repo, ReferralGuideProductInterface $wuRepo)
    {
        DB::beginTransaction();
        try {
            $data_row = [];
            $comparison_id = false;
            $condition = false;
            $data = $request->all();
            if ($data['state_description'] === 'ANULADO') {
                if (!empty($request->input('incorrectlyPrinted'))) {
                    $raw_cancel = explode(',', $request->input('incorrectlyPrinted'));
                    $row_all = explode(',', $request->input('a_allPrinted'));
                    $row_print = explode(',', $request->input('a_print'));

                    if (!empty($raw_cancel)) {
                        foreach ($raw_cancel as $item => $k) {
                            $id = $raw_cancel[$item];
                            $data_db = $repo->find($id)->toArray();
                            $data_select = $repo->find($id);
                            $data['state_description'] = 'NO IMPRESO';
                            $data['serial'] = '';
                            $data['number'] = '';
                            $repo->update($id, $data);
                            $data_db['serial'] = $data_select->serial;
                            $data_db['number'] = $data_select->number;
                            $data_db['state_description'] = 'ANULADO';
                            $ReferralGuide = $repo->create($data_db);
                            $guide_id = $ReferralGuide->id;
                            foreach ($data_select->ReferralGuideProduct as $bp) {
                                $wuRepo->createUpdate([
                                    'referral_guide_id' => $guide_id,
                                    'product_id' => $bp->product_id,
                                    'code' => $bp->code,
                                    'description' => $bp->description,
                                    'unit' => $bp->unit,
                                    'cost' => $bp->cost,
                                    'quantity' => $bp->quantity
                                ]);
                            }
                        }
                    }

                    if (!empty($request->input('a_noPrint'))) {
                        $row_noPrint = explode(',', $request->input('a_noPrint'));
                        if (!empty($row_noPrint)) {
                            foreach ($row_noPrint as $item => $k) {
                                $id = $row_noPrint[$item];
                                $data['state_description'] = 'REGISTRADO';
                                $data['serial'] = '';
                                $data['number'] = '';
                                $repo->update($id, $data);
                            }
                        }
                    }
                } else {
                    $repo->update($id, $data);
                    $data_table = $repo->find($id);
                    $data_db = $repo->find($id)->toArray();
                    $data_db['state_description'] = 'REGISTRADO';
                    $data_db['serial'] = '';
                    $data_db['number'] = '';
                    unset($data_db['id'], $data_db['code_guide']);
                    $ReferralGuide = $repo->create($data_db);
                    $guide_id = $ReferralGuide->id;
                    foreach ($data_table->ReferralGuideProduct as $bp) {
                        $wuRepo->createUpdate([
                            'referral_guide_id' => $guide_id,
                            'product_id' => $bp->product_id,
                            'code' => $bp->code,
                            'description' => $bp->description,
                            'unit' => $bp->unit,
                            'cost' => $bp->cost,
                            'quantity' => $bp->quantity
                        ]);
                    }
                }
            } else {
                if (!empty($request->input('raw_select'))) { // cuando envia a imprimir
                    $raw_select = explode(',', $request->input('raw_select'));
                    $raw_select = array_reverse($raw_select);
                    $i = 0;
                    if ($raw_select !== '') {
                        $count = strlen($data['number']);
//                    $endNumber=substr($data['number'], 3, 3);
                        $var = floatval($data['number']);
                        foreach ($raw_select as $item => $k) {
                            $number = str_pad($var, $count, "0", STR_PAD_LEFT);
                            $data['number'] = $number;
                            $id = $raw_select[$item];
                            $repo->update($id, $data);
                            $data_guide = $repo->find($id);
                            $data_row[] = [
                                'id' => $raw_select[$item],
                                'code' => $data_guide->code_guide,
                                'number_guide' => $data_guide->serial . '-' . $data_guide->number,
                                'number' => $data_guide->number
                            ];
                            $i++;
                            $var++;
                        }
                    }

                } else {      //noPrinted
                    if (!empty($request->input('noPrinted'))) {
                        $raw_noPrinted = explode(',', $request->input('noPrinted'));
                        foreach ($raw_noPrinted as $item => $k) {
                            $id = $raw_noPrinted[$item];
                            $data['number'] = '';
                            $data['state_description'] = 'REGISTRADO';
                            $repo->update($id, $data);
                        }
                    } else {
//                        $data['state_description'] = 'IMPRESO';
                        $repo->update($id, $data);
                        $data_guide = $repo->find($id);
                        $data_row[] = [
                            'id' => $id,
                            'code' => $data_guide->code_guide,
                            'number_guide' => $data_guide->serial . '-' . $data_guide->number,
                            'number' => $data_guide->number
                        ];
                    }
                }
            }
            DB::commit();
            return response()->json([
                'status' => true,
                'data_row' => ($data_row != '') ? $data_row : ''
            ]);
        } catch (\Exception $e) {
            throw new  \Exception($e);
            DB::rollBack();
            return response()->json(['status' => false,
                'message' => $e->getMessage()]);
        }
    }


    public
    function find($id, ReferralGuideInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $data['date'] = Carbon::parse($data->date)->format('d/m/Y');
            $data['date_transfer'] = Carbon::parse($data->date_transfer)->format('d/m/Y');
            $data['document'] = ($data->entity) ? $data->entity->Documento : '';
            $data['name_entity'] = ($data->entity) ? $data->entity->NombreEntidad : '';
            $data['address'] = ($data->entity) ? $data->entity->DireccionLegal : '';
            $data['transport_company_name'] = ($data->transport_company) ? $data->transport_company->NombreEntidad : '';
            $data['project_code'] = ($data->project) ? $data->project->code : '';
            $data['project_description'] = ($data->project) ? $data->project->description : '';
            unset($data->entity, $data->project, $data->transport_company);
            $prod = [];
            foreach ($data->ReferralGuideProduct as $bp) {
                $prod[] = [
                    'id' => $bp->product_id,
                    'code' => $bp->code,
                    'description' => $bp->description,
                    'unit' => $bp->unit,
                    'cost' => $bp->cost,
                    'quantity' => $bp->quantity,
//                    'state_referral_guide'=>
                ];
            }

            unset($data->ReferralGuideProduct);
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

    public function pdf(Request $request, ReferralGuideInterface $repo)
    {
        $data = [];
        $dat_one = $request->input('referral_guide_id');
        $dat_al = $request->input('array_guide');
        if (empty($dat_al)) {
            $data[] = $this->excelReferralGuide($repo->find($dat_one));
            return generateDataReferralGuidePDF(array_reverse($data), 'portrait', 'logo.png', 2);
        } else {
            $dat_all = $request->input('array_guide');
            $referral = explode(',', $dat_all);
            foreach ($referral as $k) {
                $data[] = $this->excelReferralGuide($repo->find($k));
            }
            return generateDataReferralGuidePDF(array_reverse($data), 'portrait', 'logo.png', 2);
        }
    }

    public function excel(ReferralGuideInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE GUIAS DE REMISIÓN', 'Guias');
    }

}