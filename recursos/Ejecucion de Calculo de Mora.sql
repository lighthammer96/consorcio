DECLARE  @fecha_proceso DATE
SET @fecha_proceso  = CONVERT(DATE,GETDATE());
EXEC COB_CalculaMora  @fecha_proceso ;
