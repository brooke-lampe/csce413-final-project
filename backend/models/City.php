<?php

namespace Models;

use Phalcon\Mvc\Model;


class City extends Model
{
    public $id;
    public $name;

    public function initialize()
    {
        $this->setSource("city");
    }
}
