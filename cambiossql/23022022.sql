SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[ERP_view_solicitud_credito] AS SELECT 
s.cCodConsecutivo, s.nConsecutivo, s.fecha_solicitud, s.tipo_solicitud, s.estado, s.idconvenio, s.descuento_id, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, s.t_monto_total,
CASE WHEN s.saldo IS NULL THEN 0 ELSE s.saldo END AS saldo,
CASE WHEN s.pagado IS NULL THEN 0 ELSE s.pagado END AS pagado,
CASE WHEN s.facturado IS NULL THEN 0 ELSE s.facturado END AS facturado

FROM ERP_Solicitud AS s
INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
INNER JOIN ERP_Clientes AS c ON(s.idcliente=c.id)
INNER JOIN ERP_TABLASUNAT AS tc ON(cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=s.idmoneda)
WHERE s.estado=6 AND sc.saldo_cuota<>0
GROUP BY s.cCodConsecutivo, s.nConsecutivo, s.fecha_solicitud, s.tipo_solicitud, s.estado, s.idconvenio, s.descuento_id, tc.cDescripcion, c.documento, m.Descripcion, s.t_monto_total, s.saldo, s.pagado, s.facturado
GO



ALTER TABLE [dbo].[ERP_VentaDetalle] ADD [nrocuota] int NULL
GO

ALTER TABLE [dbo].[ERP_VentaDetalle] ADD [valor_cuota_pagada] decimal(18,5) NULL
GO

ALTER TABLE [dbo].[ERP_VentaDetalle] ADD [int_moratorio_pagado] decimal(18,5) NULL;
