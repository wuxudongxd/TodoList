/**
 * @description: 导入Mysql 模块, 用于连接mysql数据库
 * @param: pool: 创建Mysql 连接池, dbConfig: 导入数据库配置
 */
import mysql from "mysql";
import dbConfig from "./config";

const pool = mysql.createPool(dbConfig);

/**
 * @description:创建Mysql连接池,执行sql语句
 * @param sql: 传入sql语句
 * @variation: reject: 捕获对象 ,resolve: 成功后执行
 */
const query = (sql: string) => {
  return new Promise<any>((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        connection.query(sql, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
          connection.release();
        });
      }
    });
  });
};

/**
 * @exports: 导出模块
 */
export default query;
