ALTER VIEW [dbo].[ERP_VWStockDetalle]
as
SELECT tcv.descripcion as tipoCompraVenta,P.code_article,SLD.idArticulo id, P.description Articulo,C.descripcion Categoria,UM.Abreviatura Unidad, A.description Almacen,L.descripcion Localizacion,
isnull(LO.Lote,'') Lote,isnull(S.nombreSerie,'') Serie,
isnull(S.chasis,'') Chasis,isnull(S.motor,'') Motor, isnull(S.color,'') Color, isnull(S.anio_fabricacion,0) Ano,
SLD.disponible Disponible,SLD.remitido Remitido,SLD.total Total,SLD.en_transito Transito,
convert(decimal(10,2),ROUND(p.costo,2)) Costo_Promedio_Unitario,convert(decimal(10,2),round((SLD.total * p.costo),2)) Costo_Total
FROM ERP_almacen_stock_localizacion_detalle  SLD
INNER JOIN ERP_Productos P ON P.id = SLD.idArticulo
INNER JOIN ERP_Categoria C ON C.idCategoria = P.idCategoria
INNER JOIN ERP_UnidadMedida UM ON UM.IdUnidadMedida = P.um_id
INNER JOIN ERP_Almacen A ON A.id = SLD.idAlmacen
INNER JOIN ERP_Localizacion L ON L.idAlmacen = SLD.idAlmacen AND L.idLocalizacion = SLD.idLocalizacion
LEFT JOIN ERP_Lote LO ON LO.idLote = SLD.idDetalle AND LO.idArticulo = SLD.idArticulo and SLD.TipoId = 'L'
LEFT JOIN ERP_Serie S ON S.idSerie = SLD.idDetalle AND S.idArticulo = SLD.idArticulo and SLD.TipoId = 'S' 
Left join ERP_TipoCompraVenta as tcv on(tcv.idTipoCompraVenta=S.idTipoCompraVenta)
