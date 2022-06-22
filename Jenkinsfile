
pipeline {
    agent any 
    stages {
        stage('build') {
            steps {
                echo 'building the application'
                sh 'python3 golf.py'
                sh 'cat rankings.py'
            }
        }
    }
}