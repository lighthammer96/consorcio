<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 06/09/2017
 * Time: 05:25 PM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\Approval_autonomy\Approval_autonomyInterface;
use App\Http\Recopro\ContestAutonomyApproval\ContestAutonomyApprovalInterface;
use App\Http\Recopro\Param\ParamInterface;
use App\Http\Recopro\PurchaseOrder\PurchaseOrderInterface;
use App\Http\Recopro\PurchaseOrderDetail\PurchaseOrderDetailInterface;
use App\Http\Recopro\Quotation\QuotationApprovalTrait;
use App\Http\Recopro\Quotation\QuotationInterface;
use App\Http\Recopro\TypeChange\TypeChangeInterface;
use Illuminate\Http\Request;
use DB;
use Carbon\Carbon;

class ApprovalContestController extends Controller
{
    use QuotationApprovalTrait;
    private static $_QUOTATION_REGISTERED = 1;

    private static $_QUOTATION_SENT_TO_APPROVAL = 2;

    private static $_QUOTATION_APPROVED = 3;

    private static $_QUOTATION_CANCELED = 4;

    private static $_QUOTATION_REJECTED = 5;

    private static $_QUOTATION_WITH_OC = 6;

    public function __construct()
    {
    }

    public function approveContest($id, QuotationInterface $repo, ContestAutonomyApprovalInterface $repoContestAuto,
                                   PurchaseOrderInterface $purchaseOrder, PurchaseOrderDetailInterface $purchaseOrderDetail,
                                   ParamInterface $paramRepo, TypeChangeInterface $typeChangeRepo)
    {
        DB::beginTransaction();
        try {
            $contest = $repo->find($id);
            $state = $contest->quotation_state_id;
            $super = auth()->user()->id;

            if ($state != self::$_QUOTATION_SENT_TO_APPROVAL) {
                return response()->json([
                    'status' => false,
                    'message' => 'No puede aprobar este Concurso'
                ]);
            }
            $Autonomy = $repoContestAuto->findByContest($id);
            $approval_id = $Autonomy->autonomy_approval->id;
            $user_approval = $Autonomy->autonomy_approval->user;
            $approval_user_id = $user_approval->id;
            $user_name = $user_approval->name;
            if ($approval_user_id === $super) {
                $repoContestAuto->createUpdate([
                    'contest_id' => $id,
                    'approval_autonomy_id' => $approval_id,
                    'state' => 1
                ]);
                $AutonomyDetail = $repoContestAuto->findByContestDetail($id);
                if (count($AutonomyDetail) <= 0) {
                    $repo->update($id, [
                        'approved_by' => auth()->user()->id,
                        'quotation_state_id' => self::$_QUOTATION_APPROVED
                    ]);
                    //ORDER PURCHASE
                    $data = $this->generate_order_purchase($id, $repo);
                    $saved_provider = [];
                    $data_provider = [];
                    $data_project = [];
                    $oc_detail = [];
                    $dat[] = [];
                    $s_total_general = 0;
                    foreach ($data as $det) {
                        $project_reference = explode('-', $det['reference_project']);
                        $reference_quantity = explode('-', $det['reference_quantity']);
                        if (isset($project_reference)) {
                            foreach ($project_reference as $pro => $key) {
                                $t_ = $reference_quantity[$pro] * $det['price'];
//                                $s_total_general = $t_;
                                $data_project[] = [
                                    'project_id' => $project_reference[$pro],
                                    'provider_id' => $det['provider_id'],
                                    'payment_condition_id' => $det['payment_condition_id'],
                                    'payment_advance' => $det['payment_advance'],
                                    'currency_id' => $det['currency_id'],
                                    'is_igv' => (int)$det['is_igv'],
                                    'type_change' => $det['type_change']
//                                    'subtotal' => $s_total_general
                                ];
                                if ((int)$det['currency_id'] === 1) {
                                    $total_l = $t_;
                                    $total_d = ($t_ === 0) ? 0 : $t_ / $det['type_change'];
                                } else {
                                    $total_l = $t_ * $det['type_change'];
                                    $total_d = $t_;
                                }
                                $oc_detail[] = [
                                    'project_id' => $project_reference[$pro],
                                    'provider_id' => $det['provider_id'],
                                    'reference_quantity' => $reference_quantity[$pro],
                                    'consolidated_id' => $det['consolidated_id'],
                                    'detail_provider_id' => $det['detail_id'],
                                    'price' => $det['price'],
                                    'discount_percentage' => $det['discount_percentage'],
                                    'discount' => $det['discount'],
                                    'total' => $t_,
                                    'total_local' => $total_l,
                                    'total_dollar' => $total_d
                                ];
                            }
                        } else {
                            $t_ = $det['reference_quantity'] * $det['price'];
//                            $s_total_general = $s_total_general + $t_;
                            if ((int)$det['currency_id'] === 1) {
                                $total_l = $t_;
                                $total_d = ($t_ === 0) ? 0 : $t_ / $det['type_change'];
                            } else {
                                $total_l = $t_ * $det['type_change'];
                                $total_d = $t_;
                            }
                            $data_project[] = [
                                'project_id' => $det['reference_project'],
                                'provider_id' => $det['provider_id'],
                                'payment_condition_id' => $det['payment_condition_id'],
                                'payment_advance' => $det['payment_advance'],
                                'currency_id' => $det['currency_id'],
                                'is_igv' => (int)$det['is_igv'],
                                'type_change' => $det['type_change']
//                                'subtotal' => $s_total_general
                            ];
                            $oc_detail[] = [
                                'project_id' => $det['reference_project'],
                                'provider_id' => $det['provider_id'],
                                'reference_quantity' => $det['reference_quantity'],
                                'consolidated_id' => $det['consolidated_id'],
                                'detail_provider_id' => $det['detail_id'],
                                'price' => $det['price'],
                                'discount_percentage' => $det['discount_percentage'],
                                'discount' => $det['discount'],
                                'total' => $t_,
                                'total_local' => $total_l,
                                'total_dollar' => $total_d
                            ];
                        }
                    }
//                dd($data_project);
                    $oc_data = array_map("unserialize", array_unique(array_map("serialize", $data_project)));
                    foreach ($oc_data as $dat) {
                        $model = $purchaseOrder->create([
                            'contest_provider_id' => $dat['provider_id'],
                            'project_id' => $dat['project_id'],
                            'oc_state_id' => 3,
                            'type_id' => 1,
                            'date_emission' => Carbon::createFromFormat('d/m/Y', date('d/m/Y')),
                            'type_oc' => 'AUTOMÁTICO',
                            'payment_condition_id' => $dat['payment_condition_id'],
                            'payment_advance' => $dat['payment_advance'],
                            'currency_id' => $dat['currency_id'],
                            'is_igv' => $dat['is_igv']
                        ]);
                        $id = $model->id;
                        $subtotal_g = 0;
                        foreach ($oc_detail as $detail) {
                            if ($dat['provider_id'] == $detail['provider_id'] && $dat['project_id'] == $detail['project_id']) {
                                $purchaseOrderDetail->createUpdate([
                                    'order_purchase_id' => $id,
                                    'quantity' => $detail['reference_quantity'],
                                    'detail_provider_id' => $detail['detail_provider_id'],
                                    'consolidated_id' => $detail['consolidated_id'],
                                    'price' => $detail['price'],
                                    'discount_percentage' => $detail['discount_percentage'],
                                    'discount' => $detail['discount'],
                                    'total' => $detail['total'],
                                    'total_local' => $detail['total_local'],
                                    'total_dollar' => $detail['total_dollar']
                                ]);
                                $subtotal_g += $detail['reference_quantity'] * $detail['price'];
                            }
                        }
                        $igv_ = ((int)$dat['is_igv'] === 1) ? $paramRepo->getByDescription('IGV', 19) : 0;
                        $igv_ = ($subtotal_g === 0) ? 0 : ($igv_ / 100) * $subtotal_g;
                        $total = $subtotal_g + $igv_;


                        if ((int)$dat['currency_id'] === 1) {
                            $subtotal_l = $subtotal_g;
                            $subtotal_d = ($subtotal_g === 0) ? 0 : $subtotal_g / (float)$dat['type_change'];
                            $igv_l = $igv_;
                            $igv_d = ($igv_ === 0) ? 0 : $igv_ / (float)$dat['type_change'];
                        } else {
                            $subtotal_l = $subtotal_g * (float)$dat['type_change'];
                            $subtotal_d = $subtotal_g;
                            $igv_l = $igv_ * (float)$dat['type_change'];
                            $igv_d = $igv_;
                        }
                        $subtotal_local = $subtotal_l;
                        $igv_local = $igv_l;
                        $total_local = $subtotal_l + $igv_l;
                        $subtotal_dollar = $subtotal_d;
                        $igv_dollar = $igv_d;
                        $total_dollar = $subtotal_d * $igv_l;

                        $purchaseOrder->createUpdate([
                            'id' => $id,
                            'subtotal' => $subtotal_g,
                            'igv' => $igv_,
                            'total' => $total,
                            'subtotal_local' => $subtotal_local,
                            'igv_local' => $igv_local,
                            'total_local' => $total_local,
                            'subtotal_dollar' => $subtotal_dollar,
                            'igv_dollar' => $igv_dollar,
                            'total_dollar' => $total_dollar,
                        ]);
                    }
                    //END
                    DB::commit();
                    return response()->json(['status' => true]);
                } else {
                    DB::commit();
                    return response()->json(['status' => true]);
                }

            } else {
                DB::commit();
                return response()->json([
                    'status' => false,
                    'message' => 'No puede aprobar este Concurso. Permisos para ' . $user_name . ''
                ]);
            }

        } catch (\Exception $e) {
//            throw new \Exception($e);
            DB::rollBack();
            return response()->json(['status' => false,
                'message' => $e->getMessage()]);
        }

    }

    public
    function rejectContest($id, Request $request, QuotationInterface $repo)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $req = $repo->find($id);
            $state = $req->quotation_state_id;
            $super = auth()->user()->id;
            if ($state != self::$_QUOTATION_SENT_TO_APPROVAL) {
                throw new \Exception('No puede rechazar este concurso');
            }

            $repo->update($id, [
                'comment_reject' => $data['comment_reject'],
                'quotation_state_id' => self::$_QUOTATION_REJECTED,
                'approved_by' => null
            ]);
            DB::commit();
            return response()->json([
                'status' => true
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }


    public
    function autonomyApproval(Approval_autonomyInterface $aut)
    {
        $autonomy = parseSelectAttributesTwo($aut->all()->sortBy("to"), 'id', 'from', 'to');
        return response()->json([
            'status' => true,
            'autonomy' => $autonomy
        ]);

    }
}