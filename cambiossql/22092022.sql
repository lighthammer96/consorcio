CREATE TABLE dbo.ERP_SolicitudSeparacion (
	cCodConsecutivo varchar(10) NOT NULL,
	nConsecutivo int NOT NULL,
	idventa int NOT NULL,
	CONSTRAINT PK_SolicitudSeparacion PRIMARY KEY (cCodConsecutivo,nConsecutivo,idventa),
	CONSTRAINT FK_Solicitud_SolicitudSeparacion FOREIGN KEY (cCodConsecutivo,nConsecutivo) REFERENCES dbo.ERP_Solicitud(cCodConsecutivo,nConsecutivo),
	CONSTRAINT FK_Ventas_SolicitudSeparacion FOREIGN KEY (idventa) REFERENCES dbo.ERP_Venta(idventa)
);
