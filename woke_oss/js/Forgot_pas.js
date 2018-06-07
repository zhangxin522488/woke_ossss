//var urltest = 'http://192.168.3.64:8120/';
var urltest = 'http://www.wkdzkj.cn/woke-oss-web/';
$("#now_denglu_zhanghao").click(function() {
	var tel = $("#denglu_use3").val();
	var yanzhneg = $("#denglu_pas3").val();
	if(tel == "") {
		$("#tips").html("手机号不能为空！");
	} else {
		var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
		isok = reg.test(tel);
		if(!isok) {
			$("#tips").html("手机格式不正确");
		} else {
			if(yanzhneg == "") {
				$("#tips").html("验证码不能为空！");
			} else {
				$("#tips").html("");
				var reque = function() {
					return {
						moblieno: tel,
						vercode: yanzhneg
					}
				}
				rq1 = reque();
				var req = function() {
					return {
						requestString: "",
					}
				}
				requestObj1 = req();
				requestObj1.requestString = JSON.stringify(rq1);
				var req3 = JSON.stringify(requestObj1);
				$.ajax({
					contentType: "application/json; charset=utf-8",
					type: "POST",
					url: urltest + 'noverify/staff/validationCode',
					data: req3,
					async: true,
					dataType: "json",
					success: function(msg) {
						console.log(msg);
						if(msg.responseCode == 200) {
							$(".tel_login").show();
							$(".zhang_login").hide();

						} else {
							$('#pas_tip1').html(msg.resoponseDisp);
						}
					},
					error: function() {
						alert("获取信息失败！")
					}

				});
			}
		}
	}

})

var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount; //当前剩余秒数	
//发送验证码
$("#butt_yanzhangma").click(function() {
	var tel = $("#denglu_use3").val();
	if(tel == "") {
		$("#tips").html("手机号不能为空！");
	} else {
		var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
		isok = reg.test(tel);
		if(!isok) {
			$("#tips").html("手机格式不正确");
		} else {
			$("#tips").html("");
			var reque = function() {
				return {
					moblieno: tel,
				}
			}
			rq1 = reque();
			var req = function() {
				return {
					requestString: "",
				}
			}
			requestObj1 = req();
			requestObj1.requestString = JSON.stringify(rq1);
			var req3 = JSON.stringify(requestObj1);
			$.ajax({
				contentType: "application/json; charset=utf-8",
				type: "POST",
				url: urltest + 'noverify/staff/sendPassCode',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						curCount = count;　　 //设置button效果，开始计时
						$("#butt_yanzhangma").attr("disabled", "true");
						$("#butt_yanzhangma").html(curCount + "秒后重新获取");
						InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
					} else {
						alert(msg.resoponseDisp);
					}
				},
				error: function() {
					alert("获取信息失败！")
				}

			});

		}
	}

})
//timer处理函数
function SetRemainTime() {
	if(curCount == 0) {
		window.clearInterval(InterValObj); //停止计时器
		$("#butt_yanzhangma").removeAttr("disabled"); //启用按钮
		$("#butt_yanzhangma").html("重新发送验证码");
	} else {
		curCount--;
		$("#butt_yanzhangma").html(curCount + "秒后重新获取");
	}
};

//最终步骤
$("#now_denglu_tel").click(function() {
	var tel = $("#denglu_use3").val();
	var pass = $('#denglu_use1').val();
	var pass1 = $('#denglu_pas1').val();

	if(pass == "") {
		$("#tips1").html("密码不能为空")
	} else {
		var regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
		isok = regExp.test(pass);
		if(!isok) {
			$("#tips1").html("账号为字母加数字且不少于6位");
		} else {
			if(pass1 != pass) {
				$("#tips1").html("两次密码不一致");
			} else {
				$("#tips1").html("");
				var reque = function() {
					return {
						mobileno: tel,
						loginuserpwd: pass
					}
				}
				rq1 = reque();
				var req = function() {
					return {
						requestString: "",
					}
				}
				requestObj1 = req();
				requestObj1.requestString = JSON.stringify(rq1);
				var req3 = JSON.stringify(requestObj1);
				$.ajax({
					contentType: "application/json; charset=utf-8",
					type: "POST",
					url: urltest + 'noverify/staff/backStaffPassword',
					data: req3,
					async: true,
					dataType: "json",
					success: function(msg) {
						console.log(msg);
						if(msg.responseCode == 200) {
							alert("修改成功!请返回登录页面登录");
							window.location.href = "login.html";
						} else {
							alert(msg.resoponseDisp);
						}
					},
					error: function() {
						alert("获取信息失败！")
					}

				});
			}

		}
	}
})
////验证密码规则或者账号以及长度
//var checkzhanghao = function() {
//	$("#use_tip").html("");
//	var email = $("#denglu_use").val();
//	if(email != "") {
//		var regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
//		isok = regExp.test(email);
//		if(!isok) {
//			$("#use_tip").html("账号为字母加数字且不少于6位");
//			return false;
//		}
//	} else {
//		$("#use_tip").html("账号不能为空！");
//	}
//};