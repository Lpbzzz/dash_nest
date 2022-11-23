import * as fs from 'fs';
import * as path from 'path';

const isProd = process.env.NODE_ENV === 'production';

const parseEnv = () => {
  const localEnv = path.resolve('.env');
  const prodEnv = path.resolve('.env.prod');

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('缺少环境变量配置文件');
  }

  const filePath = isProd ? prodEnv : localEnv;
  return {
    path: filePath,
  };
};

export default parseEnv();
