/*
Navicat SQL Server Data Transfer

Source Server         : SQLServer
Source Server Version : 110000
Source Host           : :1433
Source Database       : 00000000000
Source Schema         : dbo

Target Server Type    : SQL Server
Target Server Version : 110000
File Encoding         : 65001

Date: 2017-08-28 17:03:47
*/


-- ----------------------------
-- Table structure for [dbo].[ERP_Modulos]
-- ----------------------------
DROP TABLE [dbo].[ERP_Modulos]
GO
CREATE TABLE [dbo].[ERP_Modulos] (
[id] int NOT NULL IDENTITY(1,1) ,
[description] nvarchar(255) NOT NULL ,
[url] nvarchar(255) NOT NULL ,
[parent_id] int NOT NULL ,
[icon] nvarchar(255) NULL ,
[order] int NOT NULL DEFAULT ('0') ,
[user_created] int NOT NULL DEFAULT ('1') ,
[user_updated] int NOT NULL DEFAULT ('1') ,
[user_deleted] int NULL ,
[created_at] datetime NULL ,
[updated_at] datetime NULL ,
[deleted_at] datetime NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[ERP_Modulos]', RESEED, 3048)
GO

-- ----------------------------
-- Records of ERP_Modulos
-- ----------------------------
SET IDENTITY_INSERT [dbo].[ERP_Modulos] ON
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'1', N'Modulo Padre', N'#', N'1', null, N'0', N'1', N'1', null, N'2017-05-22 22:30:18.000', N'2017-05-22 22:30:18.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2', N'Seguridad', N'#', N'1', N'lock', N'5', N'1', N'1', null, N'2017-05-22 22:30:18.000', N'2017-07-03 09:25:21.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'3', N'Módulos', N'modules', N'2', null, N'0', N'1', N'1', null, N'2017-05-22 22:30:18.000', N'2017-05-22 22:30:18.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'4', N'Perfiles', N'profiles', N'2', null, N'0', N'1', N'1', null, N'2017-05-22 22:30:18.000', N'2017-05-22 22:30:18.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'5', N'Usuarios', N'users', N'2', null, N'0', N'1', N'1', null, N'2017-05-22 22:30:18.000', N'2017-05-22 22:30:18.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'6', N'Permisos', N'permissions', N'2', null, N'0', N'1', N'1', null, N'2017-05-22 22:30:18.000', N'2017-05-22 22:30:18.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'7', N'Configuración', N'configs', N'2', null, N'0', N'1', N'1', null, N'2017-05-22 22:30:18.000', N'2017-05-22 22:30:18.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'17', N'Almacen', N'#', N'1', N'building', N'1', N'1', N'1', null, N'2017-05-22 22:31:33.000', N'2017-07-03 09:23:18.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'18', N'Ingreso', N'entrys', N'17', null, N'6', N'1', N'1', null, N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'19', N'Recepción de OC', N'receptions', N'17', null, N'0', N'1', N'1', null, N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'20', N'Consumo', N'consumptions', N'17', null, N'4', N'1', N'1', null, N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'21', N'Transferencia', N'transfers', N'17', null, N'1', N'1', N'1', null, N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'22', N'Guia de remisión', N'referral_guides', N'17', null, N'3', N'1', N'1', null, N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'23', N'Recepción de Transferencia', N'reception_transfers', N'17', null, N'2', N'1', N'1', null, N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'24', N'Salida', N'departures', N'17', null, N'7', N'1', N'1', null, N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'25', N'Devolución de Consumo', N'consumer_returns', N'17', null, N'5', N'1', N'1', null, N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'26', N'Compras', N'#', N'1', N'shopping-cart', N'2', N'1', N'1', null, N'2017-05-22 22:31:48.000', N'2017-07-03 09:23:36.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'27', N'Requerimientos', N'requirements', N'26', null, N'0', N'1', N'1', null, N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'28', N'Requerimientos vs Concursos', N'requirements_contests', N'26', null, N'5', N'1', N'1', null, N'2017-05-22 22:31:48.000', N'2017-07-03 09:21:35.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'29', N'Aprobación de Requerimientos', N'approval_requirements', N'26', null, N'1', N'1', N'1', null, N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'30', N'Asignación de Requerimientos a Compradores', N'assignment_requirements', N'26', null, N'2', N'1', N'1', null, N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'31', N'Concursos', N'contests', N'26', null, N'3', N'1', N'1', null, N'2017-05-22 22:31:48.000', N'2017-07-03 09:21:05.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'32', N'Aprobación de Concursos', N'approval_contests', N'26', null, N'4', N'1', N'1', null, N'2017-05-22 22:31:48.000', N'2017-07-03 09:21:21.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'33', N'Orden de compra', N'purchase_orders', N'26', null, N'6', N'1', N'1', null, N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'34', N'Aprobación de Orden de compra', N'approval_purchase_orders', N'26', null, N'7', N'1', N'1', null, N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'35', N'Autonomias de Aprobación', N'approval_autonomy', N'26', null, N'8', N'1', N'1', null, N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'36', N'Proyectos', N'#', N'1', N'tasks', N'3', N'1', N'1', null, N'2017-05-22 22:32:30.000', N'2017-07-03 09:24:33.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'37', N'Proyectos', N'projects', N'36', null, N'0', N'1', N'1', null, N'2017-05-22 22:32:30.000', N'2017-05-22 22:32:30.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'38', N'Facturación Directa', N'direct_billing', N'36', null, N'1', N'1', N'1', null, N'2017-05-22 22:32:30.000', N'2017-05-22 22:32:30.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'1006', N'Aprobadores de Proyectos', N'approvers_projects', N'2', null, N'0', N'1', N'1', null, N'2017-05-25 16:51:10.000', N'2017-05-25 16:51:10.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2001', N'Valorizaciones', N'valorizations', N'36', null, N'0', N'1', N'1', null, N'2017-05-30 17:12:47.000', N'2017-05-30 17:12:47.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2011', N'Tesoreria', N'#', N'1', N'suitcase', N'4', N'1', N'1', null, N'2017-06-28 10:29:38.000', N'2017-07-03 09:25:10.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2012', N'Gastos de Caja Chica', N'cash_expense_girls', N'2011', null, N'0', N'1', N'1', null, N'2017-06-28 10:29:38.000', N'2017-06-28 10:29:38.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2013', N'Reposición de Caja', N'replenishment_cashs', N'2011', null, N'0', N'1', N'1', null, N'2017-06-28 10:29:38.000', N'2017-06-28 10:29:38.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2014', N'Cobros de Ventas', N'sales_charges', N'2011', null, N'0', N'1', N'1', null, N'2017-06-28 10:29:38.000', N'2017-06-28 10:29:38.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2015', N'Pagos de Compras y Gastos', N'purchase_payments', N'2011', null, N'0', N'1', N'1', null, N'2017-06-28 10:29:38.000', N'2017-06-28 10:29:38.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2016', N'Emisión de Cheques', N'writing_checks', N'2011', null, N'0', N'1', N'1', null, N'2017-06-28 10:29:38.000', N'2017-06-28 10:29:38.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2028', N'Maestros', N'#', N'1', N'cogs', N'0', N'1', N'1', null, N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2029', N'Marcas', N'brands', N'2028', null, N'1', N'1', N'1', null, N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2030', N'Entidades', N'entities', N'2028', null, N'2', N'1', N'1', null, N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2031', N'Artículos', N'articles', N'2028', null, N'3', N'1', N'1', null, N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2032', N'Recursos', N'resources', N'2028', null, N'4', N'1', N'1', null, N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2033', N'Almacenes', N'warehouses', N'2028', null, N'5', N'1', N'1', null, N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2034', N'Tipo de Cambio', N'type_change', N'2028', null, N'6', N'1', N'1', null, N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2035', N'Compradores', N'buyers', N'2028', null, N'7', N'1', N'1', null, N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2036', N'Frentes', N'fronts', N'2028', null, N'8', N'1', N'1', null, N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2037', N'Caja Chica', N'petty_cash', N'2028', null, N'9', N'1', N'1', null, N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2038', N'Condición Pago', N'payment_condition', N'2028', null, N'10', N'1', N'1', null, N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'2039', N'Cuentas por Pagar', N'accounts_pay', N'26', null, N'9', N'1', N'1', null, N'2017-06-28 18:35:37.000', N'2017-06-28 18:36:25.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'3044', N'Reportes', N'#', N'1', N'th-list', N'5', N'1', N'1', null, N'2017-08-18 11:34:16.000', N'2017-08-18 11:34:34.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'3045', N'Stock', N'stocks', N'3044', null, N'1', N'1', N'1', null, N'2017-08-18 11:34:16.000', N'2017-08-18 11:34:16.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'3046', N'Aprobación de Proyectos', N'project_approval', N'36', null, N'4', N'1', N'1', null, N'2017-08-28 17:00:32.000', N'2017-08-28 17:01:43.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'3047', N'Consolidado de Proyectos', N'consolidated_projects', N'36', null, N'3', N'1', N'1', null, N'2017-08-28 17:01:53.000', N'2017-08-28 17:01:58.000', null);
GO
INSERT INTO [dbo].[ERP_Modulos] ([id], [description], [url], [parent_id], [icon], [order], [user_created], [user_updated], [user_deleted], [created_at], [updated_at], [deleted_at]) VALUES (N'3048', N'Parametros', N'params', N'2', null, N'6', N'1', N'1', null, N'2017-08-28 17:02:46.000', N'2017-08-28 17:02:46.000', null);
GO
SET IDENTITY_INSERT [dbo].[ERP_Modulos] OFF
GO

-- ----------------------------
-- Table structure for [dbo].[ERP_Permisos]
-- ----------------------------
DROP TABLE [dbo].[ERP_Permisos]
GO
CREATE TABLE [dbo].[ERP_Permisos] (
[id] int NOT NULL IDENTITY(1,1) ,
[profile_id] int NOT NULL ,
[module_id] int NOT NULL ,
[created_at] datetime NULL ,
[updated_at] datetime NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[ERP_Permisos]', RESEED, 3040)
GO

-- ----------------------------
-- Records of ERP_Permisos
-- ----------------------------
SET IDENTITY_INSERT [dbo].[ERP_Permisos] ON
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'1', N'1', N'3', N'2017-05-22 22:30:18.000', N'2017-05-22 22:30:18.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2', N'1', N'4', N'2017-05-22 22:30:18.000', N'2017-05-22 22:30:18.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'3', N'1', N'5', N'2017-05-22 22:30:18.000', N'2017-05-22 22:30:18.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'4', N'1', N'6', N'2017-05-22 22:30:18.000', N'2017-05-22 22:30:18.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'5', N'1', N'7', N'2017-05-22 22:30:18.000', N'2017-05-22 22:30:18.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'6', N'1', N'9', N'2017-05-22 22:31:04.000', N'2017-05-22 22:31:04.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'7', N'1', N'10', N'2017-05-22 22:31:04.000', N'2017-05-22 22:31:04.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'8', N'1', N'11', N'2017-05-22 22:31:04.000', N'2017-05-22 22:31:04.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'9', N'1', N'12', N'2017-05-22 22:31:04.000', N'2017-05-22 22:31:04.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'10', N'1', N'13', N'2017-05-22 22:31:04.000', N'2017-05-22 22:31:04.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'11', N'1', N'14', N'2017-05-22 22:31:04.000', N'2017-05-22 22:31:04.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'12', N'1', N'15', N'2017-05-22 22:31:04.000', N'2017-05-22 22:31:04.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'13', N'1', N'16', N'2017-05-22 22:31:04.000', N'2017-05-22 22:31:04.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'14', N'1', N'18', N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'15', N'1', N'19', N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'16', N'1', N'20', N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'17', N'1', N'21', N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'18', N'1', N'22', N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'19', N'1', N'23', N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'20', N'1', N'24', N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'21', N'1', N'25', N'2017-05-22 22:31:33.000', N'2017-05-22 22:31:33.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'22', N'1', N'27', N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'23', N'1', N'28', N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'24', N'1', N'29', N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'25', N'1', N'30', N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'26', N'1', N'31', N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'27', N'1', N'32', N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'28', N'1', N'33', N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'29', N'1', N'34', N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'30', N'1', N'35', N'2017-05-22 22:31:48.000', N'2017-05-22 22:31:48.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'31', N'1', N'37', N'2017-05-22 22:32:30.000', N'2017-05-22 22:32:30.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'32', N'1', N'38', N'2017-05-22 22:32:30.000', N'2017-05-22 22:32:30.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'33', N'1', N'40', N'2017-05-22 22:32:49.000', N'2017-05-22 22:32:49.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'34', N'1', N'41', N'2017-05-22 22:32:49.000', N'2017-05-22 22:32:49.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'35', N'1', N'42', N'2017-05-22 22:32:49.000', N'2017-05-22 22:32:49.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'36', N'1', N'43', N'2017-05-22 22:32:49.000', N'2017-05-22 22:32:49.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'37', N'1', N'44', N'2017-05-22 22:32:49.000', N'2017-05-22 22:32:49.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'38', N'1', N'45', N'2017-05-22 22:33:56.000', N'2017-05-22 22:33:56.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'39', N'1', N'46', N'2017-05-22 22:33:56.000', N'2017-05-22 22:33:56.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'1001', N'1', N'1001', N'2017-05-25 09:58:57.000', N'2017-05-25 09:58:57.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'1002', N'1', N'1002', N'2017-05-25 09:59:52.000', N'2017-05-25 09:59:52.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'1003', N'1', N'1003', N'2017-05-25 11:09:26.000', N'2017-05-25 11:09:26.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'1004', N'1', N'1004', N'2017-05-25 11:09:52.000', N'2017-05-25 11:09:52.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'1005', N'1', N'1005', N'2017-05-25 11:15:00.000', N'2017-05-25 11:15:00.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'1006', N'1', N'1006', N'2017-05-25 16:51:12.000', N'2017-05-25 16:51:12.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2001', N'1', N'2001', N'2017-05-30 17:12:48.000', N'2017-05-30 17:12:48.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2002', N'1', N'2002', N'2017-06-28 09:19:25.000', N'2017-06-28 09:19:25.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2003', N'1', N'2004', N'2017-06-28 10:28:01.000', N'2017-06-28 10:28:01.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2004', N'1', N'2005', N'2017-06-28 10:28:01.000', N'2017-06-28 10:28:01.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2005', N'1', N'2006', N'2017-06-28 10:28:01.000', N'2017-06-28 10:28:01.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2006', N'1', N'2007', N'2017-06-28 10:28:01.000', N'2017-06-28 10:28:01.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2007', N'1', N'2008', N'2017-06-28 10:28:01.000', N'2017-06-28 10:28:01.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2008', N'1', N'2009', N'2017-06-28 10:28:01.000', N'2017-06-28 10:28:01.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2009', N'1', N'2010', N'2017-06-28 10:28:01.000', N'2017-06-28 10:28:01.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2010', N'1', N'2012', N'2017-06-28 10:29:38.000', N'2017-06-28 10:29:38.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2011', N'1', N'2013', N'2017-06-28 10:29:38.000', N'2017-06-28 10:29:38.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2012', N'1', N'2014', N'2017-06-28 10:29:38.000', N'2017-06-28 10:29:38.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2013', N'1', N'2015', N'2017-06-28 10:29:38.000', N'2017-06-28 10:29:38.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2014', N'1', N'2016', N'2017-06-28 10:29:38.000', N'2017-06-28 10:29:38.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2015', N'1', N'2018', N'2017-06-28 10:37:31.000', N'2017-06-28 10:37:31.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2016', N'1', N'2019', N'2017-06-28 10:37:31.000', N'2017-06-28 10:37:31.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2017', N'1', N'2020', N'2017-06-28 10:37:31.000', N'2017-06-28 10:37:31.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2018', N'1', N'2021', N'2017-06-28 10:37:31.000', N'2017-06-28 10:37:31.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2019', N'1', N'2022', N'2017-06-28 10:37:31.000', N'2017-06-28 10:37:31.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2020', N'1', N'2023', N'2017-06-28 10:37:31.000', N'2017-06-28 10:37:31.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2021', N'1', N'2024', N'2017-06-28 10:37:31.000', N'2017-06-28 10:37:31.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2022', N'1', N'2025', N'2017-06-28 10:37:31.000', N'2017-06-28 10:37:31.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2023', N'1', N'2026', N'2017-06-28 10:37:31.000', N'2017-06-28 10:37:31.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2024', N'1', N'2027', N'2017-06-28 10:37:31.000', N'2017-06-28 10:37:31.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2025', N'1', N'2029', N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2026', N'1', N'2030', N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2027', N'1', N'2031', N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2028', N'1', N'2032', N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2029', N'1', N'2033', N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2030', N'1', N'2034', N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2031', N'1', N'2035', N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2032', N'1', N'2036', N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2033', N'1', N'2037', N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2034', N'1', N'2038', N'2017-06-28 10:53:28.000', N'2017-06-28 10:53:28.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'2035', N'1', N'2039', N'2017-06-28 18:35:49.000', N'2017-06-28 18:35:49.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'3034', N'1', N'3039', N'2017-08-18 11:27:11.000', N'2017-08-18 11:27:11.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'3035', N'1', N'3041', N'2017-08-18 11:30:30.000', N'2017-08-18 11:30:30.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'3036', N'1', N'3043', N'2017-08-18 11:32:07.000', N'2017-08-18 11:32:07.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'3037', N'1', N'3045', N'2017-08-18 11:34:16.000', N'2017-08-18 11:34:16.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'3038', N'1', N'3046', N'2017-08-28 17:00:37.000', N'2017-08-28 17:00:37.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'3039', N'1', N'3047', N'2017-08-28 17:02:17.000', N'2017-08-28 17:02:17.000');
GO
INSERT INTO [dbo].[ERP_Permisos] ([id], [profile_id], [module_id], [created_at], [updated_at]) VALUES (N'3040', N'1', N'3048', N'2017-08-28 17:02:51.000', N'2017-08-28 17:02:51.000');
GO
SET IDENTITY_INSERT [dbo].[ERP_Permisos] OFF
GO

-- ----------------------------
-- Indexes structure for table ERP_Modulos
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table [dbo].[ERP_Modulos]
-- ----------------------------
ALTER TABLE [dbo].[ERP_Modulos] ADD PRIMARY KEY ([id])
GO

-- ----------------------------
-- Indexes structure for table ERP_Permisos
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table [dbo].[ERP_Permisos]
-- ----------------------------
ALTER TABLE [dbo].[ERP_Permisos] ADD PRIMARY KEY ([id])
GO
