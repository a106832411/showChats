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
                checkout scm
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
                
                // 方式2：或者复制构建产物到 Nginx 目录
                // sh 'cp -r dist/* /var/www/html/'
            }
        }
        
        stage('健康检查') {
            steps {
                echo '检查服务状态...'
                sh 'pm2 list'
                sh 'sleep 5'
                sh 'curl -f http://localhost:3000 || exit 1'
            }
        }
    }
    
    post {
        success {
            echo '部署成功！'
        }
        failure {
            echo '部署失败，回滚...'
            sh 'pm2 delete Chats || true'
        }
        always {
            echo '清理工作空间...'
            cleanWs()
        }
    }
}
