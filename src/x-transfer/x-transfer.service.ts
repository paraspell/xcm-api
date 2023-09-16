import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  Builder,
  IncompatibleNodesError,
  InvalidCurrencyError,
  NODE_NAMES,
  TNode,
  TSerializedApiCall,
} from '@paraspell/sdk';
import { XTransferDto } from './dto/XTransferDto';
import { createApiInstance, determineWsUrl } from '../utils';

@Injectable()
export class XTransferService {
  async generateXcmCall({ from, to, amount, address, currency }: XTransferDto) {
    if (!from && !to) {
      throw new BadRequestException(
        "You need to provide either 'from' or 'to' query parameters",
      );
    }

    if (from && !NODE_NAMES.includes(from as TNode)) {
      throw new BadRequestException(
        `Node ${from} is not valid. Check docs for valid nodes.`,
      );
    }

    if (to && !NODE_NAMES.includes(to as TNode)) {
      throw new BadRequestException(
        `Node ${to} is not valid. Check docs for valid nodes.`,
      );
    }

    if (from && to && !currency) {
      throw new BadRequestException(`Currency should not be empty.`);
    }

    const wsUrl = determineWsUrl(from as TNode, to as TNode);
    const api = await createApiInstance(wsUrl);

    let builder: any = Builder(api);

    if (from && to) {
      // Parachain to parachain
      builder = builder
        .from(from as TNode)
        .to(to as TNode)
        .currency(currency);
    } else if (from) {
      // Parachain to relaychain
      builder = builder.from(from as TNode);
    } else if (to) {
      // Relaychain to parachain
      builder = builder.to(to as TNode);
    }

    builder = builder.amount(amount).address(address);

    let response: TSerializedApiCall;
    try {
      response = builder.buildSerializedApiCall();
    } catch (e) {
      if (
        e instanceof InvalidCurrencyError ||
        e instanceof IncompatibleNodesError
      ) {
        throw new BadRequestException(e.message);
      }
      throw new InternalServerErrorException(e.message);
    } finally {
      if (api) api.disconnect();
    }
    return response;
  }
}
