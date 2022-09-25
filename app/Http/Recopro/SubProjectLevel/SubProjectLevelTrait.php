<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 01/09/2017
 * Time: 12:57 PM
 */

namespace App\Http\Recopro\SubProjectLevel;

trait SubProjectLevelTrait
{
    public function calculateTotalSPL($sub_project_level, $sub_state)
    {
        $total = 0;

        $txt_total = ($sub_state == 1) ? 'lb_total' : 'pv_total';

        foreach ($sub_project_level->children as $spl)
        {
            $total += (is_null($spl->$txt_total)) ? 0 : $spl->$txt_total;
        }

        $sub_project_level->$txt_total = $total;
        $sub_project_level->save();
    }
}