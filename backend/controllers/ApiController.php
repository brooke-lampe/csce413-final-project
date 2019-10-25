<?php


namespace Controllers;

use Models\City;
use Models\MedianSale;
use Models\PropertyType;
use Models\Sale;
use Phalcon\Http\Response;
use Phalcon\Mvc\Controller;


class ApiController extends Controller
{
    public function cities()
    {
        $response = new Response();
        $response->setJsonContent([
                'data' => $this->getDataById(City::class)
            ]);
        return $response;
    }

    public function propertyTypes()
    {
        $response = new Response();
        $response->setJsonContent([
            'data' => $this->getDataById(PropertyType::class)
        ]);
        return $response;
    }

    public function sales()
    {
        $city_id = $this->request->get('city_id');
        $property_type_id = $this->request->get('property_type_id');
        $date_from = $this->request->get('date_from');
        $date_to = $this->request->get('date_to');

        $conditions = 'date >= :date_from: and date <= :date_to:';
        $bind = ['date_from' => $date_from, 'date_to' => $date_to];
        if ($city_id) {
            $conditions .= ' and city_id = :city_id:';
            $bind['city_id'] = $city_id;
        }
        if ($property_type_id) {
            $conditions .= ' and property_type_id = :property_type_id:';
            $bind['property_type_id'] = $property_type_id;
        }
        $sales = Sale::find([
            'conditions' => $conditions,
            'bind' => $bind
        ])->toArray();
        $median_sales = MedianSale::find([
            'conditions' => $conditions,
            'bind' => $bind
        ])->toArray();

        $response = new Response();
        $response->setJsonContent([
            'sales' => $sales,
            'median_sales' => $median_sales
        ]);

        return $response;
    }


    private function getDataById($model_class)
    {
        $ids = $this->request->get('ids');
        if ($ids) {
            $request = $model_class::find("id IN ($ids)")->toArray();
        } else {
            $request = $model_class::find();
        }
        return $request;
    }
}
