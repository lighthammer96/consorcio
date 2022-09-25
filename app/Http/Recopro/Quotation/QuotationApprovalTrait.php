<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 18/09/2017
 * Time: 04:32 PM
 */

namespace App\Http\Recopro\Quotation;


trait QuotationApprovalTrait
{
    public function generate_order_purchase($id, QuotationInterface $repo)
    {
        try {
            $data_contest = $repo->findApprovalQuotation($id);
            $data = [];
            $data_notSelect = [];
            $data_select = [];
            foreach ($data_contest as $consolidated) {
                if ($consolidated->price_buyer == 1) {
                    $data[] = [
                        'detail_id' => $consolidated->detail_id,
                        'provider_id' => $consolidated->provider_id,
//                        'entity_id' => $consolidated->contest_providers->providers->NombreEntidad,
                        'consolidated_id' => $consolidated->contest_consolidated_id,
                        'reference_project' => $consolidated->reference_project,
                        'reference_quantity' => $consolidated->reference_quantity,
                        'price' => $consolidated->price,
                        'discount_percentage' => 0.00,
                        'discount' => 0.00,
                        'currency_id' => $consolidated->currency_id,
                        'type_change' => $consolidated->Compra,
                        'payment_condition_id' => $consolidated->payment_condition_id,
                        'payment_advance' => $consolidated->payment_advance,
                        'is_igv' => $consolidated->is_igv
                    ];
                    $data_select[] = $consolidated->contest_consolidated_id;
                } else {
                    $data_notSelect[] = $consolidated;
                }
            }
            if (count($data_notSelect) != 0) {
                foreach ($data_notSelect as $dat) {
                    if (!in_array($dat->contest_consolidated_id, $data_select)) {
                        $data[] = [
                            'detail_id' => $dat->detail_id,
                            'provider_id' => $dat->provider_id,
//                            'entity_id' => $dat->contest_providers->providers->NombreEntidad,
                            'consolidated_id' => $dat->contest_consolidated_id,
                            'reference_project' => $dat->reference_project,
                            'reference_quantity' => $dat->reference_quantity,
                            'price' => $dat->price,
                            'discount_percentage' => 0.00,
                            'discount' => 0.00,
                            'currency_id' => $dat->currency_id,
                            'type_change' => $dat->Compra,
                            'payment_condition_id' => $dat->payment_condition_id,
                            'payment_advance' => $dat->payment_advance,
                            'is_igv' => $dat->is_igv
                        ];
                    }
                }
            }
            return $data;

        } catch (\Exception $e) {
            throw new \Exception($e);
        }
    }
}