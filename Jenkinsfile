pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'  // 这里的名称需要与 Jenkins 中配置的 NodeJS 工具名称一致
    }
    
    environment {
        NODE_VERSION = '18'
        BUILD_DIR = 'dist'
        PORT = '3000'
    }
    
    stages {
        stage('检出代码') {
            steps {
                echo '检出代码...'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/master']],
                    userRemoteConfigs: [[url: 'https://gitee.com/sam23333/showchats.git']]
                ])
            }
        }
        
        stage('安装依赖') {
            steps {
                echo '检查 Node 版本...'
                sh 'node -v'
                sh 'npm -v'
                
                echo '安装 pnpm...'
                sh 'npm install -g pnpm'
                
                echo '安装项目依赖...'
                sh 'pnpm install'
            }
        }
        
        stage('构建项目') {
            steps {
                echo '开始构建...'
                sh 'pnpm run build'
            }
        }
        
        stage('部署') {
            steps {
                echo '部署到服务器...'
                sh '''
                    # 停止并删除旧容器
                    docker stop showchats || true
                    docker rm showchats || true
                    
                    # 构建新镜像
                    docker build -t showchats:latest .
                    
                    # 运行新容器
                    docker run -d --name showchats \
                        -p 3000:3000 \
                        --restart unless-stopped \
                        showchats:latest
                '''
            }
        }
        
        stage('健康检查') {
            steps {
                echo '检查服务状态...'
                sh 'docker ps | grep showchats'
                sh 'sleep 5'
                sh 'curl -I http://localhost:3000 || echo "服务启动中..."'
            }
        }
    }
    
    post {
        success {
            echo '✅ 部署成功！'
            echo '服务地址: http://服务器IP:3000'
        }
        failure {
            echo '❌ 部署失败！'
            sh 'pm2 logs Chats --lines 30 || true'
        }
        always {
            echo '清理完成'
        }
    }
}
