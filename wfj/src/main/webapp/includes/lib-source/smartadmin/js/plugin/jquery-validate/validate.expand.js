jQuery.validator.addMethod("isNotNum", function(value, element) {
    return this.optional(element) || /[^\d+]/.test(value);
}, "不能是纯数字");

jQuery.validator.addMethod("isNotSpecialChar", function(value, element) {
    return this.optional(element) || /^[\u4e00-\u9fa5A-Za-z\d_-]+$/.test(value);
}, "只能包含汉字字母和数字，_ -");

jQuery.validator.addMethod("isNotPunctuation", function(value, element) {
    return this.optional(element) || /^[\u4e00-\u9fa5A-Za-z\d]+$/.test(value);
}, "只能包含汉字字母和数字");

jQuery.validator.addMethod("isNotNumber", function(value, element) {
    return this.optional(element) || /^[\u4e00-\u9fa5A-Za-z]+$/.test(value);
}, "只能输入中文、英文");

jQuery.validator.addMethod("isJumpUrl", function(value, element) {
    return this.optional(element) || /^[A-Za-z\.\/&:\?=\d]+$/.test(value);
}, "只能包含字母和数字,./");

jQuery.validator.addMethod("isPhoneNum", function(value, element) {
    return this.optional(element) || /^(\(\d{3,4}-\)|\d{3,4}-)?\d{7,8}$/.test(value);
}, "请输入固定电话号码，例如:'XXX-XXXXXXXX'");

jQuery.validator.addMethod("isMobilPhoneNum", function(value, element) {
    return this.optional(element) || /^(13[0-9]|14[5|7]|17[0|6|7|8]|15[0-9]|18[0-9])\d{8}$/.test(value);
}, "请输入正确的手机号码");

jQuery.validator.addMethod("isPhoneNo", function(value, element) {
    return this.optional(element) || /^\d{3}-\d{8}(\-[0-9]{1,4})?$|^\d{4}-\d{7}(\-[0-9]{1,4})?$|^(13[0-9]|14[5|7]|15[0-9]|18[0-9]|17[0|6|7|8])\d{8}$/.test(value);
}, "请输入正确的手机或固话号码，固话例如:'XXX-XXXXXXXX'");

jQuery.validator.addMethod("isAllPhoneNo", function(value, element) {
    return this.optional(element) || /^\d{3}-\d{8}(\-[0-9]{1,4})?$|^400-\d{3}-\d{4}$|^800-\d{3}-\d{4}$|^\d{4}-\d{7}(\-[0-9]{1,4})?$|^(13[0-9]|14[5|7]|15[0-9]|18[0-9]|17[0|6|7|8])\d{8}$/.test(value);
}, "请输入正确的手机或固话号或服务电话，固话例如:'XXX-XXXXXXXX'");

jQuery.validator.addMethod("isGB18030", function(value, element) {
    return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);
}, "只能输入汉字");

jQuery.validator.addMethod("noGB18030", function(value, element) {
    return this.optional(element) || /^[^\u4e00-\u9fa5]{0,}$/.test(value);
}, "不能输入汉字");

jQuery.validator.addMethod("isLetterAndNum", function(value, element) {
    return this.optional(element) || /^[A-Za-z0-9]+$/.test(value);
}, "只能输入英文和数字");

jQuery.validator.addMethod("isSymbolAndLetter", function(value, element) {
    return this.optional(element) ||  /^[A-Za-z\-\/\d]+$/.test(value);
}, "只能输入英文,数字,-/");

jQuery.validator.addMethod("isBigAndNum", function(value, element) {
    return this.optional(element) || /^[A-Z0-9]+$/.test(value);
}, "只能输入英文大写和数字");

jQuery.validator.addMethod("isLetters", function(value, element) {
    return this.optional(element) || /^[A-Za-z]+$/.test(value);
}, "只能输入英文");

jQuery.validator.addMethod("isUppercase", function(value, element) {
    return this.optional(element) || /^[A-Z]+$/.test(value);
}, "只能输入英文大写");

jQuery.validator.addMethod("isLowercase", function(value, element) {
    return this.optional(element) || /^[a-z]+$/.test(value);
}, "只能输入英文小写");

jQuery.validator.addMethod("isAccountName", function(value, element) {
    return this.optional(element) || /^[\u4e00-\u9fa5A-Za-z\d_]+$/.test(value);
}, "只能输入中文、英文、数字或者下划线");

jQuery.validator.addMethod("isUserName", function(value, element) {
    return this.optional(element) || /^[\u4e00-\u9fa5A-Za-z]{0,10}$/.test(value);
}, "只能输入中文、英文(长度在0~10之间)");

jQuery.validator.addMethod("isAddr", function(value, element) {
    return this.optional(element) || /^[\u4e00-\u9fa5A-Za-z\d-]+$/.test(value);
}, "只能输入中文、英文、数字 -");

jQuery.validator.addMethod("isBusinessNo", function(value, element) {
    return this.optional(element) || /^[A-Za-z\d_]+$/.test(value);
}, "只能输入字母、数字或者下划线");

jQuery.validator.addMethod("isNumber", function(value, element) {
    return this.optional(element) || /^[\d]+$/.test(value);
}, "只能输入数字");

jQuery.validator.addMethod("isInt", function(value, element) {
    return this.optional(element) || /^[1-9]\d*|-[1-9]\d*|0$/.test(value);
}, "只能输入整数");
jQuery.validator.addMethod("isPosInt", function(value, element) {
    return this.optional(element) || /^[1-9]\d*$/.test(value);
}, "只能输入正整数");
// 非负浮点数：^\d+(\.\d+)?$ 或 ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$
// 非正浮点数：^((-\d+(\.\d+)?)|(0+(\.0+)?))$ 或 ^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$
// 正浮点数：^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$ 或 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
// 负浮点数：^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$ 或 ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
// 浮点数：^(-?\d+)(\.\d+)?$ 或 ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$
jQuery.validator.addMethod("isInternetUrl", function(value, element) {
    return this.optional(element) || /^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$|^https:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(value);
}, "请输入正确的网址");

jQuery.validator.addMethod("isIdentification", function(value, element) {
    return this.optional(element) || /^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$/.test(value);
}, "请输入合法的身份证号码");

jQuery.validator.addMethod("isEmail", function(value, element) {
    return this.optional(element) || /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value);
}, "请输入合法的Email");

jQuery.validator.addMethod("isQQ", function(value, element) {
    return this.optional(element) || /^[1-9][0-9]{4,}$/.test(value);
}, "请输入合法的QQ");


jQuery.validator.addMethod("isPassword", function(value, element) {
    return this.optional(element) || /^[a-zA-Z]\w{5,19}$/.test(value);
}, "密码非法(以字母开头，长度在6~20之间，只能包含字母、数字和下划线)");

jQuery.validator.addMethod("isValideChar", function(value, element) {
    return this.optional(element) || /^[a-zA-Z0-9_]{5,20}$/.test(value);
}, "非法输入(长度在5~20之间，只能包含字母、数字和下划线)");

jQuery.validator.addMethod("isStrongPassword", function(value, element) {
    return this.optional(element) || /^.{8,16}[^\u4e00-\u9fa5]$/.test(value);
}, "密码非法(必须包含大小写字母和数字和特殊字符，长度在8-16之间))");
jQuery.validator.addMethod("isLicense", function(value, element) {
    return this.optional(element) || /^\d{15}$/.test(value);
}, "只能输入15位数字");
/*jQuery.validator.addMethod("isMoney", function(value, element) {
    return this.optional(element) || /^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/.test(value);
}, "不是合法的金额");*/
jQuery.validator.addMethod("isMoney", function(value, element) {
    return this.optional(element) || /^([1-9][0-9]{0,7})((\.([0-9]{1,2}))?)$|^[0](\.([1-9]|([0-9][1-9])))$/.test(value);
}, "不是合法的金额");
jQuery.validator.addMethod("gt", function(value, element,param) {
    return Number(value) > Number($(param).val());
}, "不是合法的金额");
jQuery.validator.addMethod("coordinates",function(value,element){
    return this.optional(element) || /^([7-9]\d|1[0-3]\d|140)\.\d{3,6},[1-6]\d\.\d{3,6}$/.test(value);
},'坐标格式不正确');

jQuery.validator.addMethod("accountNumber",function(value,element){//银行账号正则
    return this.optional(element) || /^\d{16,19}$/.test(value);
},'账号格式不正确');

jQuery.validator.addMethod("sureNumber",function(value,element){//保险账号正则
    return this.optional(element) || /^(\d{4}\s{1}){3}\d{4}$/.test(value);
},'账号格式不正确');

jQuery.validator.addMethod("zhifubaoAccount",function(value,element){//支付宝账号正则 邮箱或手机号
    return this.optional(element) || /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$|^(13[0-9]|14[5|7]|17[0|6|7|8]|15[0-9]|18[0-9])\d{8}$/.test(value);
},'收款人格式不正确');

$.validator.addMethod("ckeditorRequired", function(value) {//验证ckeditor富文本编辑框是否为空
    return (value.replace(/"/g,"'").replace(/[\r\n\t]/g,'') != "<p>&shy;</p>") && (value.replace(/"/g,"'").replace(/[\r\n\t]/g,'') != "");
}, '不能为空！');

$.validator.addMethod("summernoteRequired", function(value) {//验证summernote富文本编辑框是否为空
    return (value.replace(/"/g,"'").replace(/[\r\n\t]/g,'') != "<br>") && (value.replace(/"/g,"'").replace(/[\r\n\t]/g,'') != "");
}, '不能为空！');