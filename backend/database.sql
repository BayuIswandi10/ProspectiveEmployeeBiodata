-- Buat database jika belum ada
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'ProspectiveEmployeeBiodata')
BEGIN
    CREATE DATABASE [ProspectiveEmployeeBiodata];
END
GO

USE [ProspectiveEmployeeBiodata];
GO

-- Tabel users
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[users] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [email] NVARCHAR(255) NOT NULL UNIQUE,
        [password] NVARCHAR(255) NOT NULL,
        [role] NVARCHAR(50) NOT NULL DEFAULT 'user',
        [created_at] DATETIME NOT NULL DEFAULT GETDATE(),
        [updated_at] DATETIME NOT NULL DEFAULT GETDATE()
    );
END
GO

-- Tabel biodata
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[biodata]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[biodata] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [user_id] INT NOT NULL UNIQUE,
        [posisi_dilamar] NVARCHAR(255) NOT NULL,
        [nama] NVARCHAR(255) NOT NULL,
        [no_ktp] NVARCHAR(50) NOT NULL UNIQUE,
        [tempat_lahir] NVARCHAR(100) NOT NULL,
        [tanggal_lahir] DATE NOT NULL,
        [jenis_kelamin] NVARCHAR(20) NOT NULL,
        [agama] NVARCHAR(50) NOT NULL,
        [golongan_darah] NVARCHAR(5),
        [status] NVARCHAR(50) NOT NULL,
        [alamat_ktp] NVARCHAR(MAX) NOT NULL,
        [alamat_tinggal] NVARCHAR(MAX) NOT NULL,
        [email] NVARCHAR(255) NOT NULL,
        [no_telp] NVARCHAR(50) NOT NULL,
        [orang_terdekat] NVARCHAR(255) NOT NULL,
        [skill] NVARCHAR(MAX),
        [bersedia_ditempatkan] BIT NOT NULL DEFAULT 0,
        [penghasilan_diharapkan] DECIMAL(18,2) NOT NULL,
        [created_at] DATETIME NOT NULL DEFAULT GETDATE(),
        [updated_at] DATETIME NOT NULL DEFAULT GETDATE(),
        CONSTRAINT [FK_biodata_users] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE
    );
END
GO

-- Tabel pendidikan
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[pendidikan]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[pendidikan] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [biodata_id] INT NOT NULL,
        [jenjang] NVARCHAR(50) NOT NULL,
        [nama_institusi] NVARCHAR(255) NOT NULL,
        [jurusan] NVARCHAR(100) NOT NULL,
        [tahun_lulus] INT NOT NULL,
        [ipk] DECIMAL(3,2),
        CONSTRAINT [FK_pendidikan_biodata] FOREIGN KEY ([biodata_id]) REFERENCES [dbo].[biodata]([id]) ON DELETE CASCADE
    );
END
GO

-- Tabel pelatihan
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[pelatihan]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[pelatihan] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [biodata_id] INT NOT NULL,
        [nama_kursus] NVARCHAR(255) NOT NULL,
        [sertifikat] BIT NOT NULL DEFAULT 0,
        [tahun] INT NOT NULL,
        CONSTRAINT [FK_pelatihan_biodata] FOREIGN KEY ([biodata_id]) REFERENCES [dbo].[biodata]([id]) ON DELETE CASCADE
    );
END
GO

-- Tabel pekerjaan
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[pekerjaan]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[pekerjaan] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [biodata_id] INT NOT NULL,
        [nama_perusahaan] NVARCHAR(255) NOT NULL,
        [posisi_terakhir] NVARCHAR(100) NOT NULL,
        [pendapatan_terakhir] DECIMAL(18,2) NOT NULL,
        [tahun] INT NOT NULL,
        CONSTRAINT [FK_pekerjaan_biodata] FOREIGN KEY ([biodata_id]) REFERENCES [dbo].[biodata]([id]) ON DELETE CASCADE
    );
END
GO
