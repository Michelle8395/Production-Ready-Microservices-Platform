pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_USERNAME = 'mkangeth'
        BACKEND_IMAGE = "${DOCKER_REGISTRY}/${DOCKER_USERNAME}/myapp-backend:latest"
        FRONTEND_IMAGE = "${DOCKER_REGISTRY}/${DOCKER_USERNAME}/myapp-frontend:latest"
    }
    
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
                sh 'docker build -t ${BACKEND_IMAGE} ./backend'
                sh 'docker build -t ${FRONTEND_IMAGE} ./frontend'
            }
        }
        
        stage('Docker Push') {
            steps {
                echo 'Pushing to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', 
                                                  usernameVariable: 'DOCKER_USER', 
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push ${BACKEND_IMAGE}'
                    sh 'docker push ${FRONTEND_IMAGE}'
                }
            }
        }
        
        stage('Success') {
            steps {
                echo 'Pipeline completed successfully!'
                echo "Images pushed to: ${BACKEND_IMAGE} and ${FRONTEND_IMAGE}"
            }
        }
    }
    
    post {
        failure {
            echo 'Pipeline failed! Check the logs.'
        }
        success {
            echo 'Images published to Docker Hub!'
        }
    }
}