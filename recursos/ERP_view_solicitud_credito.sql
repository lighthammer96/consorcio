ALTER VIEW ERP_view_solicitud_credito AS 
SELECT s.cCodConsecutivo, s.nConsecutivo, s.fecha_solicitud, s.tipo_solicitud, s.estado, s.idconvenio, s.descuento_id, tc.cDescripcion AS tipo_documento, 
c.documento AS numero_documento, m.Descripcion AS moneda, s.t_monto_total,
CASE WHEN s.saldo IS NULL THEN 0 ELSE s.saldo END AS saldo,
CASE WHEN s.pagado IS NULL THEN 0 ELSE s.pagado END AS pagado,
CASE WHEN s.facturado IS NULL THEN 0 ELSE s.facturado END AS facturado, 
c.razonsocial_cliente AS cliente, sc.valor_cuota_final cuota, v.serie_comprobante+'-'+convert(varchar,v.numero_comprobante) documento, 
isnull(se.nombreSerie,'SERIE N/D') serie 
FROM ERP_Solicitud AS s
INNER JOIN ERP_SolicitudCredito AS sc ON (s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
INNER JOIN ERP_SolicitudArticulo A ON (s.cCodConsecutivo=a.cCodConsecutivo AND s.nConsecutivo=a.nConsecutivo)
INNER JOIN ERP_Productos P ON (a.idarticulo = p.id and (p.idCategoria in (1,2) or p.id = 1903)) --Solo Motos y Trimóviles y Migrados
LEFT JOIN ERP_SolicitudDetalle D ON (s.cCodConsecutivo=d.cCodConsecutivo AND s.nConsecutivo=d.nConsecutivo and a.idarticulo = d.idarticulo and a.id = d.id_solicitud_articulo)
LEFT JOIN ERP_Serie SE ON d.idarticulo = se.idArticulo and d.idSerie = se.idSerie  
INNER JOIN ERP_Venta V on (v.cCodConsecutivo_solicitud = s.cCodConsecutivo and v.nConsecutivo_solicitud = s.nConsecutivo and v.tipo_comprobante = 0
							and v.IdTipoDocumento in ('01','03') and isnull(v.anulado,'N') = 'N')
INNER JOIN ERP_Clientes AS c ON(s.idcliente=c.id)
INNER JOIN ERP_TABLASUNAT AS tc ON(cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=s.idmoneda)
WHERE s.saldo > 0 and s.tipo_solicitud = 2 and s.estado in (6,7,8) -- Solicitudes con: Saldo, Tipo Crédito Ditecto y en estado Facturado, Despachado Parcial y Despachado 
