<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MoviesController extends AbstractController
{
    //Las anotaciones nos permiten pasar parámetros, en este caso a Route Class.
    //Defaults es un array asociativo que nos permite enviar una variable por defecto
    //Los methods son aquellos métodos permitidos para esa URL
    //HEAD es similar a GET, excepto porque no retorna el contenido de la petición
    #[Route('/movies/{name}', name: 'movies', defaults: ['name' => null], methods: ['GET', 'HEAD'])]
    public function index($name): Response
    {
        return $this->json([
            'message' => $name,
            'path' => 'src/Controller/MoviesController.php'
        ]);
    }

    /**
     * oldMethod
     *  
     * @return Response
     */
    #[Route('/old', name: 'old')]
    public function oldMethod(): Response
    {
        return $this->json([
            'message' => 'Old Method',
            'path' => 'src/Controller/MoviesController.php'
        ]);
    }
}
