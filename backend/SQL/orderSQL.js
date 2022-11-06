const orderSQL = {
    getOrders: (customer_id) => `select don_hang.Ma_don_hang as id, 
	Ngay_thanh_toan as checkout_date, 
		concat(Ho_va_ten_lot, " ", Ten) as employee_name, 
			sum(So_luong) as product_count, sum(So_luong * Gia_ban) as total_price
	from don_hang, nhan_vien_sieu_thi, thuoc 
	where Ma_khach_hang = "${customer_id}" and thuoc.Ma_don_hang = don_hang.Ma_don_hang and Ma_nhan_vien = Ma_nhan_vien_thu_ngan
    group by don_hang.Ma_don_hang`,
    
    getOrderDetails: (id) => `select * from don_hang, thuoc, hang_hoa
	where thuoc.Ma_hang_hoa = hang_hoa.Ma_hang_hoa 
		and don_hang.Ma_don_hang = "${id}"
		and don_hang.Ma_don_hang = thuoc.Ma_don_hang;`
}

module.exports = orderSQL;