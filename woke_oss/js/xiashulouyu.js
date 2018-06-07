var urltest = sessionStorage.getItem("urltest");
var userId = sessionStorage.getItem("userId");
var fullname = sessionStorage.getItem("fullname");
var areaid = sessionStorage.getItem("areaid");
$(function() {
	if(userId == "" || userId == undefined || userId == null) {
		top.location.href = "login.html";
	} else {

		userId = userId;
		var pageNumber = "1";
		var pageSize = "13";
		var selectinfo = "";
		var reque = function() {
			return {
				areaid: areaid,
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
			url: urltest + 'verify/property/selectBuildList',
			data: req3,
			async: false,
			dataType: "json",
			success: function(msg) {
				console.log(msg);
				if(msg.responseCode == 200) {
					console.log(msg.returnString);
					var bb = JSON.parse(msg.returnString);
					//				var str = "";
					var str = '<option value="0">' + "请选择下属楼宇" + '</option>';
					for(var i = 0; i < bb.length; i++) {
						str += "<option value=" + bb[i].id + ">" + bb[i].buildname + "</option>";
					}
					$("#xiashulouyu_se").html("");
					$("#xiashulouyu_se").append(str);

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
