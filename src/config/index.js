/**
 * build: 线上使用
 * dev: qa环境
 * sandbox: sandbox环境
 * local: 本地调试
 */


export default {
  server: {
    build: 'https://api.tiejin.cn/command/',
    dev: 'https://api-sandbox.tiejin.cn/command/',
  }
}