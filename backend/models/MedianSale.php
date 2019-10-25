<?php

namespace Models;

use Phalcon\Mvc\Model;


class MedianSale extends Model
{
    public $id;
    public $city_id;
    public $property_id;
    public $price;
    public $date;

    public function initialize()
    {
        $this->setSource("median_sale");
    }
}
