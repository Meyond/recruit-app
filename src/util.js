import utility from "utility";

//根据用户类型和信息完整度，返回跳转地址
export function getRedirectPath({ type, avatar }) {
  let url = type === "boss" ? "/boss" : "/genius";
  if (!avatar) {
    url += "info";
  }
  return url;
}

//password重复md5加盐加密
export function md5Pwd(pwd) {
  const salt = "imooc_is_good_3957x8yza6!@#IUHjh~";
  return utility.md5(utility.md5(pwd + salt));
}
