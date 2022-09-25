



alter table ERP_ConcursoProveedor alter column provider_id nvarchar null;
alter table ERP_ConcursoProveedorDetalle add contest_id int null;
alter table ERP_ConcursoProveedorDetalle add user_deleted int null;
alter table ERP_ConcursoProveedorDetalle add user_updated int null;
alter table ERP_ConcursoProveedorDetalle add user_created int null;