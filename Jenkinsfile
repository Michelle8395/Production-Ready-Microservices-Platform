pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }
        
        stage('Backend Dependencies') {
            steps {
                echo 'Installing backend dependencies...'
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Frontend Build') {
            steps {
                echo 'Building frontend...'
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                echo 'Building Docker images...'
                sh 'docker build -t myapp-backend:latest ./backend'
                sh 'docker build -t myapp-frontend:latest ./frontend'
            }
        }
        
        stage('Success') {
            steps {
                echo '✅ Pipeline completed successfully!'
            }
        }
    }
}
