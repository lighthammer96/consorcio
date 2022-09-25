<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 25/07/2017
 * Time: 12:21 PM
 */

namespace App\Http\Recopro\ReferralGuideProduct;

interface ReferralGuideProductInterface
{
    public function deleteByReferralGuide($referralGuide_id, array $ids);

    public function createUpdate(array $data);

    public function deleteByReferralGuideAll($id);

    public function findByReferralGuide($entry_id, $ids);
}