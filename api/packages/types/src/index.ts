import {
  typesBundle as setheumTypesBundle,
  types as setheumTypes,
  typesAlias as setheumTypeAlias,
  rpc as setheumRpc,
  signedExtensions as setheumSignedExtensions
} from '@setheum.js/type-definitions';
import {
  OverrideBundleType,
  OverrideModuleType,
  RegistryTypes,
  DefinitionRpc,
  DefinitionRpcSub
} from '@polkadot/types/types';

import './interfaces/augment-api';
import './interfaces/augment-api-consts';
import './interfaces/augment-api-query';
import './interfaces/augment-api-rpc';
import './interfaces/augment-api-tx';
import './interfaces/augment-types';

export * from './interfaces/augment-api-mobx';

export const types: RegistryTypes = setheumTypes;

export const rpc: Record<string, Record<string, DefinitionRpc | DefinitionRpcSub>> = setheumRpc;

export const typesAlias: Record<string, OverrideModuleType> = setheumTypeAlias;

export const typesBundle = (setheumTypesBundle as unknown) as OverrideBundleType;

export const signedExtensions = setheumSignedExtensions;
