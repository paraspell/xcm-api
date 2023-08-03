import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XTransferModule } from './x-transfer/x-transfer.module';
import { AssetsModule } from './assets/assets.module';
import { ChannelsModule } from './channels/channels.module';
import { PalletsModule } from './pallets/pallets.module';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  it('should have the correct controllers', () => {
    const controllers = appModule.get<AppController>(AppController);
    expect(controllers).toBeDefined();
  });

  it('should have the correct providers', () => {
    const providers = appModule.get<AppService>(AppService);
    expect(providers).toBeDefined();
  });

  it('should have the correct module imports', () => {
    const xTransferModule = appModule.select(XTransferModule);
    const assetsModule = appModule.select(AssetsModule);
    const channelsModule = appModule.select(ChannelsModule);
    const palletsModule = appModule.select(PalletsModule);

    expect(xTransferModule).toBeDefined();
    expect(assetsModule).toBeDefined();
    expect(channelsModule).toBeDefined();
    expect(palletsModule).toBeDefined();
  });
});
