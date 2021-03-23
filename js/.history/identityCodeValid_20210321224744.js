/* 身份证号合法性验证
* ⽀持15位和18位身份证号
* ⽀持地址编码、出⽣⽇期、校验位验证
* @param code
* @returns {*[]} 该函数返回⼀个数组 [true,''] 或 [false,"身份
证号格式错误"]
* @constructor
*/
function identityCodeValid(code) {
  let city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "⼭ ⻄",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "⿊⻰江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江⻄",
    37: "⼭东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "⼴东",
    45: "⼴⻄",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "⻄藏 ",
    61: "陕⻄",
    62: "⽢肃",
    63: "⻘海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "⾹港",
    82: "澳⻔",
    91: "国外 ",
  };
  let tip = "";
  let pass = true;
  if (
    !code ||
    !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/i.test(
      code
    )
  ) {
    tip = "身份证号格式错误";
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  } else {
    //18位身份证需要验证最后⼀位校验位
    if (code.length == 18) {
      code = code.split("");
      //∑(ai×Wi)(mod 11)
      //加权因⼦
      let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      let parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      let ai = 0;
      let wi = 0;
      for (let i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      let last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        tip = "校验位错误,结尾是字⺟请注意⼤⼩写";
        pass = false;
      }
    }
  }
  return [pass, tip];
}
console.log(identityCodeValid("110000198304102033"))