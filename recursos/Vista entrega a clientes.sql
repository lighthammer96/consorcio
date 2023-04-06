create view ERP_VW_Documentos as 
select v.serie_comprobante codigo,v.numero_comprobante numero,v.serie_comprobante+'-'+CONVERT(varchar,v.numero_comprobante) Documento, c.razonsocial_cliente Cliente
from erp_venta v
inner join erp_clientes c on v.idcliente = c.id
union all
select p.ccodconsecutivo codigo,p.nconsecutivo numero,p.ccodconsecutivo+'-'+CONVERT(varchar,p.nconsecutivo) Documento, c.razonsocial_cliente Cliente
from erp_proforma p
inner join erp_clientes c on p.idcliente = c.id
go


--Vista a utilizar en la opción de Entrega a ST o Clientes
create view AL_Entega_ST_Cliente as
select m.idMovimiento nro, CONVERT(varchar,m.fecha_registro,23) fecha, op.descripcion tipooperacion,
u.name Usuario, case m.estado when 0 then 'Registrado' else 'Procesado' end estado,
ccodconsecutivo+'-'+CONVERT(varchar,nconsecutivo) documento, d.cliente
from erp_movimiento m
inner join erp_tipooperacion op on m.idTipoOperacion = op.idTipoOperacion 
inner join erp_usuarios u on m.idUsuario = u.Id
left join ERP_VW_Documentos d on d.codigo = m.ccodconsecutivo and d.numero = m.nconsecutivo
where m.idtipooperacion in (2,7)
go



