const userSQL = {
	getCustomer: (id) =>
		`select * from khach_hang where Ma_khach_hang = "${id}"`,

	getUser: (id) =>
		`select id, role, associated_id from user where id = "${id}";`,

	getPassword: (username) =>
		`select id, password from user where username = "${username}";`,

	getRole: (id) => `select role from user where id = "${id}";`,

	getCustomerInfo: (
		associated_id
	) => `select concat(Ho_va_ten_lot, " ", Ten) as name, Diem_tich_luy, Ten_nhom, Ma_khach_hang
	from khach_hang, nhom_khach_hang 
	where ma_khach_hang = "${associated_id}" and khach_hang.ma_nhom = nhom_khach_hang.ma_nhom;`,

	updateCustomer: (
		customer_id,
		fname,
		lname,
		sex,
		year,
		address,
		cmnd
	) => `update khach_hang 
	set Ho_va_ten_lot = "${fname}", Ten = "${lname}", Gioi_tinh = "${sex}", Nam_sinh = "${year}", Dia_chi = "${address}", So_CMND = "${cmnd}"
	where Ma_khach_hang = "${customer_id}"`,

	getEmployeeInfo: (
		associated_id
	) => `select concat(nhan_vien_sieu_thi.Ho_va_ten_lot, " ", nhan_vien_sieu_thi.Ten) as name, 
		count(Ma_khach_hang) as registered_customer_count,
			count(question_id) as new_question_count
	from nhan_vien_sieu_thi left join question on Ma_nhan_vien = nhan_vien_cskh_id, khach_hang
	where Ma_nhan_vien = "${associated_id}" and Ma_nhan_vien = Ma_nhan_vien_CSKH
    group by Ma_nhan_vien_CSKH;`,

	getManagerInfo: (
		associated_id
	) => `select concat(nhan_vien_sieu_thi.Ho_va_ten_lot, " ", nhan_vien_sieu_thi.Ten) as name, total_employee
	from nhan_vien_sieu_thi, (select count(Ma_nhan_vien_CSKH) as total_employee from nhan_vien_cskh) as B
	where Ma_nhan_vien = "${associated_id}"`,

	newCustomer: (
		id,
		email,
		sex,
		fname,
		lname,
		year,
		address,
		cmnd,
		recent_shopping_date,
		employee_id,
		registerDate
	) => `INSERT INTO khach_hang
	VALUES ('${id}','${email}','${sex}','${fname}','${lname}','${year}','${address}', '0','${cmnd}', '1', '${recent_shopping_date}','${employee_id}','${registerDate}');`,

	newUser: (id, username, password, customer_id) =>
		`insert into user(id, username, password, role, associated_id) values ("${id}", "${username}", "${password}", "Customer", "${customer_id}")`,

	addPhonenumber: (customer_id, phonenumber) =>
		`insert into sdt_khach_hang values ("${customer_id}", "${phonenumber}");`,

	getAllCustomer: () =>
		`select Ma_khach_hang as id, concat(Ho_va_ten_lot, " ", Ten) as name from khach_hang;`,
}

module.exports = userSQL
