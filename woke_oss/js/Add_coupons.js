var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");
var userName = sessionStorage.getItem("userName");
var req3="";
$('#add_quan_tijiao').click(function() {
	//	debugger
	$('#add_quan_tijiao').attr("disabled", true);
	$('#add_quan_tijiao').text("加载中....");

	var couponname = $('#quan_name').val();
	var coupontype = $('#quan_type').val();
	var minamt = $('#quan_manjian_jine').val();
	var eachamt = $('#quan_meizhnag_j').val();
	var grantqty = $('#quan_zhangshu').val();
	var grantway = $('#quan_tujing').val();
	var giveupamt = $('#quan_qie').val();
	var summary = $('#quan_zhaiyao').val();
	var createuser = userId;
	var CreateUserName = userName;
	var begdate = $('.input_1').val();
	var enddate = $('.input_2').val();
	var launchdate = $('.input_3').val();
	if(couponname == "" || coupontype == "" || minamt == "" || eachamt == "" || grantqty == "" || grantway == "" || giveupamt == "" ||
		summary == "" || createuser == "" || CreateUserName == "" || begdate == "" || enddate == "" || launchdate == "") {
		alert("当前有尚未填写的内容，添加优惠券的每项内容都为必填，请仔细填写。")
		$("#add_quan_tijiao").removeAttr("disabled");
		$('#add_quan_tijiao').text("提交");
	} else {
		var reque = function() {
			return {
				couponname: couponname,
				coupontype: coupontype,
				minamt: minamt,
				eachamt: eachamt,
				grantqty: grantqty,
				grantway: grantway,
				giveupamt: giveupamt,
				summary: summary,
				createuser: createuser,
				createusername: CreateUserName,
				begdate: begdate,
				enddate: enddate,
				launchdate: launchdate,
			}
		}
		rq1 = reque();
		var req = function() {
			return {
				requestString: "",
				userId: userId,
				fullname: fullname
			}
		}
		requestObj1 = req();
		requestObj1.requestString = JSON.stringify(rq1);
		req3 = JSON.stringify(requestObj1);
		setTimeout("startRequest()", 100);
	}
})
function startRequest() {
	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: "POST",
		url: urltest + 'verify/coupon/addFinanceCouponBills',
		data: req3,
		async: true,
		dataType: "json",
		beforeSend: function() {
			$("#showResult").show();
		},
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				alert("添加成功");
				window.location.href = "Coupon_quan.html";
			} else {
				alert(msg.resoponseDisp);
				$("#add_quan_tijiao").removeAttr("disabled");
				$('#add_quan_tijiao').text("提交");
			}
		},
		error: function() {
			alert("获取信息失败");
			$("#add_quan_tijiao").removeAttr("disabled");
			$('#add_quan_tijiao').text("提交");
		}
	});
}