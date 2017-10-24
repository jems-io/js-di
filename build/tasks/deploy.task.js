const { exec } = require('child_process');
const readline = require('readline')

let _gulp;

module.exports = function configureGulp(gulp) {  
  
  _gulp = gulp;
  
  gulp.task('deploy', ['distribute-cd'], deploy);

  function deploy() {
    releasePackageInNPM(upgradePackageVersion)    
  }
}

function releasePackageInNPM(successfullyCallback) {
    exec(`npm config set '//registry.npmjs.org/:_authToken' '${process.env.NPM_Token}'`,
      (err, stdout, stderr) => {
        if (err) {
          throw err
        }

        exec(`npm publish`,
          (err, stdout, stderr) => {
            if (err) {
              throw err
            }

            exec(`npm config delete '//registry.npmjs.org/:_authToken'`,
              (err, stdout, stderr) => {
                if (err) {
                  throw err
                }

                console.log(stdout)

                if (successfullyCallback)
                    successfullyCallback();
              });

            console.log(stdout)
          });

        console.log(stdout)
      });
    
}

function upgradePackageVersion() {
    exec(`npm version patch -git-tag-version false && git add package.json && git commit -m "Upgrading version" && git push`,
      (err, stdout, stderr) => {

        console.log(stdout)

        if (err) {
          throw err
        }
      });
}
