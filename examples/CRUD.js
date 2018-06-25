#! /usr/bin/env node
'use strict';

// For testing the functionality of the example.
const assert = require('assert');


// For managing command line arguments for the account ID and access token for the example.
const argv = require('yargs')
  .usage('Usage: $0 --accountId [num] --accessToken [string]')
  .demand(['accountId','accessToken'])
  .argv;

const apiOptions = {
  accountId: argv.accountId,
  accessToken: argv.accessToken
};

// Because this example project lives within the player-management-client repository,
// we can require the API wrapper directly from the code. In your application,
// replace the following line with:
//
// const playerManagementAPI = require('@brightcove/player-management-api')(apiOptions);
const playerManagementAPI = require('../lib/playerManagementAPI.js')(apiOptions);

// This is the player configuration we will use for our newly created player, including
// a custom configuration property.
const playerConfigurationJSON = JSON.stringify({
  configuration: {
    customProperty: 'Hello world!'
  }
});

// Placeholder for the player ID we will create through the API so we can refer to it later.
let playerId;

return playerManagementAPI.player.create(playerConfigurationJSON, function(error, response) {
  const created = JSON.parse(response.body);
  playerId = created.id;
  console.log(`Created player ${playerId}`);

  const patchedConfigurationJSON = JSON.stringify({
    anotherCustomProperty: 'Another hello world!'
  });

  return playerManagementAPI.player.config.patch(playerId, patchedConfigurationJSON, function(error, response) {
    console.log('Successfully updated the player configuration.');

    return playerManagementAPI.players.list(function(error, response) {
      const parsed = JSON.parse(response.body);
      const players = parsed.items;
      const count = parsed.item_count;
      console.log(`There are currently ${count} players in this account.`);

      const createdPlayer = players.find((player) => player.id === playerId);
      // The property from the original player configuration is present on the player's master
      // branch configuration...
      assert(createdPlayer.branches.master.configuration.customProperty === 'Hello world!');
      
      // ... and the new property from our player configuration PATCH request is in
      // the player's preview branch configuration.
      assert(createdPlayer.branches.preview.configuration.anotherCustomProperty === 'Another hello world!');

      return playerManagementAPI.player.delete(playerId, function(error, response) {
        const body = JSON.parse(response.body);
        console.log(body.message);
      });
    });
  });
});
