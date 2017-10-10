
window.onload = function(){
	addressInit('cmbProvince', 'cmbCity', 'cmbArea');
    //获取用户名的id
	var username = document.getElementById('username');
    //获取name输入框的盒子
    var username_box = document.getElementById('username_box');
    var name_tips = document.getElementById('name_tips');
    var name_tips_content = document.getElementById('name_tips_content');
    
    //获取手机的id
   	var phone = document.getElementById('phone');
    //获取手机输入框的盒子
    var phone_box = document.getElementById('phone_box');
    var phone_tips = document.getElementById('phone_tips');
    var phone_tips_content = document.getElementById('phone_tips_content');
    
    var province_city = document.getElementById('province_city');
    var province_tips = document.getElementById('province_tips');
    //获取邮箱的盒子
    var mail_box = document.getElementById('mail_box');
    var usermail = document.getElementById('usermail');
    var mail_tips = document.getElementById('mail_tips');

    var remark_text = document.getElementById('remark_text');
    var remark_tips = document.getElementById('remark_tips');
    var submit_content = document.getElementById('submit_content');

    //获取提交成功的id
    var success_submit = document.getElementById('success_submit');
    //获取整个main的id
    var main = document.getElementById('main');
    //获取遮罩层
    var shade = document.getElementById('shade');
    //关闭
    var close = document.getElementById('close');
    //获取点击省和市的id
    var select_province = document.getElementById('select_province');
    var select_city = document.getElementById('select_city');

    //获取实际字数的id
    var word_number = document.getElementById('word_number');
    //点击提交
        submit_content.onclick = function(){
            var value = username.value && phone.value && (cmbProvince.value!='请选择省') && (cmbCity.value!='请选择市')
            && (name_tips.style.visibility == 'hidden') && (phone_tips.style.visibility == 'hidden')
            && (province_tips.style.visibility == "hidden") && (getStyle(mail_tips,'visibility') == 'hidden')
            && (getStyle(remark_tips,'visibility') == 'hidden');
            
            //如何不知道哪一项为true的话 逐一打印
            if(value){
                //console.log('主要数据齐全，可以访问接口')
                $.ajax({
                    url: '/api/franchisee/join',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        franchiseeName: username.value,
                        cellPhone: phone.value,
                        provinceName: cmbProvince.value,
                        cityName: cmbCity.value,
                        emailAddress: usermail.value,
                        remark: remark_text.value
                    }),
                    success: function(data){
                        //console.log(data);
                        if(data.result == 0){
                            username.value = '';
                            phone.value = '';
                            cmbProvince.value = '';
                            cmbCity.value = '';
                            usermail.value = '';
                            remark_text.value = '';
                            window.location.href = 'joins.html';
                        }
                    },
                    fail: function(e){
                        console.log("数据请求失败！");
                    }
                })
            }else{
                checkname();
                checkphone();
                checkProvinceCity();
            }

            
        }

    //失去焦点时，判断用户名
    username.onblur = function(){
        username_box.style.border = '1px solid #ccc';
    	//console.log(username.value);
        checkname();
    }
    //点击用户名时，加一个边框样式
    username_box.onclick = function(){
        username_box.style.border = '1px solid orange';
    }
    //失去焦点时 判断电话号码值是否正确
    phone.onblur = function(){
        phone_box.style.border = '1px solid #ccc';
    	checkphone();
    }
    //点击手机时，加一个边框样式
    phone_box.onclick = function(){
        phone_box.style.border = '1px solid orange';
    }
    //校验邮箱
    usermail.onblur = function(){
        mail_box.style.border = '1px solid #ccc';
        checkmail();
    }
    //点击邮箱时，加一个边框样式
    mail_box.onclick = function(){
        mail_box.style.border = '1px solid orange';
    }
    //校验省
    cmbProvince.onblur = function(){
        province.style.border = '1px solid #ccc';
        checkProvince();
    }
    cmbProvince.onclick = function(){
        province.style.border = '1px solid orange';
    }
    //校验市
    cmbCity.onblur = function(){
        city.style.border = '1px solid #ccc';
        checkCity();
    }
    cmbCity.onclick = function(){
        city.style.border = '1px solid orange';
    }
    //校验备注
    remark_text.onblur = function(){
        remark_text.style.border = '1px solid #ccc';
        checkremark();
    }
    //当输入文字时，字数也随之改变
    remark_text.oninput = function(){
        word_number.innerHTML = remark_text.value.length;
    }
    remark_text.onclick = function() {
        remark_text.style.border = '1px solid orange';
    }
    //js获取属性兼容性问题的处理
    function getStyle(obj,attr){
        //针对IE
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            //非IE
            return window.getComputedStyle(obj,false)[attr];
        }
    }
    //检查用户名
    function checkname(){
        if(username.value){
            if(!(/^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/.test(username.value))){
                name_tips_content.innerHTML = "1-10字符";
                name_tips.style.visibility = "visible";
            }else{
                name_tips.style.visibility = "hidden";
            }
        }else{
            name_tips_content.innerHTML = "用户名不能为空";
            name_tips.style.visibility = "visible";
        }

    }
    //检查手机号码
    function checkphone(){
    	if(phone.value){
            if(!(/^1[34578]\d{9}$/.test(phone.value))){ 
                phone_tips_content.innerHTML = "请输入正确的手机号码";
                phone_tips.style.visibility = "visible";
            }else{
                phone_tips.style.visibility = "hidden";
            }
        }else{
            phone_tips_content.innerHTML = "手机号码不能为空";
            phone_tips.style.visibility = "visible";
        }
    }
    //检查省份
    function checkProvince(){
        if( cmbProvince.value=='请选择省' ){ 
            province_city.innerHTML = "省不能为空";
            province_tips.style.visibility = "visible";
        }else{
            province_tips.style.visibility = "hidden";
        }
    }
    //检查城市
    function checkCity(){
        if( cmbCity.value=='请选择市'){ 
            province_city.innerHTML = "市不能为空";
            province_tips.style.visibility = "visible";
        }else{
            province_tips.style.visibility = "hidden";
        }
    }
    //没有输入省和市会提示
    function checkProvinceCity(){
        if((cmbProvince.value=='请选择省')&&(cmbCity.value=='请选择市')){ 
            province_city.innerHTML = "省和市不能为空";
            province_tips.style.visibility = "visible";
        }else{
            province_tips.style.visibility = "hidden";
        }
    }
    //校验邮箱
    function checkmail(){
        if(!usermail.value){
            console.log("邮箱可以为空");
            mail_tips.style.visibility = "hidden";
        }else{
            if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(usermail.value))){ 
                mail_tips.style.visibility = "visible";
            }else{
                mail_tips.style.visibility = "hidden";
            }
        }
    }
    //限制140个字
    function checkremark(){
        if(remark_text.value.length > 140){
            remark_tips.style.visibility = "visible";
        }else{
            remark_tips.style.visibility = "hidden";
        }
    }

}



