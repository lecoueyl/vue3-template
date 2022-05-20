pipeline {
    agent any
    options {
        timestamps()
    }
    environment {
        ONLINE_SITE = 'https://preview.abyssal.site'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'yarn'
                sh 'yarn build' 
            }
        }
        stage('Deploy') {
            steps {
                dir('/usr/share/nginx') {
                    sh 'rm -rf preview.back'
                    sh 'mv preview preview.back' 
                    sh 'mv ${WORKSPACE}/dist .'
                    sh 'mv dist preview'
                }
            }
        }
    }
    post {
        always {
            emailext body: "View on ${ONLINE_SITE}, See detail at ${BUILD_URL}",
                    recipientProviders: [developers(), requestor()],
                    subject: "Jenkins: ${JOB_NAME} ${GIT_BRANCH} build ${currentBuild.result}",
                    to: 'hongxin.tang@hotmail.com'
        }
    }
}
