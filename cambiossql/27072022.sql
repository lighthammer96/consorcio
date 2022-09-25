ALTER VIEW [dbo].[ERP_view_venta] AS SELECT v.anulado,v.idventa, v.serie_comprobante, v.numero_comprobante, v.fecha_emision, tc.cDescripcion AS tipo_documento, c.documento AS numero_documento, m.Descripcion AS moneda, v.t_monto_total, v.tipo_comprobante,
CASE WHEN v.saldo IS NULL THEN 0 ELSE v.saldo END AS saldo,
CASE WHEN v.pagado IS NULL THEN 0 ELSE v.pagado END AS pagado, v.cCodConsecutivo_solicitud, v.nConsecutivo_solicitud, s.tipo_solicitud, s.estado, v.IdTipoDocumento, v.anticipo, v.idventa_referencia, ISNULL(c.razonsocial_cliente, '') AS cliente, c.id AS idcliente, FORMAT(v.fecha_emision, 'yyyy-MM-dd') AS fecha_emision_server,
CASE WHEN v.statusCode='0000' THEN 'EMITIDO'
WHEN v.statusCode<>'0000' THEN 'RECHAZADO' 
ELSE 'PENDIENTE' END AS estado_cpe

FROM ERP_Venta AS v
LEFT JOIN ERP_Clientes AS c ON(v.idcliente=c.id)
INNER JOIN ERP_TABLASUNAT AS tc ON(tc.cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
LEFT JOIN ERP_Solicitud AS s ON(s.cCodConsecutivo=v.cCodConsecutivo_solicitud AND s.nConsecutivo=v.nConsecutivo_solicitud)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda);
GO
