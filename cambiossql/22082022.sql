create view AL_Movimientos as
select  idMovimiento Id, convert(date,fecha_registro) Fecha, u.name Usuario, T.descripcion Operacion, 
case M.estado when 0 Then 'Registrado' else 'Procesado' end Estado,  
observaciones Observacion, m.created_at
from ERP_Movimiento M
inner join ERP_TipoOperacion T on M.idTipoOperacion = T.idTipoOperacion
inner join ERP_Usuarios U on U.id = M.idUsuario;


/****** Object:  View [dbo].[ERP_view_venta]    Script Date: 22/08/2022 22:52:06 ******/
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
ELSE 'PENDIENTE' END AS estado_cpe, DATEDIFF(day, v.fecha_emision, GETDATE()) AS dias_vencidos,
CONCAT(v.serie_comprobante,'-',v.numero_comprobante) AS comprobante
FROM ERP_Venta AS v
LEFT JOIN ERP_Clientes AS c ON(v.idcliente=c.id)
INNER JOIN ERP_TABLASUNAT AS tc ON(tc.cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
LEFT JOIN ERP_Solicitud AS s ON(s.cCodConsecutivo=v.cCodConsecutivo_solicitud AND s.nConsecutivo=v.nConsecutivo_solicitud)
INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda);


GO

