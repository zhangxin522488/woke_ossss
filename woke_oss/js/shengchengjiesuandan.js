var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");

$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	}
});

//选择商户性质
$("#scdd_shxz").change(function() {
	var scdd_shxz = $("#scdd_shxz").val();
	if(scdd_shxz == "1") {
		$(".li_wuyemingcheng").show();
		$(".li_shanghumingcheng").hide();
		//展示物业名称
		wuye_name();
	} else if(scdd_shxz == "2") {
		$(".li_wuyemingcheng").hide();
		$(".li_shanghumingcheng").show();
		fuwushang_name();
	}
})

//加载物业名称
function wuye_name(data) {
	var parentid = data;
	var reque = function() {
		return {
			parentid: parentid,
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
	var req3 = JSON.stringify(requestObj1);
	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: "POST",
		url: urltest + 'verify/property/selectOrganizeNameList',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				console.log(msg.returnString);
				var bb = JSON.parse(msg.returnString);
				//				var str = "";
				var str = '<option value="0">' + "请选择物业名称" + '</option>';
				for(var i = 0; i < bb.length; i++) {
					str += "<option value=" + bb[i].organizeid + ">" + bb[i].shortname + "</option>";
				}
				$("#scdd_wymc").html("");
				$("#scdd_wymc").append(str);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
}

//加载服务商名字
function fuwushang_name(data) {
	var parentid = data;
	var reque = function() {
		return {
			parentid: parentid,
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
	var req3 = JSON.stringify(requestObj1);

	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: "POST",
		url: urltest + 'verify/coupon/selectAllMerchantName',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				console.log(msg.returnString);
				var bb = JSON.parse(msg.returnString);
				//				var str = "";
				var str = '<option value="0">' + "请选择服务商名称" + '</option>';
				for(var i = 0; i < bb.length; i++) {
					str += "<option value=" + bb[i].id + ">" + bb[i].mname + "</option>";
				}
				$("#scdd_shmc").html("");
				$("#scdd_shmc").append(str);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
}

$(".sure_shengcheng").click(function() {
	debugger
	var scdd_shxz = $("#scdd_shxz").val();
	var merchantid = "";
	var merchantname = '';
	if(scdd_shxz == "1") {
		merchantid = $("#scdd_wymc").val();
		merchantname = $("#scdd_wymc option:selected").text()
	} else if(scdd_shxz == "2") {
		merchantid = $("#scdd_shmc").val();
		merchantname = $("#scdd_shmc option:selected").text()
	}
	var summary = $("#scdd_zhaiyao").val();
	var endday = $(".input_2").val();
	if(endday == "") {
		alert("请选择截止日期");
	} else {
		if(scdd_shxz == "") {
			alert("请选择商户性质")
		} else {
			if(merchantid == "0") {
				alert("请选择公司名字");
			} else {
				if(scdd_shxz == "") {
					alert("请填写备注")
				} else {
					var reque = function() {
						return {
							endday: endday,
							merchantkind: scdd_shxz,
							merchantid: merchantid,
							merchantname: merchantname,
							summary: summary,
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
					var req3 = JSON.stringify(requestObj1);

					$.ajax({
						contentType: "application/json; charset=utf-8",
						type: "POST",
						url: urltest + 'verify/financial/addSettlementOrder',
						data: req3,
						async: true,
						dataType: "json",
						success: function(msg) {
							console.log(msg);
							if(msg.responseCode == 200) {
								alert("结算单生成成功");
								location.href = "jiesuanliebiao.html"
							} else {
								alert(msg.resoponseDisp)
							}
						},
						error: function() {
							alert("获取信息失败");
						}
					});
				}
			}
		}
	}

})