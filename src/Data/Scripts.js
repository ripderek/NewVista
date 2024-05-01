export const data = [
  {
    id: 1,
    title: "Volver a Liquidar en Touch",
    Codigo: `
        /*----------------------------------- LIQUIDACION TOUCH -SIOIA-SYSPRO 8--------------*/

        DECLARE @guia CHAR(13)
        
        set @guia='060010000369'
        
        delete FROM TouchDtbCicloPagoDetalle  WHERE Guia = @guia
        
        delete FROM TouchDtbCicloPagoMaster  WHERE Guia = @guia
        
        delete FROM TouchDtbCicloDevolucionDetalle  WHERE Guia= @guia
        
        delete FROM TouchDtbCicloDevolucionMaster  WHERE Guia = @guia
        
         
        DELETE FROM MovEDtbPagosDetalle  WHERE Guia= @guia
        
        DELETE FROM MovEDtbPagosMaster  WHERE Guia= @guia
        
        DELETE FROM MovEDtbDevolucionDetalle  WHERE Guia= @guia
        
        DELETE FROM MovEDtbDevolucionMaster  WHERE Guia= @guia
        
         
        DELETE FROM MovEDtbDespachoResumen  WHERE Guia=@guia
        
         
        UPDATE TouchDtbCicloEstado SET
        
            Devolucion = 'N',
        
            Recibido = 'N',
        
            Cheque = 'N',
        
            ChequePosFechado = 'N',
        
            Abono = 'N',
        
            SigDevolucionIndice = 1,
        
            SigPagoIndice = 1
        
        WHERE Guia=@guia
        
        update MovEDtbDespachoMaster set Estado='I' WHERE Guia=@guia`,
  },
  {
    id: 2,
    title: "Cambios de Ruta",
    Codigo: `
    --Verificar si ya tiene esa ruta y esta correcta
    select Vendedor,Dia,Circuito,Ruta,* from MovRcfgClientesRuta where CodAgen='06' and Ruta = '1061';
    --Ver si hay mas de un vendedor con esa ruta
    select Vendedor from MovRcfgClientesRuta where CodAgen='06' and Ruta = '1059' group by Vendedor;
    ----------------------------------- SIOIA-----------------------------------------
    DECLARE @circuito NVARCHAR(2), @dia NVARCHAR(2), @vendedor NVARCHAR(6), @rutaOIA NVARCHAR(3), @frecuencia NVARCHAR(3), @agencia NVARCHAR(2), @rutacw NVARCHAR(5)
    SET @agencia='06'
    SET @circuito='01'
    SET @dia='05'
    SET @rutacw='1059'
    SET @vendedor='060025'
    SET @rutaOIA='118'
    SET @frecuencia='08'
    
    
    --CONEXION 1.5
    UPDATE RtsClientesAsignacion 
    SET Circuito = @circuito, Dia=@dia, CodVen=@vendedor, Ruta=@rutaOIA ,Frecuencia=@frecuencia
    --select  *
    FROM MovRcfgClientesRuta a   
    INNER JOIN RtsClientesAsignacion b WITH (NOLOCK) 
    ON a.CodClie=b.CodClie AND a.CodAgen=b.CodAgen 
    WHERE a.CodAgen=@agencia and a.Ruta=@rutacw and a.Vendedor NOT IN ('VCI','SNV')
    
    
    UPDATE MovRcfgClientesRuta 
    SET Circuito = @circuito, Dia=@dia, Vendedor=@vendedor, Frecuencia=@frecuencia
    --select*
    FROM MovRcfgClientesRuta a   
    WHERE a.CodAgen=@agencia and a.Ruta=@rutacw and a.Vendedor NOT IN ('VCI','SNV')
    
    UPDATE RtsRutaAsignacion set RutaOIA=@rutaOIA, CircuitoOIA=@circuito, DiaOIA=@dia,CodVendedor=@vendedor  WHERE CodAgen=@agencia and RutaId=@rutacw
    
    --------------------CONEXION 1.10
    
    UPDATE ArCustomer
    SET Salesperson =@vendedor, StateCode=@rutaOIA
    --select *
    FROM [192.168.1.5].SIOIA.dbo.MovRcfgClientesRuta a   
      INNER JOIN ArCustomer b WITH (NOLOCK) 
    ON a.CodClie=b.Customer AND a.CodAgen=b.Branch 
    WHERE a.CodAgen=@agencia and a.Ruta=@rutacw and a.Vendedor NOT IN ('VCI','SNV')`,
  },
  //3
  {
    id: 3,
    title: "Rutas Vendedor OIA",
    Codigo: `
    SELECT        TOP (1000) CodAgen, RutaOIA, CircuitoOIA, DiaOIA, ZonaId, RutaId, CodVendedor
    FROM            RtsRutaAsignacion
    WHERE        (CodAgen = '06') AND (RutaOIA = '114')
    ORDER BY DiaOIA, CircuitoOIA`,
  },
  //4
  {
    id: 4,
    title: "Resolver Procesado",
    Codigo: `
    SELECT Id, CodAgen, CodVend, CodClie, NombreClie, Ciruc, Direccion1, Direccion2, Direccion3, CodTempPed, Disc1, Disc2, Disc3, Ruta, Circuit, Dia, NumeroLinea, Fecha, ClienteNuevo, StockCode, DiscLine1, DiscLine2, DiscLine3, Cantidad,
    OrderUom, Promo, PrecioPro, EstadoLinea, EstadoPedido, Orden, Error
FROM     MovPDetPedidos
WHERE  (CONVERT(date, Fecha) = '20240217') AND (CodAgen = '07') AND (EstadoPedido = 'E')
ORDER BY CodTempPed 

--CAMBIAR LA MITAD DE LINEAS A ESTADO S Y QUE PROCESE DE A POCO     
--O la mitad en E del mismo  clirnte



SELECT        Id, CodAgen, CodVend, CodClie, NombreClie, Ciruc, Direccion1, Direccion2, Direccion3, CodTempPed, Disc1, Disc2, Disc3, Ruta, Circuit, Dia, NumeroLinea, Fecha, ClienteNuevo, StockCode, DiscLine1, DiscLine2, DiscLine3, 
           Cantidad, OrderUom, Promo, PrecioPro, EstadoLinea, EstadoPedido, Orden, Error
FROM            MovPDetPedidos
WHERE        (CONVERT(date, Fecha) = '20240224') AND (CodAgen = '02') AND (CodVend = '020028') AND (CodTempPed = 'A0200282024022410370016')
ORDER BY CodTempPed





--SI SE FACTURA DOBLE REVISAR CUALES FALTAN EN SYSPRO 8 
---VERIFICAR QUE CLIENTES TIENEN DIFERENTE EL ESTADO I Y REVISAR CUALES ESTAN EN SYSPRO 8
SELECT CodClie FROM            MovPDetPedidos
WHERE        (CONVERT(date, Fecha) = '20240224') AND (CodAgen = '02') AND (CodVend = '020028') --and EstadoPedido <> 'I'

group by CodClie

----------------
SELECT        Customer
FROM            ArTrnDetail
WHERE        (Customer IN ('000000000000102', '000000000005448', '000000000010349', '000000000010702', '000000000021039', '000000000021074', '000000000027682', '000000000028093', '000000000028236', '000000000028458', 
           '000000000034692', '000000000034701', '000000000038890', '000000000044757', '000000000047847', '000000000056597', '000000000066548', '000000000077411')) AND (CONVERT(Date, InvoiceDate) = '20240224')
GROUP BY Customer

`,
  },
  //5
  {
    id: 5,
    title: "Inactivar Clientes Ruta",
    Codigo: `
    --inactivar clientes ruta 
    --en sioia
    
    update MovRcfgClientesRuta  set Vendedor  = 'VCI' , Ruta  = '0000'
    --select CodClie,NombreClie, Ciudad, Vendedor, CodAgen , Ruta from MovRcfgClientesRuta
    where CodClie   in 
    (''
    )
    --select * from MovRcfgClientesRuta where Vendedor='VCI'
    
    
    
    
    UPDATE  RtsClientesAsignacion    set CodVen  = 'VCI' 
    --select * from RtsClientesAsignacion
    where CodClie   in 
    (''
    )
    
    
    -- En syspro
    
    UPDATE  ArCustomer set Salesperson  = 'VCI'
    --select * from ArCustomer
    where Customer in 
    (''
    )
    
    
    
    
    
    
    
    
    
    
    
    -------------------------------------
    --Crear Ejecutivos 
    
    --OIASFA 
    select * from [OIASFA].dbo.usrUsuariosMovilesCWM uumc where CodAgen = '40'
    and Estado = 'Y'
    --and Cedula = '1206697714'
    order by Usuario desc;
    
    --SIOIA
    select * from [SIOIA].dbo.[MovCWMUsuarios] where CodAgen ='60'
    --and Cedula='1206697714'
    order by Usuario desc;
    --order by Codigo desc;
    
    
    --para insertar EN SIOIA
    insert into MovCWMUsuarios(
    Codigo,Cedula,Nombre,Direccion,
    Correo,Usuario,Estado,CodAgen,Agencia,
    Telefono,Clave) 
    values (
    '090013','1206697714','MUÑOZ TUAREZ GABRIELA CRISTINA','EJECUTIVO JR TRADICIONAL',
    '02','39024','Y','09','AGENCIA QUEVEDO',
    '',''
    )  
    
    --delete MovCWMUsuarios where Id = 140;`,
  },
  //6
  {
    id: 6,
    title: "Cambio Ruta OIA",
    Codigo: `
       
------------------------CAMBIO DE RUTAS OIA COMPLETAS SIOIA SYSPRO 8 --------------

-- 1 CONSULTAR RUTA PARA VERIFICAR QUE VENDEDOR LA TIENE Y CUANTOS CLIENTES TIENE
select * from RtsClientesAsignacion where CodVen='090015'
select * from MovRcfgClientesRuta where Vendedor='090024'

select * from RtsClientesAsignacion WHERE (CodAgen = '06') and Ruta='118'  

-- PASO 2 EJECUTAR UPDATE CAMBIANDO EL CODIGO DEL NUEVO VENDEDOR
--update RtsClientesAsignacion set  CodVen='090024'  WHERE (CodAgen = '09') and Ruta='127'    and CodVen not in ('VCI','SNV')

-- PASO 3 ELIMINAR LOS REGISTROS DE LA TABLA AUXILIAR
--delete from RtsClientesAsignacion2

--PASO 4 INSERTAR EN TABLA AUXILIAR PARA LUEGO ACTUALIZAR EN SYSPRO
/*
INSERT INTO RtsClientesAsignacion2
	(
		   CodClie,
		   CodAgen,
		   CodVen,
		   Ruta,
		   Circuito,
		   Frecuencia,
		   Dia,
		   Estado
	)
	(SELECT CodClie,CodAgen,CodVen,Ruta,Circuito,Frecuencia,Dia,Estado
	FROM   RtsClientesAsignacion   
	   WHERE (CodAgen = '09') and Ruta='127'  and CodVen not in ('VCI','SNV')     
	)
*/

--- 1.5 SIOIA
 -- paso 5 actualizar Maestra de Celuweb
  --update dbo.MovRcfgClientesRuta set Circuito=c.Circuito, Dia=c.Dia, Vendedor=c.CodVen
    --  select *
        from MovRcfgClientesRuta a
        inner join (
            Select * from RtsClientesAsignacion2
            ) c on a.CodAgen=c.CodAgen and a.CodClie=c.CodClie 
        where a.CodAgen='09' 

-- paso 6 CAMBIAR VENDEDOR EN la tabla RtsRutasVendedor y RtsRutaAsignacion
		--select * from  RtsRutasVendedor where CodAgen='02' AND Ruta='170'
		--UPDATE RtsRutasVendedor set CodVen='090024' where CodAgen='09' AND Ruta='127'
		--update RtsRutaAsignacion set CodVendedor='090024' where CodAgen='09' and RutaOIA='127'

 -- paso 6 actualizar en syspro
/*


UPDATE ArCustomer
SET Salesperson=rca.CodVen,Branch=rca.CodAgen
--select * 
FROM [192.168.1.5,1433].SIOIA.dbo.RtsClientesAsignacion2 rca   
	INNER JOIN ArCustomer ac WITH (NOLOCK) ON ac.Customer=rca.CodClie AND rca.CodAgen=ac.Branch AND (ac.Branch='09')


UPDATE [ArCustomer+]
SET RutaOIA=rca.Ruta,Circuito=rca.Circuito, DiaVisita= rca.Dia ,Frecuencia=rca.Frecuencia
--select * 
FROM [192.168.1.5,1433].SIOIA.dbo.RtsClientesAsignacion2 rca   
	INNER JOIN [ArCustomer+] ac WITH (NOLOCK) ON ac.Customer=rca.CodClie AND (rca.CodAgen='09')
*/


`,
  },
  //7
  {
    id: 7,
    title: "Tipos Pagos Guias",
    Codigo: `
    --PARA VER LOS TIPOS DE PAGOS DE UNA GUIA 
    SELECT TOP (200) Guia, PagoIndice, CodAgen, Operador, Banco, CodCliente, Cliente, PagoFecha, PagoTipo, PagoValor, Referencia, CajaNombre, CajaBanco, CajaAgencia, ChequeTipo, CuentaNumero, ChequeNumero, FechaDisponible,
                      CodChofer, RespPagoTipo, RespPagoValor, RespReferencia, RespCajaNombre, RespCajaBanco, RespCajaAgencia, RespChequeTipo, RespCuentaNumero, RespChequeNumero, RespFechaDisponible, Diario, Eliminado, EliminadoRazon,
                      Procesado, ProcesadoPor, ProcesadoFecha, Error
    FROM     MovEDtbPagosMaster
    WHERE  (CodAgen = '02') AND (Guia = '020010000453 ')
    ORDER BY Guia`,
  },
  //8
  {
    id: 8,
    title: "Autorizar Notas de Credito",
    Codigo: `
    SELECT        TOP (200) CodNotaCredito, NumeroNotaCredito, NumeroDocModificado, Estado
    FROM            FaeNotCredMaster
    WHERE        (Estado = '4') AND (YEAR(FechaEmision) = '2024') AND (NumeroNotaCredito IN ('000013441', '000013442', '000013443', '000013444', '000013445', '000013446', '000013447', '000013448', '000013449', '000013450', 
                             '000013451', '000013452', '000013453', '000013454', '000013455'))
    ORDER BY NumeroNotaCredito 
    --N/C 000013630 - FACT #010-002-000029336`,
  },
  //9
  {
    id: 0,
    title: "Utilidades BD",
    Codigo: `
    --Para buscar las columnas de una tabla
    SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'InvMaster'
    order by COLUMN_NAME asc;
    
    --Buscar tabla por vista 
    SELECT DISTINCT
        o.name AS ViewName
    FROM
        sys.objects o
        JOIN sys.sql_dependencies d ON o.object_id = d.object_id
        JOIN sys.tables t ON d.referenced_major_id = t.object_id
    WHERE
        d.class = 1
        AND t.name = 'TuTabla'
        AND o.type = 'V'
    
    --Buscar tabla por Funciones
    SELECT DISTINCT
        o.name AS FunctionName
    FROM
        sys.objects o
        JOIN sys.sql_dependencies d ON o.object_id = d.object_id
        JOIN sys.tables t ON d.referenced_major_id = t.object_id
    WHERE
        d.class = 1
        AND t.name = 'TuTabla'
        AND o.type IN ('FN', 'IF', 'TF')
    
    --Buscar tabla por Procedimientos Almacenados
    SELECT DISTINCT
        o.name AS StoredProcedureName
    FROM
        sys.objects o
        JOIN sys.sql_dependencies d ON o.object_id = d.object_id
        JOIN sys.tables t ON d.referenced_major_id = t.object_id
    WHERE
        d.class = 1
        AND t.name = 'TuTabla'
        AND o.type = 'P'
    
    --buscar tablas por campo 
    SELECT 
        t.name AS table_name,
        c.name AS column_name
    FROM 
        sys.tables AS t
        INNER JOIN sys.columns AS c ON t.object_id = c.object_id
    WHERE 
        c.name = 'nombre_campo';`,
  },
  //10
  {
    id: 10,
    title: "Migrar ejecutivos OIASFA->SIOIA",
    Codigo: `
    --Crear Ejecutivos 

    --OIASFA 
    select * from [OIASFA].dbo.usrUsuariosMovilesCWM uumc where CodAgen = '32'
    and Estado = 'Y'
    and Cedula = '0940715071'
    
    --SIOIA
    select * from [SIOIA].dbo.[MovCWMUsuarios] where CodAgen ='02'
    order by Codigo desc;
    
    --para insertar EN SIOIA
    insert into MovCWMUsuarios(
    Codigo,Cedula,Nombre,Direccion,
    Telefono,Correo,Usuario,Clave,Estado,CodAgen,Agencia) 
    values (
    '020028','0940715071','CARPIO DIAZ RONNY RAFAEL','EJECUTIVO JR TRADICIONAL',
    ''
    )`,
  },
  //11
  {
    id: 11,
    title: "Repeticiones Fact Guia",
    Codigo: `
    SELECT        TOP (200) Guia, Linea, CodAgen, RutaVisita, RutaDelivery, Factura, FacturaFecha, CodCliente, Cliente, CodVendedor, Vendedor, TerminoPago, FacturaValor, Direccion, EntregaSecuencia
    FROM            MovEDtbDespachoDetalle
    WHERE        (CodAgen = '02') AND (Guia = '020010000519') AND (Factura = '002006000327586')
    `,
  },
  //12
  {
    id: 12,
    title: "Devoluciones Guias",
    Codigo: `
    SELECT        TOP (200) Guia, Factura, OrdenVenta, Operador, DevolucionEstado, DevolucionRazon, EliminacionRazon, DevolucionFecha, CodAgen, Bodega, CodCliente, CodVendedor, CodChofer, OrdenFecha, FacturaFecha, FacturaTermino, 
    OrdenDescPorcentaje1, OrdenDescPorcentaje2, OrdenDescPorcentaje3, RegistroSubValor, RegistroFiscalValor, RegistroTotalValor, ProcesadoPor, ProcesadoFecha, OrdenVentaGenerada, Error
FROM            MovEDtbDevolucionMaster
WHERE        (Guia = '020010000524')`,
  },
  //13
  {
    id: 13,
    title: "Clientes Guias",
    Codigo: `
    select  MV.CodCliente,AR.Branch from MovEDtbDespachoDetalle MV
    inner join [192.168.1.10].[SysproCompanyOia_E].dbo.[ArCustomer] AR on MV.CodCliente= AR.Customer
     where MV.Guia='190010000120'
    
     --Verificar si en esta tabla dichos clientes tienen la misma agencia o tambien tienen cambiado
     select * from MovRcfgClientesRuta where CodClie in('000000000037864','000000000015297')
    
     --actualizar la ArCustomer la agencia de dichos clientes 
     update [ArCustomer] set Branch='19' where Customer='000000000015297'`,
  },
  //14
  {
    id: 14,
    title: "Crear Choferes Ayudantes",
    Codigo: `
    --EJECUTAR 1.10
    -- CREAR CHOFER SYSPRO 8 --------------
    
    --select * from SalSalesperson where Branch='02'
    DECLARE @Branch CHAR(2)
    DECLARE @Warehouse CHAR(2)
    DECLARE @EmployeeCode INT
    DECLARE @EmployeeName CHAR(40)
    DECLARE @EmployeeSurname CHAR(40)
    DECLARE @SalespersonName CHAR(100)
    DECLARE @SalespersonNameSyspro CHAR(30)
    DECLARE @IdentityNumber CHAR(10)
    DECLARE @UserName CHAR(10)
    DECLARE @Name CHAR(100)
    DECLARE @Phone CHAR(10)
    --SEGUNDO PANGULO AUCAPIÑA C.I. 0105154215 Rodolfo Ernesto López Rosero
    SET @Branch='19'
    SET @Warehouse='19'
    SET @SalespersonName='ALTAMIRANO CAMACHO ALEX'
    SET @SalespersonNameSyspro='ALTAMIRANO CAMACHO ALEX'
    SET @UserName='alcanalfx'
    SET @Name='ALTAMIRANO CAMACHO ALEX'
    --SET @EmployeeCode=2159
    set @IdentityNumber='0942261645'
    set @EmployeeName='ALTAMIRANO CAMACHO'    
    set @EmployeeSurname='ALEX JONATHAN'
    set @Phone ='103040'
    
    DECLARE @Salesperson CHAR(6)
    DECLARE @LastSalesperson CHAR(3)
    DECLARE @SalespersonCode INT
    
    --CHOOFER
    SET @Salesperson='196001' --CH
    --AR
    SET @Salesperson='197001' --AR
    
    INSERT INTO SalSalesperson
    (       Branch,Salesperson,[Name],SalesBudget1,SalesBudget2,SalesBudget3,SalesBudget4,SalesBudget5,SalesBudget6,
           SalesBudget7,SalesBudget8,SalesBudget9,SalesBudget10,SalesBudget11,SalesBudget12,SalesBudget13,
                    SalesActual1,SalesActual2,SalesActual3,SalesActual4,SalesActual5,SalesActual6,SalesActual7,SalesActual8,
           SalesActual9,SalesActual10,SalesActual11,SalesActual12,SalesActual13,CommissionPct
    )
    VALUES (@Branch,@Salesperson,@SalespersonNameSyspro,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
    
    INSERT INTO [SalSalesperson+]
    (
    Branch, Salesperson, Cedula, Tipo,Cargo,IdAntiguo,Estado
    )
    values (@Branch, @Salesperson, @IdentityNumber, 'C','AR','','Y')
    
    --------------- 1.5 en sioia------------
    --SOLO CHOFERES
    Insert Into TouchRcfgUsuarios (UsuarioCodigo,UsuarioNombre,UsuarioTipo, Nombre,Clave, CodAgen,PersonalVentas, Identificacion,
    AccesoAgencia,AccesoBodega, AccesoProductoClase,Estado)
    Values(@Branch+'00'+@Salesperson,@UserName,'SALESDLVR',@SalespersonName,'iPdJqL7zGY8RT4aFE3xXjA==',@Branch,@Salesperson,@IdentityNumber,
    'L','L','L','E')
    
    
    `,
  },
  //15
  {
    id: 15,
    title: "Buscar Procesado por vendedor y fecha",
    Codigo: `
    SELECT Id, CodAgen, CodVend, CodClie, NombreClie, Ciruc, Direccion1, Direccion2, Direccion3, CodTempPed, Disc1, Disc2, Disc3, Ruta, Circuit, Dia, NumeroLinea, Fecha, ClienteNuevo, StockCode, DiscLine1, DiscLine2, DiscLine3, Cantidad,
    OrderUom, Promo, PrecioPro, EstadoLinea, EstadoPedido, Orden, Error
FROM     MovPDetPedidos
WHERE  (CONVERT(date, Fecha) = '20240309') AND (CodAgen = '03')and CodVend='030018'
and EstadoPedido in ('S','E')
ORDER BY CodTempPed `,
  },
  //16

  {
    id: 16,
    title: "Ver rutas Repetidas Vendedores por Agencia",
    Codigo: `
    select COUNT(Distinct(Vendedor)) as NumeroVendedor, Ruta from MovRcfgClientesRuta  where CodAgen='06'
    and Vendedor NOT IN ('VCI','SNV') and Ruta NOT IN ('0000')
    group by Ruta
    order by NumeroVendedor desc `,
  },
  //17

  {
    id: 17,
    title: "Rutas Infladas por Agencia",
    Codigo: `
    select Ruta, Count(CodClie) as NClientes from MovRcfgClientesRuta where CodAgen='06'
and Vendedor NOT IN ('VCI','SNV') and Ruta NOT IN ('0000')
group by Ruta
order by NClientes Desc s`,
  },
  //18

  {
    id: 18,
    title: "Eliminar Facturas de Guias",
    Codigo: `
      --Cuando pidan eliminar facturas de unas guias: 
      --Modo edicion y eliminar las facturas que van dictando
      SELECT        TOP (200) Guia, Linea, CodAgen, RutaVisita, RutaDelivery, Factura, FacturaFecha, CodCliente, Cliente, CodVendedor, Vendedor, TerminoPago, FacturaValor, Direccion, EntregaSecuencia
FROM            MovEDtbDespachoDetalle
WHERE        (Guia = '090011003943')
      `,
  },
  //19
  {
    id: 19,
    title: "Aplicar Descuento",
    Codigo: `
    --Solo cambiar DiscLine1 con el descuento que piden en el correo
    select * from MovPDetPedidos mpp  where CodClie  like '%072460' and CodTempPed  like '%5190006'`,
  },
  //20
  {
    id: 20,
    title: "Cambio de unidades de produccion",
    Codigo: `
    --En el server 5  y en Syspro 
    select * from OIAOrdProd1.dbo.WipMaster wm  where Job  = 'P000001974'
    --QtyToMake , QtyToMakeEn `,
  },
  //21

  {
    id: 21,
    title: "Buscar Clientes con diferentes Agencias SIOIA-SYSPRO",
    Codigo: `
    --Si es diferente cambiar en ArCustomer
    select Mov.CodClie,Mov.Vendedor VendedorMov,Ar.Salesperson VendedorSyspro, Mov.CodAgen AgenciaMov, Ar.Branch BranchSyspro
    --, case when Mov.CodAgen <>  Ar.Branch then 'Diferente' else 'igual' end as Verificador
    from MovRcfgClientesRuta Mov 
    inner join  [192.168.1.10].[SysproCompanyOia_E].[dbo].[ArCustomer] Ar on Ar.Customer = Mov.CodClie
    where Mov.CodAgen='02'
    and Mov.Vendedor not in ('VCI')
    and  Mov.CodAgen <>Ar.Branch
    order by Mov.CodClie`,
  },
  //22

  {
    id: 22,
    title: "Buscar Clientes con diferentes vendedores  SIOIA-SYSPRO",
    Codigo: `
    select Mov.CodClie,Mov.Vendedor VendedorMov,Ar.Salesperson VendedorSyspro, Mov.CodAgen AgenciaMov, Ar.Branch BranchSyspro
--, case when Mov.CodAgen <>  Ar.Branch then 'Diferente' else 'igual' end as Verificador
from MovRcfgClientesRuta Mov 
inner join  [192.168.1.10].[SysproCompanyOia_E].[dbo].[ArCustomer] Ar on Ar.Customer = Mov.CodClie
where Mov.CodAgen='02'
and Mov.Vendedor not in ('VCI')
and  Mov.Vendedor <>Ar.Salesperson
order by Mov.CodClie
   
    `,
  },
  //23

  {
    id: 23,
    title: "Auth NotCred Estado 5",
    Codigo: `
  select Estado,DetalleEstado,CodNotaCredito,NumeroNotaCredito, * from FaeNotCredMaster
  where CodNotaCredito in (
  '010002000014051',
  '010002000014057',
  '010002000014058',
  '010002000014059',
  '010002000014060'
  )
  
  --En la Detail hay buscar esas notas de credito
  select * from FaeNotCredDetail
  where CodNotaCredito in (
  --'010002000014051'
  --,
  '010002000014060'
  )
  
  --Sumar de la Base6 y del Valor 6 de una nota de credito 
  select Sum(Base6) as Base6,Sum(Valor6) as Valor6 from FaeNotCredDetail
  where CodNotaCredito in (
  '010002000014060'
  )
  
  --Y volver a FaeNotCredMaster y actualizar la Base 6 y el Valor con lo sumado anteriormente y actualizr a estado 1
  --El valor modificado (FarNotCredMaster) es la suma de todos los valores de las bases menos el descuento 

  `,
  },
  //24

  {
    id: 24,
    title: "Cuando no guarda en Touch",
    Codigo: `
    declare @Guia varchar (15) = '070010000321'

    DELETE MovEDtbDevolucionMaster  where   Guia  = @Guia
    
    DELETE  MovEDtbDevolucionDetalle  where    Guia = @Guia
    
    DELETE MovEDtbPagosMaster WHERE Guia = @Guia
    
    DELETE  MovEDtbPagosDetalle where Guia = @Guia`,
  },
  //25

  {
    id: 25,
    title: "Cambiar Banco de retenciones",
    Codigo: `
    --Para cambiar el banco de retenciones Banco: R9
    --en MovEDtbPagosMaster ver la columna Error y ver a que banco no tiene acceso  y actualizar la columna banco
    SELECT        TOP (200) Guia, PagoIndice, CodAgen, Operador, Banco, CodCliente, Cliente, PagoFecha, PagoTipo, PagoValor, Referencia, CajaNombre, CajaBanco, CajaAgencia, ChequeTipo, CuentaNumero, ChequeNumero, FechaDisponible, 
                             CodChofer, RespPagoTipo, RespPagoValor, RespReferencia, RespCajaNombre, RespCajaBanco, RespCajaAgencia, RespChequeTipo, RespCuentaNumero, RespChequeNumero, RespFechaDisponible, Diario, Eliminado, 
                             EliminadoRazon, Procesado, ProcesadoPor, ProcesadoFecha, Error
    FROM            MovEDtbPagosMaster
    WHERE        (Guia = '090011004008')`,
  },
  //26
  {
    id: 26,
    title: "Programa Cambio Ruta OIA Completa",
    Codigo: `
    --Vendedor, ruta, codagen
    --Parte 1
    --Ejecutar en SIOIA
                        --Vendedor  --RutaOIA  --Agen
    exec [sp_Cambiar_rutaOIACompleta_app_sorporte] '020103','172','02';
    --Parte 2 
    --Ejecutar en SYSPRO
                          --Agencia  --RutaOIA
    exec [dbo].[sp_Cambiar_rutaOIACompleta_app_sorporte]'02','';`,
  },
  //27
  {
    id: 27,
    title: "Cuando no deja Facturar un SKU",
    Codigo: `
    --Actualizar QtyOnHand a 0 
    SELECT        TOP (200) StockCode, Warehouse, Lot, Bin, NextTrnLine, OrigQtyReceived, QtyOnHand, QtyToShip, Version, Release, ExpiryDate, CreationDate, DrawOfficeNum, LastTrnDate, ArchiveFilename, QtyInTransit, LotHoldFlag, Note, 
    EccDummy, QtyAwaitingCredit, QtyReserved, SupplierLot, ProductShelfLife, InternalShelfLife, UseByDate, SellByDate, InternalExpiryDate, ManufactureDate, DispatchDate, BestBeforeDate, PrdRecallFlag, ReasonCode, 
    TimeStamp
FROM            LotDetail
WHERE        (StockCode = '902009001') AND (Warehouse = '11')`,
  },
  /*
  //
    
    {
    id: 0,
    title: "Script Vacio Ejemplo",
    Codigo: `
       Script Vacio`,
  },
  */
  //28

  {
    id: 28,
    title: "Actualizar tablas de Rutas",
    Codigo: `
    
--update RtsClientesAsignacion 
set CodAgen=Mov.CodAgen, CodVen=Mov.Vendedor,
Circuito=Mov.Circuito, Frecuencia=Mov.Frecuencia, Dia=Mov.Dia
--select *
from (select Mov.CodAgen,Mov.Vendedor,Mov.Circuito,Mov.Frecuencia,Mov.Dia, Mov.CodClie as Cliente
from  MovRcfgClientesRuta Mov ) as Mov
where Mov.Cliente=CodClie

select * from RtsClientesAsignacion;

update RtsRutaAsignacion set  DiaOIA= X.Dia, CircuitoOIA=X.Circuito, ZonaId=X.Zone, CodAgen=X.CodAgen,
		CodVendedor=X.Vendedor
--select * 
from 
(select Dia,Frecuencia,Circuito,Ruta,Zone,Vendedor,CodAgen from 
MovRcfgClientesRuta --where Vendedor= ''
 where Vendedor <>'VCI' and Ruta <> '0000'
group by Dia,Frecuencia,Circuito,Ruta,Zone,Vendedor,CodAgen) as X
where  RutaId=X.Ruta


select * from RtsRutaAsignacion`,
  },
];
