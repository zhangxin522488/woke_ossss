var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
//var urltest = getIP();
var fullname = sessionStorage.getItem("fullname");

$('.my_feilei ul li button').click(function() {
	$(this).attr("class", "btn btn-primary");
	$(this).siblings().attr("class", "btn btn-info");
});
$(function() {
	if(userId == "" || userId == undefined || userId == null) {
//		alert("请登陆之后再操作");
		top.location.href = "login.html";
	} else {
		userId = userId;
		$("#open_fun").hide();
		$("#close_fun").show();
		var yuanGong_id = sessionStorage.getItem("yuanGong_id")

		var reque = function() {
			return {
				userid: yuanGong_id
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
			url: urltest + 'verify/staff/selectStaffPer',
			data: req3,
			async: false,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg);
					var msgg = JSON.parse(msg.returnString);
					create_checkbox1(msgg);
				} else {
					alert(msg.resoponseDisp)
				}
			},
			error: function() {
				alert("获取信息失败");
			}
		});
	}

});
$("#tebutt").click(function() {
	$("#open_fun").hide();
	$("#close_fun").show();
	var yuanGong_id = sessionStorage.getItem("yuanGong_id")

	var reque = function() {
		return {
			userid: yuanGong_id
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
		url: urltest + 'verify/staff/selectStaffPer',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				var msgg = JSON.parse(msg.returnString);
				create_checkbox1(msgg);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
})
$("#tebutt_2").click(function() {
	$("#open_fun").show();
	$("#close_fun").hide();

	var yuanGong_id = sessionStorage.getItem("yuanGong_id")

	var reque = function() {
		return {
			userid: yuanGong_id
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
		url: urltest + 'verify/staff/selectStaffNotOpenPer',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				var msgg = JSON.parse(msg.returnString);
				create_checkbox(msgg);
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
})

function show() {
	var strIds = new Array();
	$("input[name=check1]").each(function(i, d) {
		if(d.checked) {
			strIds.push(d.value);
		}
	})
	//	if(strIds.length < 1) {
	//		alert("您没有选中功能!");
	//	} else {
	////		var ids = strIds.join(",");
	////		alert("你选中的字符串有：" + ids);
	//	}
	return strIds;
}

function create_checkbox(msg) {
	$(".main_yikaitong").html("");
	var str = "";
	for(var i = 0; i < msg.length; i++) {
		str = str + '<div class="checkbox">' +
			'<label><input type="checkbox" name="check1"  value="' + msg[i].moduleid + '">' + msg[i].fullname + '</label>' +
			'</div>';
	}
	$(".main_yikaitong").html(str);
}

function create_checkbox1(msg) {
	$(".main_yikaitong").html("");
	var str = "";
	for(var i = 0; i < msg.length; i++) {
		str = str + '<div class="checkbox">' +
			'<label><input type="checkbox" name="check1"  value="' + msg[i].id + '">' + msg[i].fullname + '</label>' +
			'</div>';
	}
	$(".main_yikaitong").html(str);
}

//批量开通功能权限
$("#open_fun").click(function() {
	var pp = show();
	console.log(pp);
	var yuanGong_id = sessionStorage.getItem("yuanGong_id")

	var reque = function() {
		return {
			userid: yuanGong_id,
			moduleids: pp
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
		url: urltest + 'verify/staff/addStaffPer',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				alert("已成功开通此员工权限");
				location.href = "quanxian_settings.html";
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
})
//批量关闭功能权限
$("#close_fun").click(function() {
	var pp = show();
	console.log(pp);
	var yuanGong_id = sessionStorage.getItem("yuanGong_id")

	var reque = function() {
		return {
			userid: yuanGong_id,
			ids: pp
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
		url: urltest + 'verify/staff/deleteStaffPer',
		data: req3,
		async: true,
		dataType: "json",
		success: function(msg) {
			console.log(msg);
			if(msg.responseCode == 200) {
				console.log(msg);
				alert("已成功关闭此员工权限");
				location.href = "quanxian_settings.html";
			} else {
				alert(msg.resoponseDisp)
			}
		},
		error: function() {
			alert("获取信息失败");
		}
	});
})