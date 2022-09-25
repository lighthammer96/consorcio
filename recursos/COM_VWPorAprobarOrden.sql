CREATE VIEW COM_VWPorAprobarOrden
AS
SELECT OCC.nIdConformidad Conformidad, OCC.cCodConsecutivo Codigo, OCC.nConsecutivo Consecutivo, OCC.nIdUsuario IdUsuario, U.username Usuario,OCC.iEstado EstadoAprob,
OC.dFecRegistro Fecha, OC.dFecRequerida FechaReq,
TC.cDescripcion TipoDoc,P.documento NumeroDoc, P.razonsocial Proveedor, M.Descripcion Moneda, OC.total Total, 
CASE OC.iestado WHEN 1 THEN 'Registrado' WHEN 2 THEN 'Por Aprobar' WHEN 3 THEN 'Aprobado' WHEN 4 THEN 'Recibido' WHEN 5 THEN 'Backorder' WHEN 6 THEN 'Cerrado' WHEN 7 THEN 'Cancelado' WHEN 8 THEN 'Rechazado' ELSE 'No Definido' END  EstadoOC
FROM ERP_OrdenCompraConformidad OCC
INNER JOIN ERP_OrdenCompra OC ON OC.cCodConsecutivo = OCC.cCodConsecutivo AND OC.nConsecutivo = OCC.nConsecutivo and OC.iEstado = 2
INNER JOIN ERP_Usuarios U ON U.id = OCC.nIdUsuario
INNER JOIN ERP_Proveedor P ON P.id = OC.idProveedor
INNER JOIN ERP_Moneda M ON M.IdMoneda = OC.idmoneda
INNER JOIN ERP_TABLASUNAT TC ON TC.cNombretabla = 'TIPO_DOCUMENTO' AND TC.cCodigo = P.tipodoc
WHERE EXISTS(
SELECT 1 FROM (
				SELECT cCodConsecutivo,nConsecutivo, MIN(nOrden ) orden
				FROM ERP_OrdenCompraConformidad 
				WHERE iEstado = 0
				GROUP BY  cCodConsecutivo,nConsecutivo) X
				WHERE X.cCodConsecutivo = OCC.cCodConsecutivo AND X.nConsecutivo = OCC.nConsecutivo  AND X.orden = OCC.nOrden
)
GO
