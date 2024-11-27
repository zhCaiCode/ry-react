import { request } from '@umijs/max';
import { downLoadXlsx } from '@/utils/downloadfile';

// 查询系统访问记录列表
export async function getLogininforList(params?: API.Monitor.LogininforListParams) {
  return request<API.Monitor.LogininforPageResult>('/api/monitor/logininfor/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    params
  });
}

// 查询系统访问记录详细
export function getLogininfor(infoId: number) {
  return request<API.Monitor.LogininforInfoResult>(`/api/monitor/logininfor/${infoId}`, {
    method: 'GET'
  });
}

// 新增系统访问记录
export async function addLogininfor(params: API.Monitor.Logininfor) {
  return request<API.Result>('/api/monitor/logininfor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// 修改系统访问记录
export async function updateLogininfor(params: API.Monitor.Logininfor) {
  return request<API.Result>('/api/monitor/logininfor', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: params
  });
}

// 删除系统访问记录
export async function removeLogininfor(ids: string) {
  return request<API.Result>(`/api/monitor/logininfor/${ids}`, {
    method: 'DELETE'
  });
}

// 导出系统访问记录
export function exportLogininfor(params?: API.Monitor.LogininforListParams) {
  return downLoadXlsx(`/api/monitor/logininfor/export`, { params }, `logininfor_${new Date().getTime()}.xlsx`);
}

// 解锁用户登录状态
export function unlockLogininfor(userName: string) {
  return request<API.Result>('/api/monitor/logininfor/unlock/' + userName, {
    method: 'get'
  })
}

// 清空登录日志
export function cleanLogininfor() {
  return request<API.Result>('/api/monitor/logininfor/clean', {
    method: 'delete'
  })
}
