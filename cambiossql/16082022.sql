SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[ERP_view_comprobantes_caja_detalle] AS
select cli.documento,cli.razonsocial_cliente,v.serie_comprobante,v.numero_comprobante,v.t_monto_total as monto,
CONVERT(DATE,v.fecha_emision) as fecha,v.idcajero,v.idmoneda,td.Descripcion as comprobante,v.IdTipoDocumento 
from ERP_Venta as v  inner join ERP_TipoDocumento as td on(td.IdTipoDocumento=v.IdTipoDocumento)  
left join ERP_Clientes as cli on (cli.id=v.idCliente) where v.IdTipoDocumento !='12' AND ISNULL(v.anulado, 'N') <> 'S'


GO




/****** Object:  View [dbo].[ERP_view_comprobantes_caja]    Script Date: 16/08/2022 16:07:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER VIEW [dbo].[ERP_view_comprobantes_caja] AS
select sum(v.t_monto_total) as monto,CONVERT(DATE,v.fecha_emision) as fecha,v.idcajero,v.idmoneda,td.Descripcion as comprobante,
v.IdTipoDocumento from ERP_Venta as v  inner join ERP_TipoDocumento as td on(td.IdTipoDocumento=v.IdTipoDocumento) 
where v.IdTipoDocumento !='12' AND ISNULL(v.anulado, 'N') <> 'S'
GROUP BY v.IdTipoDocumento,td.Descripcion,v.idcajero,CONVERT(DATE,v.fecha_emision),v.idmoneda 


GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER VIEW [dbo].[ERP_VW_PendientesCobro] AS
select ve.IdMoneda,ve.idCliente, ve.t_monto_total+ve.anticipo t_monto_total,ve.pagado+ve.anticipo pagado,ve.saldo, ve.serie_comprobante,ve.numero_comprobante,cl.razonsocial_cliente,ve.fecha_emision, ve.cCodConsecutivo_solicitud as cCodConsecutivo_solicitud,ve.nConsecutivo_solicitud as nConsecutivo_solicitud, cp.description as condicion_pago_text , td.Descripcion as tipoDocumento, mo.Descripcion as moneda 
from ERP_Venta as ve inner join ERP_Clientes as cl on cl.id = ve.idCliente 
inner join ERP_TipoDocumento as td on ve.IdTipoDocumento=td.IdTipoDocumento 
inner join ERP_Moneda as mo on mo.IdMoneda=ve.IdMoneda 
inner join ERP_CondicionPago as cp on cp.id=ve.condicion_pago 
where ve.IdTipoDocumento !='12' and ve.saldo > 0 AND ISNULL(ve.anulado, 'N') <> 'S'; 

GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[ERP_VW_AprobacionTotal] AS
select v.idcliente,v.idmoneda as idMoneda,m.Descripcion as moneda,SUM(v.saldo)as saldoTotal 
from ERP_Venta  as v inner join ERP_Moneda as m on v.idMoneda=m.IdMoneda 
where  IdTipoDocumento !='12' and v.saldo > 0  AND ISNULL(v.anulado, 'N') <> 'S'
GROUP BY v.idMoneda,m.Descripcion, v.idcliente;

GO



/****** Object:  View [dbo].[ERP_view_venta]    Script Date: 16/08/2022 16:22:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- dbo.ERP_view_venta source

-- dbo.ERP_view_venta source

-- dbo.ERP_view_venta source

-- dbo.ERP_view_venta source

ALTER VIEW [dbo].[ERP_view_venta] AS SELECT ISNULL(v.anulado, 'N') AS anulado,v.idventa, v.serie_comprobante, v.numero_comprobante, v.fecha_emision, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, v.t_monto_total, v.tipo_comprobante,
CASE WHEN v.saldo IS NULL THEN 0 ELSE v.saldo END AS saldo,
CASE WHEN v.pagado IS NULL THEN 0 ELSE v.pagado END AS pagado, v.cCodConsecutivo_solicitud, v.nConsecutivo_solicitud, s.tipo_solicitud, s.estado, v.IdTipoDocumento, v.anticipo, v.idventa_referencia, ISNULL(c.razonsocial_cliente, '') AS cliente, c.id AS idcliente, FORMAT(v.fecha_emision, 'yyyy-MM-dd') AS fecha_emision_server,
CASE WHEN ISNULL(v.anulado,'N')<>'S' AND v.statusCode='0000' THEN 'EMITIDO'
WHEN ISNULL(v.anulado,'N')<>'S' AND v.statusCode<>'0000' THEN 'RECHAZADO' 
WHEN ISNULL(v.anulado,'N')='S' AND v.statusCodeBaja='0000' THEN 'BAJA EMITIDA' 
WHEN ISNULL(v.anulado,'N')='S' AND v.statusCodeBaja<>'0000' THEN 'BAJA RECHAZADA' 
ELSE 'PENDIENTE' END AS estado_cpe, DATEDIFF(day, v.fecha_emision, GETDATE()) AS dias_vencidos
FROM ERP_Venta AS v
LEFT JOIN ERP_Clientes AS c ON(v.idcliente=c.id)
INNER JOIN ERP_TABLASUNAT AS tc ON(tc.cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
LEFT JOIN ERP_Solicitud AS s ON(s.cCodConsecutivo=v.cCodConsecutivo_solicitud AND s.nConsecutivo=v.nConsecutivo_solicitud)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda);

GO


