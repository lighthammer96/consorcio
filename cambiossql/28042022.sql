USE [Consorcio]
GO

/****** Object:  View [dbo].[ERP_view_venta]    Script Date: 28/04/2022 16:47:01 ******/
DROP VIEW [dbo].[ERP_view_venta]
GO

/****** Object:  View [dbo].[ERP_view_venta]    Script Date: 28/04/2022 16:47:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[ERP_view_venta] AS SELECT v.anulado,v.idventa, v.serie_comprobante, v.numero_comprobante, v.fecha_emision, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, v.t_monto_total, v.tipo_comprobante,
CASE WHEN v.saldo IS NULL THEN 0 ELSE v.saldo END AS saldo,
CASE WHEN v.pagado IS NULL THEN 0 ELSE v.pagado END AS pagado, v.cCodConsecutivo_solicitud, v.nConsecutivo_solicitud, s.tipo_solicitud, s.estado, v.IdTipoDocumento, v.anticipo, v.idventa_referencia, ISNULL(c.razonsocial_cliente, '') AS cliente

FROM ERP_Venta AS v
LEFT JOIN ERP_Clientes AS c ON(v.idcliente=c.id)
LEFT JOIN ERP_TABLASUNAT AS tc ON(tc.cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
LEFT JOIN ERP_Solicitud AS s ON(s.cCodConsecutivo=v.cCodConsecutivo_solicitud AND s.nConsecutivo=v.nConsecutivo_solicitud)
LEFT JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda)


GO


