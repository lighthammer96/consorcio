ALTER TABLE dbo.ERP_Productos DROP CONSTRAINT [DF__ERP_Produ__matri__2E7BCEF5]
GO
ALTER TABLE dbo.ERP_Productos ALTER COLUMN matrix nvarchar(255) COLLATE Modern_Spanish_CI_AS NULL
GO

ALTER TABLE [dbo].[ERP_ConcursoProveedor] ADD
[type_change_id] date NULL
GO

ALTER TABLE [dbo].[ERP_Concursos] ADD
[type_change_id] date NULL 
GO

SET IDENTITY_INSERT [dbo].[ERP_Proyectos] ON
GO
INSERT INTO [dbo].[ERP_Proyectos] ([id], [code], [description], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at], [project_state_id], [client_id], [date_start], [date_end], [cost_load], [gg_direct], [gg_indirect], [transport], [utils], [days], [total_lb], [sub_state_id], [apu_materials], [apu_equipment], [total_pv], [total_meta]) VALUES (N'1004', N'P000000004', N'Obra ABC', N'1', N'1', null, N'2017-09-06 10:24:44.000', N'2017-09-06 10:24:45.000', null, N'1', N'0000000000', null, null, N'1', null, null, null, null, null, N'.00', N'1', N'5.00', N'5.00', null, null);
GO
INSERT INTO [dbo].[ERP_Proyectos] ([id], [code], [description], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at], [project_state_id], [client_id], [date_start], [date_end], [cost_load], [gg_direct], [gg_indirect], [transport], [utils], [days], [total_lb], [sub_state_id], [apu_materials], [apu_equipment], [total_pv], [total_meta]) VALUES (N'1005', N'P000000005', N'Obra 123', N'1', N'1', null, N'2017-09-06 10:25:04.000', N'2017-09-06 10:25:04.000', null, N'1', N'0000000000', null, null, N'1', null, null, null, null, null, N'.00', N'1', N'5.00', N'5.00', null, null);
GO
SET IDENTITY_INSERT [dbo].[ERP_Proyectos] OFF
GO

SET IDENTITY_INSERT [dbo].[ERP_ProyectosConsolidado] ON
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'5', N'1004', N'224', N'9.00', N'9.00', null, null, N'1', N'1', N'2017-09-06 11:31:20.000', N'2017-09-06 11:31:20.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'6', N'1004', N'237', N'404.00', N'404.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'7', N'1004', N'283', N'4.00', N'4.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'8', N'1004', N'293', N'29.00', N'29.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'9', N'1004', N'301', N'89.00', N'89.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'10', N'1004', N'608', N'90.00', N'90.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'11', N'1004', N'609', N'18.00', N'18.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'12', N'1004', N'610', N'18.00', N'18.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'13', N'1004', N'1350', N'449.00', N'449.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'14', N'1004', N'1524', N'4452.00', N'4452.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'15', N'1004', N'1542', N'100.00', N'100.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'16', N'1004', N'1525', N'2186.00', N'2186.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'17', N'1004', N'1628', N'144.00', N'144.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'18', N'1005', N'608', N'90.00', N'90.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'19', N'1005', N'609', N'18.00', N'18.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
INSERT INTO [dbo].[ERP_ProyectosConsolidado] ([id], [project_id], [article_id], [quantity_requested], [quantity_served], [price], [project_balance], [user_created], [user_updated], [created_at], [updated_at]) VALUES (N'20', N'1005', N'1350', N'449.00', N'449.00', null, null, N'1', N'1', N'2017-09-06 11:31:21.000', N'2017-09-06 11:31:21.000');
GO
SET IDENTITY_INSERT [dbo].[ERP_ProyectosConsolidado] OFF
GO