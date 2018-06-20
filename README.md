Player Management Client
========================

This module can be used to access the Brightcove Player Management API.  Documentation for the 
underlying API can be found [here](https://support.brightcove.com/player-management-api)


### Getting Started

```
npm install player-management-client
```

Look at examples/list.js as an example of how to use this module.  Two thing to note:

  1. This line should refer to the official module rather than the local lib.  Change:
    
    
     ```
     playerManagementAPI = require('../lib/playerManagementAPI.js')(apiOptions);
     ```
     
     to 
     
     ```
     playerManagementAPI = require('player-management-client')(apiOptions);
     ```
  2. accessToken.  This is a short-lived token created by the OAuth API.  For more information go 
     [here](https://support.brightcove.com/oauth-guide);
     
### License

Apache-2.0. Copyright (c) Brightcove, Inc.
