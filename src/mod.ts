import {DependencyContainer} from 'tsyringe';
import {IPreSptLoadMod} from '@spt/models/external/IPreSptLoadMod';
import {IPostDBLoadMod} from '@spt/models/external/IPostDBLoadMod';
import {IPostSptLoadMod} from '@spt/models/external/IPostSptLoadMod';
import {ILogger} from "@spt/models/spt/utils/ILogger";
import {DatabaseServer} from '@spt/servers/DatabaseServer';
import {IDatabaseTables} from '@spt/models/spt/server/IDatabaseTables';
import addCustomRecipe_9x18 from './modifies/addCustomRecipe_9x18';
import addCustomRecipe_9x19 from './modifies/addCustomRecipe_9x19';
import addCustomRecipe_762x25 from './modifies/addCustomRecipe_762x25';
import addCustomRecipe_9x21 from './modifies/addCustomRecipe_9x21';
import addCustomRecipe_9x33r from './modifies/addCustomRecipe_9x33r';
import addCustomRecipe_1143x23 from './modifies/addCustomRecipe_1143x23';
import addCustomRecipe_127x33 from './modifies/addCustomRecipe_127x33';
import addCustomRecipe_46x30 from './modifies/addCustomRecipe_46x30';
import addCustomRecipe_57x28 from './modifies/addCustomRecipe_57x28';
import addCustomRecipe_545x39 from './modifies/addCustomRecipe_545x39';
import addCustomRecipe_556x45 from './modifies/addCustomRecipe_556x45';
import addCustomRecipe_68x51 from './modifies/addCustomRecipe_68x51';
import addCustomRecipe_762x35 from './modifies/addCustomRecipe_762x35';
import addCustomRecipe_762x39 from './modifies/addCustomRecipe_762x39';
import addCustomRecipe_762x51 from './modifies/addCustomRecipe_762x51';
import addCustomRecipe_762x54 from './modifies/addCustomRecipe_762x54';
import addCustomRecipe_86x70 from './modifies/addCustomRecipe_86x70';
import addCustomRecipe_9x39 from './modifies/addCustomRecipe_9x39';
import addCustomRecipe_955x39 from './modifies/addCustomRecipe_955x39';
import addCustomRecipe_127x55 from './modifies/addCustomRecipe_127x55';
import addCustomRecipe_12gb from './modifies/addCustomRecipe_12gb';
import addCustomRecipe_20gb from './modifies/addCustomRecipe_20gb';
import addCustomRecipe_12gs from './modifies/addCustomRecipe_12gs';
import addCustomRecipe_20gs from './modifies/addCustomRecipe_20gs';

// example：https://dev.sp-tarkov.com/chomp/ModExamples/

class Mod implements IPreSptLoadMod,IPostDBLoadMod,IPostSptLoadMod {
  private logger: ILogger;
  private databaseServer: DatabaseServer;
  
  public preSptLoad(container: DependencyContainer): void {
    this.logger = container.resolve<ILogger>('WinstonLogger');
    this.databaseServer = container.resolve<DatabaseServer>('DatabaseServer');
  }

  public postDBLoad(container: DependencyContainer): void {
    const tables: IDatabaseTables = this.databaseServer.getTables();

    // pistol
    addCustomRecipe_762x25(this.logger,tables);
    addCustomRecipe_9x18(this.logger,tables);
    addCustomRecipe_9x19(this.logger,tables);
    addCustomRecipe_9x21(this.logger,tables);
    addCustomRecipe_9x33r(this.logger,tables);
    addCustomRecipe_1143x23(this.logger,tables);
    addCustomRecipe_127x33(this.logger,tables);

    // PDW
    addCustomRecipe_46x30(this.logger,tables);
    addCustomRecipe_57x28(this.logger,tables);

    // rifle
    addCustomRecipe_545x39(this.logger,tables);
    addCustomRecipe_556x45(this.logger,tables);
    addCustomRecipe_68x51(this.logger,tables);
    addCustomRecipe_762x35(this.logger,tables);
    addCustomRecipe_762x39(this.logger,tables);
    addCustomRecipe_762x51(this.logger,tables);
    addCustomRecipe_762x54(this.logger,tables);
    addCustomRecipe_86x70(this.logger,tables);
    addCustomRecipe_9x39(this.logger,tables);
    addCustomRecipe_955x39(this.logger,tables);
    addCustomRecipe_127x55(this.logger,tables);

    // shotgun
    addCustomRecipe_12gb(this.logger,tables);
    addCustomRecipe_12gs(this.logger,tables);
    addCustomRecipe_20gb(this.logger,tables);
    addCustomRecipe_20gs(this.logger,tables);

    //
    this.logger.success('[SPTarkovAmmoCraft]: done');
  }

  public postSptLoad(container: DependencyContainer): void {
    //
  }
}

export const mod = new Mod();
