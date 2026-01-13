pipeline {
    agent any
    
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
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/a106832411/showChats.git']]
                ])
            }
        }
        
        stage('安装依赖') {
            steps {
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
                // 方式1：使用 PM2 部署
                sh '''
                    npm install -g pm2
                    pm2 delete Chats || true
                    pm2 start ecosystem.config.cjs
                    pm2 save
                '''
            }
        }
        
        stage('健康检查') {
            steps {
                echo '检查服务状态...'
                sh 'pm2 list'
                sh 'sleep 3'
                sh 'pm2 info Chats || true'
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
