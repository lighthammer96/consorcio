<?php

namespace App\Http\Recopro\ContestAutonomyApproval;
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 15/09/2017
 * Time: 03:14 PM
 */
interface ContestAutonomyApprovalInterface
{
    public function createUpdate(array $data);

    public function deleteByContestAutonomy($contest_id, array $ids);

    public function findByContest($id);

    public function findByContestDetail($id);
}