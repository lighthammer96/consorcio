/****** Object:  View [dbo].[ERP_view_solicitud]    Script Date: 08/04/2022 09:07:36 a.m. ******/
DROP VIEW [dbo].[ERP_view_solicitud]
GO

/****** Object:  View [dbo].[ERP_view_solicitud]    Script Date: 08/04/2022 09:07:36 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[ERP_view_solicitud] AS SELECT s.cCodConsecutivo, s.nConsecutivo, s.fecha_solicitud, s.tipo_solicitud, s.estado, s.idconvenio, s.descuento_id, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, s.t_monto_total,
CASE WHEN s.saldo IS NULL THEN 0 ELSE s.saldo END AS saldo,
CASE WHEN s.pagado IS NULL THEN 0 ELSE s.pagado END AS pagado,
CASE WHEN s.facturado IS NULL THEN 0 ELSE s.facturado END AS facturado, c.razonsocial_cliente AS cliente

FROM ERP_Solicitud AS s
INNER JOIN ERP_Clientes AS c ON(s.idcliente=c.id)
INNER JOIN ERP_TABLASUNAT AS tc ON(tc.cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=s.idmoneda)
GO




/****** Object:  View [dbo].[ERP_view_venta]    Script Date: 08/04/2022 09:11:59 a.m. ******/
DROP VIEW [dbo].[ERP_view_venta]
GO

/****** Object:  View [dbo].[ERP_view_venta]    Script Date: 08/04/2022 09:11:59 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[ERP_view_venta] AS SELECT v.idventa, v.serie_comprobante, v.numero_comprobante, v.fecha_emision, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, v.t_monto_total, v.tipo_comprobante,
CASE WHEN v.saldo IS NULL THEN 0 ELSE v.saldo END AS saldo,
CASE WHEN v.pagado IS NULL THEN 0 ELSE v.pagado END AS pagado, v.cCodConsecutivo_solicitud, v.nConsecutivo_solicitud, s.tipo_solicitud, s.estado, v.IdTipoDocumento, v.anticipo, v.idventa_referencia, c.razonsocial_cliente AS cliente

FROM ERP_Venta AS v
INNER JOIN ERP_Clientes AS c ON(v.idcliente=c.id)
INNER JOIN ERP_TABLASUNAT AS tc ON(tc.cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
LEFT JOIN ERP_Solicitud AS s ON(s.cCodConsecutivo=v.cCodConsecutivo_solicitud AND s.nConsecutivo=v.nConsecutivo_solicitud)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda)
GO



/****** Object:  View [dbo].[ERP_view_solicitud_credito]    Script Date: 08/04/2022 09:19:20 a.m. ******/
DROP VIEW [dbo].[ERP_view_solicitud_credito]
GO

/****** Object:  View [dbo].[ERP_view_solicitud_credito]    Script Date: 08/04/2022 09:19:20 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[ERP_view_solicitud_credito] AS SELECT 
s.cCodConsecutivo, s.nConsecutivo, s.fecha_solicitud, s.tipo_solicitud, s.estado, s.idconvenio, s.descuento_id, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, s.t_monto_total,
CASE WHEN s.saldo IS NULL THEN 0 ELSE s.saldo END AS saldo,
CASE WHEN s.pagado IS NULL THEN 0 ELSE s.pagado END AS pagado,
CASE WHEN s.facturado IS NULL THEN 0 ELSE s.facturado END AS facturado, c.razonsocial_cliente AS cliente

FROM ERP_Solicitud AS s
INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
INNER JOIN ERP_Clientes AS c ON(s.idcliente=c.id)
INNER JOIN ERP_TABLASUNAT AS tc ON(cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=s.idmoneda)
WHERE sc.saldo_cuota<>0
GROUP BY s.cCodConsecutivo, s.nConsecutivo, s.fecha_solicitud, s.tipo_solicitud, s.estado, s.idconvenio, s.descuento_id, tc.cDescripcion, c.documento, m.Descripcion, s.t_monto_total, s.saldo, s.pagado, s.facturado, c.razonsocial_cliente
GO


/****** Object:  View [dbo].[ERP_view_series]    Script Date: 08/04/2022 03:54:11 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[ERP_view_series] AS SELECT se.idSerie, se.nombreSerie,se.idArticulo,se.chasis,se.motor,se.anio_fabricacion,se.anio_modelo,se.color,se.user_created,se.user_updated,se.idTipoCompraVenta,se.nPoliza,se.nLoteCompra,se.cPlacaVeh, tcv.descripcion AS tipo_compra_venta 
 FROM   ERP_Serie as se 
 LEFT JOIN ERP_TipoCompraVenta AS tcv ON(tcv.idTipoCompraVenta=se.idTipoCompraVenta)
GO


/****** Object:  View [dbo].[ERP_view_Series_Stock]    Script Date: 08/04/2022 03:54:27 p.m. ******/
DROP VIEW [dbo].[ERP_view_Series_Stock]
GO

/****** Object:  View [dbo].[ERP_view_Series_Stock]    Script Date: 08/04/2022 03:54:27 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[ERP_view_Series_Stock] AS SELECT se.idSerie,se.nombreSerie,se.chasis,se.motor, se.anio_fabricacion,se.anio_modelo,se.color,se.idArticulo, tcv.descripcion AS tipo_compra_venta 
 FROM ERP_almacen_stock_localizacion_detalle as d  
 INNER JOIN  ERP_Serie as se on d.idDetalle=se.idSerie 
 LEFT JOIN ERP_TipoCompraVenta AS tcv ON(tcv.idTipoCompraVenta=se.idTipoCompraVenta)
 where d.TipoId='S' and d.total>0
GO


