/****** Object:  Table [dbo].[ERP_Carroceria]    Script Date: 21/06/2022 05:18:18 p.m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ERP_Carroceria](
	[idcarroceria] [int] NOT NULL,
	[descripcion] [varchar](50) NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
	[user_deleted] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
 CONSTRAINT [PK_ERP_Carroceria] PRIMARY KEY CLUSTERED 
(
	[idcarroceria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[ERP_Productos] ADD [idcarroceria] int NULL;
