<?php


namespace Controllers;

use Models\City;
use Models\PropertyType;
use Models\Sale;
use Phalcon\Http\Response;
use Phalcon\Mvc\Controller;


class ApiController extends Controller
{
    public function cities()
    {
        $response = new Response();
        $response->setJsonContent($this->getDataById(City::class));
        return $response;
    }

    public function propertyTypes()
    {
        $response = new Response();
        $response->setJsonContent($this->getDataById(PropertyType::class));
        return $response;
    }

    public function sales()
    {
        $months = $this->getMonths();
        $days = $this->getDays();
        $property_types = $this->getPropertyTypes();

        $sales = $this->getFilteredSales();
        list($types_sales, $types_sales_count, $days_sales, $months_sales, $days_types_sales, $months_types_sales) = $this->indexSales($sales);
        $all_types = array_column($sales, 'property_type_id');
        $count = count($sales);

        // Overview Stats
        $overview = [
            ['text' => 'Maximum Price', 'icon' => 'arrow alternate circle up', 'value' => '$' . $this->nice_number($sales[$count - 1]['price'])],
            ['text' => 'Minimum Price', 'icon' => 'arrow alternate circle down', 'value' => '$' . $this->nice_number($sales[0]['price'])],
            ['text' => 'Median Price', 'icon' => 'arrow alternate circle right', 'value' => '$' . $this->nice_number($sales[$count / 2]['price'])],
            ['text' => 'Total Sales', 'icon' => 'home', 'value' => $this->nice_number($count) . ' Properties']
        ];

        // Trends At Glance Stats
        $days_trends_glance = $this->getTrendsGlance($days_sales, $days);
        $months_trends_glance = $this->getTrendsGlance($months_sales, $months);
        $trendsGlance = [
            ['text' => 'Maximum Day', 'icon' => 'arrow alternate circle up', 'value' => $days_trends_glance['max']['text'] . ' | $' . $days_trends_glance['max']['value']],
            ['text' => 'Maximum Month', 'icon' => 'arrow alternate circle up', 'value' => $months_trends_glance['max']['text'] . ' | $' . $months_trends_glance['max']['value']],
            ['text' => 'Minimum Day', 'icon' => 'arrow alternate circle down', 'value' => $days_trends_glance['min']['text'] . ' | $' . $days_trends_glance['min']['value']],
            ['text' => 'Minimum Month', 'icon' => 'arrow alternate circle down', 'value' => $months_trends_glance['min']['text'] . ' | $' . $months_trends_glance['min']['value']]
        ];

        // Types Distribution Stats
        $types_distribution = $this->getTypesDistribution($types_sales, $types_sales_count, $property_types);

        // Trends Stats
        $days_trends = $this->getTrends($days_types_sales, $all_types, $property_types, $days);
        $months_trends = $this->getTrends($months_types_sales, $all_types, $property_types, $months);

        $response = new Response();
        $response->setJsonContent([
            'overview' => $overview,
            'trendsGlance' => $trendsGlance,
            'typesDistribution' => $types_distribution,
            'daysTrends' => $days_trends,
            'monthsTrends' => $months_trends
        ]);

        return $response;
    }

    private function getTypesDistribution($types_sales, $types_sales_count, $property_types) {
        $types_distribution = ['sales' => ['total' => 0, 'data' => []], 'count' => ['total' => 0, 'data' => []]];
        ksort($types_sales);
        foreach ($types_sales as $type => $med_price) {
            $types_distribution['sales']['total'] += $med_price;
            $types_distribution['sales']['data'][] = ['label' => $property_types[$type], 'value' => $med_price];

            $types_distribution['count']['total'] += $types_sales_count[$type];
            $types_distribution['count']['data'][] = ['label' => $property_types[$type], 'value' => $types_sales_count[$type]];
        }

        $types_distribution['sales']['total'] = '$' . $this->nice_number($types_distribution['sales']['total']);
        $types_distribution['count']['total'] = $this->nice_number($types_distribution['count']['total']);

        return $types_distribution;
    }

    private function getTrendsGlance($sales, $keys)
    {
        $max = 0;
        $min = 1000000000;
        $max_key = '';
        $min_key = '';
        foreach ($sales as $key => $prices) {
            $median = $prices[count($prices) / 2];
            if ($median > $max) {
                $max = $median;
                $max_key = $keys[$key];
            }

            if ($median < $min) {
                $min = $median;
                $min_key = $keys[$key];
            }
        }

        return [
            'max' => ['text' => $max_key, 'value' => $this->nice_number($max)],
            'min' => ['text' => $min_key, 'value' => $this->nice_number($min)]
        ];
    }

    private function getMonths()
    {
        return [
            1 => 'Jan',
            2 => 'Feb',
            3 => 'Mar',
            4 => 'Apr',
            5 => 'May',
            6 => 'Jun',
            7 => 'Jul',
            8 => 'Aug',
            9 => 'Sep',
            10 => 'Oct',
            11 => 'Nov',
            12 => 'Dec'
        ];
    }

    private function getDays()
    {
        return [
            1 => 'Mon',
            2 => 'Tues',
            3 => 'Wed',
            4 => 'Thur',
            5 => 'Fri',
            6 => 'Sat',
            7 => 'Sun'
        ];
    }

    private function getPropertyTypes()
    {
        $rvalue = [];
        $data = PropertyType::find()->toArray();
        foreach ($data as $d) {
            $rvalue[$d['id']] = $d['name'];
        }

        return $rvalue;
    }

    private function getTrends($data, $all_types, $property_types, $keys)
    {
        $categories = [
            [
                'category' => []
            ]
        ];
        $dataset_types = [];
        ksort($data);
        foreach ($data as $key => $types_sales) {
            $categories[0]['category'][] = ['label' => $keys[$key]];
            foreach ($all_types as $type_id) {
                if (!$types_sales[$type_id]) {
                    $types_sales[$type_id] = [0];
                }
            }

            ksort($types_sales);
            foreach ($types_sales as $type_id => $values) {
                $dataset_types[$type_id][] = ['value' => $values[count($values) / 2]];
            }
        }

        $dataset = [];
        foreach ($dataset_types as $type_id => $values) {
            $dataset[] = [
                'seriesname' => $property_types[$type_id],
                'data' => $values
            ];
        }


        return [
            'categories' => $categories,
            'dataset' => $dataset
        ];
    }


    private function getDataById($model_class)
    {
        $ids = $this->request->get('ids');
        if ($ids) {
            $request = $model_class::find("id IN ($ids)")->toArray();
        } else {
            $request = $model_class::find()->toArray();
        }

        $data = [];
        foreach ($request as $r) {
            $d = ['key' => $r['id'], 'value' => $r['id'], 'text' => $r['name']];
            if ($r['short_name']) {
                $d['short_text'] = $r['short_name'];
            }

            $data[] = $d;
        }
        return $data;
    }

    /**
     * @return array
     */
    private function getFilteredSales()
    {
        $cities = $this->request->get('cities');
        $property_types = $this->request->get('propertyTypes');
        $date_from = $this->request->get('startDate');
        $date_to = $this->request->get('endDate');;

        $conditions = 'date >= :date_from: and date <= :date_to:';
        $bind = ['date_from' => $date_from, 'date_to' => $date_to];

        if ($cities) {
            $conditions .= " and city_id IN ($cities)";
        }
        if ($property_types) {
            $conditions .= " and property_type_id IN ($property_types)";
        }

        $sales = Sale::find([
            'conditions' => $conditions,
            'bind' => $bind,
            'order' => 'price'
        ])->toArray();
        return $sales;
    }

    /**
     * @param $sales
     * @return array
     */
    private function indexSales($sales)
    {
        $days_sales = [];
        $months_sales = [];
        $types_sales = [];
        $types_sales_count = [];
        $days_types_sales = [];
        $months_types_sales = [];
        foreach ($sales as $sale) {
            $type = $sale['property_type_id'];
            $day = $sale['day'];
            $month = $sale['month'];
            $price = $sale['price'];

            if (!$days_types_sales[$day]) {
                $days_sales[$day] = [];
                $days_types_sales[$day][$type] = [];
            }

            if (!$months_types_sales[$month]) {
                $months_types_sales[$month] = [];
                $months_types_sales[$month][$type] = [];
            }

            if (!$types_sales[$type]) {
                $types_sales[$type] = 0;
                $types_sales_count[$type] = 0;
            }

            $days_types_sales[$day][$type][] = $price;
            $months_types_sales[$month][$type][] = $price;
            $days_sales[$day][] = $price;
            $months_sales[$month][] = $price;
            $types_sales[$type] += $price;
            $types_sales_count[$type] += 1;
        }
        return array($types_sales, $types_sales_count, $days_sales, $months_sales, $days_types_sales, $months_types_sales);
    }

    function nice_number($n) {
        // first strip any formatting;
        $n = (0+str_replace(",","",$n));

        // is this a number?
        if(!is_numeric($n)) return false;

        // now filter it;
        if($n>1000000000000) return round(($n/1000000000000),1).'T';
        else if($n>1000000000) return round(($n/1000000000),1).'B';
        else if($n>1000000) return round(($n/1000000),1).'M';
        else if($n>1000) return round(($n/1000),1).'K';

        return number_format($n);
    }
}
