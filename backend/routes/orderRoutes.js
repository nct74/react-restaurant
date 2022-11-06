const router = require("express").Router()
const connection = require("../dbConfig")
const authMiddleware = require("../middleware/authMiddleware")
const orderSQL = require("../SQL/orderSQL")

router.get("/", authMiddleware, (req, res) => {
	if (req.role !== "Customer") res.status(401).send("Invalid customer token")
	else {
		connection.query(orderSQL.getOrders(req.associated_id), function (
			error,
			results,
			fields
		) {
            if (error) throw error
            
            res.json(results)
		})
	}
})

router.get("/:id", authMiddleware, (req, res) => {
	if (req.role !== "Customer") res.status(401).send("Invalid customer token")
	else {
        connection.query(orderSQL.getOrderDetails(req.params.id), function (error, results, fields) {
            if (error) throw error
            
            res.json({
                checkout_date: results[0].Ngay_thanh_toan,
                point: results[0].Diem_thuong,
                payment_method: results[0].Hinh_thuc_thanh_toan,
                
                items: [
                    results.map(res => ({
                        id: res.Ma_hang_hoa,
                        name: res.Ten_hang_hoa,
                        price: res.Gia_ban,
                        amount: res.So_luong
                    }))
                ]
            })
        })
    }
})

module.exports = router
