create view ST_VWOrdenServicio as
select o.cCodConsecutivo,o.nConsecutivo ,o.dFecRec, c.razonsocial_cliente cliente,
o.iEstado,
o.cPlacaVeh
from ERP_OrdenServicio  O
inner join ERP_Clientes C on O.idCliente = C.id
