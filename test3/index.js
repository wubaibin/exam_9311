// 判断身份证是否正确
function validateIdCard(idCard) {
  const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  if (!regIdCard.test(idCard)) {
    return false;
  }
  if (idCard.length == 18) {
    const idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    const idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
    let idCardWiSum = 0;
    for (let i = 0; i < 17; i++) {
      idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
    }
    const idCardMod = idCardWiSum % 11;
    const idCardLast = idCard.substring(17);
    if (idCardMod == 2) {
      if (idCardLast == "X" || idCardLast == "x") {
        return true;
      }
      return false;
    }
    if (idCardLast == idCardY[idCardMod]) {
      return true;
    }
    return false;
  }
}

// 判断手机号是否正确
function tel(val) {
  const regular = /^1[3-9]\d{9}$/
  if (!regular.test(val)) {
    return false;
  }
  return true;

}
// 判断邮箱是否正确
function email(val) {
  const regular = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  if (!regular.test(val)) {
    return false;
  }
  return true;
}
// 判断车牌号
function carid(val) {
  const regular = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(str);
  if (!regular.test(val)) {
    return false;
  }
  return true;
}

export {
  validateIdCard,
  tel,
  email,
  carid
}