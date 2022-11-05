
ALTER TABLE dbo.ERP_Periodo ADD estado_cc varchar(1) NULL;

/****** Object:  View [dbo].[ERP_VW_CierreCuentasCobrar]    Script Date: 5/11/2022 10:52:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- dbo.ERP_VW_CierreCuentasCobrar source

CREATE VIEW [dbo].[ERP_VW_CierreCuentasCobrar] AS
SELECT periodo, estado_cc AS estado, user_created, created_at, user_updated, updated_at, fechaInicio, fechaFin
FROM dbo.ERP_Periodo
;

GO



