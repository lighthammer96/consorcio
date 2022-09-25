<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 22/06/2017
 * Time: 05:59 PM
 */

namespace App\Http\Recopro\Quotation;

interface QuotationInterface
{
    public function search($filter);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function findApprovalQuotation($id);

//    public function findByCompareQuotation($id, array $attributes);
//
//    public function findByCompareQuotationProvider($id);


    public function destroy($id);
}