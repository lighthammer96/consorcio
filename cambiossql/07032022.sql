CREATE TABLE ERP_Motivos(
    codigo varchar(5),
		descripcion varchar(255),
   	user_created int,
		user_updated int,
		user_deleted int,
		created_at datetime,
		updated_at datetime,
		deleted_at datetime,   
    constraint pk_motivos PRIMARY key(codigo)
);

ALTER TABLE [dbo].[ERP_Motivos] ADD [estado] varchar(1) NULL;

-- ----------------------------
-- Records of ERP_Motivos
-- ----------------------------
INSERT INTO [dbo].[ERP_Motivos] ([codigo], [descripcion], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at], [estado]) VALUES (N'01', N'ANULACIÓN DE LA OPERACIÓN', N'1006', N'1006', NULL, N'2022-02-07 10:16:41.000', N'2022-03-07 12:21:09.000', NULL, N'A')
GO

INSERT INTO [dbo].[ERP_Motivos] ([codigo], [descripcion], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at], [estado]) VALUES (N'02', N'ANULACIÓN POR ERROR EN EL RUC', N'1006', N'1006', NULL, N'2022-02-07 10:16:41.000', N'2022-03-07 12:21:09.000', NULL, N'A')
GO

INSERT INTO [dbo].[ERP_Motivos] ([codigo], [descripcion], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at], [estado]) VALUES (N'03', N'CORRECCIÓN POR ERROR EN LA DESCRIPCIÓN', N'1006', N'1006', NULL, N'2022-02-07 10:16:41.000', N'2022-03-07 12:21:09.000', NULL, N'A')
GO

INSERT INTO [dbo].[ERP_Motivos] ([codigo], [descripcion], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at], [estado]) VALUES (N'04', N'DESCUENTO GLOBAL', N'1006', N'1006', NULL, N'2022-02-07 10:16:41.000', N'2022-03-07 12:21:09.000', NULL, N'A')
GO

INSERT INTO [dbo].[ERP_Motivos] ([codigo], [descripcion], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at], [estado]) VALUES (N'05', N'DESCUENTO POR ÍTEM', N'1006', N'1006', NULL, N'2022-02-07 10:16:41.000', N'2022-03-07 12:21:09.000', NULL, N'A')
GO

INSERT INTO [dbo].[ERP_Motivos] ([codigo], [descripcion], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at], [estado]) VALUES (N'06', N'DEVOLUCIÓN TOTAL', N'1006', N'1006', NULL, N'2022-02-07 10:16:41.000', N'2022-03-07 12:21:09.000', NULL, N'A')
GO

INSERT INTO [dbo].[ERP_Motivos] ([codigo], [descripcion], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at], [estado]) VALUES (N'07', N'DEVOLUCIÓN POR ÍTEM', N'1006', N'1006', NULL, N'2022-02-07 10:16:41.000', N'2022-03-07 12:21:09.000', NULL, N'A')
GO

INSERT INTO [dbo].[ERP_Motivos] ([codigo], [descripcion], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at], [estado]) VALUES (N'08', N'BONIFICACIÓN', N'1006', N'1006', NULL, N'2022-02-07 10:16:41.000', N'2022-03-07 12:21:09.000', NULL, N'A')
GO

INSERT INTO [dbo].[ERP_Motivos] ([codigo], [descripcion], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at], [estado]) VALUES (N'09', N'DISMINUCIÓN EN EL VALOR', N'1006', N'1006', NULL, N'2022-02-07 10:16:41.000', N'2022-03-07 12:21:09.000', NULL, N'A')
GO


ALTER TABLE [dbo].[ERP_Venta] ADD [descripcion] text NULL;

ALTER TABLE [dbo].[ERP_Venta] ADD [devolucion_producto] int NULL
GO

EXEC sp_addextendedproperty
'MS_Description', N'1 -> se devuelve
0 -> no se devuelve',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'devolucion_producto';


IF ((SELECT COUNT(*) FROM ::fn_listextendedproperty('MS_Description',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'devolucion_producto')) > 0)
  EXEC sp_updateextendedproperty
'MS_Description', N'2 -> ya se ha devuelto
1 -> pendiente de devolucion
0 -> no se devuelve',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'devolucion_producto'
ELSE
  EXEC sp_addextendedproperty
'MS_Description', N'2 -> ya se ha devuelto
1 -> pendiente de devolucion
0 -> no se devuelve',
'SCHEMA', N'dbo',
'TABLE', N'ERP_Venta',
'COLUMN', N'devolucion_producto';