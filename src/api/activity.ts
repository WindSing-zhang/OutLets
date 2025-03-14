import request from '../utils/request'

export const activityApi = {
  // 获取当前活动信息
  getActivityInfo() {
    return request({
      url: '/v1/activity',
      method: 'get'
    })
  },

  //获取任务信息
  getTaskInfo() {
    return request({
      url: '/v1/growth/tasks',
      method: 'get'
    })
  },

  //获取每日题目
  getDailyQuestions() {
    return request({
      url: '/v1/questions/daily/date',
      method: 'get'
    })
  },

  //提交答案
  submitAnswer(data: any) {
    return request({
      url: '/v1/questions/batch-answer',
      method: 'post',
      data
    })
  }
}
