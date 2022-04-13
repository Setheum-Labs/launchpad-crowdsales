import { derive as ormlDerives } from '@open-web3/orml-api-derive';
import { derive as setheumDerives } from '@setheum.js/api-derive';
import {
  rpc as setheumRpc,
  types as setheumTypes,
  typesAlias as setheumTypesAlias,
  typesBundle as setheumTypesBundle,
  signedExtensions as setheumSignedExtensions
} from '@setheum.js/types';
import { ApiOptions } from '@polkadot/api/types';

export const defaultOptions: ApiOptions = {
  types: setheumTypes,
  rpc: setheumRpc
};

export const options = ({
  types = {},
  rpc = {},
  typesAlias = {},
  typesBundle = {},
  signedExtensions,
  ...otherOptions
}: ApiOptions = {}): ApiOptions => ({
  types: {
    ...types
  },
  rpc: {
    ...setheumRpc,
    ...rpc
  },
  typesAlias: {
    ...setheumTypesAlias,
    ...typesAlias
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  derives: {
    ...ormlDerives,
    ...setheumDerives
  },
  typesBundle: {
    ...typesBundle,
    spec: {
      ...typesBundle.spec,
      setheum: {
        ...setheumTypesBundle?.spec?.setheum,
        ...typesBundle?.spec?.setheum
      },
    }
  },
  signedExtensions: {
    ...setheumSignedExtensions,
    ...signedExtensions
  },
  ...otherOptions
});
