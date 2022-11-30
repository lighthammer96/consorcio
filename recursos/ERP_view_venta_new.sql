ALTER VIEW ERP_view_venta AS -- 9639
SELECT ISNULL(v.anulado, 'N') AS anulado,v.idventa, v.serie_comprobante, v.numero_comprobante, v.fecha_emision, tc.cDescripcion AS tipo_documento, 
c.documento AS numero_documento, m.Descripcion AS moneda, v.t_monto_total, v.tipo_comprobante,
CASE WHEN v.saldo IS NULL THEN 0 ELSE v.saldo END AS saldo,
CASE WHEN v.pagado IS NULL THEN 0 ELSE v.pagado END AS pagado, v.cCodConsecutivo_solicitud, v.nConsecutivo_solicitud, s.tipo_solicitud, s.estado, v.IdTipoDocumento, v.anticipo, v.idventa_referencia, ISNULL(c.razonsocial_cliente, '') AS cliente, 
c.id AS idcliente, FORMAT(v.fecha_emision, 'yyyy-MM-dd') AS fecha_emision_server,
CASE WHEN ISNULL(v.anulado,'N')<>'S' AND v.statusCode='0000' THEN 'EMITIDO'
WHEN ISNULL(v.anulado,'N')<>'S' AND v.statusCode<>'0000' THEN 'RECHAZADO' 
WHEN ISNULL(v.anulado,'N')='S' AND v.statusCodeBaja='0000' THEN 'BAJA EMITIDA' 
WHEN ISNULL(v.anulado,'N')='S' AND v.statusCodeBaja<>'0000' THEN 'BAJA RECHAZADA' 
ELSE 'PENDIENTE' END AS estado_cpe, DATEDIFF(day, v.fecha_emision, GETDATE()) AS dias_vencidos,
CONCAT(v.serie_comprobante,'-',v.numero_comprobante) AS comprobante,
isnull(co.descripcionconvenio,cp.description) formapago
FROM ERP_Venta AS v
LEFT JOIN ERP_Clientes AS c ON(v.idcliente=c.id)
LEFT JOIN ERP_TABLASUNAT AS tc ON(tc.cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
LEFT JOIN ERP_Solicitud AS s ON(s.cCodConsecutivo=v.cCodConsecutivo_solicitud AND s.nConsecutivo=v.nConsecutivo_solicitud)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda)
LEFT JOIN ERP_CondicionPago cp ON cp.id = V.condicion_pago
LEFT JOIN ERP_Convenios co ON co.idconvenio = s.idconvenio;
