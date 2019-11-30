<?php

use Controllers\ApiController;
use Phalcon\Db\Adapter\Pdo\Mysql as PdoMysql;
use Phalcon\Di\FactoryDefault;
use Phalcon\Loader;
use Phalcon\Mvc\Micro;
use Phalcon\Mvc\Micro\Collection as MicroCollection;

// register models and controller
$loader = new Loader();
$loader->registerNamespaces(
    [
        'Models' => __DIR__ . '/models/',
        'Controllers' => __DIR__ . '/controllers/'
    ]
);
$loader->register();

$di = new FactoryDefault();
$di->set(
    'db',
    function () {
        return new PdoMysql(
            [
                'host' => 'localhost',
                'username' => 'root',
                'password' => '123',
                'dbname' => 'csce413',
            ]
        );
    }
);

// Creating a micro app and setting the server
$app = new Micro($di);
$app->before(
    function () use ($app) {

        $origin = $app->request->getHeader("ORIGIN") ? $app->request->getHeader("ORIGIN") : '*';

        $app->response->setHeader("Access-Control-Allow-Origin", $origin)
            ->setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS')
            ->setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Range, Content-Disposition, Content-Type, Authorization')
            ->setHeader("Access-Control-Allow-Credentials", true);
        $app->response->sendHeaders();
        return true;
    });
$app->notFound(function () use ($app) {
    $app->response->setStatusCode(404, "Not Found")->sendHeaders();
    echo 'This is crazy, but this page was not found!';
});

// Defining api routes
$api = new MicroCollection();
$api->setHandler(new ApiController());
$api->setPrefix('/api');
$api->post('/cities', 'cities');
$api->post('/propertyTypes', 'propertyTypes');
$api->post('/sales', 'sales');
$app->mount($api);

try {

} catch (Exception $e) {
    echo $e->getMessage();
}
$app->handle();

