const init = `
CREATE TABLE IF NOT EXISTS  USER (
	id				varchar(50) 	primary key not null,
    username		varchar(20)		unique not null,
    password		varchar(255)	not null,
    role			enum("Employee", "Manager", "Customer"),
    associated_id	varchar(50)
);

-- CREATE TABLE IF NOT EXISTS  ---------------------------------
/*---------- Nhom khach hang ------------*/
CREATE TABLE IF NOT EXISTS  nhom_khach_hang(
	Ma_nhom					varchar(50)		primary key     not null,
	Ten_nhom				varchar(20)		DEFAULT 'Dong',
	Diem_chuan				int				DEFAULT 0
);

/*----------- Khach hang ----------------*/
CREATE TABLE IF NOT EXISTS  khach_hang(
	Ma_khach_hang			varchar(50)		primary key     not null,
	Email					varchar(255),
	Gioi_tinh				char(3),
	Ho_va_ten_lot			varchar(255),
	Ten 					varchar(255),
	Nam_sinh				int,
	Dia_chi					varchar(255),
	Diem_tich_luy			int,
	So_CMND					varchar(255)	NOT NULL UNIQUE,
	Ma_nhom					varchar(50),
	Ngay_giao_dich_gan_nhat	date,
	Ma_nhan_vien_CSKH		varchar(50),
	Ngay_dang_ky			date
);

/*------------ So dien thoai khach hang -*/
CREATE TABLE IF NOT EXISTS  sdt_khach_hang(
	Ma_khach_hang			varchar(50),
	So_dien_thoai			varchar(20),
	primary key (Ma_khach_hang, So_dien_thoai)
);

/*------------ Thong bao thong tin ------*/
CREATE TABLE IF NOT EXISTS  thong_bao_thong_tin(
	Ma_thong_bao			varchar(50)		primary key     not null,
	Ngay_thong_bao			date,
	Noi_dung				varchar(255),
	Nguoi_thong_bao			varchar(255)	
);

/*------------ Tu van -------------------*/
CREATE TABLE IF NOT EXISTS  tu_van(
	Ma_khach_hang			varchar(50),
	Ma_thong_bao			varchar(50),
	Ma_nhan_vien_CSKH		varchar(50),
	primary key(Ma_khach_hang, Ma_thong_bao)
);

/*------------ Nhan vien sieu thi -------*/
CREATE TABLE IF NOT EXISTS  nhan_vien_sieu_thi(
	Ma_nhan_vien			varchar(50)		primary key     not null,
	Email					varchar(255),
	Gioi_tinh				char(3),
	Ho_va_ten_lot			varchar(255),
	Ten 					varchar(255),
	Nam_sinh				int,
	Dia_chi					varchar(255),
	So_CMND					varchar(255)	NOT NULL UNIQUE,
	Thoi_gian_lam_viec		int,
	Ma_sieu_thi				varchar(50)		NOT NULL
);

/*------------ So dien thoai nhan vien --*/
CREATE TABLE IF NOT EXISTS  sdt_nhan_vien(
	Ma_nhan_vien			varchar(50),
	So_dien_thoai			varchar(20),
	primary key (Ma_nhan_vien, So_dien_thoai)
);

/*------------ Nhan vien CSKH -----------*/
CREATE TABLE IF NOT EXISTS  nhan_vien_cskh(
	Ma_nhan_vien_CSKH		varchar(50) 	primary key     not null
);

/*------------ Sieu thi -----------------*/
CREATE TABLE IF NOT EXISTS  sieu_thi(
	Ma_sieu_thi				varchar(50) 	primary key     not null,
	Ten_sieu_thi			varchar(255),
	Dia_chi					varchar(255)
);

/*------------ Nhan vien thu ngan -------*/
CREATE TABLE IF NOT EXISTS  nhan_vien_thu_ngan(
	Ma_nhan_vien_thu_ngan	varchar(50) 	primary key     not null
);

/*------------ Nguoi quan ly ------------*/
CREATE TABLE IF NOT EXISTS  nguoi_quan_ly(
	Ma_nhan_vien			varchar(50) 	primary key     not null,
	So_nam_kinh_nghiem		int,
	Chung_chi				varchar(255),
	Ma_sieu_thi				varchar(50)		NOT NULL
);

/*------------ KPI ----------------------*/
CREATE TABLE IF NOT EXISTS  kpi(
	Ma_nhan_vien_thu_ngan	varchar(50),
	So_giao_dich			int,
	Quay					varchar(5),
	So_tien_giao_dich		int,
	primary key (Ma_nhan_vien_thu_ngan, So_giao_dich, Quay, So_tien_giao_dich)
);

/*------------ Don hang -----------------*/
CREATE TABLE IF NOT EXISTS  don_hang(
	Ma_don_hang				varchar(50) 	primary key     not null,
	Ngay_thanh_toan			date,
	Diem_thuong				int,
	Ma_khach_hang			varchar(30) 	NOT NULL,
	Ma_nhan_vien_thu_ngan	varchar(30) 	NOT NULL,
	Hinh_thu_thanh_toan		varchar(30),
	So_tien_thanh_toan		int
);

/*------------ Thuoc --------------------*/
CREATE TABLE IF NOT EXISTS  thuoc(
	Ma_don_hang				varchar(50),
	Ma_hang_hoa				varchar(50),
	Gia_ban					int,
	So_luong				int,
	primary key(Ma_don_hang, Ma_hang_hoa)
);

/*------------ Co -----------------------*/
CREATE TABLE IF NOT EXISTS  co(
	Ma_nhom					varchar(50),
	Ma_khuyen_mai			varchar(50),
	Ma_don_hang				varchar(50),
	primary key(Ma_nhom, Ma_khuyen_mai, Ma_don_hang)
);

/*------------ Khuyen mai ---------------*/
CREATE TABLE IF NOT EXISTS  khuyen_mai(
	Ma_khuyen_mai			varchar(50),
	Ma_don_hang				varchar(50),
	Noi_dung_khuyen_mai		varchar(255),
	Thoi_han_su_dung		date,
	primary key(Ma_khuyen_mai, Ma_don_hang)
);

/*------------ Hang hoa -----------------*/
CREATE TABLE IF NOT EXISTS  hang_hoa(
	Ma_hang_hoa				varchar(30) 	primary key     not null,
	Ten_hang_hoa			varchar(255),
	Han_su_dung				date,
	Ngay_san_xuat			date,
	Xuat_xu					varchar(255),
	Gia_niem_yet			int,
	Ngay_nhap				date
);

/*------------ Mo ta --------------------*/
CREATE TABLE IF NOT EXISTS  mo_ta(
	Ma_hang_hoa				varchar(30),
	Loai_mo_ta				varchar(255),
	primary key(Ma_hang_hoa, Loai_mo_ta)
);

/*------------ Hang dien tu -------------*/
CREATE TABLE IF NOT EXISTS  hang_dien_tu(
	Ma_hang_hoa_dien_tu		varchar(30) 	primary key     not null,
	Nang_luong_tieu_thu		int,
	Cong_suat				int
);

/*------------ Thuc an ------------------*/
CREATE TABLE IF NOT EXISTS  thuc_an(
	Ma_hang_hoa_thuc_an		varchar(30) 	primary key     not null,
	Nang_luong_cung_cap		int,
	Cach_bao_quan			varchar(255)
);

/*------------ Do gia dung --------------*/
CREATE TABLE IF NOT EXISTS  do_gia_dung(
	Ma_hang_hoa_do_gia_dung	varchar(30) 	primary key     not null,
	Loai_san_pham			varchar(255),
	foreign key(Ma_hang_hoa_do_gia_dung) references Hang_hoa(Ma_hang_hoa)
);

CREATE TABLE IF NOT EXISTS question (
	question_id				varchar(50)		primary key		not null,
    title					varchar(50)		not null,
    content					varchar(50)		not null,
    customer_id				varchar(50),
    answer					varchar(255),
    nhan_vien_cskh_id		varchar(50),
    
    foreign key(customer_id)	references		khach_hang(Ma_khach_hang),
    foreign key(nhan_vien_cskh_id)	references 	nhan_vien_cskh(Ma_nhan_vien_CSKH)
);


-- ALTER TABLE - ADD CONSTRAINT AND CHECK z
/*----------- Khach hang ----------------*/
ALTER TABLE khach_hang
	ADD CONSTRAINT KH_FK_Ma_nhom foreign key (Ma_nhom) references nhom_khach_hang(Ma_nhom) ON DELETE SET NULL ON UPDATE CASCADE,
	ADD CONSTRAINT KH_FK_Ma_nhan_vien_CSKH foreign key (Ma_nhan_vien_CSKH) references nhan_vien_cskh(Ma_nhan_vien_CSKH) ON DELETE SET NULL ON UPDATE CASCADE,
	ADD CONSTRAINT KH_CHK_Nam_sinh check ((2021 - Nam_sinh) > 16);
/*------------ So dien thoai khach hang --*/
ALTER TABLE sdt_khach_hang
	ADD CONSTRAINT SDTKH_FK_Ma_khach_hang foreign key (Ma_khach_hang) references khach_hang(Ma_khach_hang) ON DELETE CASCADE ON UPDATE CASCADE;

/*------------ Tu van --------------------*/
ALTER TABLE tu_van
	ADD CONSTRAINT TV_FK_Ma_khach_hangg foreign key (Ma_khach_hang) references khach_hang(Ma_khach_hang) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT TV_FK_Ma_thong_bao foreign key (Ma_thong_bao) references thong_bao_thong_tin(Ma_thong_bao) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT TV_FK_Ma_nhan_vien_CSKH foreign key (Ma_nhan_vien_CSKH) references nhan_vien_cskh(Ma_nhan_vien_CSKH) ON DELETE SET NULL ON UPDATE CASCADE;

/*------------ Nhan vien sieu thi -------*/
ALTER TABLE nhan_vien_sieu_thi
	ADD CONSTRAINT NVST_FK_Ma_sieu_thi foreign key (Ma_sieu_thi) references sieu_thi(Ma_sieu_thi) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT NVST_CHK_Thoi_gian_lam_viec check (Thoi_gian_lam_viec >= 4);

/*------------ Nhan vien CSKH -----------*/
ALTER TABLE nhan_vien_cskh
	ADD CONSTRAINT NVCSKH_FK_Ma_nhan_vien_CSKH foreign key (Ma_nhan_vien_CSKH) references nhan_vien_sieu_thi(Ma_nhan_vien) ON DELETE CASCADE ON UPDATE CASCADE;

/*------------ Nhan vien thu ngan -------*/
ALTER TABLE nhan_vien_thu_ngan
	ADD CONSTRAINT NVCSKH_FK_Ma_nhan_vien_thu_ngan foreign key (Ma_nhan_vien_thu_ngan) references nhan_vien_sieu_thi(Ma_nhan_vien) ON DELETE CASCADE ON UPDATE CASCADE;

/*------------ So dien thoai nhan vien --*/
ALTER TABLE sdt_nhan_vien
	ADD CONSTRAINT SDTKH_FK_Ma_nhan_vien foreign key (Ma_nhan_vien) references nhan_vien_sieu_thi(Ma_nhan_vien) ON DELETE CASCADE ON UPDATE CASCADE;

/*------------ KPI ----------------------*/
ALTER TABLE kpi
	ADD CONSTRAINT KPI_FK_Ma_nhan_vien_thu_ngan foreign key (Ma_nhan_vien_thu_ngan) references nhan_vien_sieu_thi(Ma_nhan_vien) ON DELETE CASCADE ON UPDATE CASCADE;

/*------------ Nguoi quan ly -------------*/
ALTER TABLE nguoi_quan_ly
	ADD CONSTRAINT NQL_FK_Ma_nhan_vien foreign key (Ma_nhan_vien) references nhan_vien_sieu_thi(Ma_nhan_vien) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT NQL_FK_Ma_sieu_thi foreign key (Ma_sieu_thi) references sieu_thi(Ma_sieu_thi) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT NQL_CHK_So_nam_kinh_nghiem check (So_nam_kinh_nghiem >= 3);

/*------------ Don hang ------------------*/
ALTER TABLE don_hang
	ADD CONSTRAINT DH_FK_Ma_khach_hang foreign key (Ma_khach_hang) references khach_hang(Ma_khach_hang) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT DH_FK_Ma_nhan_vien_thu_ngan foreign key (Ma_nhan_vien_thu_ngan) references nhan_vien_thu_ngan(Ma_nhan_vien_thu_ngan) ON DELETE CASCADE ON UPDATE CASCADE;

/*------------ Thuoc --------------------*/
ALTER TABLE thuoc
	ADD CONSTRAINT T_FK_Ma_don_hang foreign key (Ma_don_hang) references don_hang(Ma_don_hang) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT T_FK_Ma_hang_hoa foreign key (Ma_hang_hoa) references hang_hoa(Ma_hang_hoa) ON DELETE CASCADE ON UPDATE CASCADE;

/*------------ Co -----------------------*/
ALTER TABLE co
	ADD CONSTRAINT C_FK_Ma_nhom foreign key (Ma_nhom) references nhom_khach_hang(Ma_nhom) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD CONSTRAINT C_FK_Ma_khuyen_mai foreign key (Ma_khuyen_mai, Ma_don_hang) references khuyen_mai(Ma_khuyen_mai, Ma_don_hang) ON DELETE CASCADE ON UPDATE CASCADE;

/*------------ Khuyen mai ---------------*/
ALTER TABLE khuyen_mai
	ADD CONSTRAINT KM_FK_Ma_don_hang foreign key (Ma_don_hang) references don_hang(Ma_don_hang) ON DELETE CASCADE ON UPDATE CASCADE;

/*------------ Mo ta ---------------------*/
ALTER TABLE mo_ta
	ADD CONSTRAINT MT_FK_HangHoa_MoTa foreign key (Ma_hang_hoa) references hang_hoa(Ma_hang_hoa) ON DELETE CASCADE ON UPDATE CASCADE;

/*------------ Hang dien tu --------------*/
ALTER TABLE hang_dien_tu
	ADD CONSTRAINT HDT_FK_Ma_hang_hoa_dien_tu foreign key (Ma_hang_hoa_dien_tu) references hang_hoa(Ma_hang_hoa) ON DELETE CASCADE ON UPDATE CASCADE;

/*------------ Thuc an -------------------*/
ALTER TABLE thuc_an
	ADD CONSTRAINT TA_FK_Ma_hang_hoa_thuc_an foreign key (Ma_hang_hoa_thuc_an) references hang_hoa(Ma_hang_hoa) ON DELETE CASCADE ON UPDATE CASCADE;

/*------------ Do gia dung --------------*/
ALTER TABLE do_gia_dung
	ADD CONSTRAINT TA_FK_Ma_hang_hoa_do_gia_dung foreign key (Ma_hang_hoa_do_gia_dung) references hang_hoa(Ma_hang_hoa) ON DELETE CASCADE ON UPDATE CASCADE;
);
`

module.exports = init;

