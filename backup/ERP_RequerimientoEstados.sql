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

Date: 2017-08-15 16:13:39
*/


-- ----------------------------
-- Table structure for [dbo].[ERP_RequerimientoEstados]
-- ----------------------------
DROP TABLE [dbo].[ERP_RequerimientoEstados]
GO
CREATE TABLE [dbo].[ERP_RequerimientoEstados] (
[id] int NOT NULL IDENTITY(1,1) ,
[description] nvarchar(255) NOT NULL ,
[created_at] datetime NULL ,
[updated_at] datetime NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[ERP_RequerimientoEstados]', RESEED, 6)
GO

-- ----------------------------
-- Records of ERP_RequerimientoEstados
-- ----------------------------
SET IDENTITY_INSERT [dbo].[ERP_RequerimientoEstados] ON
GO
INSERT INTO [dbo].[ERP_RequerimientoEstados] ([id], [description], [created_at], [updated_at]) VALUES (N'1', N'Registrado', N'2017-06-16 16:31:40.000', N'2017-06-16 16:31:40.000');
GO
INSERT INTO [dbo].[ERP_RequerimientoEstados] ([id], [description], [created_at], [updated_at]) VALUES (N'2', N'Enviado a Aprobación', N'2017-06-16 16:31:40.000', N'2017-06-16 16:31:40.000');
GO
INSERT INTO [dbo].[ERP_RequerimientoEstados] ([id], [description], [created_at], [updated_at]) VALUES (N'3', N'Aprobado', N'2017-06-16 16:31:40.000', N'2017-06-16 16:31:40.000');
GO
INSERT INTO [dbo].[ERP_RequerimientoEstados] ([id], [description], [created_at], [updated_at]) VALUES (N'4', N'Cancelado', N'2017-06-16 16:31:40.000', N'2017-06-16 16:31:40.000');
GO
INSERT INTO [dbo].[ERP_RequerimientoEstados] ([id], [description], [created_at], [updated_at]) VALUES (N'5', N'Rechazado', N'2017-06-16 16:31:40.000', N'2017-06-16 16:31:40.000');
GO
INSERT INTO [dbo].[ERP_RequerimientoEstados] ([id], [description], [created_at], [updated_at]) VALUES (N'6', N'Asignado', N'2017-06-16 16:31:40.000', N'2017-06-16 16:31:40.000');
GO
SET IDENTITY_INSERT [dbo].[ERP_RequerimientoEstados] OFF
GO

-- ----------------------------
-- Indexes structure for table ERP_RequerimientoEstados
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table [dbo].[ERP_RequerimientoEstados]
-- ----------------------------
ALTER TABLE [dbo].[ERP_RequerimientoEstados] ADD PRIMARY KEY ([id])
GO
