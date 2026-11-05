
import {
  setupWalletSelector,
  actionCreators,
} from "@near-wallet-selector/core";

import { setupMyNearWallet } from
  "@near-wallet-selector/my-near-wallet";

let selectorPromise;

export function getNearSelector() {
  if (!selectorPromise) {
    selectorPromise = setupWalletSelector({
      network: "testnet",
      modules: [
        setupMyNearWallet(),
      ],
    });
  }

  return selectorPromise;
}

export { actionCreators };

export const NEAR_NETWORK = "testnet";

export const NEAR_RPC =
  "https://rpc.testnet.near.org";

export const NEAR_EXPLORER =
  "https://testnet.nearblocks.io";
