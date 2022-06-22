
pipeline {
    agent any 
    stages {
        stage('build') {
            steps {
                echo 'Getting rankins and leaderboard'
                sh 'python3 golf.py'
                
            }
        }
        stage('run') {
            steps {
                echo 'running the program'
                sh '''/usr/bin/env /Library/Java/JavaVirtualMachines/adoptopenjdk-11.jdk/Contents/Home/bin/java -Dfile.encoding=UTF-8 @/var/folders/ch/sxhxbs9565x95rpfg11fq3y00000gn/T/cp_73f7ocnrbxrm80wjnsizx1rff.argfile Data'''
                sh 'y'
            }
        }
    }
}