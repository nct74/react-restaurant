const questionSQL = {
	createCognito: (id, title, content) =>
		`insert into question(question_id, title, content) values ("${id}","${title}", "${content}");`,

	create: (id, title, content, customer_id) =>
		`insert into question(question_id, title, content, customer_id) values ("${id}","${title}", "${content}", "${customer_id}");`,

	getUnansweredQuestions: () =>
		`select question_id, title, content, Ho_va_ten_lot as fname, Ten as lname from question left join khach_hang on customer_id = Ma_khach_hang 
	where answer is null and nhan_vien_cskh_id is null;`,

	getAnsweredQuestions: () =>
		`select question_id, title, content, answer from question where answer is not null;`,

	answerQuestion: (id, answer, employee_id) =>
		`update question set answer = "${answer}", nhan_vien_cskh_id = "${employee_id}" where question_id = "${id}";`,
}

module.exports = questionSQL
