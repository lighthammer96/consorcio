create view ST_VWSerieVehTer as
select s.nombreSerie serie, s.chasis, s.motor, s.color, s.anio_fabricacion aniofabriacion, s.cPlacaVeh placa, m.description marca, mo.descripcion modelo   
from ERP_Serie s
left join ERP_Productos p on s.idArticulo = p.id 
left join ERP_Marcas m on p.idMarca = m.id
left join ERP_Modelo mo on p.idMarca = mo.idMarca and p.idModelo = mo.idModelo 
union all
select '' serie, t.n_chasis chasis, t.motor, t.color, t.anio_fabricacion aniofabriacion, t.placa, m.description marca, mo.descripcion modelo    
from ERP_VehTerceros t
left join ERP_Marcas m on t.idMarca = m.id
left join ERP_Modelo mo on t.idMarca = mo.idMarca and t.idModelo = mo.idModelo 

