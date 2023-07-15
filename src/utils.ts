import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { NODE_NAMES, TNode, getNodeEndpointOption } from '@paraspell/sdk';
import { ApiPromise, WsProvider } from '@polkadot/api';

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
