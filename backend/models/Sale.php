<?php

namespace Models;

use Phalcon\Mvc\Model;


class Sale extends Model
{
    public $id;
    public $city_id;
    public $property_id;
    public $price;
    public $date;
    public $month;
    public $day;

    public function initialize()
    {
        $this->setSource("sale");
    }
}
