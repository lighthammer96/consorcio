/****** Object:  View [dbo].[ERP_view_venta]    Script Date: 25/03/2022 09:51:08 a.m. ******/
DROP VIEW [dbo].[ERP_view_venta]
GO

/****** Object:  View [dbo].[ERP_view_venta]    Script Date: 25/03/2022 09:51:08 a.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[ERP_view_venta] AS SELECT v.idventa, v.serie_comprobante, v.numero_comprobante, v.fecha_emision, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, v.t_monto_total, v.tipo_comprobante,
CASE WHEN v.saldo IS NULL THEN 0 ELSE v.saldo END AS saldo,
CASE WHEN v.pagado IS NULL THEN 0 ELSE v.pagado END AS pagado, v.cCodConsecutivo_solicitud, v.nConsecutivo_solicitud, s.tipo_solicitud, s.estado, v.IdTipoDocumento, v.anticipo, v.idventa_referencia

FROM ERP_Venta AS v
INNER JOIN ERP_Clientes AS c ON(v.idcliente=c.id)
INNER JOIN ERP_TABLASUNAT AS tc ON(tc.cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
LEFT JOIN ERP_Solicitud AS s ON(s.cCodConsecutivo=v.cCodConsecutivo_solicitud AND s.nConsecutivo=v.nConsecutivo_solicitud)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda)
GO


ALTER TABLE [dbo].[ERP_Venta] ADD [por_aplicar] char(1) DEFAULT 'N' NULL
GO

IF ((SELECT COUNT(*) FROM ::fn_listextendedproperty('MS_Description',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'aplicado_separacion')) > 0)
  EXEC sp_updateextendedproperty
'MS_Description', N'si ya fue o no aplicado en una venta o pago con forma  de pago "separacion"
S -> SI
N -> NO',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'aplicado_separacion'
ELSE
  EXEC sp_addextendedproperty
'MS_Description', N'si ya fue o no aplicado en una venta o pago con forma  de pago "separacion"
S -> SI
N -> NO',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'aplicado_separacion'
GO

IF ((SELECT COUNT(*) FROM ::fn_listextendedproperty('MS_Description',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'aplicado_nota')) > 0)
  EXEC sp_updateextendedproperty
'MS_Description', N'si ya fue o no aplicado en una venta o pago con forma  de pago "nota de credito"
S -> SI
N -> NO
',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'aplicado_nota'
ELSE
  EXEC sp_addextendedproperty
'MS_Description', N'si ya fue o no aplicado en una venta o pago con forma  de pago "nota de credito"
S -> SI
N -> NO
',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'aplicado_nota'
GO

EXEC sp_addextendedproperty
'MS_Description', N'si se debe o no aplicar en una venta o pago con formas de pago "separacion" o "nota de credito"
S -> SI
N -> NO',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'por_aplicar';