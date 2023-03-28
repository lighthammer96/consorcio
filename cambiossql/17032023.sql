/****** Object:  Table [dbo].[ERP_Conceptos]    Script Date: 17/03/2023 20:34:07 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ERP_Conceptos](
	[idconcepto] [int] NULL,
	[descripcion] [varchar](200) NULL,
	[cuenta_contable] [varchar](200) NULL,
	[centro_costo] [varchar](200) NULL,
	[estado] [varchar](1) NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
	[user_deleted] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


ALTER TABLE [dbo].[ERP_CajaDiariaDetalle] ADD [idconcepto] int NULL;
ALTER TABLE [dbo].[ERP_VentaFormaPago] ADD [idconcepto] int NULL;