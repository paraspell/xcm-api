import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  NODE_NAMES,
  TNode,
  getNodeEndpointOption,
  getRelayChainSymbol,
} from '@paraspell/sdk';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';
import axios from 'axios';
import { isAddress } from 'web3-validator';

export const isNumeric = (num: any) => !isNaN(num);

export const createApiInstance = async (wsUrl: string) => {
  const wsProvider = new WsProvider(wsUrl);
  return await ApiPromise.create({ provider: wsProvider });
};

export const findWsUrlByNode = (node: TNode) => {
  const nodeInfo = getNodeEndpointOption(node);
  const providers = Object.values(nodeInfo.providers);

  if (providers.length < 1) {
    throw new InternalServerErrorException(
      `We couldn't find any WS url for node ${node}. Check your @polkadot/apps-config dependency version or open an issue here https://github.com/paraspell/xcm-api`,
    );
  }

  return providers[0];
};

export const validateNode = (node: string) => {
  if (!NODE_NAMES.includes(node as TNode)) {
    throw new BadRequestException(
      `Node ${node} is not valid. Check docs for valid nodes.`,
    );
  }
};

export const getNodeRelayChainWsUrl = (destinationNode: TNode) => {
  const symbol = getRelayChainSymbol(destinationNode);
  const POLKADOT_WS = 'wss://kusama-rpc.polkadot.io';
  const KUSAMA_WS = 'wss://rpc.polkadot.io';
  return symbol === 'DOT' ? POLKADOT_WS : KUSAMA_WS;
};

export const determineWsUrl = (fromNode?: TNode, destinationNode?: TNode) => {
  return fromNode
    ? findWsUrlByNode(fromNode)
    : getNodeRelayChainWsUrl(destinationNode);
};

export const validateRecaptcha = async (
  recaptcha: string,
  recaptchaSecretKey: string,
): Promise<boolean> => {
  const data = {
    secret: recaptchaSecretKey,
    response: recaptcha,
  };

  const response = await axios
    .post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: data,
    })
    .catch((error) => {
      throw new InternalServerErrorException(
        'Error verifying reCAPTCHA: ' + error,
      );
    });

  return response.data.success;
};

export const isValidPolkadotAddress = (address: string) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
    return true;
  } catch (error) {
    return false;
  }
};

export const isValidEthereumAddress = (address: string) => isAddress(address);

export const isValidWalletAddress = (address: string) =>
  isValidPolkadotAddress(address) || isValidEthereumAddress(address);
