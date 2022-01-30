# 2022-01-01

Feliz año! Os paso una lista de algunos de los avances de estos días.

Para facilitar el trabajo a los editores, estamos creando (aun en desarrollo, habrá errores, faltará información....) :

1. Una vista de las ultimas películas editadas https://ohana.tv/editors
1. Vista de las ultimas ediciones de cada editor, ej: https://ohana.tv/editor/filmoteca33
1. Un leaderboard para poder ver la información de los distintos editores desde un mismo sitio https://ohana.tv/editors/stats/leaderboard

Por otro lado, el sistema anterior, permitía editar películas aunque no dispusiéramos de un 'mapeo' entre la ID interna de la plataforma (netflix/primevideo/...) y la ID global de imdb. Este mapeo es esencial para 1) obtener metadatos de la película (póster, año...) y así poder añadirla a nuestra web 2) relacionar cortes/... entre distintas plataformas, 3) gestionar series (y sus episodios) correctamente. Esto impedía funcionar correctamente con series, así como impedir que algunas películas editadas aparecieran en la web... para ello, hemos:

1. Mejorado el sistema de identificación/mapeado de películas y series
2. Creado un sistema para permitir al editor identificar/mapear manualmente aquellas películas/episodios donde el sistema automático aún no funcione (pregunta al editor automáticamente al intentar editar una película no identificada).
3. Listado las películas/episodios que actualmente están sin 'mapear' (pondremos a alguien a trabajar en esa lista caso por caso) https://ohana.tv/editors/stats/pending-mapping

Además, hemos

1. Consolidado el nombre 'Ohana TV' asi como el dominio ohana.tv y los correos contacto@ohana.tv o contact@ohana.tv en distintas ubicaciones
   Creado un sistema de cobro de donativos online (tarjeta de crédito o paypal), permitiendo al usuario elegir el destino concreto del donativo así como la cantidad y si es recurrente o no.
2. Diseñado un nuevo sistema para actualizar rápidamente la disponibilidad de las distintas películas en las distintas plataformas (pendiente de implementación)
3. Actualizado cargos dentro de la asociación Ohana para repartir mejor el trabajo y agilizar futuros procesos legales (que un documento requiera firmas físicas de gente en varios países/ciudades es extremadamente tedioso)
4. Contratado a un estudiante de fin de máster para que colabore con Ohana los próximos seis meses (empezando ya en enero)
5. Repensado la lista de etiquetas y valores en base a las distintas propuestas. Actualizaremos la web en breves.
6. Corregido diversos bugs en la web, extensión y servidor

Y alguna cosilla más que seguro me dejo. 2022 va a ser el año de Ohana!

Un saludo,

Miguel
