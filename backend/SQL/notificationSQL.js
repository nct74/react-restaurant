const notificationSQL = {
	getNotification: (
		id
	) => `select Noi_dung as notification from tu_van, thong_bao_thong_tin 
    where tu_van.Ma_thong_bao = thong_bao_thong_tin.Ma_thong_bao and Ma_khach_hang = "${id}"`,

	create: (
		id,
		customer_id,
		employee_id,
		date,
		content
	) => `call createNotification("${customer_id}", "${employee_id}", "${id}", "${date}", "${date}");`,
}

module.exports = notificationSQL
