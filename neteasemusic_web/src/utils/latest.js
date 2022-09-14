import { ElMessage } from "element-plus";
/**当请求出现错误时，调用该方法 */
export function showError()
{
   ElMessage.error("请求出现错误")
}
/**显示提示信息调用 */
export function  showMessage(message,type) {
  if(type == 'error'){
    ElMessage.error(message)
    return
  }
  ElMessage({
    message: message,
    type: type,
  });
}