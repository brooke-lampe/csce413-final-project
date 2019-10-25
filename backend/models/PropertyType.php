<?php

namespace Models;

use Phalcon\Mvc\Model;


class PropertyType extends Model
{
    public $id;
    public $name;

    public function initialize()
    {
        $this->setSource("property_type");
    }
}
