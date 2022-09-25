
/****** Object:  View [dbo].[ERP_VIEW_PERSONA]    Script Date: 19/08/2022 19:52:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER  view [dbo].[ERP_VIEW_PERSONA] as 
select pe.created_at,pe.idPersona,cTipodocumento,ub.cDepartamento,ub.cProvincia,ub.cDistrito, tp.cDescripcion as TipoPersona ,
pe.cTipopersona,td.cDescripcion as TipoDocumento,pe.cNumerodocumento,pe.cRazonSocial,pe.cNombrePersona 
from ERP_Persona as pe 
inner join ERP_TABLASUNAT as td on (pe.cTipodocumento=td.cCodigo and td.cNombretabla='TIPO_DOCUMENTO') 
inner join ERP_TABLASUNAT as tp on (pe.cTipopersona=tp.cCodigo and tp.cNombretabla='TIPO_PERSONA') 
inner join ERP_Ubigeo as ub on (pe.cUbigeo=ub.cCodUbigeo)
GO


