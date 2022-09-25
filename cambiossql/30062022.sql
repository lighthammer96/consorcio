

-- PARAMETROS PARA FACTURACION ELECTRONICA      
SET IDENTITY_INSERT ERP_Parametros ON
insert into ERP_Parametros (id,value,description,user_created,created_at,user_updated,updated_at,user_deleted,deleted_at)
values (20,'20450106357EMISI355','Usuario FE (RUC del emisor y usuario Sol concatenado)',1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),null,null),
(21,'EysuUjdi33','Clave FE',1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),null,null),
(22,'EysuUjdi33','URL CPE FE',1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),null,null),
(23,'Carlos Zamora Lópes | Gerente General | D.N.I. 01065755','Firma de Cláusula Adicional',1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),null,null)
SET IDENTITY_INSERT ERP_Parametros OFF;



UPDATE [dbo].[ERP_Parametros] SET [value] = N'https://e-factura.tuscomprobantes.pe/wsseencpe/billService?wsdl' WHERE [id] = 22;
