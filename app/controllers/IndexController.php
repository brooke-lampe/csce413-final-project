<?php

class IndexController extends ControllerBase
{

    public function indexAction()
    {
        $product = Products::findFirst();
        $this->view->setVars(['product' => $product]);
    }

}

