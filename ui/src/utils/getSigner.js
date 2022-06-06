import { Keyring } from "@polkadot/keyring";
import {cryptoWaitReady} from "@polkadot/util-crypto"

export const getSigner = async () => {
  await cryptoWaitReady()
  const keyring = new Keyring({ type: "sr25519" });

  return keyring.addFromUri('//Alice');

};

export default getSigner;
