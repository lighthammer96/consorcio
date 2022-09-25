/****** Object:  View [dbo].[ERP_view_venta]    Script Date: 08/08/2022 03:15:17 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- dbo.ERP_view_venta source

-- dbo.ERP_view_venta source

-- dbo.ERP_view_venta source

-- dbo.ERP_view_venta source

ALTER VIEW [dbo].[ERP_view_venta] AS SELECT v.anulado,v.idventa, v.serie_comprobante, v.numero_comprobante, v.fecha_emision, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, v.t_monto_total, v.tipo_comprobante,
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




ALTER TABLE Consorcio.dbo.ERP_Venta ADD fecha_anulacion datetime NULL;
ALTER TABLE Consorcio.dbo.ERP_Venta ADD correlativo_anulacion int NULL;


ALTER TABLE Consorcio.dbo.ERP_Venta ADD enviado_anulado int NULL;
EXEC Consorcio.sys.sp_addextendedproperty 'MS_Description', N'1 -> ya sido enviado al portal
0 -> aun no ha sido enviado al portal', 'schema', N'dbo', 'table', N'ERP_Venta', 'column', N'enviado_pdf';
EXEC Consorcio.sys.sp_addextendedproperty 'MS_Description', N'', 'schema', N'dbo', 'table', N'ERP_Venta', 'column', N'correlativo_anulacion';
ALTER TABLE Consorcio.dbo.ERP_Venta ADD  DEFAULT 0 FOR enviado_anulado;

EXEC Consorcio.sys.sp_addextendedproperty 'MS_Description', N'1 -> ya sido enviado al portal
0 -> aun no ha sido enviado al portal', 'schema', N'dbo', 'table', N'ERP_Venta', 'column', N'enviado_anulado';


ALTER TABLE Consorcio.dbo.ERP_Venta ADD statusCodeBaja varchar(10) NULL;
ALTER TABLE Consorcio.dbo.ERP_Venta ADD statusMessageBaja text NULL;
