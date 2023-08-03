import { Controller, Get, Param } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { isNumeric } from 'src/utils';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  getNodeNames() {
    return this.assetsService.getNodeNames();
  }

  @Get(':node')
  getAssetsObject(@Param('node') nodeOrParaId: string) {
    const isParaId = isNumeric(nodeOrParaId);
    if (isParaId) {
      return this.assetsService.getNodeByParaId(Number(nodeOrParaId));
    }
    return this.assetsService.getAssetsObject(nodeOrParaId);
  }

  @Get(':node/id/:symbol')
  getAssetId(@Param('node') node: string, @Param('symbol') symbol: string) {
    return this.assetsService.getAssetId(node, symbol);
  }

  @Get(':node/relay-chain-symbol')
  getRelayChainSymbol(@Param('node') node: string) {
    return this.assetsService.getRelayChainSymbol(node);
  }

  @Get(':node/native')
  getNativeAssets(@Param('node') node: string) {
    return this.assetsService.getNativeAssets(node);
  }

  @Get(':node/other')
  getOtherAssets(@Param('node') node: string) {
    return this.assetsService.getOtherAssets(node);
  }

  @Get(':node/all-symbols')
  getAllAssetsSymbol(@Param('node') node: string) {
    return this.assetsService.getAllAssetsSymbols(node);
  }

  @Get(':node/decimals/:symbol')
  getDecimals(@Param('node') node: string, @Param('symbol') symbol: string) {
    return this.assetsService.getDecimals(node, symbol);
  }

  @Get(':node/has-support/:symbol')
  hasSupportForAsset(
    @Param('node') node: string,
    @Param('symbol') symbol: string,
  ) {
    return this.assetsService.hasSupportForAsset(node, symbol);
  }

  @Get(':node/para-id')
  getParaId(@Param('node') node: string) {
    return this.assetsService.getParaId(node);
  }
}
