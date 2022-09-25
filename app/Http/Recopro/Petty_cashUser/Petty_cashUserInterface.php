<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 04/07/2017
 * Time: 04:01 PM
 */

namespace App\Http\Recopro\Petty_cashUser;


interface Petty_cashUserInterface
{
    public function deleteByPettyCash($petty_cash_id, array $ids);

    public function create(array $attributes);
}