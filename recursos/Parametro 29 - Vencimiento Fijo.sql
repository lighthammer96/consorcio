SET IDENTITY_INSERT ERP_Parametros ON
insert into ERP_Parametros (id,value,description,user_created,created_at,user_updated,updated_at,user_deleted,deleted_at)
values (29,'N','Habilitar día de vencimiento fijo (S: Si, N: No)',1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),1,FORMAT(GetDate(), 'yyyy-MM-dd hh:mm:ss.000'),null,null)
SET IDENTITY_INSERT ERP_Parametros OFF
