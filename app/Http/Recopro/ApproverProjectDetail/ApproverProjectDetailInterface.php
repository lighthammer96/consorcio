<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 28/08/2017
 * Time: 12:04 PM
 */

namespace App\Http\Recopro\ApproverProjectDetail;

interface ApproverProjectDetailInterface
{
    public function deleteExcept($approver_project_id, array $sub_state_id);

    public function createUpdate(array $data);

    public function getByApprovalState($approver_id, $sub_state_id);
}