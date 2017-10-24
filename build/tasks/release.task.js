const { exec } = require('child_process');
const readline = require('readline')

let _gulp;

module.exports = function configureGulp(gulp) {  
  
  _gulp = gulp;
  
  gulp.task('release', ['pack-cd'], release);

  function release() {
    return new Promise(createsGitHubRelease);
  }
}

function createsGitHubRelease(resolve, reject) {  

  let currentVersion = require('../../package.json').version
  let gitHubtoken;
  let data = { 
    tag_name: "v" + currentVersion,
    target_commitish: "development",
    name: "v" + currentVersion,
    body: "Release version " + currentVersion,
    draft: false,
    prerelease: false
  }

  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Provide a token for deployment: ', (answer) => {
    try
    {
      gitHubtoken = answer
      rl.close();

      exec(`curl --data '${JSON.stringify(data)}' https://api.github.com/repos/JemsFramework/di/releases?access_token=${gitHubtoken}`,
      (err, stdout, stderr) => {
        if (err) {
          throw err
        }

        console.log(stdout)

        let response = JSON.parse(stdout);

        if (!response.id) {
          throw 'There is not any generated release id in the response.'
        }

        if (!response.upload_url) {
          throw 'There is not any upload url in the response.'
        }

        exec(`curl ${response.upload_url.replace('{?name,label}', `?name=@jems.di.${currentVersion}.zip`)} --data-binary @"./artigacts/@jems.di.${currentVersion}.zip" -H "Authorization: token ${gitHubtoken}" -H "Content-Type: application/octet-stream"`,
        (err, stdout, stderr) => {

          if (err) {
            throw err
          }

          console.log(stdout)

          resolve(_gulp.src('.'))
        });
      });
    } catch (error) {
      reject(error)
    }    
  });
}