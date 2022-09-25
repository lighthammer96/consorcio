<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 09/08/2017
 * Time: 05:52 PM
 */

namespace App\Http\Recopro\Level;

trait LevelTrait
{
    public function verifyActMat(Level $level)
    {
        $return = 1;

        $return = $this->verifyParent($level, $return);

        return $return;
    }

    public function verifyParent($level, $default)
    {
        if ($level->parent) {
            if ($level->parent->code == '17') {
                return 2;
            } else {
                return $this->verifyParent($level->parent, $default);
            }
        }
        return $default;
    }
}