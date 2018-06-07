var urltest = 'http://www.wkdzkj.cn/woke-oss-web/';
//var urltest = 'http://192.168.3.137:8120/';
var img_src = 'http://www.wkdzkj.cn/pic';
sessionStorage.setItem("urltest", urltest);
sessionStorage.setItem("img_src", img_src);
//var img_src = sessionStorage.getItem("img_src");
// alert(img_src);
var checkuse = function() {
	document.getElementById("use_tip").innerHTML = "";
	var email = eval(document.getElementById('denglu_use')).value;
	if(email == "") {
		document.getElementById("use_tip").innerHTML = "账号不能为空！";
	}
}
var checkpas = function() {
	document.getElementById("pas_tip").innerHTML = "";
	var name = eval(document.getElementById('denglu_pas')).value;
	if(name == "") {
		document.getElementById("pas_tip").innerHTML = "密码不能为空！";
	}
}
//账号登录
$("#now_denglu_zhanghao").click(function() {
	console.log(urltest)
	var loginusername = $("#denglu_use").val();
	var loginuserpwd = $("#denglu_pas").val();
	var use_tips = $('#use_tip').html();
	var pas_tip = $('#pas_tip').html();
	if(use_tips == "" && pas_tip == "" && loginusername != "" && loginuserpwd != "") {
		$("#now_denglu_zhanghao").button('loading').delay(100).queue(function() {
			var logintype = "1";
			var mobileno = '';
			var userId = "";
			var reque = function() {
				return {
					loginusername: loginusername,
					loginuserpwd: loginuserpwd,
					mobileno: mobileno,
					logintype: logintype
				}
			}
			rq1 = reque();
			var req = function() {
				return {
					requestString: "",
					userId: userId,
				}
			}
			requestObj1 = req();
			requestObj1.requestString = JSON.stringify(rq1);
			var req3 = JSON.stringify(requestObj1);

			$.ajax({
				contentType: "application/json; charset=utf-8",
				type: "POST",
				url: urltest + 'noverify/staff/staffLogin',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);
					if(msg.responseCode == 200) {
						var msgg = JSON.parse(msg.returnString);
						console.log(msgg);
						var userName = msgg.username;
						var userId = msgg.id;
						var userkind = msgg.userkind;
						//					$('#pas_tip').html(msg.resoponseDisp);
						sessionStorage.setItem("userId", userId);
						sessionStorage.setItem("userName", userName);
						sessionStorage.setItem("userkind", userkind);

						window.location.href = "index.html";
					} else {
						//						debugger
						$('#pas_tip').html(msg.resoponseDisp);
						$("#now_denglu_zhanghao").button('reset');
						console.log(this);
						$("#now_denglu_zhanghao").dequeue();
					}
				},
				error: function() {
					alert("获取信息失败！")
					$(".zhezhao").css("display", "none");
					$("#now_denglu_zhanghao").button('reset');
					$("#now_denglu_zhanghao").dequeue();
				}
			});
		});
	} else {
		$("#pas_tip").html("请按照提示填写正确的账号密码！")
	}

})

function qingqiu() {
	var loginusername = $("#denglu_use").val();
	var loginuserpwd = $("#denglu_pas").val();
	var use_tips = $('#use_tip').html();
	var pas_tip = $('#pas_tip').html();

}

//手机号登录

$("#now_denglu_tel").click(function() {
	var mobileno = $("#denglu_use1").val();
	var loginuserpwd = $("#denglu_pas1").val();
	var use_tips1 = $('#use_tip1').html();
	var pas_tip1 = $('#pas_tip1').html();
	if(use_tips1 == "" && pas_tip1 == "" && mobileno != "" && loginuserpwd != "") {
		$("#now_denglu_tel").button('loading').delay(100).queue(function() {
			var logintype = "2";
			var loginusername = '';
			var userId = "";
			var reque = function() {
				return {
					loginusername: loginusername,
					loginuserpwd: loginuserpwd,
					mobileno: mobileno,
					logintype: logintype
				}
			}
			rq1 = reque();
			var req = function() {
				return {
					requestString: "",
					userId: userId,
				}
			}
			requestObj1 = req();
			requestObj1.requestString = JSON.stringify(rq1);
			var req3 = JSON.stringify(requestObj1);
			$.ajax({
				contentType: "application/json; charset=utf-8",
				type: "POST",
				url: urltest + 'noverify/staff/staffLogin',
				data: req3,
				async: true,
				dataType: "json",
				success: function(msg) {
					console.log(msg);

					if(msg.responseCode == 200) {
						var msgg = JSON.parse(msg.returnString);
						console.log(msgg);
						var userName = msgg.username;
						var userId = msgg.id;
						var userkind = msgg.userkind;
						//					$('#pas_tip1').html(msg.resoponseDisp);
						sessionStorage.setItem("userId", userId);
						sessionStorage.setItem("userName", userName);
						sessionStorage.setItem("userkind", userkind);
						window.location.href = "index.html";
					} else {
						$('#pas_tip1').html(msg.resoponseDisp);
						$("#now_denglu_tel").button('reset');
						$("#now_denglu_tel").dequeue();
						//	                		$("#jiechu_xiayi").removeAttr("disabled");//请求返回值不是200,启用按钮
					}
				},
				error: function() {
					//			        	$("#pas_tip").removeAttr("disabled");//,启用按钮
					alert("获取信息失败！")
					$("#now_denglu_tel").button('reset');
					$("#now_denglu_tel").dequeue();
				}

			});
		})

	} else {
		$("#pas_tip1").html("请按照提示填写正确的账号密码！")
	}

})

$(".login ul li").click(function() {
	var hh = $(this).html();
	$(this).attr("class", "te_li");
	$(this).siblings().attr("class", "");
	if(hh == "账号登录") {
		$(".zhang_login").css("display", "block");
		$(".tel_login").css("display", "none");

	} else {
		$(".zhang_login").css("display", "none");
		$(".tel_login").css("display", "block");

	}

})

//验证密码规则或者账号以及长度
var checkzhanghao = function() {
	$("#use_tip").html("");
	var email = $("#denglu_use").val();
	if(email != "") {
		var regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
		isok = regExp.test(email);
		if(!isok) {
			$("#use_tip").html("账号为字母加数字且不少于6位");
			return false;
		}
	} else {
		$("#use_tip").html("账号不能为空！");
	}
};
//验证 密码是否为空
var checkpas = function() {
	$("#pas_tip").html("");
	var email = $("#denglu_pas").val();
	if(email != "") {
		if(email.length < 6) {
			$("#pas_tip").html("密码长度不少于6位！");
		}
	} else {
		$("#pas_tip").html("密码不能为空！");
	}
};
//验证手机号码
var checktel = function() {
	$("#use_tip1").html("");
	var shouji = $("#denglu_use1").val();
	if(shouji != "") {
		var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
		isok = reg.test(shouji);
		if(!isok) {
			$("#use_tip1").html("手机格式不正确");
			return false;
		}
	} else {
		$("#use_tip1").html("手机号不能为空！");
	}
};

//验证 密码是否为空
var checkpas1 = function() {
	$("#pas_tip1").html("");
	var email = $("#denglu_pas1").val();
	if(email != "") {
		if(email.length < 6) {
			$("#pas_tip1").html("密码长度不少于6位！");
		}
	} else {
		$("#pas_tip1").html("密码不能为空！");
	}
};