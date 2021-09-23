Clone repository locally (use your Bitbucket nickname instead of 'your-nick-name').

Go to kx-frontend-2 root directory and run ‘npm install’ in console.

If you don’t have Amplify, install ‘npm install -g @aws-amplify/cli’. If you use MacOS add sudo like ‘sudo npm install -g @aws-amplify/cli’.

Run ‘amplify init’ and enter Access ID Key, Secret access key.

In AuthNavbar.js change in localUrl from {deploymentRedirect} to {localRedirect}.

Run ‘amplify pull’. Override local changes if asks.
