import { request } from '@umijs/max';
import { downLoadXlsx } from '@/utils/downloadfile';

// 查询操作日志记录列表
export async function getOperlogList(params?: API.Monitor.OperlogListParams) {
  return request<API.Monitor.OperlogPageResult>('/api/monitor/operlog/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    params
  });
}

// 查询操作日志记录详细
export function getOperlog(operId: number) {
  return request<API.Monitor.OperlogInfoResult>(`/api/monitor/operlog/${operId}`, {
    method: 'GET'
  });
}

// 新增操作日志记录
export async function addOperlog(params: API.Monitor.Operlog) {
  return request<API.Result>('/api/monitor/operlog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// 修改操作日志记录
export async function updateOperlog(params: API.Monitor.Operlog) {
  return request<API.Result>('/api/monitor/operlog', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// 删除操作日志记录
export async function removeOperlog(ids: string) {
  return request<API.Result>(`/api/monitor/operlog/${ids}`, {
    method: 'DELETE'
  });
}

export async function cleanAllOperlog() {
  return request<API.Result>(`/api/monitor/operlog/clean`, {
    method: 'DELETE'
  });
}

// 导出操作日志记录
export function exportOperlog(params?: API.Monitor.OperlogListParams) {
  return downLoadXlsx(`/api/monitor/operlog/export`, { params }, `operlog_${new Date().getTime()}.xlsx`);
}
