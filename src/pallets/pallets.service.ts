import { Injectable } from '@nestjs/common';
import { TNode, getDefaultPallet, getSupportedPallets } from '@paraspell/sdk';
import { validateNode } from 'src/utils';

@Injectable()
export class PalletsService {
  getDefaultPallet(node: string) {
    validateNode(node);
    return getDefaultPallet(node as TNode);
  }

  getSupportedPallets(node: string) {
    validateNode(node);
    return getSupportedPallets(node as TNode);
  }
}
