DROP TABLE [dbo].[ERP_ProyectoSubEstados]
GO
CREATE TABLE [dbo].[ERP_ProyectoSubEstados] (
[id] int NOT NULL IDENTITY(1,1) ,
[description] nvarchar(255) NOT NULL 
)

GO
DBCC CHECKIDENT(N'[dbo].[ERP_ProyectoSubEstados]', RESEED, 7)
GO

SET IDENTITY_INSERT [dbo].[ERP_ProyectoSubEstados] ON
GO
INSERT INTO [dbo].[ERP_ProyectoSubEstados] ([id], [description]) VALUES (N'1', N'Registrado');
GO
INSERT INTO [dbo].[ERP_ProyectoSubEstados] ([id], [description]) VALUES (N'2', N'Aprobar LB');
GO
INSERT INTO [dbo].[ERP_ProyectoSubEstados] ([id], [description]) VALUES (N'3', N'Aprobado LB');
GO
INSERT INTO [dbo].[ERP_ProyectoSubEstados] ([id], [description]) VALUES (N'4', N'Aprobar PV');
GO
INSERT INTO [dbo].[ERP_ProyectoSubEstados] ([id], [description]) VALUES (N'5', N'Aprobado PV');
GO
INSERT INTO [dbo].[ERP_ProyectoSubEstados] ([id], [description]) VALUES (N'6', N'Aprobar Meta');
GO
INSERT INTO [dbo].[ERP_ProyectoSubEstados] ([id], [description]) VALUES (N'7', N'Aprobado Meta');
GO
SET IDENTITY_INSERT [dbo].[ERP_ProyectoSubEstados] OFF
GO

ALTER TABLE [dbo].[ERP_ProyectoSubEstados] ADD PRIMARY KEY ([id])
GO


DROP TABLE [dbo].[ERP_ProyectoAprobadoresDetalle]
GO
CREATE TABLE [dbo].[ERP_ProyectoAprobadoresDetalle] (
[id] int NOT NULL IDENTITY(1,1) ,
[project_id] int NOT NULL ,
[approver_project_id] int NOT NULL ,
[sub_state_id] int NOT NULL ,
[created_at] datetime NULL ,
[updated_at] datetime NULL 
)
GO
ALTER TABLE [dbo].[ERP_ProyectoAprobadoresDetalle] ADD PRIMARY KEY ([id])
GO

ALTER TABLE [dbo].[ERP_Proyectos] ADD
[apu_materials] decimal(5,2) NULL ,
[apu_equipment] decimal(5,2) NULL ,
[total_pv] decimal(18,2) NULL ,
[total_meta] decimal(18,2) NULL
GO

EXEC sp_rename 'dbo.ERP_Proyectos.total', 'total_lb', 'COLUMN';  
GO  

ALTER TABLE [dbo].[ERP_SubProyectoNiveles] ADD
[type_progress] int NOT NULL DEFAULT ('1') ,
[pv_um_id] nvarchar(255) COLLATE Modern_Spanish_CI_AS NULL ,
[pv_price] decimal(18,2) NULL ,
[pv_quantity] decimal(18,2) NULL ,
[pv_total] decimal(18,2) NULL ,
[pv_apu_hours_day] int NULL ,
[pv_apu_mo] decimal(4,2) NULL ,
[pv_apu_eq] decimal(4,2) NULL ,
[pv_apu_hh] decimal(18,2) NOT NULL DEFAULT ('0') ,
[pv_apu_hq] decimal(18,2) NOT NULL DEFAULT ('0') ,
[pv_apu_total_mo] decimal(18,2) NOT NULL DEFAULT ('0') ,
[pv_apu_total_mat] decimal(18,2) NOT NULL DEFAULT ('0') ,
[pv_apu_total_eq] decimal(18,2) NOT NULL DEFAULT ('0') ,
[pv_apu_total_sc] decimal(18,2) NOT NULL DEFAULT ('0') ,
[me_um_id] nvarchar(255) COLLATE Modern_Spanish_CI_AS NULL ,
[me_price] decimal(18,2) NULL ,
[me_quantity] decimal(18,2) NULL ,
[me_total] decimal(18,2) NULL ,
[me_apu_hours_day] int NULL ,
[me_apu_mo] decimal(4,2) NULL ,
[me_apu_eq] decimal(4,2) NULL ,
[me_apu_hh] decimal(18,2) NOT NULL DEFAULT ('0') ,
[me_apu_hq] decimal(18,2) NOT NULL DEFAULT ('0') ,
[me_apu_total_mo] decimal(18,2) NOT NULL DEFAULT ('0') ,
[me_apu_total_mat] decimal(18,2) NOT NULL DEFAULT ('0') ,
[me_apu_total_eq] decimal(18,2) NOT NULL DEFAULT ('0') ,
[me_apu_total_sc] decimal(18,2) NOT NULL DEFAULT ('0')
GO

ALTER TABLE [dbo].[ERP_AnalisisPreciosUnitarios] ADD
[pv_quantity] decimal(18,2) NOT NULL DEFAULT ('0') ,
[pv_q_unity] decimal(18,2) NULL ,
[pv_price] decimal(18,2) NOT NULL DEFAULT ('0') ,
[pv_partial] decimal(18,2) NOT NULL DEFAULT ('0'),
[type_progress] int NOT NULL DEFAULT ('1'),
[me_quantity] decimal(18,2) NOT NULL DEFAULT ('0') ,
[me_q_unity] decimal(18,2) NULL ,
[me_price] decimal(18,2) NOT NULL DEFAULT ('0') ,
[me_partial] decimal(18,2) NOT NULL DEFAULT ('0') 
GO

ALTER TABLE [dbo].[ERP_ConcursoProveedorDetalle] ADD
[price_system] bit NOT NULL DEFAULT ('0') ,
[price_buyer] bit NOT NULL DEFAULT ('0') 
GO
