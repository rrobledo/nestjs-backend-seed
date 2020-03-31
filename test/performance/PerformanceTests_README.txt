Por unica vez

	Instalar loadtest:
		sudo npm install -g loadtest
	Ir a /multicuenta y ejecutar:
		npm install
	Instalar node-typescript:
		sudo apt install node-typescript
-------------------------------------------
El codigo de los tests de performance se encuentra en el archivo:
	/test/performance/performance.ts

Los test se corren n veces consecutivas y realizan test de performance para entidades, 
relaciones y queries.
Se pueden modificar algunos parametros para correr los tests.
El archivo de configuracion se encuentra en: 
	/test/performance/configuration.ts

Parametros configurables:
	-set_load: false
		Se refiere a que puede trabajar realizando una carga previa de entidades y relaciones.
		Si set_load es true, agrega/borra las entidades y relaciones necesarias para que se 
		ejecuten las pruebas de performance con la carga de entidades y relaciones deseadas. 
		La carga deseada se especifica en el parametro 'load' explicado a continuacion.
		En caso contrario, si set_load es false, no ejecuta ningun tipo de carga previa. 
		En este caso obtiene las entidades para poder hacer queries con entidades validas.
		
	-load: [0, 10000, 20000]
		Se refiere a la cantidad de entities y relaciones que debe tener cargadas previamente la base de datos.
		Es un array con 3 valores. Se tomara el primer valor para la primera corrida, el 
		segundo valor para la segunda corrida, etc.
		Las relaciones que se crean forman arboles como el siguiente:
			0 -> 1, 0 -> 2/1 -> 3, 1 -> 4/2 -> 5, 2 -> 6
	-requests: [400, 1000, 5000] 
		Se refiere a la cantidad de requests que debe ejecutar.
		Es un array con 3 valores. Se tomara el primer valor para la primera corrida, el 
		segundo valor para la segunda corrida, etc.
		Por defecto ejercita POST entities, POST relationships y GET Query
		Las relaciones creadas forman arboles como el siguiente:
			0 -> 1, 0 -> 2/1 -> 3, 1 -> 4/2 -> 5, 2 -> 6
	-only_query: false
		Si only_query es false, se ejercitaran las APIS POST entities, POST relationships y GET Query
		En caso contrario, cuando only_query es true, solo se ejercita la API GET Query.
	-concurrency: 100
		Se refiere a la cantidad de request que se van a lanzar juntas. Se van lanzando una 
		tras otra sin esperar que la anterior responda.

	*) La cantidad de veces que se corren los tests es el length del array 'load'. 
	   'load' siempre deberia tener la misma cantidad de elementos que 'requests'. 

Pasos para ejecutar los tests:
1) 	En el archivo /test/performance/configuration.js (Notar la extencion .js, no .ts)
	Realizar los cambios correspondientes en las variables configurables y guardar.
2) Correr los test, ejecutando el archivo ".js" con node:
	node performance.js
3) Copiar y pegar los resultados en el excel "PerformanceTests.xlsx". 
(en el mismo sitio donde ya estan los datos para que se actualicen los graficos 
automaticamente)

Ejemplo de la Salida de los Tests de performance:

requests	load	concurrency	time_entities	time_relationships	time_query
4	0	10	1,9375767799999999	21,316653757	1,353558784
8	10	10	1,036318078	1,668005619	1,190896783
12	16	10	4,532211806	2,782766214	2,4928508689999997

requests	load	concurrency	90_perc_entities	90_perc_relationships	90_perc_time_query
4	0	10	1627	21291	1344
8	10	10	1032	1663	1178
12	16	10	2306	1580	1966


*) Si se modifica el codigo del archivo performance.ts, se debe volver a compilar como ".js". 
Utilizar el comando:
	tsc -w -p performance.ts
	Tener en cuenta que el archivo de configuracion.js seria reemplazado con el compilado de 
	configuration.ts.

*) Si da problema este paso con el watcher, ejecutar:
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

*) Para conocer la cantidad de entidades y relaciones existentes en la base de datos
se puede utilizar el cliente de neo4j
Conectartse mediante-> cypher-shell -u neo4j -p secret
Ejecutar -> MATCH (e) OPTIONAL MATCH (e)-[r]->() RETURN COUNT(e), COUNT(r);

