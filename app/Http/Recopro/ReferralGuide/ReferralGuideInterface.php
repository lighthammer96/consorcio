<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 25/07/2017
 * Time: 10:54 AM
 */

namespace App\Http\Recopro\ReferralGuide;

interface ReferralGuideInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);

}